import { useState } from 'react'
import { Cog, Train, Infinity as InfinityIcon, Coins, Zap, Mic, ShieldAlert, Sparkles, ArrowUpRight } from 'lucide-react'
import { useScrollReveal } from '../hooks/useAnimations'
import { playClickSound } from '../utils/audio'

const bentoFeatures = [
  {
    id: 'engineering',
    icon: Cog,
    title: 'Кинетическая Инженерия Create',
    subtitle: 'Главная механика сборки',
    desc: 'Полная свобода творчества: стройте гидроэлектростанции, паровые двигатели, сборочные линии, автоматические шахты и гидравлические прессы. Механика Stress Units и RPM позволяет создавать реалистичные инженерные сети.',
    badge: 'Ключевой мод',
    color: 'emerald',
    featured: true,
    tags: ['Шестерни и валы', 'Паровые турбины', 'Авто-крафтинг', 'Конвейеры'],
  },
  {
    id: 'trains',
    icon: Train,
    title: 'Железнодорожные Магистрали',
    subtitle: 'Мод Steam and Rails',
    desc: 'Прокладывайте километры путей, создавайте стрелки, вокзалы и настраивайте поезда по расписанию для доставки руды и пассажиров.',
    badge: 'Транспорт',
    color: 'gold',
    featured: false,
    tags: ['Свои локомотивы', 'Авто-маршруты', 'Семафоры'],
  },
  {
    id: 'nowipe',
    icon: InfinityIcon,
    title: 'Бесконечный Мир Без Вайпов',
    subtitle: 'Надежность прогресса',
    desc: 'Ваши постройки, фабрики и железнодорожные сети сохранятся навсегда. Мы бережем труд каждого строителя и инженера.',
    badge: 'Постоянство',
    color: 'purple',
    featured: false,
    tags: ['Стабильный бэкап', 'Расширение границ', 'Защита приватов'],
  },
  {
    id: 'economy',
    icon: Coins,
    title: 'Продуманная Экономика',
    subtitle: 'Рынок и торговля',
    desc: 'Торговые станции, честный обмен редкими деталями Create, аукцион и возможность создать собственную корпорацию.',
    badge: 'Баланс',
    color: 'gold',
    featured: false,
    tags: ['Торговые автоматы', 'Валюта сервера', 'Городские рынки'],
  },
  {
    id: 'performance',
    icon: Zap,
    title: 'Плавные 120+ FPS & 20 TPS',
    subtitle: 'Максимальная оптимизация',
    desc: 'Клиентская сборка оптимизирована для слабых и средних ПК. Поддержка современных шейдеров без просадок фреймрейта.',
    badge: 'Быстродействие',
    color: 'emerald',
    featured: false,
    tags: ['Embeddium', 'Oculus (шейдеры)', 'FerriteCore', 'Без лагов'],
  },
  {
    id: 'voice',
    icon: Mic,
    title: 'Встроенный 3D Voice Chat',
    subtitle: 'Пространственный звук',
    desc: 'Общайтесь с игроками прямо в игре с учетом расстояния, стен и эхо в пещерах. Рации для дальних поездок на поездах!',
    badge: 'Атмосфера',
    color: 'blue',
    featured: false,
    tags: ['3D позиционирование', 'Рации и частоты', 'Групповые каналы'],
  },
]

export default function Features() {
  const [headerRef, headerVisible] = useScrollReveal(0.1)
  const [gridRef, gridVisible] = useScrollReveal(0.05)
  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <section className="section features-section" id="features">
      <div className="container">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`section-header reveal ${headerVisible ? 'visible' : ''}`}
        >
          <div className="section-tag">
            <Sparkles size={12} className="tag-sparkle" />
            <span>Особенности сборки</span>
          </div>
          <h2 className="section-title">
            Почему игроки выбирают <span className="text-gradient">NC-CREATE</span>?
          </h2>
          <p className="section-desc">
            Мы объединили инженерную свободу мода Create, надежную техническую базу 
            и дружную атмосферу совместной игры.
          </p>
        </div>

        {/* Bento Grid */}
        <div ref={gridRef} className="bento-grid">
          {bentoFeatures.map((item, i) => {
            const IconComponent = item.icon
            const isHovered = hoveredCard === item.id

            return (
              <div
                key={item.id}
                className={`bento-card ${item.featured ? 'bento-featured' : ''} bento-${item.color} reveal ${gridVisible ? 'visible' : ''} reveal-delay-${Math.min(i + 1, 5)}`}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Background Ambient Glow */}
                <div className="bento-glow-layer" />

                {/* Top Row: Icon and Badge */}
                <div className="bento-header-row">
                  <div className={`bento-icon-box icon-box-${item.color}`}>
                    <IconComponent size={24} />
                  </div>
                  <span className={`bento-badge badge-${item.color}`}>
                    {item.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="bento-content">
                  <span className="bento-subtitle">{item.subtitle}</span>
                  <h3 className="bento-title">{item.title}</h3>
                  <p className="bento-desc">{item.desc}</p>
                </div>

                {/* Tags */}
                <div className="bento-tags-row">
                  {item.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="bento-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Interactive Accent Corner */}
                <div className="bento-corner-accent" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
