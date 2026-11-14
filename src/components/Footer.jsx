import { Link } from 'react-router-dom'
import { partsMenu, productMenu, serviceMenu } from '../data/catalog/navigation'
import { company } from '../data/content'
import Logo from './Logo'

const companyLinks = [
  { to: '/', label: 'Home' },
  { to: '/company', label: 'Company profile' },
  { to: '/company#values', label: 'Core values' },
  { to: '/company#why', label: 'Why choose YES' },
  { to: '/#industries', label: 'Industries' },
  { to: '/#contact', label: 'Contact' },
]

function Column({ title, links }) {
  return (
    <div>
      <h2 className="text-xs tracking-[0.2em] text-yellow uppercase">{title}</h2>
      <ul className="mt-4 space-y-2">
        {links.map((item) => (
          <li key={item.to}>
            <Link className="text-sm hover:text-yellow" to={item.to}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1440px] gap-12 sm:grid-cols-2 lg:grid-cols-6">
        <div className="sm:col-span-2">
          <Logo />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist">
            Heavy equipment, engine and transmission servicing, genuine parts and field support across the Sultanate of
            Oman.
          </p>
          <p className="mt-4 text-sm text-paper">{company.tagline}</p>
          <address className="mt-6 text-sm leading-relaxed not-italic text-mist">
            {company.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <ul className="mt-4 space-y-1 text-sm">
            {company.phones.map((phone) => (
              <li key={phone}>
                <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
              </li>
            ))}
          </ul>
          <a className="mt-2 inline-block text-sm break-all" href={`mailto:${company.email}`}>
            {company.email}
          </a>
        </div>
        <Column title="Company" links={companyLinks} />
        <Column title="Products" links={[{ to: '/products', label: 'All products' }, ...productMenu.map((brand) => ({ to: brand.to, label: brand.title }))]} />
        <Column title="Services" links={serviceMenu} />
        <Column title="Parts" links={[{ to: '/parts', label: 'All parts' }, ...partsMenu.map((item) => ({ to: item.to, label: item.label }))]} />
      </div>
      <div className="mx-auto mt-12 flex max-w-[1440px] flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-xs tracking-[0.14em] text-mist uppercase">
        <p>© {new Date().getFullYear()} Yellow Equipment Services LLC. All rights reserved.</p>
        <a href="#main">Back to top</a>
      </div>
    </footer>
  )
}
