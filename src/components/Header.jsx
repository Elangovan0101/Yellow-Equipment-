import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { primaryNav, productMenu, serviceMenu } from '../data/catalog/navigation'
import Logo from './Logo'

const HOME_SECTIONS = ['#industries', '#contact']

export default function Header() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(null)
  const [solid, setSolid] = useState(false)
  const [section, setSection] = useState('')
  const closeTimer = useRef(0)
  const headerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenu(null)
    setOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (location.pathname !== '/') {
      setSection('')
      return undefined
    }
    const nodes = HOME_SECTIONS.map((hash) => document.querySelector(hash)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setSection(`#${entry.target.id}`)
          else if (`#${entry.target.id}` === section) setSection('')
        })
      },
      { rootMargin: '-40% 0px -45% 0px' },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [location.pathname, section])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!menu) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setMenu(null)
    }
    const onPointer = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) setMenu(null)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onPointer)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onPointer)
    }
  }, [menu])

  const isCurrent = (item) => {
    if (item.match === 'home') return location.pathname === '/' && !HOME_SECTIONS.includes(section)
    if (item.match.startsWith('#')) return location.pathname === '/' && section === item.match
    return location.pathname.startsWith(item.match)
  }

  const hover = (id) => {
    window.clearTimeout(closeTimer.current)
    setMenu(id)
  }
  const leave = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setMenu(null), 160)
  }

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid || open || menu ? 'bg-ink/95 backdrop-blur-md' : 'bg-transparent'
      }`}
      onPointerLeave={(event) => event.pointerType === 'mouse' && leave()}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Primary">
          {primaryNav.map((item) => {
            const current = isCurrent(item)
            const tone = current ? 'text-yellow' : 'text-paper/80 hover:text-paper'
            if (item.menu) {
              const expanded = menu === item.menu
              return (
                <div key={item.label} onPointerEnter={(event) => event.pointerType === 'mouse' && hover(item.menu)}>
                  <button
                    type="button"
                    className={`flex items-center gap-1.5 text-[12px] tracking-[0.16em] uppercase transition-colors xl:text-[13px] ${expanded ? 'text-yellow' : tone}`}
                    aria-expanded={expanded}
                    aria-controls={`menu-${item.menu}`}
                    onClick={() => setMenu(expanded ? null : item.menu)}
                  >
                    {item.label}
                    <svg viewBox="0 0 10 6" className={`h-1.5 w-2.5 transition-transform ${expanded ? 'rotate-180' : ''}`} aria-hidden="true">
                      <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  </button>
                </div>
              )
            }
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`text-[12px] tracking-[0.16em] uppercase transition-colors xl:text-[13px] ${tone}`}
                aria-current={current ? 'page' : undefined}
                onPointerEnter={() => setMenu(null)}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="flex items-center gap-4">
          <a href="tel:+96895619537" className="hidden text-sm tracking-wide text-paper/80 2xl:inline">
            +968 9561 9537
          </a>
          <Link
            to="/#contact"
            className="hidden items-center gap-3 bg-yellow px-4 py-3 font-display text-sm tracking-[0.16em] text-ink uppercase transition-colors hover:bg-paper sm:inline-flex lg:hidden xl:inline-flex"
          >
            Contact our team
            <Arrow />
          </Link>
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center border border-white/20 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
              <span className={`h-px bg-paper transition ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
              <span className={`h-px bg-paper transition ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </div>

      {menu ? (
        <div
          id={`menu-${menu}`}
          className="absolute inset-x-0 top-full hidden max-h-[calc(100svh-5rem)] overflow-y-auto border-t border-line bg-ink/97 backdrop-blur-md lg:block"
          onPointerEnter={(event) => event.pointerType === 'mouse' && hover(menu)}
        >
          <div className="mx-auto max-w-[1440px] px-8 py-10">
            {menu === 'products' ? <ProductsPanel /> : null}
            {menu === 'services' ? <ListPanel title="Services" to="/services" all="All services" items={serviceMenu} image="/media/services/field-repairs.webp" /> : null}
          </div>
        </div>
      ) : null}

      {open ? <MobileNav /> : null}
    </header>
  )
}

function PanelHeading({ to, children }) {
  return (
    <Link to={to} className="group flex items-center justify-between gap-3 border-b border-line pb-3 font-display text-2xl uppercase transition-colors hover:text-yellow">
      {children}
      <Arrow />
    </Link>
  )
}

function ProductsPanel() {
  return (
    <div>
      <div className="grid grid-cols-4 gap-8">
        {productMenu.map((brand) => (
          <div key={brand.title}>
            <PanelHeading to={brand.to}>{brand.title}</PanelHeading>
            {brand.groups.map((group) => (
              <div key={group.title} className="mt-5">
                <p className="text-[10px] tracking-[0.22em] text-yellow uppercase">{group.title}</p>
                <ul className="mt-2 space-y-1.5">
                  {group.links.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} className="text-sm text-paper/80 transition-colors hover:text-yellow">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between border-t border-line pt-5 text-[11px] tracking-[0.2em] text-mist uppercase">
        <span>Authorised dealer · Certified service centre · Engine dealer</span>
        <Link to="/products" className="flex items-center gap-2 text-paper hover:text-yellow">
          All products <Arrow />
        </Link>
      </div>
    </div>
  )
}

function ListPanel({ title, to, all, items, image }) {
  return (
    <div className="grid grid-cols-[1fr_2fr] gap-10">
      <Link to={to} className="group relative block min-h-[260px] overflow-hidden">
        <img loading="lazy" decoding="async" src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <span className="absolute bottom-6 left-6">
          <span className="block font-display text-5xl leading-none uppercase">{title}</span>
          <span className="mt-3 flex items-center gap-2 text-[11px] tracking-[0.2em] text-yellow uppercase">
            {all} <Arrow />
          </span>
        </span>
      </Link>
      <ul className="grid grid-cols-2 content-start gap-x-8">
        {items.map((item) => (
          <li key={item.to} className="border-b border-line">
            <Link to={item.to} className="group flex items-baseline gap-4 py-3.5 transition-colors hover:text-yellow">
              <span className="font-display text-lg text-yellow">{item.n}</span>
              <span className="font-display text-xl uppercase">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function MobileNav() {
  const [section, setSection] = useState(null)
  const groups = {
    products: productMenu.map((brand) => ({ to: brand.to, label: brand.title })),
    services: [{ to: '/services', label: 'All services' }, ...serviceMenu],
  }
  return (
    <nav id="mobile-nav" className="max-h-[calc(100svh-5rem)] overflow-y-auto border-t border-line bg-ink px-6 py-6 lg:hidden" aria-label="Mobile">
      <ul className="flex flex-col">
        {primaryNav.map((item) => (
          <li key={item.label} className="border-b border-line">
            {item.menu ? (
              <>
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-4 font-display text-3xl tracking-wide uppercase"
                  aria-expanded={section === item.menu}
                  onClick={() => setSection(section === item.menu ? null : item.menu)}
                >
                  {item.label}
                  <span className="text-yellow" aria-hidden="true">
                    {section === item.menu ? '–' : '+'}
                  </span>
                </button>
                {section === item.menu ? (
                  <ul className="pb-4">
                    {item.menu === 'products'
                      ? productMenu.map((brand) => (
                          <li key={brand.to} className="py-2">
                            <Link to={brand.to} className="font-display text-xl text-yellow uppercase">
                              {brand.title}
                            </Link>
                            <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                              {brand.groups.flatMap((group) => group.links).map((link) => (
                                <li key={link.to}>
                                  <Link to={link.to} className="text-sm text-paper/75">
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))
                      : groups[item.menu].map((link) => (
                          <li key={link.to}>
                            <Link to={link.to} className="block py-2 text-base text-paper/85">
                              {link.label}
                            </Link>
                          </li>
                        ))}
                  </ul>
                ) : null}
              </>
            ) : (
              <Link to={item.to} className="block py-4 font-display text-3xl tracking-wide uppercase">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
      <a href="tel:+96895619537" className="mt-6 inline-block text-sm tracking-wide text-yellow">
        +968 9561 9537
      </a>
    </nav>
  )
}

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}
