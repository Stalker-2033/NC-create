import { useState, useEffect } from 'react'
import { Copy, Check, Menu, X, Disc as Discord, Wifi, ChevronRight } from 'lucide-react'
import { FULL_SERVER_IP } from '../hooks/useServerStatus'
import { playClickSound, playSuccessSound } from '../utils/audio'

export default function Navbar({ scrolled, onCopyIp, copied }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'mechanics', 'about', 'connect', 'status', 'rules', 'faq']
      const scrollPos = window.scrollY + 200

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (sectionId) => {
    playClickSound()
    setMenuOpen(false)
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleCopy = () => {
    playSuccessSound()
    onCopyIp()
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        {/* Brand Logo with animated Kinetic Gear */}
        <a href="#home" className="navbar-logo" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
          <div className="logo-gear-box">
            <svg className="logo-gear-svg" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="5 3" />
              <circle cx="20" cy="20" r="6" fill="currentColor" opacity="0.8" />
            </svg>
            <span className="logo-text-inner">NC</span>
          </div>
          <div className="logo-text-group">
            <span className="logo-title">NC-CREATE</span>
            <span className="logo-sub">MINECRAFT 1.20.1</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="navbar-links desktop-links">
          <li>
            <button
              className={`nav-link ${activeSection === 'features' ? 'active' : ''}`}
              onClick={() => handleNavClick('features')}
            >
              Особенности
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${activeSection === 'mechanics' ? 'active' : ''}`}
              onClick={() => handleNavClick('mechanics')}
            >
              Механики
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => handleNavClick('about')}
            >
              О сервере
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${activeSection === 'connect' ? 'active' : ''}`}
              onClick={() => handleNavClick('connect')}
            >
              Подключение
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${activeSection === 'status' ? 'active' : ''}`}
              onClick={() => handleNavClick('status')}
            >
              Статус
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${activeSection === 'rules' ? 'active' : ''}`}
              onClick={() => handleNavClick('rules')}
            >
              Правила
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${activeSection === 'faq' ? 'active' : ''}`}
              onClick={() => handleNavClick('faq')}
            >
              FAQ
            </button>
          </li>
        </ul>

        {/* Action Controls: IP quick-copy & CTA */}
        <div className="navbar-actions">
          <button
            className={`navbar-ip-pill ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
            title="Нажмите, чтобы скопировать IP"
          >
            <span className="pill-dot" />
            <span className="pill-ip">{FULL_SERVER_IP}</span>
            {copied ? (
              <Check size={14} className="pill-icon check-icon" />
            ) : (
              <Copy size={14} className="pill-icon copy-icon" />
            )}
          </button>

          <button
            className="navbar-play-btn"
            onClick={() => handleNavClick('connect')}
          >
            <span>Играть</span>
            <ChevronRight size={15} />
          </button>

          <button
            className="mobile-toggle"
            onClick={() => {
              playClickSound()
              setMenuOpen(!menuOpen)
            }}
            aria-label="Меню"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-content">
          <button className="mobile-nav-link" onClick={() => handleNavClick('features')}>
            <span>✦ Особенности сборки</span>
            <ChevronRight size={16} />
          </button>
          <button className="mobile-nav-link" onClick={() => handleNavClick('mechanics')}>
            <span>⚙️ Механики Create</span>
            <ChevronRight size={16} />
          </button>
          <button className="mobile-nav-link" onClick={() => handleNavClick('about')}>
            <span>🏰 О сервере</span>
            <ChevronRight size={16} />
          </button>
          <button className="mobile-nav-link" onClick={() => handleNavClick('connect')}>
            <span>🚀 Как подключиться</span>
            <ChevronRight size={16} />
          </button>
          <button className="mobile-nav-link" onClick={() => handleNavClick('status')}>
            <span>📊 Статус и онлайн</span>
            <ChevronRight size={16} />
          </button>
          <button className="mobile-nav-link" onClick={() => handleNavClick('rules')}>
            <span>📜 Правила сервера</span>
            <ChevronRight size={16} />
          </button>
          <button className="mobile-nav-link" onClick={() => handleNavClick('faq')}>
            <span>❓ Часто задаваемые вопросы</span>
            <ChevronRight size={16} />
          </button>

          <div className="mobile-nav-footer">
            <button className={`mobile-copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
              {copied ? <Check size={18} /> : <Copy size={18} />}
              <span>{copied ? 'IP Скопирован!' : FULL_SERVER_IP}</span>
            </button>
            <button className="btn btn-primary w-full" onClick={() => handleNavClick('connect')}>
              Начать играть прямо сейчас
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
