import { useEffect } from 'react'
import { RouterProvider, useRouter } from './lib/router'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

/** Route table. Detail pages match on the `/projects/:slug` prefix. */
function Screen({ path }) {
  // Treat /about and /about/ as the same route.
  const p = path.length > 1 ? path.replace(/\/+$/, '') : path
  if (p === '/') return <Home />
  if (p === '/projects') return <Projects />
  if (p.startsWith('/projects/')) return <ProjectDetail slug={p.slice('/projects/'.length)} />
  if (p === '/about') return <About />
  if (p === '/contact') return <Contact />
  return <NotFound />
}

const TITLES = {
  '/': 'Sumeet Group — Real estate in Raipur',
  '/projects': 'Projects — Sumeet Group',
  '/about': 'About — Sumeet Group',
  '/contact': 'Contact — Sumeet Group',
}

function Shell() {
  const { path } = useRouter()

  // Keep the document title in step with the route; the detail pages set
  // their own from the project name.
  useEffect(() => {
    if (TITLES[path]) {
      document.title = TITLES[path]
    } else if (path.startsWith('/projects/')) {
      const name = path
        .slice('/projects/'.length)
        .split('-')
        .map((w) => w[0]?.toUpperCase() + w.slice(1))
        .join(' ')
      document.title = `${name} — Sumeet Group`
    } else {
      document.title = 'Not found — Sumeet Group'
    }
  }, [path])

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main className="app__main" id="main">
        <Screen path={path} />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <RouterProvider>
      <Shell />
    </RouterProvider>
  )
}
