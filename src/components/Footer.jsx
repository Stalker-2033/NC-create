import { ArrowUp, Copy, Check, Heart, Shield, Terminal } from 'lucide-react'
import { FULL_SERVER_IP } from '../hooks/useServerStatus'
import { playClickSound, playSuccessSound } from '../utils/audio'

export default function Footer({ onCopyIp, copied }) {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    playClickSound()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCopy = () => {
    playSuccessSound()
    onCopyIp()
  }

  return (
    <footer className="footer">
      <div className="footer-top-accent-line" />

      <div className="container">
        <div className="footer-main-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div className="footer-logo">
              <div className="footer-logo-box">
                <svg className="footer-gear-svg spin-cw" viewBox="0 0 32 32">
                  <circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 2.5" />
                  <circle cx="16" cy="16" r="4" fill="currentColor" />
                </svg>
                <span>NC</span>
              </div>
              <span className="footer-brand-name">NC-CREATE</span>
            </div>

            <p className="footer-bio">
              Индустриальный Minecraft сервер нового поколения на базе мода Create 0.5.1. 
              Кинетическая энергия, поезда, развитая экономика и надежный мир без вайпов.
            </p>

            {/* Quick Copy Box */}
            <div className={`footer-quick-ip ${copied ? 'copied' : ''}`} onClick={handleCopy}>
              <div className="ip-text-wrap">
                <span className="footer-ip-label">Адрес сервера</span>
                <span className="footer-ip-value">{FULL_SERVER_IP}</span>
              </div>
              <button className="footer-copy-icon">
                {copied ? <Check size={16} className="text-accent" /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Навигация</h4>
            <ul className="footer-nav-list">
              <li><a href="#home" onClick={playClickSound}>Главная страница</a></li>
              <li><a href="#features" onClick={playClickSound}>Особенности сборки</a></li>
              <li><a href="#about" onClick={playClickSound}>Механики Create</a></li>
              <li><a href="#connect" onClick={playClickSound}>Инструкция подключения</a></li>
              <li><a href="#status" onClick={playClickSound}>Мониторинг онлайна</a></li>
              <li><a href="#rules" onClick={playClickSound}>Правила проекта</a></li>
              <li><a href="#faq" onClick={playClickSound}>Частые вопросы (FAQ)</a></li>
            </ul>
          </div>

          {/* Useful & Downloads */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Ресурсы</h4>
            <ul className="footer-nav-list">
              <li><a href="#connect" onClick={playClickSound}>Скачать сборку (Google)</a></li>
              <li><a href="#connect" onClick={playClickSound}>Скачать сборку (Яндекс)</a></li>
              <li><a href="https://discord.com" target="_blank" rel="noreferrer">Канал с чертежами Schematics</a></li>
              <li><a href="https://discord.com" target="_blank" rel="noreferrer">Голосовые каналы Discord</a></li>
              <li><a href="#rules" onClick={playClickSound}>Служба поддержки и тикеты</a></li>
            </ul>
          </div>

          {/* Socials & Community */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Сообщество</h4>
            <p className="footer-community-text">
              Подписывайся на наши соцсети, чтобы не пропускать новости, анонсы ивентов и розыгрыши:
            </p>
            <div className="footer-social-icons">
              <a href="https://discord.com" target="_blank" rel="noreferrer" title="Discord" className="social-icon-box discord">
                💬
              </a>
              <a href="https://t.me" target="_blank" rel="noreferrer" title="Telegram" className="social-icon-box telegram">
                ✈️
              </a>
              <a href="https://vk.com" target="_blank" rel="noreferrer" title="VK" className="social-icon-box vk">
                🔵
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" title="YouTube" className="social-icon-box youtube">
                🔴
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-row">
          <div className="footer-bottom-left">
            <p>© {currentYear} NC-Create. Все права защищены.</p>
            <p className="footer-disclaimer">
              Не является официальным продуктом Minecraft. Не утверждено и не связано с Mojang или Microsoft.
            </p>
          </div>

          <button className="footer-back-to-top" onClick={scrollToTop} title="Наверх">
            <span>Наверх</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}
