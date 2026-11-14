import { Container, TextLink, usePageMeta } from '../components/site/ui'

export default function NotFound() {
  usePageMeta('Page not found', 'The page you are looking for could not be found.')
  return (
    <section className="flex min-h-[80svh] items-end bg-ink px-4 pt-36 pb-20 sm:px-6 lg:px-8">
      <Container className="w-full">
        <p className="text-[11px] tracking-[0.28em] text-yellow uppercase">Error 404</p>
        <h1 className="mt-5 font-display text-[clamp(3.2rem,8vw,7.5rem)] leading-[0.86] font-bold uppercase">Page not found.</h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-paper/80">The page may have moved. Use the menu, or start from one of these.</p>
        <div className="mt-10 flex flex-wrap gap-8">
          <TextLink to="/">Home</TextLink>
          <TextLink to="/products">Products</TextLink>
          <TextLink to="/services">Services</TextLink>
          <TextLink to="/parts">Parts</TextLink>
        </div>
      </Container>
    </section>
  )
}
