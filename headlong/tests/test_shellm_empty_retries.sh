#!/usr/bin/env bash
# test_shellm_empty_retries.sh — empty LLM replies are retried a bounded
# number of times, then the run dies instead of looping forever.
#
# Usage: tests/test_shellm_empty_retries.sh

set -uo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
REPO="$(dirname "$HERE")"

WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT

pass=0
fail=0
ok()  { pass=$((pass+1)); printf 'ok   %s\n' "$1"; }
bad() { fail=$((fail+1)); printf 'FAIL %s%s\n' "$1" "${2:+ — $2}"; }

mkdir -p "$WORK/home" "$WORK/wd"
cp -R "$REPO/bin" "$WORK/toolbin"

# llm stub: count --thinking (main loop) calls; always return empty stdout.
cat > "$WORK/toolbin/llm" <<'STUB'
#!/usr/bin/env bash
for a in "$@"; do [[ "$a" == "--thinking" ]] && main_loop=1; done
n=$(( $(cat "$LLM_CALLS" 2>/dev/null || echo 0) + 1 ))
# only the main-loop call is an empty-completion retry candidate
if [[ "${main_loop:-0}" -eq 1 ]]; then
    printf '%s' "$n" > "$LLM_CALLS"
    exit 0
fi
printf '{}\n'
exit 0
STUB
chmod +x "$WORK/toolbin/llm"

export PATH="$WORK/toolbin:$PATH"
export HOME="$WORK/home"
export HEADLONG_HOME="$WORK/home/.headlong"
export ANTHROPIC_API_KEY="test-key"
export SHELLM_MODEL="test-model"
export SHELLM_ENV=local
export LLM_CALLS="$WORK/calls"
printf '0' > "$LLM_CALLS"

run_shellm() {
    ( cd "$WORK/wd" && "$WORK/toolbin/shellm" --workdir "$WORK/wd" --max-iterations 1 "$@" ) \
        > "$WORK/out" 2> "$WORK/err" < /dev/null
}

export SHELLM_EMPTY_RESPONSE_RETRIES=2
run_shellm "say hi"
rc=$?
calls=$(cat "$LLM_CALLS")

if [[ "$rc" -ne 0 ]]; then
    ok "empty replies fail the run (rc=$rc)"
else
    bad "empty replies fail the run" "rc=0"
fi

# 1 initial call + 2 retries
if [[ "$calls" = "3" ]]; then
    ok "empty replies retried exactly SHELLM_EMPTY_RESPONSE_RETRIES times ($calls calls)"
else
    bad "empty replies retried exactly SHELLM_EMPTY_RESPONSE_RETRIES times" "calls=$calls"
fi

if grep -q "Empty response from test-model after 2 retries" "$WORK/err"; then
    ok "error names the empty-response cap"
else
    bad "error names the empty-response cap" "$(tail -3 "$WORK/err" | tr '\n' ' ')"
fi

# 0 extra retries: one call, then die
printf '0' > "$LLM_CALLS"
export SHELLM_EMPTY_RESPONSE_RETRIES=0
run_shellm "say hi"
rc=$?
calls=$(cat "$LLM_CALLS")
if [[ "$rc" -ne 0 && "$calls" = "1" ]]; then
    ok "EMPTY_RESPONSE_RETRIES=0 does not retry"
else
    bad "EMPTY_RESPONSE_RETRIES=0 does not retry" "rc=$rc calls=$calls"
fi

printf '\n%d passed, %d failed\n' "$pass" "$fail"
[[ "$fail" -eq 0 ]]
