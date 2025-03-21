// src/app/layout.tsx

import { Metadata } from 'next'
import StyledComponentsRegistry from '@/lib/registry'
import Header from '@/components/Header'
import FuturisticFooter from '@/components/FuturisticFooter';
import { SpeedInsights } from "@vercel/speed-insights/next"
export const metadata: Metadata = {
  title: 'Dog Breed Recommender',
  description: 'Find your perfect canine companion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Header />
          <SpeedInsights/>
          {children}
          <FuturisticFooter />
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}