import { useState } from 'react'
import { Cog, Train, ShieldCheck, CheckCircle2, Flame, Compass, Wrench, Sparkles } from 'lucide-react'
import { useScrollReveal } from '../hooks/useAnimations'
import { playClickSound } from '../utils/audio'

const showcaseTabs = [
  {
    id: 'kinetic',
    title: 'Кинетическая Энергия',
    icon: Cog,
    heading: 'Механика вращения и стресса (SU)',
    lead: 'На сервере NC-CREATE физика механизмов раскрывается на 100%. Вы строите не просто постройки, а живые работающие заводы.',
    points: [
      'Генерация энергии: водяные мельницы, ветряки и высокотемпературные паровые котлы',
      'Коробки передач, цепные приводы и валы для гибкой разводки энергии по фабрике',
      'Полная цепочка переработки: механические дробители, веерная промывка и прессы',
      'Автоматические сортировщики с латунными воронками и умными фильтрами',
    ],
    badge: 'Основной двигатель',
    metric1: '512 RPM',
    metric1Label: 'Макс. скорость валов',
    metric2: '65,536 SU',
    metric2Label: 'Мощность парового котла L9',
  },
  {
    id: 'trains',
    title: 'Поезда и Логистика',
    icon: Train,
    heading: 'Железнодорожные сети любого масштаба',
    lead: 'Мод Create превращает обычные рельсы Minecraft в настоящую транспортную империю с гибкими кривыми и стрелочными переводами.',
    points: [
      'Сборка вагонов из любых декоративных блоков — от ретро-паровозов до футуристичных экспрессов',
      'Автоматическое движение по расписанию с контролем семафоров и станций',
      'Транспортировка жидкостей в цистернах и сыпучих грузов в товарных вагонах',
      'Межгородские магистрали, связывающие поселения разных игроков',
    ],
    badge: 'Steam and Rails',
    metric1: '140 км/ч',
    metric1Label: 'Скорость состава',
    metric2: '∞ Путей',
    metric2Label: 'Единая сеть сервера',
  },
  {
    id: 'community',
    title: 'Защита и Приваты',
    icon: ShieldCheck,
    heading: 'Твой труд под надежной защитой',
    lead: 'Мы позаботились о том, чтобы сложные фабрики и механизмы никогда не пострадали от рук злоумышленников.',
    points: [
      'Удобная система приватов территории без сложных команд',
      'Полная защита механизмов, инвентарей и поездов от несанкционированного доступа',
      'Журнал действий CoreProtect — администрация может откатить любое случайное повреждение',
      'Дружное сообщество в Discord с голосовыми каналами и обменом чертежами Schematics',
    ],
    badge: '100% Защита',
    metric1: '24 / 7',
    metric1Label: 'Поддержка модерации',
    metric2: 'CoreProtect',
    metric2Label: 'Логирование всех действий',
  },
]

export default function About() {
  const [activeTab, setActiveTab] = useState('kinetic')
  const [ref, isVisible] = useScrollReveal(0.1)

  const currentShowcase = showcaseTabs.find(t => t.id === activeTab) || showcaseTabs[0]

  const handleTabChange = (id) => {
    playClickSound()
    setActiveTab(id)
  }

  return (
    <section className="section about-section" id="about">
      <div className="container">
        {/* Section Header */}
        <div className={`section-header reveal ${isVisible ? 'visible' : ''}`}>
          <div className="section-tag">
            <Sparkles size={12} className="tag-sparkle" />
            <span>О проекте</span>
          </div>
          <h2 className="section-title">
            Индустрия нового поколения на <span className="text-gradient">NC-CREATE</span>
          </h2>
          <p className="section-desc">
            Сервер, созданный фанатами инженерии для тех, кому надоел стандартный ванильный геймплей.
          </p>
        </div>

        {/* Tab Buttons Bar */}
        <div className="showcase-tabs-bar reveal visible">
          {showcaseTabs.map(tab => {
            const TabIcon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                className={`showcase-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleTabChange(tab.id)}
              >
                <TabIcon size={18} className="tab-icon" />
                <span>{tab.title}</span>
                {isActive && <span className="tab-active-glow" />}
              </button>
            )
          })}
        </div>

        {/* Tab Content Showcase Panel */}
        <div ref={ref} className={`about-showcase-panel reveal ${isVisible ? 'visible' : ''}`}>
          <div className="showcase-text-col">
            <div className="showcase-badge-row">
              <span className="showcase-badge">{currentShowcase.badge}</span>
            </div>

            <h3 className="showcase-heading">{currentShowcase.heading}</h3>
            <p className="showcase-lead">{currentShowcase.lead}</p>

            <div className="showcase-points-list">
              {currentShowcase.points.map((point, idx) => (
                <div key={idx} className="showcase-point-item">
                  <div className="point-check-icon">
                    <CheckCircle2 size={16} />
                  </div>
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* Metrics */}
            <div className="showcase-metrics-row">
              <div className="metric-box">
                <span className="metric-number text-accent">{currentShowcase.metric1}</span>
                <span className="metric-label">{currentShowcase.metric1Label}</span>
              </div>
              <div className="metric-divider" />
              <div className="metric-box">
                <span className="metric-number text-gold">{currentShowcase.metric2}</span>
                <span className="metric-label">{currentShowcase.metric2Label}</span>
              </div>
            </div>
          </div>

          {/* Graphic Showcase Card */}
          <div className="showcase-visual-col">
            <div className="visual-display-frame">
              <div className="visual-top-bar">
                <div className="terminal-dots">
                  <span className="dot-red" />
                  <span className="dot-yellow" />
                  <span className="dot-green" />
                </div>
                <span className="terminal-title">schematic_analyzer.dat</span>
                <span className="terminal-badge">LIVE PREVIEW</span>
              </div>

              {/* Graphic Stage */}
              <div className="visual-stage-content">
                {activeTab === 'kinetic' && (
                  <div className="visual-kinetic-stage">
                    <div className="kinetic-isometric-cog">
                      <div className="big-cog spin-cw">
                        <Cog size={110} />
                      </div>
                      <div className="small-cog spin-ccw">
                        <Cog size={64} />
                      </div>
                    </div>
                    <div className="stage-overlay-labels">
                      <div className="stage-label-tag">
                        <span>Сцепление: 100%</span>
                      </div>
                      <div className="stage-label-tag tag-stress">
                        <span>Stress: Оптимально</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'trains' && (
                  <div className="visual-trains-stage">
                    <div className="train-animation-wrap">
                      <div className="train-icon-animated">
                        <Train size={88} className="text-gold" />
                      </div>
                      <div className="railway-tracks">
                        <div className="rail-line" />
                        <div className="rail-ties" />
                      </div>
                    </div>
                    <div className="stage-overlay-labels">
                      <div className="stage-label-tag tag-gold">
                        <span>Маршрут: Станция Центральная → Завод №4</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'community' && (
                  <div className="visual-shield-stage">
                    <div className="shield-icon-animated">
                      <ShieldCheck size={96} className="text-accent" />
                    </div>
                    <div className="stage-overlay-labels">
                      <div className="stage-label-tag">
                        <span>Статус привата: Защищено CoreProtect</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Terminal Footer info */}
              <div className="visual-bottom-bar">
                <div className="terminal-status-info">
                  <span className="terminal-pulse-dot" />
                  <span>NC-Create Network Cluster • 20.0 TPS</span>
                </div>
                <span className="terminal-version">v1.20.1-Release</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
