import { Link } from '../lib/router'
import { BRAND, LOGO } from '../data/site'

/**
 * The header/footer lockup: the gem mark beside the wordmark.
 * The mark is the only place the logo's vermilion appears — never in UI.
 */
export default function BrandLockup({ reversed = false, onNavigate }) {
  return (
    <Link
      to="/"
      className={`brand-lockup${reversed ? ' brand-lockup--reversed' : ''}`}
      onNavigate={onNavigate}
      aria-label={`${BRAND.name} — home`}
    >
      <img className="brand-lockup__mark" src={LOGO.mark} alt="" width="48" height="38" />
      <span className="brand-lockup__text">
        <span className="brand-lockup__name">SUMEET GROUP</span>
        <span className="brand-lockup__sub">RAIPUR · CHHATTISGARH</span>
      </span>
    </Link>
  )
}
