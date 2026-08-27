# Headlong fork — OpenRouter/free resilience

This is an Apache-2.0 derivative of
[laude-institute/headlong](https://github.com/laude-institute/headlong).
A GitHub-side fork could not be created from the agent that produced this
tree (the token cannot call `POST /repos/.../forks`). The full upstream
sources are vendored here with the changes below.

Install **from this checkout**, not from `curl | bash` (that still clones
upstream):

```bash
cd headlong
./install.sh --symlinks --init
```

## How upstream handled no-response

`bin/llm` already retried some transients (HTTP 429/5xx, OpenRouter 200
bodies with a top-level `.error`, whitespace-only bodies, empty streams)
with **2 retries** and **linear 1s/2s backoff**. That is not enough for
`openrouter/free`, which commonly returns:

- HTTP 502/503 and `"Provider returned error"` inside a 200
- empty `choices: []` or `content: null` (treated as a successful empty
  answer)
- truncated JSON or an HTML 502 page with HTTP 200
- a stream that emits a few tokens then drops (`curl` 18) or ends with
  `finish_reason: "error"`

Two other sharp edges:

1. **Streamed text was committed live.** A mid-stream drop could not be
   retried (it would duplicate text). `shellm` discarded the partial on
   a non-zero exit, but the attempt was still spent, and a later
   success-shaped empty body could look like a real reply.
2. **`shellm`'s empty-response loop was unlimited** by default
   (`SHELLM_EMPTY_RESPONSE_RETRIES` unset). Eval runs burned hundreds of
   retries on empty API bodies
   (`terminal_bench2_eval/failure_analysis.md`).
3. **`call_llm` treated any stderr + empty stdout as a hard failure**,
   so a thinking-only reply never reached the empty-retry path that
   feeds thinking back.

Idle API failures after retries already become a visible `error` step on
the monolith trajectory and back off. That path is unchanged; the mind
does not die, it slows down. The gap was flaky endpoints looking like
empty successes, or spinning forever.

## What this fork changes

- Buffer streamed output until the attempt completes, then commit.
  Incomplete streams (curl errors, `finish_reason: error`, HTTP 5xx
  on the SSE response) retry without emitting a partial.
- Treat empty `choices`, empty completions, truncated/non-JSON bodies,
  and HTML 200 pages as transient failures.
- Default `LLM_RETRIES=6`, exponential backoff (base 2s, cap 45s), honor
  `Retry-After`.
- OpenRouter: `HTTP-Referer` / `X-Title` headers and
  `provider.allow_fallbacks`.
- Cap `SHELLM_EMPTY_RESPONSE_RETRIES` at 5. Empty stdout with thinking
  on stderr is no longer a hard `call_llm` failure.

## Laptop use (OpenRouter free)

Free models are rate-limited and skip a lot. Use Docker if you have it
so the agent's shell is sandboxed. Spend-cap the key anyway.

```bash
export OPENROUTER_API_KEY=sk-or-...
export SHELLM_MODEL='qwen/qwen3-8b:free'   # any :free id you actually want
# optional knobs (these are the new defaults)
export LLM_RETRIES=8
export LLM_RETRY_BACKOFF=2
export LLM_RETRY_BACKOFF_CAP=45
export SHELLM_EMPTY_RESPONSE_RETRIES=5
```

Put the exports in `~/.headlong/.env` so the mind picks them up. `:free`
models still 429; backoff is the point. If a provider stays dead,
OpenRouter can fail over to another upstream (`allow_fallbacks`).

`headlong-killall` is the panic button.

## Tests

```bash
cd headlong
bash tests/test_llm_retry.sh
bash tests/test_shellm_empty_retries.sh
```
