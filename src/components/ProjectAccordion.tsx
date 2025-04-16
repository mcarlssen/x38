import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlusSquare, CheckCircle, ListPlus } from '@phosphor-icons/react'
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
                  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${item.featureIcon.props.viewBox}"><path fill="white" d="${item.featureIcon.props.children.props.d}"/></svg>`
                )}")`,
                maskImage: `url("data:image/svg+xml,${encodeURIComponent(
                  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${item.featureIcon.props.viewBox}"><path fill="white" d="${item.featureIcon.props.children.props.d}"/></svg>`
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
              <p>Reduces burned takes, wasted time & effort, and keeps actors happy. Built with React Native and Node.js, this app monitors local air traffic and provides real-time notifications to film crews.</p>
              <p><a href="https://heimeyra.app" target="_blank" rel="noopener noreferrer">https://heimeyra.app</a></p>
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
            <p>Identifies changes between files, reducing human error and saving sanity! This tool helps audio engineers track changes in their project files and collaborate more effectively.</p>
            <p><a href="https://reaperdiff.com" target="_blank" rel="noopener noreferrer">https://reaperdiff.com</a></p>
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
            <p>Features relatable, understandable weather descriptions. Built with React and OpenWeather API, this app makes weather forecasts fun and accessible for children.</p>
            <p><a href="https://8bitweather.app" target="_blank" rel="noopener noreferrer">https://8bitweather.app</a></p>
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
          title: 'Whisper Transcription',
          summary: 'A terminal utility that wraps OpenAI\'s transcription engine.',
          description: (
            <>
              <p>Fast, easy, and free transcription on any PC.</p>
              <p><a href="https://github.com/mcarlssen/code" target="_blank" rel="noopener noreferrer">https://github.com/mcarlssen/code</a></p>
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
              <p>Enabling 10x faster label printing.</p>
              <p><a href="https://github.com/mcarlssen/code" target="_blank" rel="noopener noreferrer">https://github.com/mcarlssen/code</a></p>
            </>
          ),
          featureIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="feature-icon">
              <path fill="currentColor" d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l224 0 0-112c0-26.5 21.5-48 48-48l112 0 0-224c0-35.3-28.7-64-64-64L64 32zM448 352l-45.3 0L336 352c-8.8 0-16 7.2-16 16l0 66.7 0 45.3 32-32 64-64 32-32z"/>
            </svg>
          )
        },
        {
          title: 'SSRS CSV Subscription Importer',
          summary: 'Create report subscriptions in bulk from a CSV file.',
          description: (
            <>
              <p>The only free CSV import tool for SSRS in existence.</p>
              <p><a href="https://github.com/mcarlssen/code" target="_blank" rel="noopener noreferrer">https://github.com/mcarlssen/code</a></p>
            </>
          ),
          featureIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="feature-icon">
              <path fill="currentColor" d="M224 128a8 8 0 0 1-8 8h-80a8 8 0 0 1 0-16h80a8 8 0 0 1 8 8ZM136 168h80a8 8 0 0 0 0-16h-80a8 8 0 0 0 0 16Zm80-80h-80a8 8 0 0 0 0 16h80a8 8 0 0 0 0-16ZM96 140H48v-24h48a12 12 0 0 0 0-24H48V68a12 12 0 0 0-24 0v24H12a12 12 0 0 0 0 24h12v24H12a12 12 0 0 0 0 24h36v24a12 12 0 0 0 24 0v-24h24a12 12 0 0 0 0-24Z"/>
            </svg>
          )
        },
        {
          title: 'Blink(1) Busy Light',
          summary: 'Control a Blink(1) LED device via AutoHotKey as a busy light.',
          description: (
            <>
              <p>Reduces walk-in interruptions.</p>
              <p><a href="https://github.com/mcarlssen/code" target="_blank" rel="noopener noreferrer">https://github.com/mcarlssen/code</a></p>
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
          title: 'Deployment Streamlining',
          summary: 'Rewriting a core provisioning process yielded a 75% shorter cycle time.',
          description: (
            <>
              <p>By analyzing and rewriting a core provisioning process, I achieved an 80% reduction in manual touches and cut the cycle time by three quarters.</p>
            </>
          ),
          featureIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="feature-icon">
              <path fill="currentColor" d="M176 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l16 0 0 34.4C92.3 113.8 16 200 16 304c0 114.9 93.1 208 208 208s208-93.1 208-208c0-41.8-12.3-80.7-33.5-113.2l24.1-24.1c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L355.7 143c-28.1-23-62.2-38.8-99.7-44.6L256 64l16 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L224 0 176 0zm72 192l0 128c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-128c0-13.3 10.7-24 24-24s24 10.7 24 24z"/>
            </svg>
          )
        },
        {
          title: 'Efficiency Analysis',
          summary: 'Implemented comprehensive metrics-gathering and identified ways to reduce work by 44%.',
          description: (
            <>
              <p>Through careful analysis of workflow patterns and bottlenecks, I identified seven key areas where process improvements could significantly reduce workload.</p>
            </>
          ),
          featureIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="feature-icon">
              <path fill="currentColor" d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48H0l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"/>
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