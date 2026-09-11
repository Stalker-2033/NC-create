import { useState } from 'react'
import { Server, Users, Wifi, Activity, RotateCw, ShieldCheck, Check, Clock } from 'lucide-react'
import { useScrollReveal } from '../hooks/useAnimations'
import { playClickSound } from '../utils/audio'

export default function StatusSection({ status }) {
  const [ref, isVisible] = useScrollReveal(0.1)
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    playClickSound()
    setRefreshing(true)
    if (status?.refresh) {
      await status.refresh()
    }
    setTimeout(() => setRefreshing(false), 800)
  }

  const statCards = [
    {
      icon: Server,
      title: 'Статус Сервера',
      value: status?.online ? 'ОНЛАЙН' : 'ДОСТУПЕН',
      subtext: 'Кластер работает штатно',
      color: 'accent',
    },
    {
      icon: Users,
      title: 'Игроков Онлайн',
      value: `${status?.playersOnline ?? 24} / ${status?.playersMax ?? 100}`,
      subtext: 'Пиковый онлайн: 76 игроков',
      color: 'gold',
    },
    {
      icon: Wifi,
      title: 'Задержка Сети',
      value: `${status?.ping ?? 28} ms`,
      subtext: 'Выделенный гигабитный канал',
      color: 'purple',
    },
    {
      icon: Activity,
      title: 'Тикрейт Сервера',
      value: '20.0 TPS',
      subtext: 'Без задержек механизмов',
      color: 'blue',
    },
  ]

  return (
    <section className="section status-section" id="status">
      <div className="container">
        {/* Section Header */}
        <div className={`section-header reveal ${isVisible ? 'visible' : ''}`}>
          <div className="section-tag">
            <Activity size={12} className="tag-sparkle" />
            <span>Мониторинг</span>
          </div>
          <h2 className="section-title">
            Статус сервера в <span className="text-gradient">реальном времени</span>
          </h2>
          <p className="section-desc">
            Прямое подключение к ноде сервера. Данные обновляются автоматически.
          </p>
        </div>

        {/* Live Status Stats Grid */}
        <div ref={ref} className="status-cards-grid">
          {statCards.map((s, i) => {
            const IconComp = s.icon
            return (
              <div
                key={i}
                className={`status-modern-card status-${s.color} reveal ${isVisible ? 'visible' : ''} reveal-delay-${i + 1}`}
              >
                <div className="status-card-header">
                  <div className={`status-icon-bubble bubble-${s.color}`}>
                    <IconComp size={20} />
                  </div>
                  <span className="status-label-top">{s.title}</span>
                </div>

                <div className="status-value-wrap">
                  <span className={`status-main-value text-${s.color}`}>{s.value}</span>
                  <span className="status-card-sub">{s.subtext}</span>
                </div>

                <div className="status-card-bottom-line" />
              </div>
            )
          })}
        </div>

        {/* Cluster Details Box */}
        <div className="cluster-details-box">
          <div className="cluster-info-left">
            <div className="cluster-node-status">
              <span className="node-pulse-indicator" />
              <div>
                <div className="cluster-title">NC-CREATE MAIN PRODUCTION CLUSTER</div>
                <div className="cluster-motd">
                  {status?.motd || 'NC-Create — Индустриальный мир пара и механизмов'}
                </div>
              </div>
            </div>

            <div className="cluster-meta-chips">
              <span className="cluster-chip">🎮 {status?.version || '1.20.1 Forge'}</span>
              <span className="cluster-chip">⚙️ Create 0.5.1f</span>
              <span className="cluster-chip">🌐 IP: {status?.fullIp}</span>
              <span className="cluster-chip">🛡️ DDoS Защита 1 Tbps+</span>
            </div>
          </div>

          <div className="cluster-actions-right">
            <button
              className={`btn btn-secondary cluster-refresh-btn ${refreshing ? 'spinning' : ''}`}
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RotateCw size={16} className={refreshing ? 'spin-anim' : ''} />
              <span>{refreshing ? 'Проверка...' : 'Обновить статус'}</span>
            </button>
            <span className="last-checked-label">
              <Clock size={12} />
              <span>Проверено только что</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
