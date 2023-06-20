'use client'

import React from 'react'
import BlogCard from './BlogCard'
import Link from 'next/link'
import { getPosts } from '../../lib/ghost-client'
import { useState, useEffect } from 'react';
import type { PostOrPage } from "@tryghost/content-api";

export default function RightPart() {
  const [posts, setPosts] = useState<PostOrPage[]>([]);

  useEffect(() => {
    async function fetchData() {
      const posts = await getPosts();
      setPosts(posts);
    }
    fetchData();
  }, []);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 gap-x-8'>
      {posts?.map(item => {
        return <BlogCard key={item.uuid} item={item} />
      })}
    </div>
  )
}