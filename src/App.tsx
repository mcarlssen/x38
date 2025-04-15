import { Code } from '@phosphor-icons/react'
import ProjectAccordion from './components/ProjectAccordion'
import TypeWriter from './components/TypeWriter'

function App() {
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
            <span className="header-title">Mike Thorn</span>
          </div>
        </div>
      </header>

      <main className="main container">
        <h1 className="title fade-in-up">
          Engineering <TypeWriter phrases={phrases} className="title-keyword-text" /><br/>
          <span className="title-highlight">for <span style={{ color: 'var(--color-customers)' }}>customers</span>, <span style={{ color: 'var(--color-teams)' }}>teams</span>, and <span style={{ color: 'var(--color-organizations)' }}>organizations</span>.</span>
        </h1>
        
        <p className="description fade-in-up delay-200">
          <span className="emphasis">My passion: empowering people to achieve their best,</span><br/>by providing the right <span style={{ color: 'var(--color-customers)' }}>resources</span>, <span style={{ color: 'var(--color-teams)' }}>tools</span>, and <span style={{ color: 'var(--color-organizations)' }}>processes</span> to succeed.
        </p>

        <ProjectAccordion />
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <section className="footer-section">
              <h2 className="footer-header">Get in touch</h2>
              <p className="email">m@x38.dev</p>
            </section>
            <section className="footer-section">
              <h2 className="footer-header">Follow</h2>
              <ul className="footer-icons">
                <li>
                  <a href="https://github.com/mcarlssen" className="icon-link">
                    <i className="ph-fill ph-github-logo"></i>
                    <span className="label">GitHub</span>
                  </a>
                </li>
                <li>
                  <a href="https://threads.net/magnuscarlssen" className="icon-link">
                    <i className="ph-fill ph-threads-logo"></i>
                    <span className="label">Threads</span>
                  </a>
                </li>
                <li>
                  <a href="https://magnuscarlssen.substack.com" className="icon-link">
                    <i className="ph-fill ph-bookmark"></i>
                    <span className="label">Substack</span>
                  </a>
                </li>
              </ul>
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
