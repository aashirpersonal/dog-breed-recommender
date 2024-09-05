// src/app/page.tsx
import { Metadata } from 'next'
import HomePage from '@/components/HomePage'

export const metadata: Metadata = {
  title: 'Dog Breed Recommender - Find Your Perfect Canine Companion',
  description: 'Discover the ideal dog breed that matches your lifestyle and preferences with our personalized quiz and extensive breed database.',
}

export default function Home() {
  return <HomePage />
}