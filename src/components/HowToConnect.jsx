import { useState } from 'react'
import { Download, FolderCheck, Server, Play, Copy, Check, ExternalLink, HardDrive, Cpu, ShieldCheck } from 'lucide-react'
import { FULL_SERVER_IP } from '../hooks/useServerStatus'
import { useScrollReveal } from '../hooks/useAnimations'
import { playClickSound, playSuccessSound } from '../utils/audio'

const steps = [
  {
    step: '01',
    icon: Download,
    title: 'Скачай сборку',
    desc: 'Загрузи готовый архив со сборкой NC-Create. Все необходимые моды, оптимизация и ресурспаки уже внутри архива.',
    action: 'Скачать архив',
    downloadLinks: [
      { name: 'Google Диск', url: '#' },
      { name: 'Яндекс.Диск', url: '#' },
      { name: 'Сборка в Discord', url: '#' },
    ],
  },
  {
    step: '02',
    icon: FolderCheck,
    title: 'Установи в лаунчер',
    desc: 'Распакуй архив в папку .minecraft или импортируй в Prism / TLauncher / CurseForge. Запусти версию 1.20.1 Forge.',
    badge: 'Forge 1.20.1',
    note: 'Выдели от 4 до 6 ГБ оперативной памяти',
  },
  {
    step: '03',
    icon: Server,
    title: 'Добавь сервер в список',
    desc: 'Зайди в раздел «Сетевая игра» → «По адресу» (Direct Connect) или «Добавить сервер» и вставь IP сервера.',
    badge: 'IP готов к вводу',
    isIpStep: true,
  },
  {
    step: '04',
    icon: Play,
    title: 'Заходи и играй!',
    desc: 'Подключайся к серверу, знакомься с игроками в чате, создавай свой первый приват и запускай водяные колеса!',
    badge: 'Вайтлист выключен',
    note: 'Помощь новичкам доступна 24/7',
  },
]

export default function HowToConnect({ onCopyIp, copied }) {
  const [headerRef, headerVisible] = useScrollReveal(0.1)
  const [stepsRef, stepsVisible] = useScrollReveal(0.05)
  const [activeTab, setActiveTab] = useState('guide')

  const handleCopy = () => {
    playSuccessSound()
    onCopyIp()
  }

  return (
    <section className="section connect-section" id="connect">
      <div className="container">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`section-header reveal ${headerVisible ? 'visible' : ''}`}
        >
          <div className="section-tag">
            <span>Быстрый старт</span>
          </div>
          <h2 className="section-title">
            Как начать играть на <span className="text-gradient">NC-CREATE</span>?
          </h2>
          <p className="section-desc">
            Всего 4 простых шага, и вы уже в мире поездов и паровых машин. 
            Справится даже новичок!
          </p>
        </div>

        {/* Steps Pipeline */}
        <div ref={stepsRef} className="steps-pipeline-grid">
          {steps.map((s, i) => {
            const StepIcon = s.icon
            return (
              <div
                key={i}
                className={`step-pipeline-card reveal ${stepsVisible ? 'visible' : ''} reveal-delay-${i + 1}`}
              >
                <div className="step-card-glow" />

                {/* Top Badge & Number */}
                <div className="step-card-top">
                  <span className="step-number-tag">{s.step}</span>
                  <div className="step-icon-wrapper">
                    <StepIcon size={24} />
                  </div>
                </div>

                <h3 className="step-title">{s.title}</h3>
                <p className="step-description">{s.desc}</p>

                {/* Step specific content */}
                {s.downloadLinks && (
                  <div className="step-download-buttons">
                    {s.downloadLinks.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        className="step-dl-btn"
                        onClick={(e) => {
                          e.preventDefault()
                          playClickSound()
                          alert(`Ссылка для скачивания (${link.name}) доступна в официальном Discord сервере!`)
                        }}
                      >
                        <Download size={13} />
                        <span>{link.name}</span>
                      </a>
                    ))}
                  </div>
                )}

                {s.note && (
                  <div className="step-hint-box">
                    <span>💡 {s.note}</span>
                  </div>
                )}

                {s.isIpStep && (
                  <div className="step-quick-copy" onClick={handleCopy}>
                    <div className="quick-ip-text">{FULL_SERVER_IP}</div>
                    <button className="quick-copy-button">
                      {copied ? <Check size={16} className="text-accent" /> : <Copy size={16} />}
                    </button>
                  </div>
                )}

                {s.badge && !s.isIpStep && (
                  <span className="step-badge-pill">{s.badge}</span>
                )}
              </div>
            )
          })}
        </div>

        {/* Interactive Full-Width IP Copy Banner */}
        <div className="connect-ip-banner">
          <div className="banner-left">
            <div className="banner-label">IP АДРЕС СЕРВЕРА (JAVA EDITION)</div>
            <div className="banner-ip-string">{FULL_SERVER_IP}</div>
            <div className="banner-subtext">Версия 1.20.1 Forge • Поддерживает любые лаунчеры</div>
          </div>

          <button
            className={`btn btn-primary banner-copy-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check size={18} />
                <span>IP Скопирован!</span>
              </>
            ) : (
              <>
                <Copy size={18} />
                <span>Скопировать IP адрес</span>
              </>
            )}
          </button>
        </div>

        {/* System Requirements Accordion Card */}
        <div className="system-req-card">
          <div className="system-req-header">
            <Cpu size={20} className="text-accent" />
            <h4>Системные требования для комфортной игры</h4>
          </div>

          <div className="system-req-grid">
            <div className="req-item">
              <span className="req-title">Оперативная память (RAM)</span>
              <span className="req-val text-accent">4 – 6 ГБ</span>
              <span className="req-desc">Выделите в настройках лаунчера</span>
            </div>

            <div className="req-item">
              <span className="req-title">Версия Java</span>
              <span className="req-val text-gold">Java 17 или 21</span>
              <span className="req-desc">64-битная версия</span>
            </div>

            <div className="req-item">
              <span className="req-title">Видеокарта (GPU)</span>
              <span className="req-val text-purple">OpenGL 4.5+</span>
              <span className="req-desc">Nvidia / AMD / Встроенная Intel</span>
            </div>

            <div className="req-item">
              <span className="req-title">Свободное место</span>
              <span className="req-val">~2 ГБ на диске</span>
              <span className="req-desc">Для модов и текстур</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
