import { Code, FilePdf, FileText, ArrowLeft } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { Analytics } from "@vercel/analytics/react"
import './Resume.css'

function Resume() {
  return (
    <div className="min-h-screen">
      <header className="header">
        <div className="container">
          <div className="header-content fade-in-down">
            <Code size={30} weight="fill" className="header-icon" />
            <Link to="/" className="header-title" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
              Mike Thorn
            </Link>
          </div>
        </div>
      </header>

      <main className="main container">
        <div className="resume-nav fade-in-up">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} weight="bold" />
            <span>Back to Portfolio</span>
          </Link>
          <div className="resume-download-links">
            <a href="/resume.md" className="download-link" download>
              <FileText size={20} weight="fill" />
              <span>Download MD</span>
            </a>
            <a href="/Mike-Thorn-Resume.pdf" className="download-link" target="_blank" rel="noopener noreferrer">
              <FilePdf size={20} weight="fill" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        <article className="resume-content fade-in-up delay-200">
          <header className="resume-header">
            <h1>Mike Thorn</h1>
            <p className="resume-title-role">Technical Support Lead / Product Manager</p>
            <div className="resume-contact">
              <span>📧 m@x38.dev</span>
              <span>📱 330-428-0466</span>
              <span>🔗 <a href="https://linkedin.com/in/mikethorn" target="_blank" rel="noopener noreferrer">in/mikethorn</a></span>
            </div>
            <p className="resume-location">📍 Ohio, USA (GMT-5) | Remote/Hybrid | Permanent or Contract</p>
          </header>

          <section className="resume-section">
            <h2>Summary</h2>
            <p>
              Support-centered systems generalist with 6+ years of SaaS and IT experience, including ownership of high-stakes operational and product work. Known for strong user empathy and end-to-end ownership: translating customer pain into durable solutions that reduce friction, error, and support load at scale. I excel in ambiguous, escalation-heavy, cross-functional environments, shaping product, process, and tooling.
            </p>
          </section>

          <section className="resume-section">
            <h2>Generalist Impact (Support-Led)</h2>
            <ul>
              <li>Turned frontline user pain into tools, automation, and product changes that removed entire ticket groups.</li>
              <li>Replaced fragile, manual workflows with systems designed for scale, accuracy, and low cognitive load.</li>
              <li>Aligned Support, Product, and Engineering efforts to unblock customers and teams.</li>
              <li>Consistently reduced human error and operational drag through thoughtful process and system design.</li>
            </ul>
          </section>

          <section className="resume-section">
            <h2>Key Experience</h2>
            
            <div className="experience-block">
              <h3 className="job-title">Tech Support Lead</h3>
              <p className="job-meta">TimeKeeping Systems | Ohio | April 2024 - Present | Onsite</p>
              <p className="resume-scope"><em>Primary scope is technical support leadership, with formal Product Manager ownership.</em></p>
              <ul>
                <li>Delivered <strong>+58% above team average</strong> in ticket KPIs, earning <strong>4.7/5-star CSAT</strong> across 46% of closed tickets, while owning escalations for complex, high-impact customer issues.</li>
                <li>Became trusted customer advocate for internal teams and high-value customer contacts, translating real-world usage friction into actionable fixes.</li>
                <li>Identified legacy, high-friction workflows across support and operations; designed and shipped internal utility apps reducing team labor <strong>60%+</strong> when complete.</li>
                <li>Built web integrations against legacy data sources to reduce manual data entry and error rates.</li>
                <li>Acted as product owner for a new customer-facing web portal: user discovery, requirements, user stories, acceptance criteria, and internal rollout.
                  <ul>
                    <li><em>When complete, portal will eliminate <strong>15%+</strong> of total ticket volume across multiple teams.</em></li>
                  </ul>
                </li>
                <li>Implemented analytics to forecast workload, staffing needs, and support risk as the company scaled.</li>
              </ul>
              <p className="environment"><strong>ENVIRONMENT:</strong> SQL, PowerShell, Python, Azure, Zendesk, MDM, Office 365, Google Sheets, AI+ML</p>
            </div>

            <div className="experience-block">
              <h3 className="job-title">IT Support Tech II</h3>
              <p className="job-meta">Renovo Solutions | Ohio | June 2020 - June 2022 | Onsite</p>
              <ul>
                <li>Solo-supported <strong>380+ field engineers and executives</strong>, handling ~30 requests per day across phone and email, while maintaining strong KPI performance during 40% userbase growth.</li>
                <li>Embedded deeply with QA and Dev throughout the SDLC, enabling rapid resolution of production bugs and user training gaps.</li>
                <li>Identified brittle, high-touch scripted process; owned end-to-end redesign and deployment within 3 months, reducing cycle time by <strong>~65%</strong> and enabling 60-minute hardware provisioning instead of 48 hours.</li>
                <li>Initiated in-house hardware repair capability, reducing annual PC replacement spend by <strong>10%</strong>.</li>
                <li>Rapidly learned and operated a complex bespoke endpoint management system, demonstrating strong adaptability and technical depth.</li>
              </ul>
              <p className="environment"><strong>ENVIRONMENT:</strong> Google Workspace, GAM, Jamf, Chef, Sentry, Ruby, Linux</p>
            </div>

            <div className="experience-block">
              <h3 className="job-title">IT Support Tech</h3>
              <p className="job-meta">Logivision Technologies | Ohio | May 2017 - June 2020 | Onsite</p>
              <ul>
                <li>Served as trusted client advocate, resolving dissatisfaction, improving retention, and reducing long-term support friction.</li>
                <li>Cut issue research time by <strong>~50%</strong> and reduced documentation sprawl <strong>66%</strong>, by consolidating knowledge systems and defining best practices.</li>
                <li>Supported full network stack: endpoint, hardware, firewalls, DNS/DHCP, virtualization, and identity.</li>
                <li>Authored comprehensive troubleshooting and best-practices documentation for internal teams.</li>
                <li>Collaborated daily with vendors to achieve timely, accurate resolutions for client issues.</li>
              </ul>
              <p className="environment"><strong>ENVIRONMENT:</strong> Active Directory, Hyper-V, VMware, Sophos, Office 365, Autotask, UniFi / Ubiquiti</p>
            </div>
          </section>

          <section className="resume-section">
            <h2>Personal Projects – Problem-Driven Systems</h2>
            <p>Independent projects focused on identifying concrete pain points and shipping usable solutions. Hands-on work with 3rd-party APIs, AI-assisted tooling, UI/UX, source control, tech writing, and documentation.</p>
            <ul className="project-list">
              <li><a href="https://x38.dev" target="_blank" rel="noopener noreferrer"><strong>x38.dev</strong></a> – Personal portfolio <em>(React, CSS, Vercel)</em></li>
              <li><a href="https://heimeyra.app" target="_blank" rel="noopener noreferrer"><strong>heimeyra.app</strong></a> – Aircraft proximity alerting for audio work <em>(TypeScript, React, CSS, REST API)</em></li>
              <li><a href="https://reaperdiff.app" target="_blank" rel="noopener noreferrer"><strong>reaperdiff.app</strong></a> – Audio project timeline change detection</li>
              <li><a href="https://looplet.app" target="_blank" rel="noopener noreferrer"><strong>looplet.app</strong></a> – Spirograph simulator <em>(TypeScript, React, CSS)</em></li>
              <li><a href="https://8bitweather.app" target="_blank" rel="noopener noreferrer"><strong>8bitweather.app</strong></a> – Kid-friendly weather forecasting</li>
              <li><strong>check-id3</strong> – MP3 metadata verification <em>(Python, PowerShell, Regex)</em></li>
              <li><strong>Local speech-to-text pipeline</strong> – Fast offline transcription <em>(PowerShell, whisper.cpp)</em></li>
            </ul>
          </section>

          <section className="resume-section">
            <h2>Additional Experience</h2>
            
            <div className="experience-block">
              <h3 className="job-title">Audio Producer</h3>
              <p className="job-meta">Freelance | USA | October 2019 - Present | Remote</p>
              <ul>
                <li>Produced <strong>28 titles / 500+ hours</strong> of narration, reaching <strong>8M+ listeners</strong>.</li>
                <li>Built custom production tooling and dashboards to reduce error, improve scheduling accuracy, and surface anomalies.</li>
                <li>Designed a client-centric production pipeline emphasizing clarity, expectation-setting, and quality, earning consistent 5-star ratings.</li>
              </ul>
              <p className="environment"><strong>ENVIRONMENT:</strong> GitHub, TypeScript, CSS, React, Apps Script</p>
            </div>

            <div className="experience-block">
              <h3 className="job-title">Producer (Assistant Director)</h3>
              <p className="job-meta">Freelance | USA | April 2015 - May 2017</p>
              <ul>
                <li>Managed teams of up to <strong>20</strong> on complex, multi-day productions, with minute-level scheduling precision.</li>
                <li>Led migration from paper workflows to SaaS tooling, improving visibility, revision control, and approvals.</li>
                <li>Owned risk analysis, contingency planning, and cross-functional coordination to deliver <strong>100% on-time, on-budget execution</strong>.</li>
              </ul>
            </div>
          </section>
        </article>
      </main>

      <footer className="resume-footer">
        <div className="container">
          <div className="footer-copyright">
            <p>&copy; Mike Thorn. All rights reserved</p>
          </div>
        </div>
      </footer>
      <Analytics/>
    </div>
  )
}

export default Resume
