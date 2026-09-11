import { useState } from 'react'
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react'
import { useScrollReveal } from '../hooks/useAnimations'
import { playClickSound } from '../utils/audio'

const faqs = [
  {
    q: 'Нужна ли официальная лицензия Minecraft для игры?',
    a: 'Нет, сервер поддерживает как лицензионные аккаунты, так и любые альтернативные лаунчеры (TLauncher, Prism, Modrinth, Legacy Launcher, CurseForge). Вы можете зайти под любым ником.',
  },
  {
    q: 'Сколько оперативной памяти (RAM) нужно выделять сборке?',
    a: 'Минимум 4 ГБ, рекомендуется 6 ГБ. Благодаря встроенным модам оптимизации (Embeddium, FerriteCore, ModernFix) сборка работает плавно даже на конфигурациях с 8 ГБ общей памяти.',
  },
  {
    q: 'Как защитить свои механизмы и территорию (заприватить)?',
    a: 'Приват осуществляется через удобную карту/меню или специальную команду. Внутри вашего привата другие игроки не могут ломать блоки, взаимодействовать с сундуками или нарушать работу механизмов Create.',
  },
  {
    q: 'Разрешено ли использовать чертежи (Schematics) мода Create?',
    a: 'Да! Чертежный стол (Schematic Table) и пушка (Schematicannon) разрешены. Вы можете скачивать готовые проекты или чертежи механизмов из сообщества и воплощать их в жизнь своими ресурсами.',
  },
  {
    q: 'Работают ли шейдеры со сборкой?',
    a: 'Да! В сборку встроен мод Oculus (аналог Iris для Forge), который позволяет включать любые современные шейдеры (Complementary, BSL, MakeUp) без конфликтов с текстурами мода Create.',
  },
  {
    q: 'Будет ли вайп карты?',
    a: 'Основной мир сервера не вайпается! Мы расширяем границы карты по мере выхода обновлений. Вайпаются только ресурсные миры (Энд и Незер) раз в несколько месяцев для обновления руд и сокровищниц.',
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)
  const [headerRef, headerVisible] = useScrollReveal(0.1)

  const toggle = (i) => {
    playClickSound()
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section className="section faq-section" id="faq">
      <div className="container">
        {/* Header */}
        <div
          ref={headerRef}
          className={`section-header reveal ${headerVisible ? 'visible' : ''}`}
        >
          <div className="section-tag">
            <HelpCircle size={12} className="tag-sparkle" />
            <span>База знаний</span>
          </div>
          <h2 className="section-title">
            Часто задаваемые <span className="text-gradient">вопросы</span>
          </h2>
          <p className="section-desc">
            Все ответы на главные вопросы новичков перед стартом на сервере.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="faq-container-list">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i

            return (
              <div
                key={i}
                className={`faq-item-card ${isOpen ? 'open' : ''}`}
              >
                <button
                  className="faq-question-btn"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-icon-mark">?</span>
                  <span className="faq-question-text">{faq.q}</span>
                  <div className={`faq-chevron ${isOpen ? 'rotate' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <div className={`faq-collapse ${isOpen ? 'show' : ''}`}>
                  <div className="faq-answer-body">
                    <p>{faq.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
