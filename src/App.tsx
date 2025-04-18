import { Code, FilePdf, GithubLogo, ThreadsLogo, Bookmark, LinkedinLogo } from '@phosphor-icons/react'
import ProjectAccordion from './components/ProjectAccordion'
import TypeWriter from './components/TypeWriter'
import { useRef } from 'react'

function App() {
  const footerRef = useRef<HTMLDivElement>(null)

  const handleNameClick = () => {
    // Scroll to footer
    footerRef.current?.scrollIntoView({ behavior: 'smooth' })

    // Add flash animation class
    if (footerRef.current) {
      footerRef.current.classList.remove('footer-flash')
      // Force a reflow to restart the animation
      void footerRef.current.offsetWidth
      footerRef.current.classList.add('footer-flash')
    }
  }

  const phrases = [
    "quality of life",
    "technical support",
    "data analysis",
    "project management",
    "process improvement"
  ];

  return (
    <div className="min-h-screen">
      <header className="header">
        <div className="container">
          <div className="header-content fade-in-down">
            <Code size={30} weight="fill" className="header-icon" />
            <span className="header-title" onClick={handleNameClick} style={{ cursor: 'pointer' }}>
              Mike Thorn
            </span>
          </div>
        </div>
      </header>

      <main className="main container">
        <h1 className="title fade-in-up">
          Engineering <TypeWriter phrases={phrases} className="title-keyword-text" /><br/>
          for <span style={{ color: 'var(--color-customers)' }}>customers</span>, <span style={{ color: 'var(--color-teams)' }}>teams</span>, and <span style={{ color: 'var(--color-organizations)' }}>organizations</span>.
        </h1>
        
        <p className="description fade-in-up delay-200">
          <span className="emphasis">My passion: empowering people to achieve their best,</span><br/>by providing the right <span style={{ color: 'var(--color-customers)' }}>resources</span>, <span style={{ color: 'var(--color-teams)' }}>tools</span>, and <span style={{ color: 'var(--color-organizations)' }}>processes</span> to succeed.
        </p>

        <ProjectAccordion />
      </main>

      <footer id="footer" >
        <div className="container" >
          <div className="footer-content footer" ref={footerRef}>
            <section className="footer-section">
              <h2 className="footer-header">GET IN TOUCH</h2>
              <p className="email">m@x38.dev</p>
            </section>
            <section className="footer-section">
              <h2 className="footer-header">PEEK MY SOCIALS</h2>
              <ul className="footer-icons">
                <li>
                  <a href="https://github.com/mcarlssen" className="icon-link">
                    <GithubLogo size={24} weight="fill" />
                    <span className="label">GitHub</span>
                  </a>
                </li>
                <li>
                  <a href="https://threads.net/magnuscarlssen" className="icon-link">
                    <ThreadsLogo size={24} weight="fill" />
                    <span className="label">Threads</span>
                  </a>
                </li>
                <li>
                  <a href="https://magnuscarlssen.substack.com" className="icon-link">
                    <Bookmark size={24} weight="fill" />
                    <span className="label">Substack</span>
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com/in/mikethorn" className="icon-link">
                    <LinkedinLogo size={24} weight="fill" />
                    <span className="label">LinkedIn</span>
                  </a>
                </li>
              </ul>
            </section>
            <section className="footer-section">
              <h2 className="footer-header">VIEW RESUME</h2>
              <a href="Mike-Thorn-Resume-2025-04.pdf" className="icon-link resume-link" target="_blank" rel="noopener noreferrer">
                <FilePdf size={24} weight="fill" />
                <span className="email">pdf</span>
              </a>
            </section>
          </div>
          <div className="footer-copyright">
            <p>&copy; Mike Thorn. All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
