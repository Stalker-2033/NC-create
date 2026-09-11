import { Play, Copy, Check, Disc as Discord, ArrowRight, Sparkles } from 'lucide-react'
import { FULL_SERVER_IP } from '../hooks/useServerStatus'
import { useScrollReveal } from '../hooks/useAnimations'
import { playClickSound, playSuccessSound } from '../utils/audio'

export default function CtaSection({ onCopyIp, copied }) {
  const [ref, isVisible] = useScrollReveal(0.15)

  const handleCopy = () => {
    playSuccessSound()
    onCopyIp()
  }

  return (
    <section className="cta-section" id="play">
      <div className="cta-ambient-mesh" />
      <div className="cta-ambient-grid" />

      <div className="container">
        <div ref={ref} className={`cta-content-box reveal ${isVisible ? 'visible' : ''}`}>
          <div className="cta-sparkle-pill">
            <Sparkles size={14} className="text-gold" />
            <span>Присоединяйся к нам сегодня</span>
          </div>

          <h2 className="cta-heading">
            ГОТОВ ПОСТРОИТЬ СВОЮ
            <br />
            <span className="text-gradient">ИНДУСТРИАЛЬНУЮ ИМПЕРИЮ</span>?
          </h2>

          <p className="cta-subheading">
            Мир NC-CREATE открыт для каждого. Никаких вайтлистов — скачивай сборку,
            копируй IP и запускай свои первые шестерни прямо сейчас!
          </p>

          <div className="cta-actions-group">
            <button
              className={`btn btn-primary btn-glow btn-large ${copied ? 'copied' : ''}`}
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check size={20} />
                  <span>IP скопирован в буфер!</span>
                </>
              ) : (
                <>
                  <Copy size={20} />
                  <span>Скопировать IP сервера</span>
                </>
              )}
            </button>

            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary btn-large"
              onClick={playClickSound}
            >
              <span>💬 Наш Discord сервер</span>
              <ArrowRight size={18} />
            </a>
          </div>

          {/* Direct IP String Badge */}
          <div className="cta-ip-pill" onClick={handleCopy}>
            <span className="cta-ip-status-dot" />
            <span className="cta-ip-text">{FULL_SERVER_IP}</span>
            <span className="cta-ip-copy-hint">{copied ? 'Готово!' : 'Кликни для копирования'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
