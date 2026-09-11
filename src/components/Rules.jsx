import { useState, useMemo } from 'react'
import { Shield, AlertTriangle, Hammer, Ban, VolumeX, Search, ChevronDown, CheckCircle } from 'lucide-react'
import { useScrollReveal } from '../hooks/useAnimations'
import { playClickSound } from '../utils/audio'

const serverRules = [
  {
    category: 'gameplay',
    number: '1.1',
    title: 'Запрет на использование читов и нечестных модов',
    body: 'Использование любого стороннего ПО (X-Ray, KillAura, Baritone, Fly, Freecam, спидхаки и автокликеры), дающего нечестное преимущество над другими игроками, строго запрещено.',
    penalty: 'Перманентный бан',
    severity: 'danger',
  },
  {
    category: 'gameplay',
    number: '1.2',
    title: 'Защита от грифа и порчи чужих механизмов',
    body: 'Запрещено разрушать, разбирать или видоизменять постройки и поезда других игроков без их прямого согласия. Все действия логируются через CoreProtect.',
    penalty: 'Бан от 7 до 30 дней',
    severity: 'warning',
  },
  {
    category: 'gameplay',
    number: '1.3',
    title: 'Ограничения на вечные лаг-машины и перегрузку сервера',
    body: 'Запрещено целенаправленное создание бесконечных генераторов дропа или зацикленных механизмов с падением TPS ниже 18. При обнаружении проблемной фабрики администратор поможет оптимизировать ее узлы.',
    penalty: 'Снос узла + Предупреждение',
    severity: 'info',
  },
  {
    category: 'chat',
    number: '2.1',
    title: 'Уважительное общение в чате и Discord',
    body: 'Запрещены оскорбления родственников, травля, разжигание межнациональной розни, дискриминация и токсичное поведение. Держите чат приятным для всех возрастов.',
    penalty: 'Мут от 2 часов до 7 дней',
    severity: 'mute',
  },
  {
    category: 'chat',
    number: '2.2',
    title: 'Спам, капс и реклама сторонних проектов',
    body: 'Запрещен флуд однотипными сообщениями, злоупотребление CAPS LOCK, а также публикация ссылок на другие сервера Minecraft или подозрительные сайты.',
    penalty: 'Мут от 1 часа / Бан за рекламу',
    severity: 'warning',
  },
  {
    category: 'economy',
    number: '3.1',
    title: 'Торговля только за внутриигровую валюту',
    body: 'Запрещена покупка или продажа игровых ценностей, ресурсов мода Create, механизмов или аккаунтов за реальные деньги между игроками.',
    penalty: 'Перманентный бан обоих участников',
    severity: 'danger',
  },
  {
    category: 'economy',
    number: '3.2',
    title: 'Обман при сделках и кража из торговых автоматов',
    body: 'Намеренная подмена предметов при торговле или использование багов торговых интерфейсов Create приравнивается к воровству.',
    penalty: 'Бан от 3 дней + Конфискация',
    severity: 'warning',
  },
  {
    category: 'gameplay',
    number: '4.1',
    title: 'Правило одного аккаунта (мультиаккаунтинг)',
    body: 'Каждый игрок должен использовать одну учетную запись. Создание твинков для обхода наказаний или фарма стартовых ресурсов запрещено.',
    penalty: 'Бан твинков + Продление бана основы',
    severity: 'danger',
  },
]

const categories = [
  { id: 'all', label: 'Все правила' },
  { id: 'gameplay', label: '⚙️ Механизмы и Геймплей' },
  { id: 'chat', label: '💬 Чат и Голос' },
  { id: 'economy', label: '🪙 Экономика' },
]

export default function Rules() {
  const [openIndex, setOpenIndex] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [headerRef, headerVisible] = useScrollReveal(0.1)

  const toggle = (i) => {
    playClickSound()
    setOpenIndex(openIndex === i ? null : i)
  }

  const handleCategoryChange = (catId) => {
    playClickSound()
    setSelectedCategory(catId)
    setOpenIndex(null)
  }

  const filteredRules = useMemo(() => {
    return serverRules.filter(r => {
      const matchCat = selectedCategory === 'all' || r.category === selectedCategory
      const matchSearch =
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.number.includes(searchQuery)
      return matchCat && matchSearch
    })
  }, [selectedCategory, searchQuery])

  return (
    <section className="section rules-section" id="rules">
      <div className="container">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`section-header reveal ${headerVisible ? 'visible' : ''}`}
        >
          <div className="section-tag">
            <Shield size={12} className="tag-sparkle" />
            <span>Свод правил</span>
          </div>
          <h2 className="section-title">
            Правила сервера <span className="text-gradient">NC-CREATE</span>
          </h2>
          <p className="section-desc">
            Простые и понятные правила для комфортной, честной и безопасной игры каждого участника.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="rules-control-bar">
          <div className="rules-categories">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`category-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="rules-search-wrap">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              className="rules-search-input"
              placeholder="Поиск по правилам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="search-clear-btn" onClick={() => setSearchQuery('')}>
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Rules Accordion List */}
        <div className="rules-list-wrapper">
          {filteredRules.length === 0 ? (
            <div className="rules-empty-state">
              <span>Ничего не найдено по запросу «{searchQuery}»</span>
            </div>
          ) : (
            filteredRules.map((r, i) => {
              const isOpen = openIndex === i

              return (
                <div
                  key={i}
                  className={`rule-accordion-item ${isOpen ? 'open' : ''}`}
                >
                  <button
                    className="rule-accordion-header"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                  >
                    <div className="rule-badge-group">
                      <span className="rule-num-box">{r.number}</span>
                      <span className="rule-item-title">{r.title}</span>
                    </div>

                    <div className="rule-right-group">
                      <span className={`severity-tag severity-${r.severity}`}>
                        {r.severity === 'danger' && <Ban size={12} />}
                        {r.severity === 'warning' && <Hammer size={12} />}
                        {r.severity === 'mute' && <VolumeX size={12} />}
                        {r.severity === 'info' && <AlertTriangle size={12} />}
                        <span>{r.penalty}</span>
                      </span>

                      <div className={`chevron-indicator ${isOpen ? 'rotate' : ''}`}>
                        <ChevronDown size={18} />
                      </div>
                    </div>
                  </button>

                  <div className={`rule-accordion-collapse ${isOpen ? 'show' : ''}`}>
                    <div className="rule-accordion-body">
                      <p>{r.body}</p>
                      <div className="rule-tip">
                        <CheckCircle size={15} className="text-accent" />
                        <span>Наказание: <strong>{r.penalty}</strong>. При возникновении вопросов обращайтесь в поддержку Discord.</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
