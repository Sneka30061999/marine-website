import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

/** Scrolls to top whenever the route changes. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function Layout() {
  return (
    /* Outer wrapper — flex column so footer always sticks to bottom */
    <div className="flex min-h-screen flex-col">

      {/* Skip-to-content — keyboard / screen-reader shortcut (§10) */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <ScrollToTop />
      <Navbar />

      {/*
        <main> is the primary landmark (§10 semantic landmarks).
        id="main-content" is the skip-link target.
      */}
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
