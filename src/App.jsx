import { lazy, Suspense, useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'

const Company = lazy(() => import('./pages/Company'))
const ProductsIndex = lazy(() => import('./pages/ProductsIndex'))
const AllisonIndex = lazy(() => import('./pages/AllisonIndex'))
const AllisonFamily = lazy(() => import('./pages/AllisonFamily'))
const DanaIndex = lazy(() => import('./pages/DanaIndex'))
const DanaApplication = lazy(() => import('./pages/DanaApplication'))
const FptIndex = lazy(() => import('./pages/FptIndex'))
const FptCategory = lazy(() => import('./pages/FptCategory'))
const OtherEquipment = lazy(() => import('./pages/OtherEquipment'))
const ServicesIndex = lazy(() => import('./pages/ServicesIndex'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const PartsIndex = lazy(() => import('./pages/PartsIndex'))
const PartsDetail = lazy(() => import('./pages/PartsDetail'))
const NotFound = lazy(() => import('./pages/NotFound'))

function useScrollManager() {
  const location = useLocation()
  const previousPath = useRef(location.pathname)

  useEffect(() => {
    const changedPage = previousPath.current !== location.pathname
    previousPath.current = location.pathname
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1))
      let frames = 0
      let handle = 0
      const seek = () => {
        const target = document.getElementById(id)
        if (target) {
          target.scrollIntoView({ behavior: changedPage ? 'auto' : 'smooth', block: 'start' })
          return
        }
        frames += 1
        if (frames < 90) handle = requestAnimationFrame(seek)
      }
      handle = requestAnimationFrame(seek)
      return () => cancelAnimationFrame(handle)
    }
    if (changedPage) window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    return undefined
  }, [location.pathname, location.hash, location.key])
}

function Layout() {
  const location = useLocation()
  const reduce = useReducedMotion()
  useScrollManager()
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-yellow focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Header />
      <motion.main
        id="main"
        key={location.pathname}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Suspense fallback={<div className="min-h-[100svh] bg-ink" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </motion.main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="company" element={<Company />} />
        <Route path="products" element={<ProductsIndex />} />
        <Route path="products/allison" element={<AllisonIndex />} />
        <Route path="products/allison/:slug" element={<AllisonFamily />} />
        <Route path="products/dana" element={<DanaIndex />} />
        <Route path="products/dana/:slug" element={<DanaApplication />} />
        <Route path="products/fpt" element={<FptIndex />} />
        <Route path="products/fpt/:slug" element={<FptCategory />} />
        <Route path="products/other" element={<OtherEquipment />} />
        <Route path="services" element={<ServicesIndex />} />
        <Route path="services/:slug" element={<ServiceDetail />} />
        <Route path="parts" element={<PartsIndex />} />
        <Route path="parts/:slug" element={<PartsDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
