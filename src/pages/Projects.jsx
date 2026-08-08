import { useMemo, useState } from 'react'
import { PROJECTS, PAST_PROJECTS, CATEGORIES } from '../data/projects'
import { Eyebrow, Tag, Badge } from '../components/ui'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'

export default function Projects() {
  const [category, setCategory] = useState('All')

  const filtered = useMemo(
    () => (category === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === category)),
    [category],
  )

  return (
    <>
      <section className="page-head">
        <div className="wrap section-head">
          <Eyebrow rule>Portfolio</Eyebrow>
          <h1 className="sg-display h-page">Projects in Raipur</h1>
          <p className="lede">
            Homes at Khamardih and a commercial centre at Pachpedi Naka, with two more delivered before them. Every
            project RERA registered.
          </p>
        </div>
      </section>

      <section className="wrap section">
        <div className="filter-bar" style={{ marginBottom: 'var(--space-7)' }}>
          <div className="filter-bar__tags">
            {CATEGORIES.map((c) => (
              <Tag key={c} selected={category === c} onClick={() => setCategory(c)}>
                {c}
              </Tag>
            ))}
          </div>
          <span className="filter-bar__meta">
            {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
          </span>
        </div>

        {filtered.length ? (
          <div className="project-grid">
            {filtered.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="no-results">No projects match this filter.</p>
        )}
      </section>

      {/* ---------- Delivered ---------- */}
      <section className="section section--sunken">
        <div className="wrap">
          <Reveal className="section-head" style={{ marginBottom: 'var(--space-6)' }}>
            <Eyebrow rule>Delivered</Eyebrow>
            <h2 className="sg-display h-section">Built before this one.</h2>
            <p className="lede">
              The record behind the two projects above, and the reason people who bought from us once tend to come back.
            </p>
          </Reveal>

          <div className="project-grid">
            {PAST_PROJECTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <div className="sg-card sg-card--pad-lg" style={{ height: '100%' }}>
                  <Badge tone="neutral">{p.category}</Badge>
                  <h3 className="sg-display h-card" style={{ marginTop: 'var(--space-4)' }}>
                    {p.name}
                  </h3>
                  <p style={{ marginTop: 'var(--space-3)', fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-soft)' }}>
                    {p.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
