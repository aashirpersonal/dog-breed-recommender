// src/app/layout.tsx

import { Metadata } from 'next'
import StyledComponentsRegistry from '@/lib/registry'

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
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}