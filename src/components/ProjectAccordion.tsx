import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlusSquare, CheckCircle } from '@phosphor-icons/react'
import React, { ReactElement, SVGProps } from 'react'

interface SVGIconProps extends SVGProps<SVGSVGElement> {
  children: ReactElement<{ d: string }>;
}

interface ProjectItem {
  title: string
  summary: string
  description: React.ReactNode
  icon?: React.ReactNode
  featureIcon: ReactElement<SVGIconProps>
}

interface AccordionItemProps {
  item: ProjectItem
  isOpen: boolean
  isViewed: boolean
  onClick: () => void
}

const AccordionItem = ({ item, isOpen, isViewed, onClick }: AccordionItemProps) => {
  return (
    <div className="project-item-wrapper">
      <motion.div
        className="project-icon"
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClick();
          }
        }}
      >
        <PlusSquare size={25} />
      </motion.div>
      <div 
        className="project-item"
        data-expanded={isOpen}
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClick();
          }
        }}
      >
        <div className="project-header">
          <div className="project-title">
            {item.icon}
            <h3>{item.title}</h3>
            {(isOpen || isViewed) && (
              <motion.span 
                className="project-title-checkbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <CheckCircle weight="fill" />
              </motion.span>
            )}
          </div>
        </div>
        
        <div className="project-summary">
          {item.summary}
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="project-description"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="description-content">
                {item.description}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className="project-feature-icon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.2,
              ease: "easeInOut"
            }}
            onClick={onClick}
            style={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onClick();
              }
            }}
          >
            <div 
              className="grunge-texture"
              style={{
                WebkitMaskImage: `url("data:image/svg+xml,${encodeURIComponent(
                  `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="${item.featureIcon.props.viewBox}" preserveAspectRatio="xMidYMid meet"><path fill="white" d="${item.featureIcon.props.children.props.d}"/></svg>`
                )}")`,
                maskImage: `url("data:image/svg+xml,${encodeURIComponent(
                  `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="${item.featureIcon.props.viewBox}" preserveAspectRatio="xMidYMid meet"><path fill="white" d="${item.featureIcon.props.children.props.d}"/></svg>`
                )}")`,
              } as React.CSSProperties}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface ProjectSection {
  title: string;
  items: ProjectItem[];
}

const ProjectAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [viewedProjects, setViewedProjects] = useState<Set<number>>(new Set())

  const sections: ProjectSection[] = [
    {
      title: "Building better mousetraps:",
      items: [
        {
          title: 'Heimeyra',
          summary: 'An early-warning app for noisy aircraft.',
          description: (
            <>
              <p className="valueprop"><b>VALUE PROP:</b> using Heimeyra to track potential interruptions from nearby aircraft, audio teams can reduce burned takes, lost time, and wasted effort, keeping productions on target and helping actors stay in the zone.</p>
              <p className="problem">PROBLEM: When recording audio on location or in non-soundproof environments, it's common for aircraft to intrude unexpectedly, introducing unwanted noise. This is especially easy to happen in areas where terrain or nearby buildings can make it difficult to predict flight paths. This can be especially frustrating for actors, who expend valuable energy only to be forced to "go again" due to circumstances beyond their control. </p>
              <p className="solution">SOLUTION: Heimeyra uses ADS-B flight tracking data to identify aircraft within a specified radius of the user's location. The intuitive "traffic light" indicator provides instant at-a-glance awareness of any nearby aircraft in real-time, giving production an unprecedented ability to squeeze in "one more quick take" before the next buzz.</p>
              <p className="product-image"><img src="/images/heimeyra.webp" alt="Heimeyra" /></p>
              <p className="project-link"><a href="https://heimeyra.app" target="_blank" rel="noopener noreferrer">https://heimeyra.app</a>
                <br/><span className="builtwith">Built with React, Node.js, vanilla CSS, and REST API, deployed on Vercel.</span></p>
            </>
          ),
          featureIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="feature-icon">
              <path fill="currentColor" d="M256 0c-35 0-64 59.5-64 93.7l0 84.6L8.1 283.4c-5 2.8-8.1 8.2-8.1 13.9l0 65.5c0 10.6 10.2 18.3 20.4 15.4l171.6-49 0 70.9-57.6 43.2c-4 3-6.4 7.8-6.4 12.8l0 42c0 7.8 6.3 14 14 14c1.3 0 2.6-.2 3.9-.5L256 480l110.1 31.5c1.3 .4 2.6 .5 3.9 .5c6 0 11.1-3.7 13.1-9C344.5 470.7 320 422.2 320 368c0-60.6 30.6-114 77.1-145.6L320 178.3l0-84.6C320 59.5 292 0 256 0zM496 512a144 144 0 1 0 0-288 144 144 0 1 0 0 288zm0-96a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm0-144c8.8 0 16 7.2 16 16l0 80c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-80c0-8.8 7.2-16 16-16z"/>
            </svg>
          )
        },
        {
          title: 'ReaperDiff',
          summary: 'A project-file diff tool for Reaper DAW.',
          description: (
            <>
            <p className="valueprop"><b>VALUE PROP:</b> by comparing raw project files between revisions, audio editors can get visual confirmation of changes, reduce opportunity for error, and shorten time to delivery by avoiding time-consuming re-exports.</p>
            <p className="problem">PROBLEM: Podcast and audiobook editors making changes to long timelines often risk unintentionally modifying sections or clips that should not be changed, especially with ripple-edits. Traditionally, the only way to catch these errors is by listening to the entire project after every revision, which is time-consuming (and mind-numbing!), and introduces repetitive fatigue.</p>
            <p className="solution">SOLUTION: ReaperDiff analyzes the raw code of the .RPP project file, and easily calculates all changes between project versions. Using 5 algorithms to check for different types of changes, ReaperDiff generates an easy-to-read, visual representation of the revised project timeline, allowing the editor to confirm at a glance whether unexpected changes have occurred <i>before</i> a time-consuming export is done.</p>
            <p className="product-image"><img src="/images/reaperdiff.webp" alt="ReaperDiff" /></p>
            <p><a href="https://reaperdiff.app" target="_blank" rel="noopener noreferrer">https://reaperdiff.app</a><br/>
            <span className="builtwith">Built with React and vanilla CSS, deployed on Vercel.</span></p>
            </>
          ),
          featureIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="feature-icon">
              <path fill="currentColor" d="M112,148a12,12,0,0,0-12,12v19L69.17,148.2A4,4,0,0,1,68,145.37V97.94a36,36,0,1,0-24,0v47.43a27.81,27.81,0,0,0,8.2,19.8L83,196H64a12,12,0,0,0,0,24h48a12,12,0,0,0,12-12V160A12,12,0,0,0,112,148ZM56,52A12,12,0,1,1,44,64,12,12,0,0,1,56,52ZM212,158.06V110.63a27.81,27.81,0,0,0-8.2-19.8L173,60h19a12,12,0,0,0,0-24H144a12,12,0,0,0-12,12V96a12,12,0,0,0,24,0V77l30.83,30.83a4,4,0,0,1,1.17,2.83v47.43a36,36,0,1,0,24,0ZM200,204a12,12,0,1,1,12-12A12,12,0,0,1,200,204Z"/>
            </svg>
          )
        },
        {
          title: '8-Bit Weather',
          summary: 'A kid-friendly 12-hour forecast.',
          description: (
            <>
            <p className="valueprop"><b>VALUE PROP:</b> kids can gain weather awareness and be more self-reliant by learning how to contextualize weather data with tangible, relatable descriptions.</p>
            <p className="problem">PROBLEM: weather data is often presented in a way that is difficult for children to understand. What does "fahrenheit" mean? How can "zero degrees" exist? Is 20mph wind a lot? These are values we easily contextualize as adults, but kids struggle to relate to.</p>
            <p className="solution">SOLUTION: 8-Bit Weather tells kids what the weather is like by describing it in relatable terms: "It's good kite-flying weather," or "super rainy today," or "really hot today - drink lots of water!" As kids become more familiar with weather patterns, the app shows them comparisons-over-time and hourly graphs to help them understand changing conditions.</p>
            <p className="product-image"><img src="/images/8bitweather.webp" alt="8-Bit Weather"/></p>
            <p><a href="https://8bitweather.app" target="_blank"  rel="noopener noreferrer">https://8bitweather.app</a><br/>
            <span className="builtwith">Built with React, Node.js,vanilla CSS, and OpenWeather API, deployed on Vercel.</span></p>
            </>
          ),
          featureIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="feature-icon">
              <path fill="currentColor" d="M294.2 1.2c5.1 2.1 8.7 6.7 9.6 12.1l10.4 62.4c-23.3 10.8-42.9 28.4-56 50.3c-14.6-9-31.8-14.1-50.2-14.1c-53 0-96 43-96 96c0 35.5 19.3 66.6 48 83.2c.8 31.8 13.2 60.7 33.1 82.7l-56 39.2c-4.5 3.2-10.3 3.8-15.4 1.6s-8.7-6.7-9.6-12.1L98.1 317.9 13.4 303.8c-5.4-.9-10-4.5-12.1-9.6s-1.5-10.9 1.6-15.4L52.5 208 2.9 137.2c-3.2-4.5-3.8-10.3-1.6-15.4s6.7-8.7 12.1-9.6L98.1 98.1l14.1-84.7c.9-5.4 4.5-10 9.6-12.1s10.9-1.5 15.4 1.6L208 52.5 278.8 2.9c4.5-3.2 10.3-3.8 15.4-1.6zM208 144c13.8 0 26.7 4.4 37.1 11.9c-1.2 4.1-2.2 8.3-3 12.6c-37.9 14.6-67.2 46.6-77.8 86.4C151.8 243.1 144 226.5 144 208c0-35.3 28.7-64 64-64zm69.4 276c11 7.4 14 22.3 6.7 33.3l-32 48c-7.4 11-22.3 14-33.3 6.7s-14-22.3-6.7-33.3l32-48c7.4-11 22.3-14 33.3-6.7zm96 0c11 7.4 14 22.3 6.7 33.3l-32 48c-7.4 11-22.3 14-33.3 6.7s-14-22.3-6.7-33.3l32-48c7.4-11 22.3-14 33.3-6.7zm96 0c11 7.4 14 22.3 6.7 33.3l-32 48c-7.4 11-22.3 14-33.3 6.7s-14-22.3-6.7-33.3l32-48c7.4-11 22.3-14 33.3-6.7zm96 0c11 7.4 14 22.3 6.7 33.3l-32 48c-7.4 11-22.3 14-33.3 6.7s-14-22.3-6.7-33.3l32-48c7.4-11 22.3-14 33.3-6.7zm74.5-116.1c0 44.2-35.8 80-80 80l-271.9 0c-53 0-96-43-96-96c0-47.6 34.6-87 80-94.6l0-1.3c0-53 43-96 96-96c34.9 0 65.4 18.6 82.2 46.4c13-9.1 28.8-14.4 45.8-14.4c44.2 0 80 35.8 80 80c0 5.9-.6 11.7-1.9 17.2c37.4 6.7 65.8 39.4 65.8 78.7z"/>
            </svg>
          )
        },
      ]
    },
    {
      title: "force multipliers:",
      items: [
        {
          title: 'SSRS CSV Subscription Importer',
          summary: 'Create report subscriptions in bulk from a CSV file.',
          description: (
            <>
              <p className="valueprop"><b>VALUE PROP:</b> Cut report subscription creation time to a fraction of the time to do manually, without losing any subscription features or capabilities. The only free subscription import tool for SSRS in existence?</p>
              <p className="problem">PROBLEM: Creating report subscriptions directly in SSRS is a click-intensive process and highly susceptible to human error. The SSRS interface is not designed for bulk operations, and any more than a handful of subscriptions offers a high upside for automation.</p>
              <p className="solution">SOLUTION: This CSV Importer tool enables bulk creation from a simple, easy-to-create CSV file, retaining all the native subscription features and capabilities (including scheduling!), and processes many dozens of subscriptions in the same time a person could add just one.</p>
              <p><a href="https://github.com/mcarlssen/code" target="_blank" rel="noopener noreferrer">https://github.com/mcarlssen/code</a><br/>
              <span className="builtwith">Built with Powershell, SSRS Web Service Proxy, and Excel.</span></p>
            </>
          ),
          featureIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="feature-icon">
              <path fill="currentColor" d="M224 128a8 8 0 0 1-8 8h-80a8 8 0 0 1 0-16h80a8 8 0 0 1 8 8ZM136 168h80a8 8 0 0 0 0-16h-80a8 8 0 0 0 0 16Zm80-80h-80a8 8 0 0 0 0 16h80a8 8 0 0 0 0-16ZM96 140H48v-24h48a12 12 0 0 0 0-24H48V68a12 12 0 0 0-24 0v24H12a12 12 0 0 0 0 24h12v24H12a12 12 0 0 0 0 24h36v24a12 12 0 0 0 24 0v-24h24a12 12 0 0 0 0-24Z"/>
            </svg>
          )
        },
        {
          title: 'Check-ID3',
          summary: 'Create report subscriptions in bulk from a CSV file.',
          description: (
            <>
              <p className="valueprop"><b>VALUE PROP:</b> Music & audiobook producers, podcast editors, and archivists can programmatically verify that specified ID3 tags are present and set correctly in MP3 files, ensuring perfect consistency and accuracy.</p>
              <p className="problem">PROBLEM: Validating ID3 tags across a large number of files is laborious and time-consuming, even with exceptional tools like <a href="https://www.mp3tag.de/en/" target="_blank" rel="noopener noreferrer">mp3tag</a>. Scale the problem by 100 files, and the possibility of human error is increased.</p>
              <p className="solution">SOLUTION: Check-ID3 takes a list of tags and values via CSV (or TSV), and tests every MP3 file in the active directory against the tag list. A report is generated with the results, and can be easily re-run after corrections are made manually (using mp3tag or similar).</p>
              <p className="product-image"><img src="/images/check-id3.webp" alt="Check-ID3"/></p>
              <p><a href="https://github.com/mcarlssen/check-id3" target="_blank" rel="noopener noreferrer">https://github.com/mcarlssen/check-id3</a><br/>
              <span className="builtwith">Built with Python and Powershell.</span></p>
            </>
          ),
          featureIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="feature-icon">
              <path fill="currentColor" d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM64,72H192a8,8,0,0,1,0,16H64a8,8,0,0,1,0-16Zm0,48H96a8,8,0,0,1,0,16H64a8,8,0,0,1,0-16Zm40,64H64a8,8,0,0,1,0-16h40a8,8,0,0,1,0,16Zm94.55-40.71L180.69,158l5.44,22a4,4,0,0,1-1.49,4.17,4.05,4.05,0,0,1-2.39.79,4,4,0,0,1-2-.55L160,172.54l-20.22,11.91a4,4,0,0,1-5.91-4.41l5.44-22-17.86-14.75a4,4,0,0,1,2.24-7.07l23.58-1.82,9.06-21a4,4,0,0,1,7.34,0l9.06,21,23.58,1.82a4,4,0,0,1,2.24,7.07Z"/>
            </svg>
          )
        },
         {
          title: 'Whisper Transcription',
          summary: 'A terminal utility that wraps OpenAI\'s Whisper.cpp speech-to-text engine.',
          description: (
            <>
              <p className="valueprop"><b>VALUE PROP:</b> Fast, easy, and free transcription on any PC.</p>
              <p className="problem">PROBLEM: Transcribing lots of small audio files <i>by hand</i> is tedious, at best. Using browser-based transcription services adds many steps to the process. Many desktop apps require subscriptions or are time-limited.</p>
              <p className="solution">SOLUTION: Whisper Transcription is a lightweight, simple terminal utility that wraps OpenAI's Whisper.cpp speech-to-text engine, allowing users to transcribe audio files locally on any PC faster than realtime, with high accuracy and minimal touches. Shortcuts like automatic copy-to-clipboard make the utility easy to integrate with existing processes.</p>
              <p className="product-image"><img src="/images/whisper.webp" alt="Whisper Transcription"/></p>
              <p><a href="https://github.com/mcarlssen/code" target="_blank" rel="noopener noreferrer">https://github.com/mcarlssen/code</a><br/>
              <span className="builtwith">Built with Powershell, Whisper.cpp, and <a href="https://ggml.ggerganov.com/" target="_blank" rel="noopener noreferrer">@ggerganov's ggml models</a>.</span></p>
            </>
          ),
          featureIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="feature-icon">
              <path fill="currentColor" d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/>
            </svg>
          )
        },
        {
          title: 'P-Touch Batch Label Utility',
          summary: 'Batch-print labels via a simple terminal script.',
          description: (
            <>
              <p className="valueprop"><b>VALUE PROP:</b> Print large numbers of individually unique labels 10x faster than manual printing - hands-free.</p>
              <p className="problem">PROBLEM: We affixed a UID label to hardware devices before deploying them to the field, using a handheld P-Touch label printer. This process was foolproof, but wasted 30% of our label stock due to spool-and-cut, and required individual input for each label - an very inefficient and time-consuming operation.</p>
              <p className="solution">SOLUTION: P-Touch Batch Label Utility is a simple terminal script that generates a list of labels from copy-and-paste input from the user, and prints all labels on a single strip - saving that 30% previously-wasted stock, and making the entire printing process 10x faster and 10x fewer touches.</p>
              <p><a href="https://github.com/mcarlssen/code" target="_blank" rel="noopener noreferrer">https://github.com/mcarlssen/code</a><br/>
              <span className="builtwith">Built with Powershell and a Holy Hand Grenade, because label printers are evil.</span></p>
            </>
          ),
          featureIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="feature-icon">
              <path fill="currentColor" d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l224 0 0-112c0-26.5 21.5-48 48-48l112 0 0-224c0-35.3-28.7-64-64-64L64 32zM448 352l-45.3 0L336 352c-8.8 0-16 7.2-16 16l0 66.7 0 45.3 32-32 64-64 32-32z"/>
            </svg>
          )
        },
        {
          title: 'Blink(1) Busy Light',
          summary: 'Control a Blink(1) LED device via AutoHotKey as a busy light.',
          description: (
            <>
              <p className="valueprop"><b>VALUE PROP:</b> An easily controllable, inexpensive alert light that increases situational awareness for all parties within visual range!</p>
              <p className="problem">PROBLEM: <i>Tap-tap..."You on the phone?"</i> is an all-too-familiar pantomime, especially in-office. It's awkward, distracting, and indicates a lack of visibility for heads-down concentration or single-focus tasks. Commercial "busy lights" exist, but are generally expensive.</p>
              <p className="solution">SOLUTION: Using an inexpensive <a href="https://blink1.thingm.com/" target="_blank" rel="noopener noreferrer">Blink(1) USB LED device</a>, this Busy Light utility leverages a simple AutoHotKey macro to toggle the LED on or off with a simple keypress, to visibly indicate that you're not available to talk. AHK also provides powerful custom detection logic, so you can even auto-detect when an app opens or a window is focused. Tell your coworkers - if the light is red, don't interrupt!</p>
              <p><a href="https://github.com/mcarlssen/code" target="_blank" rel="noopener noreferrer">https://github.com/mcarlssen/code</a><br/>
              <span className="builtwith">Built with AutoHotKey v2 and the blink(1) command-line tool.</span></p>
            </>
          ),
          featureIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="feature-icon">
              <path fill="currentColor" d="M272 384c9.6-31.9 29.5-59.1 49.2-86.2c0 0 0 0 0 0c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4c0 0 0 0 0 0c19.8 27.1 39.7 54.4 49.2 86.2l160 0zM192 512c44.2 0 80-35.8 80-80l0-16-160 0 0 16c0 44.2 35.8 80 80 80zM112 176c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.9 50.1-112 112-112c8.8 0 16 7.2 16 16s-7.2 16-16 16c-44.2 0-80 35.8-80 80z"/>
            </svg>
          )
        }
      ]
    },
    {
      title: "transforming processes:",
      items: [
        {
          title: 'Hardware Deployment Streamlining',
          summary: 'Rewriting a core provisioning process yielded a 75% shorter cycle time.',
          description: (
            <>
              <p className="valueprop"><b>VALUE PROP:</b> I achieved an 80% reduction in manual touches and 75% shorter cycle time by analyzing, refactoring, and extending a business-centric device provisioning process.</p>
              <p className="problem">PROBLEM: Provisioning new laptops for field technicians took 3-4 hours from unboxing to shipping, and required a dozen manual touches throughout the setup process. This made volume scaling difficult for limited staff resources, and impaired the team's ability to be responsive and agile on short notice.</p>
              <p className="solution">SOLUTION: I identified many areas of the codified portions of the process that could be automated or directly connected to the following steps, as well as new capabilities that could be added, which resulted in consolidating required input steps from 12 steps to 2 steps, and an overall significantly shortened process. This enabled much more agile turnaround and made same-day service possible much later into the workday.</p>
              <p><a href="https://renovo1.com" target="_blank" rel="noopener noreferrer">https://renovo1.com</a><br/>
              <span className="builtwith">Built with Powershell, Ruby, and Chef, deployed on AWS.</span></p>
            </>
          ),
          featureIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="feature-icon">
              <path fill="currentColor" d="M176 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l16 0 0 34.4C92.3 113.8 16 200 16 304c0 114.9 93.1 208 208 208s208-93.1 208-208c0-41.8-12.3-80.7-33.5-113.2l24.1-24.1c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L355.7 143c-28.1-23-62.2-38.8-99.7-44.6L256 64l16 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L224 0 176 0zm72 192l0 128c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-128c0-13.3 10.7-24 24-24s24 10.7 24 24z"/>
            </svg>
          )
        },
        {
          title: 'Workflow Efficiency Analysis',
          summary: 'Implemented comprehensive metrics-gathering and identified ways to reduce work by 68%.',
          description: (
            <>
              <p className="valueprop"><b>VALUE PROP:</b> By implementing expanded data collection points from the ticketing system, and performing quantiative analysis, I identified 10 key process improvements that could reduce labor overhead by up to 68%.</p>
              <p className="problem">PROBLEM: A rapid growth in business, combined with a critical and persistent staffing shortage, left the support team oversubscribed and unable to meet target response times, resulting in decreased customer satisfaction and a high-stress working environment. </p>
              <p className="solution">SOLUTION: By increasing the number and frequency of datapoints being collected, I was able to correlate patterns in customer behavior <i>and</i> pinpoint process bottlenecks for the support team. I identified 10 of the most impactful areas for improvement, which combined to an estimated 68% of overall ticket volume. This data was visualized via Google Sheets dashboard with custom charts and standardized reports, for accessible distribution to leadership.</p>
              <p><a href="https://guard1.com" target="_blank" rel="noopener noreferrer">https://guard1.com</a><br/>
              <span className="builtwith">Built with CSV, Google Sheets, AppsScript, and the tears of the support team.</span></p>
            </>
          ),
          featureIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="feature-icon">
              <path fill="currentColor" d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48H0l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"/>
            </svg>
          )
        }
      ]
    },
    {
      title: "Creative Exploration:",
      items: [
        {
          title: 'Kringla',
          summary: 'A harmonograph simulator inspired by mechanical drawing machines.',
          description: (
            <>
              <p className="valueprop"><b>VALUE PROP:</b> Analog drawing machines have an inexplicable allure for me in the 2020s. It's the "retro-ness" of physical ink on physical paper, and the left-brained intersection of physics and geometry with right-brained creativity and intuition.</p>
              <p className="problem">PROBLEM: Physical harmonograph devices are complex and require careful engineering to build successfully. It's no accident that James Gandy (<a href="https://instagram.com/gandyworks">@gandyworks</a>) has a machinist background. There's a direct relationship between the complexity of your machine, and the complexity of the patterns and shapes you can achieve. This takes time and resources.</p>
              <p className="solution">SOLUTION: Using a "keyframe" system, Kringla allows the user to create evolving patterns similar to eccentric gears and multi-stage gear trains.</p>
              <p className="product-image"><img src="/images/kringla.webp" alt="Kringla" /></p>
              <p className="project-link"><a href="https://kringla.app" target="_blank" rel="noopener noreferrer">https://kringla.app</a>
                <br/><span className="builtwith">Built with React, Framer, Node.js, vanilla CSS, deployed on Vercel.</span></p>
            </>
          ),
          featureIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="feature-icon">
              <path fill="currentColor" d="M248,144a8,8,0,0,1-16,0,96.11,96.11,0,0,0-96-96,88.1,88.1,0,0,0-88,88,80.09,80.09,0,0,0,80,80,72.08,72.08,0,0,0,72-72,64.07,64.07,0,0,0-64-64,56.06,56.06,0,0,0-56,56,48.05,48.05,0,0,0,48,48,40,40,0,0,0,40-40,32,32,0,0,0-32-32,24,24,0,0,0-24,24,16,16,0,0,0,16,16,8,8,0,0,0,8-8,8,8,0,0,1,0-16,16,16,0,0,1,16,16,24,24,0,0,1-24,24,32,32,0,0,1-32-32,40,40,0,0,1,40-40,48.05,48.05,0,0,1,48,48,56.06,56.06,0,0,1-56,56,64.07,64.07,0,0,1-64-64,72.08,72.08,0,0,1,72-72,80.09,80.09,0,0,1,80,80,88.1,88.1,0,0,1-88,88,96.11,96.11,0,0,1-96-96A104.11,104.11,0,0,1,136,32,112.12,112.12,0,0,1,248,144Z"></path>
            </svg>
          )
        },
        {
          title: 'Looplet',
          summary: 'Spirographs on steroids...with blend modes',
          description: (
            <>
              <p className="valueprop"><b>VALUE PROP:</b> Spirograph drawings are geometrically complex, but require physical devices to create. What if we could create these drawings digitally, with the same kind of geometric controls and interactivity that the physical device provides?</p>
              <p className="problem">PROBLEM: Physical spirographs require a steady hand and leave little room for error. They also can't take advantage of modern drawing features like blend modes and transparency.</p>
              <p className="solution">SOLUTION: Looplet merges the best of both worlds: layering, blend modes, multiple levels of undo, and all the math-happy spiral looperific creativity you can handle.</p>
              <p className="product-image"><img src="/images/looplet.webp" alt="Looplet" /></p>
              <p className="project-link"><a href="https://looplet.app" target="_blank" rel="noopener noreferrer">https://looplet.app</a>
                <br/><span className="builtwith">Built with React, Node.js, vanilla CSS, deployed on Vercel.</span></p>
            </>
          ),
          featureIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="feature-icon">
              <path fill="currentColor" d="M253.93,154.63c-1.32-1.46-24.09-26.22-61-40.56-1.72-18.42-8.46-35.17-19.41-47.92C158.87,49,137.58,40,112,40,60.48,40,26.89,86.18,25.49,88.15a8,8,0,0,0,13,9.31C38.8,97.05,68.81,56,112,56c20.77,0,37.86,7.11,49.41,20.57,7.42,8.64,12.44,19.69,14.67,32A140.87,140.87,0,0,0,140.6,104c-26.06,0-47.93,6.81-63.26,19.69C63.78,135.09,56,151,56,167.25A47.59,47.59,0,0,0,69.87,201.3c9.66,9.62,23.06,14.7,38.73,14.7,51.81,0,81.18-42.13,84.49-84.42a161.43,161.43,0,0,1,49,33.79,8,8,0,1,0,11.86-10.74Zm-94.46,21.64C150.64,187.09,134.66,200,108.6,200,83.32,200,72,183.55,72,167.25,72,144.49,93.47,120,140.6,120a124.34,124.34,0,0,1,36.78,5.68C176.93,144.44,170.46,162.78,159.47,176.27Z"></path>
            </svg>
          )
        }
      ]
    }
  ]

  const handleClick = (index: number) => {
    // If opening a project, mark it as viewed
    if (openIndex !== index) {
      setViewedProjects(prev => new Set([...prev, index]))
    }
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="project-accordion">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <h2 className="section-title">{section.title}</h2>
          {section.items.map((project, index) => {
            const projectIndex = sectionIndex * 100 + index
            return (
              <AccordionItem
                key={index}
                item={project}
                isOpen={openIndex === projectIndex}
                isViewed={viewedProjects.has(projectIndex)}
                onClick={() => handleClick(projectIndex)}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default ProjectAccordion 