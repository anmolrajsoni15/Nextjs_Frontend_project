import Header from "./components/Header";
import Content from "./components/Content";
import React from 'react';
import { getNavigation } from '../lib/ghost-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {

  const Metadata = await getNavigation()

  if (Metadata) {
    return {
      title: Metadata.title,
      description: Metadata.description,
      keywords: ['Next.js', 'React', 'JavaScript'],
    }
  }
  else {
    return {
      title: '404',
      description: '404',
      keywords: '404',
    }
  }

}

function BlogPage() {
  return (
    <main className="flex flex-col w-full text-white">
        <Header />
        <Content />
    </main>
  )
}

export default BlogPage;