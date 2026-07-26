export const BRAND = {
  name: 'XGYM',
  phone: '04241287775',
  phoneDisplay: '0424 128 7775',
  whatsappBase: 'https://wa.me/584241287775',
  instagram: 'https://www.instagram.com/xgym.ve/',
  instagramHandle: '@xgym.ve',
  address: 'Catia, Recta de Los Magallanes, CC La Laguna, piso 1',
  addressShort: 'CC La Laguna, piso 1 — Catia',
  hours: {
    weekdays: '6:00am – 10:00pm',
    weekend: '9:00am – 4:00pm',
  },
  siteUrl: 'https://xgym.ve',
}

export function waLink(message) {
  return `${BRAND.whatsappBase}?text=${encodeURIComponent(message)}`
}
