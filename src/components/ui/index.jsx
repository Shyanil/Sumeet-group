/**
 * Sumeet Group design system — core primitives.
 *
 * These mirror the approved component library one-for-one (Button, Badge,
 * Tag, Eyebrow, Stat, Card, Input, Select). Styling lives in
 * styles/components.css so the CSS stays readable as a system rather than
 * scattered through inline style objects.
 */

const cx = (...parts) => parts.filter(Boolean).join(' ')

/* ---------- Button ---------------------------------------- */

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  fullWidth = false,
  disabled = false,
  type = 'button',
  href,
  className,
  ...rest
}) {
  const cls = cx('sg-btn', `sg-btn--${variant}`, `sg-btn--${size}`, fullWidth && 'sg-btn--full', className)
  const content = (
    <>
      {iconLeft ? <span className="sg-btn__icon">{iconLeft}</span> : null}
      {children ? <span>{children}</span> : null}
      {iconRight ? <span className="sg-btn__icon">{iconRight}</span> : null}
    </>
  )

  if (href && !disabled) {
    return (
      <a className={cls} href={href} {...rest}>
        {content}
      </a>
    )
  }
  return (
    <button className={cls} type={type} disabled={disabled} {...rest}>
      {content}
    </button>
  )
}

/* ---------- Badge ----------------------------------------- */

export function Badge({ children, tone = 'neutral', solid = false, dot = false, className, ...rest }) {
  return (
    <span className={cx('sg-badge', `sg-badge--${tone}`, solid && 'sg-badge--solid', className)} {...rest}>
      {dot ? <span className="sg-badge__dot" /> : null}
      {children}
    </span>
  )
}

/* ---------- Tag ------------------------------------------- */

export function Tag({ children, icon, count, selected = false, onClick, href, className, ...rest }) {
  const cls = cx('sg-tag', selected && 'sg-tag--selected', className)
  const inner = (
    <>
      {icon ? <span className="sg-tag__icon">{icon}</span> : null}
      <span>{children}</span>
      {count != null ? <span className="sg-tag__count">{count}</span> : null}
    </>
  )

  if (href) {
    return (
      <a className={cls} href={href} {...rest}>
        {inner}
      </a>
    )
  }
  if (onClick) {
    return (
      <button type="button" className={cls} onClick={onClick} aria-pressed={selected} {...rest}>
        {inner}
      </button>
    )
  }
  return (
    <span className={cls} {...rest}>
      {inner}
    </span>
  )
}

/* ---------- Eyebrow --------------------------------------- */

export function Eyebrow({ children, tone = 'gold', rule = false, className, ...rest }) {
  return (
    <span className={cx('sg-eyebrow-c', tone !== 'gold' && `sg-eyebrow-c--${tone}`, className)} {...rest}>
      {rule ? <span className="sg-eyebrow-c__rule" /> : null}
      {children}
    </span>
  )
}

/* ---------- Stat ------------------------------------------ */

export function Stat({ value, label, sub, size = 'md', tone = 'light', className, ...rest }) {
  return (
    <div
      className={cx('sg-stat', `sg-stat--${size}`, tone === 'ondark' && 'sg-stat--ondark', className)}
      {...rest}
    >
      <div className="sg-stat__value">{value}</div>
      {label ? <div className="sg-stat__label">{label}</div> : null}
      {sub ? <div className="sg-stat__sub">{sub}</div> : null}
    </div>
  )
}

/* ---------- Card ------------------------------------------ */

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  interactive = false,
  facet = false,
  className,
  ...rest
}) {
  return (
    <div
      className={cx(
        'sg-card',
        variant !== 'default' && `sg-card--${variant}`,
        `sg-card--pad-${padding}`,
        interactive && 'sg-card--interactive',
        facet && 'sg-card--facet',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

/* ---------- Input ----------------------------------------- */

const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-')

export function Input({
  label,
  hint,
  error,
  required = false,
  prefix,
  suffix,
  multiline = false,
  id,
  className,
  ...rest
}) {
  const fieldId = id || (label ? `sg-${slug(label)}` : undefined)
  const Control = multiline ? 'textarea' : 'input'
  return (
    <div className={cx('sg-field', error && 'sg-field--error', className)}>
      {label ? (
        <label className="sg-field__label" htmlFor={fieldId}>
          {label}
          {required ? <span className="sg-field__req">*</span> : null}
        </label>
      ) : null}
      <div className="sg-field__wrap">
        {prefix ? <span className="sg-field__affix sg-field__affix--prefix">{prefix}</span> : null}
        <Control
          id={fieldId}
          className={cx('sg-input', prefix && 'sg-input--has-prefix', suffix && 'sg-input--has-suffix')}
          aria-invalid={!!error}
          aria-describedby={error || hint ? `${fieldId}-hint` : undefined}
          required={required}
          {...rest}
        />
        {suffix ? <span className="sg-field__affix sg-field__affix--suffix">{suffix}</span> : null}
      </div>
      {error || hint ? (
        <span className="sg-field__hint" id={`${fieldId}-hint`}>
          {error || hint}
        </span>
      ) : null}
    </div>
  )
}

/* ---------- Select ---------------------------------------- */

export function Select({
  label,
  hint,
  required = false,
  placeholder,
  options = [],
  children,
  id,
  value,
  defaultValue,
  className,
  ...rest
}) {
  const fieldId = id || (label ? `sg-sel-${slug(label)}` : undefined)
  const isPlaceholder = (value ?? defaultValue ?? '') === '' && !!placeholder
  return (
    <div className={cx('sg-selfield', className)}>
      {label ? (
        <label className="sg-selfield__label" htmlFor={fieldId}>
          {label}
          {required ? <span className="sg-selfield__req">*</span> : null}
        </label>
      ) : null}
      <div className="sg-select-wrap">
        <select
          id={fieldId}
          className="sg-select"
          data-placeholder={isPlaceholder}
          value={value}
          defaultValue={defaultValue}
          required={required}
          {...rest}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((o) => {
            const opt = typeof o === 'string' ? { value: o, label: o } : o
            return (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            )
          })}
          {children}
        </select>
        <span className="sg-select-chevron" aria-hidden="true">
          <ChevronDown />
        </span>
      </div>
      {hint ? <span className="sg-selfield__hint">{hint}</span> : null}
    </div>
  )
}

/* ---------- Icons ----------------------------------------- */
/* Line icons drawn to match the facet motif — thin, geometric, 1.7 stroke. */

export const ArrowRight = () => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const ArrowLeft = () => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="20" height="20">
    <path d="M16 10H5M9 5L4 10l5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const ChevronDown = () => (
  <svg viewBox="0 0 20 20" fill="none" width="17" height="17" aria-hidden="true">
    <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const Menu = () => (
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22" aria-hidden="true">
    <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
)

export const Close = () => (
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
)

export const Check = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
    <path d="M5 12l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const Expand = () => (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
    <path
      d="M9 4H4v5M15 4h5v5M15 20h5v-5M9 20H4v-5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
