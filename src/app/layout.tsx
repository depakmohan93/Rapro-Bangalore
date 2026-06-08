import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Providers from '@/components/Providers'

export const metadata: Metadata = {
  title: "Rajam Property | Bangalore's #1 Property Management Service",
  description: "Award-winning property management in Bangalore. Trusted by 1000+ NRIs. No signup fee, verified tenants, 12+ services in one.",
  icons: {
    icon: [
      { url: '/fav_32.png', sizes: '32x32', type: 'image/png' },
      { url: '/fav_256.png', sizes: '256x256', type: 'image/png' },
    ],
    apple: [{ url: '/fav_256.png', sizes: '256x256', type: 'image/png' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-spacing="balanced" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NGXPZKCD');`}
        </Script>
        {/* End Google Tag Manager */}
        <Script
          id="hs-script-loader"
          src="//js-na2.hs-scripts.com/246155920.js"
          strategy="afterInteractive"
        />
      </head>
      <body suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NGXPZKCD"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
