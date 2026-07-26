import { Helmet } from 'react-helmet-async'

const SITE = 'https://xgym.ve'
const DEFAULT_IMAGE = `${SITE}/og-cover.jpg`

export default function SEO({ title, description, path = '/', image, keywords }) {
  const fullTitle = `${title} | XGYM`
  const url = `${SITE}${path}`
  const ogImage = image ? `${SITE}${image}` : DEFAULT_IMAGE

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="XGYM" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="es_VE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}
