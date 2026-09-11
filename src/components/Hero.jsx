import { useState, useMemo } from 'react'
import { Copy, Check, Sparkles, ArrowRight, Play, Server, ShieldCheck, Gauge, Cpu, Users } from 'lucide-react'
import { FULL_SERVER_IP } from '../hooks/useServerStatus'
import { playClickSound, playSuccessSound } from '../utils/audio'

export default function Hero({ status, onCopyIp, copied }) {
  const particles = useMemo(() =>
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: `${(i * 3.7) % 100}%`,
      bottom: `${-5 - (i % 5) * 5}%`,
      delay: `${(i * 0.4) % 6}s`,
      duration: `${7 + (i % 4) * 2}s`,
      size: `${2 + (i % 3) * 1.5}px`,
      type: i % 3 === 0 ? 'type-accent' : i % 3 === 1 ? 'type-gold' : 'type-purple',
    })), []
  )

  const handleCopy = () => {
    playSuccessSound()
    onCopyIp()
  }

  const scrollToConnect = () => {
    playClickSound()
    const el = document.getElementById('connect')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="home">
      {/* Background Ambience */}
      <div className="hero-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="hero-radial-vignette" />
      </div>

      <div className="hero-grid" />

      {/* Floating Kinetic Particles */}
      <div className="hero-particles">
        {particles.map(p => (
          <div
            key={p.id}
            className={`hero-particle ${p.type}`}
            style={{
              left: p.left,
              bottom: p.bottom,
              animationDelay: p.delay,
              animationDuration: p.duration,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      <div className="container hero-container">
        <div className="hero-layout">
          {/* Left Column: Headings, CTA & Quick IP */}
          <div className="hero-left">
            <div className="hero-badge">
              <span className="dot pulse-dot" />
              <span className="badge-text">
                {status?.online ? 'Сервер Онлайн' : 'Сервер Доступен'} • Java 1.20.1 Forge
              </span>
              <span className="badge-pill">Create 0.5.1</span>
            </div>

            <h1 className="hero-heading">
              ИНДУСТРИАЛЬНЫЙ
              <br />
              <span className="text-gradient">МИР CREATE</span>
              <br />
              БЕЗ ГРАНИЦ
            </h1>

            <p className="hero-subtitle">
              Погрузись в атмосферу пара, кинетической энергии и масштабных железных дорог. 
              Строй автоматизированные заводы, основывай корпорации и исследуй огромный бесконечный мир без вайпов!
            </p>

            {/* CTA Buttons */}
            <div className="hero-actions">
              <button className="btn btn-primary btn-glow" onClick={scrollToConnect}>
                <Play size={18} className="btn-icon fill-current" />
                <span>Начать играть</span>
              </button>

              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
                onClick={playClickSound}
              >
                <span>💬 Сообщество Discord</span>
              </a>
            </div>

            {/* Quick Interactive IP Card */}
            <div className={`hero-ip-card ${copied ? 'copied' : ''}`} onClick={handleCopy}>
              <div className="ip-info-group">
                <div className="ip-top-row">
                  <span className="ip-label">Адрес для подключения (Кликни для копирования)</span>
                  <span className="ip-status-badge">
                    <span className="status-indicator-dot" />
                    {status?.ping || 28} ms
                  </span>
                </div>
                <div className="ip-address-row">
                  <span className="ip-value">{FULL_SERVER_IP}</span>
                </div>
              </div>

              <div className="ip-copy-btn-wrap">
                <span className="ip-copy-btn">
                  {copied ? <Check size={20} className="text-accent" /> : <Copy size={20} />}
                </span>
                <span className="ip-copy-tooltip">{copied ? 'Скопировано!' : 'Скопировать'}</span>
              </div>
            </div>

            {/* Mini Stats Bar */}
            <div className="hero-mini-stats">
              <div className="mini-stat">
                <span className="mini-stat-val text-accent">{status?.playersOnline ?? 24}</span>
                <span className="mini-stat-lbl">Игроков онлайн</span>
              </div>
              <div className="mini-stat-div" />
              <div className="mini-stat">
                <span className="mini-stat-val text-gold">20.0</span>
                <span className="mini-stat-lbl">TPS Стабильность</span>
              </div>
              <div className="mini-stat-div" />
              <div className="mini-stat">
                <span className="mini-stat-val text-purple">0</span>
                <span className="mini-stat-lbl">Вайпов карты</span>
              </div>
              <div className="mini-stat-div" />
              <div className="mini-stat">
                <span className="mini-stat-val">24/7</span>
                <span className="mini-stat-lbl">Аптайм</span>
              </div>
            </div>
          </div>

          {/* Right Column: Epic 3D Kinetic Machine Showcase Card */}
          <div className="hero-right">
            <div className="hero-showcase-card">
              {/* Glass Card Header */}
              <div className="card-glass-header">
                <div className="card-window-controls">
                  <span className="win-btn win-red" />
                  <span className="win-btn win-yellow" />
                  <span className="win-btn win-green" />
                </div>
                <div className="card-window-title">
                  <Server size={13} className="text-accent" />
                  <span>NC-CREATE KINETIC ENGINE</span>
                </div>
                <div className="card-status-chip">
                  <span className="chip-glow-dot" />
                  ONLINE
                </div>
              </div>

              {/* Animated Interactive Machinery Diagram */}
              <div className="kinetic-machine-preview">
                {/* Visual Gears Stage */}
                <div className="gears-viewport">
                  {/* Large Brass Gear */}
                  <div className="gear-element gear-large gear-brass">
                    <svg viewBox="0 0 100 100" className="gear-svg spin-cw">
                      <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="14 9" />
                      <circle cx="50" cy="50" r="28" fill="rgba(255, 183, 77, 0.08)" stroke="currentColor" strokeWidth="4" />
                      <circle cx="50" cy="50" r="10" fill="currentColor" />
                    </svg>
                  </div>

                  {/* Medium Iron Gear */}
                  <div className="gear-element gear-medium gear-iron">
                    <svg viewBox="0 0 80 80" className="gear-svg spin-ccw">
                      <circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="5" strokeDasharray="11 7" />
                      <circle cx="40" cy="40" r="20" fill="rgba(0, 245, 160, 0.08)" stroke="currentColor" strokeWidth="3" />
                      <circle cx="40" cy="40" r="8" fill="currentColor" />
                    </svg>
                  </div>

                  {/* Small Copper Gear */}
                  <div className="gear-element gear-small gear-copper">
                    <svg viewBox="0 0 60 60" className="gear-svg spin-cw-fast">
                      <circle cx="30" cy="30" r="24" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="8 5" />
                      <circle cx="30" cy="30" r="14" fill="none" stroke="currentColor" strokeWidth="2" />
                      <circle cx="30" cy="30" r="6" fill="currentColor" />
                    </svg>
                  </div>

                  {/* Kinetic Shaft Line */}
                  <div className="kinetic-shaft">
                    <div className="shaft-line" />
                    <div className="shaft-bearing bearing-1" />
                    <div className="shaft-bearing bearing-2" />
                  </div>

                  {/* Kinetic Stress Indicator HUD */}
                  <div className="kinetic-hud">
                    <div className="hud-metric">
                      <Gauge size={14} className="hud-icon text-gold" />
                      <div>
                        <span className="hud-label">СКОРОСТЬ ВРАЩЕНИЯ</span>
                        <span className="hud-value">128.0 RPM</span>
                      </div>
                    </div>
                    <div className="hud-metric">
                      <Cpu size={14} className="hud-icon text-accent" />
                      <div>
                        <span className="hud-label">НАГРУЗКА (STRESS)</span>
                        <span className="hud-value">3,450 / 16,384 SU</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress bar of Server Capacity */}
                <div className="server-capacity-bar">
                  <div className="capacity-label-row">
                    <span>Заполненность кластера</span>
                    <span className="capacity-numbers">
                      {status?.playersOnline ?? 24} / {status?.playersMax ?? 100} игроков
                    </span>
                  </div>
                  <div className="capacity-track">
                    <div
                      className="capacity-fill"
                      style={{
                        width: `${Math.min(100, Math.max(15, (((status?.playersOnline ?? 24) / (status?.playersMax ?? 100)) * 100)))}%`
                      }}
                    />
                  </div>
                </div>

                {/* Active Server Features Badges */}
                <div className="card-features-chips">
                  <span className="feature-chip">⚙️ Create 0.5.1f</span>
                  <span className="feature-chip">🚂 Steam & Rails</span>
                  <span className="feature-chip">🎙️ Voice Chat 3D</span>
                  <span className="feature-chip">🗺️ JourneyMap</span>
                  <span className="feature-chip">⚡ 120+ FPS</span>
                </div>

                {/* Player community preview avatars */}
                <div className="card-footer-community">
                  <div className="avatars-group">
                    <div className="avatar-circle" style={{ background: '#00f5a0' }}>⚙️</div>
                    <div className="avatar-circle" style={{ background: '#ffb74d' }}>🚂</div>
                    <div className="avatar-circle" style={{ background: '#8b5cf6' }}>⛏️</div>
                    <div className="avatar-circle" style={{ background: '#3b82f6' }}>🏰</div>
                    <div className="avatar-more">+450</div>
                  </div>
                  <span className="community-note">Строителей и инженеров уже в игре</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
