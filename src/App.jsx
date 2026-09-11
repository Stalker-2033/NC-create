import { useState, useEffect, useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import About from './components/About'
import HowToConnect from './components/HowToConnect'
import StatusSection from './components/StatusSection'
import Rules from './components/Rules'
import Faq from './components/Faq'
import CtaSection from './components/CtaSection'
import Footer from './components/Footer'
import Toast from './components/Toast'
import { useServerStatus, FULL_SERVER_IP } from './hooks/useServerStatus'

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [copied, setCopied] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const serverStatus = useServerStatus()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleCopyIp = useCallback(() => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(FULL_SERVER_IP)
    }
    setCopied(true)
    setToastMessage(`IP ${FULL_SERVER_IP} скопирован в буфер!`)
    setTimeout(() => {
      setCopied(false)
      setToastMessage('')
    }, 3000)
  }, [])

  return (
    <div className="app-root">
      <Navbar
        scrolled={scrolled}
        onCopyIp={handleCopyIp}
        copied={copied}
      />

      <main>
        <Hero
          status={serverStatus}
          onCopyIp={handleCopyIp}
          copied={copied}
        />

        <div className="section-gradient-divider" />
        <Features />

        <div className="section-gradient-divider" />
        <About />

        <div className="section-gradient-divider" />
        <HowToConnect
          onCopyIp={handleCopyIp}
          copied={copied}
        />

        <div className="section-gradient-divider" />
        <StatusSection
          status={serverStatus}
        />

        <div className="section-gradient-divider" />
        <Rules />

        <div className="section-gradient-divider" />
        <Faq />

        <CtaSection
          onCopyIp={handleCopyIp}
          copied={copied}
        />
      </main>

      <Footer
        onCopyIp={handleCopyIp}
        copied={copied}
      />

      {/* Floating Global Toast on IP copy */}
      <Toast
        show={copied}
        message="Адрес сервера скопирован!"
        subtext={`Вставьте ${FULL_SERVER_IP} в сетевой игре Minecraft`}
      />
    </div>
  )
}

export default App
