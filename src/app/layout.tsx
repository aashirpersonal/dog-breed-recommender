// src/app/layout.tsx

import { Metadata } from 'next'
import StyledComponentsRegistry from '@/lib/registry'
import Header from '@/components/Header'
import FuturisticFooter from '@/components/FuturisticFooter';

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
          {children}
          <FuturisticFooter />
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}