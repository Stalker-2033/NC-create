import { CheckCircle2, Copy } from 'lucide-react'

export default function Toast({ show, message, subtext }) {
  if (!show) return null

  return (
    <div className="toast-notification">
      <div className="toast-icon">
        <CheckCircle2 size={20} className="toast-check" />
      </div>
      <div className="toast-content">
        <div className="toast-title">{message || 'IP сервера скопирован!'}</div>
        <div className="toast-subtext">{subtext || 'Вставьте в сетевой игре Minecraft (Ctrl + V)'}</div>
      </div>
    </div>
  )
}
