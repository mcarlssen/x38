import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CaretDown } from '@phosphor-icons/react'

interface ProjectItem {
  title: string
  summary: string
  description: string
  icon?: React.ReactNode
}

interface AccordionItemProps {
  item: ProjectItem
  isOpen: boolean
  onClick: () => void
}

const AccordionItem = ({ item, isOpen, onClick }: AccordionItemProps) => {
  return (
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
        </div>
      </div>
      
      <div className="project-summary">
        {item.summary}
      </div>

      <motion.div
        className="project-caret"
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <CaretDown size={20} />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="project-description"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {item.description}
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

  const sections: ProjectSection[] = [
    {
      title: "Building better mousetraps:",
      items: [
        {
          title: 'Heimeyra',
          summary: 'An early-warning app for noisy aircraft.',
          description: 'Reduces burned takes, wasted time & effort, and keeps actors happy. Built with React Native and Node.js, this app monitors local air traffic and provides real-time notifications to film crews.',
        },
        {
          title: 'ReaperDiff',
          summary: 'A project-file diff tool for Reaper DAW.',
          description: 'Identifies changes between files, reducing human error and saving sanity! This tool helps audio engineers track changes in their project files and collaborate more effectively.',
        },
        {
          title: '8-Bit Weather',
          summary: 'A kid-friendly 12-hour forecast.',
          description: 'Features relatable, understandable weather descriptions. Built with React and OpenWeather API, this app makes weather forecasts fun and accessible for children.',
        },
      ]
    },
    {
      title: "Codified force multipliers:",
      items: [
        {
          title: 'Whisper Transcription',
          summary: 'A terminal utility that wraps OpenAI\'s transcription engine.',
          description: 'Fast, easy, and free transcription on any PC.',
        },
        {
          title: 'P-Touch Batch Label Utility',
          summary: 'Batch-print labels via a simple terminal script.',
          description: 'Enabling 10x faster label printing.',
        },
        {
          title: 'SSRS CSV Subscription Importer',
          summary: 'Create report subscriptions in bulk from a CSV file.',
          description: 'The only free CSV import tool for SSRS in existence.',
        },
        {
          title: 'Blink(1) Busy Light',
          summary: 'Control a Blink(1) LED device via AutoHotKey as a busy light.',
          description: 'Reduces walk-in interruptions.',
        }
      ]
    },
    {
      title: "Improving processes, saving time & money:",
      items: [
        {
          title: 'Deployment Streamlining',
          summary: 'Rewriting a core provisioning process yielded a 75% shorter cycle time.',
          description: 'By analyzing and rewriting a core provisioning process, I achieved an 80% reduction in manual touches and cut the cycle time by three quarters.',
        },
        {
          title: 'Efficiency Analysis',
          summary: 'Implemented comprehensive metrics-gathering and identified ways to reduce work by 44%.',
          description: 'Through careful analysis of workflow patterns and bottlenecks, I identified seven key areas where process improvements could significantly reduce workload.',
        },
      ]
    }
  ]

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="project-accordion">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <h2 className="section-title">{section.title}</h2>
          {section.items.map((project, index) => (
            <AccordionItem
              key={index}
              item={project}
              isOpen={openIndex === (sectionIndex * 100 + index)}
              onClick={() => handleClick(sectionIndex * 100 + index)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default ProjectAccordion 