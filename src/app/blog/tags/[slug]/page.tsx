// "use client";

import React from "react";
import { notFound } from "next/navigation";
import type { PostsOrPages } from "@tryghost/content-api";
import { getPostsByTag } from "../../../lib/ghost-client";
import Header from "../../components/Header";
import LeftPart from "../../components/LeftPart";
import Dropdown from "../../components/Dropdown";
import BlogCard from "../../components/BlogCard";


async function Tags({ params }: { params: { slug: string } }) {
  let tagPosts: PostsOrPages = await getPostsByTag(params.slug);

  // Handling 404 error

  if (tagPosts.length === 0) {
    notFound();
  }

  return (
    <main className="flex flex-col w-full text-white">
      <Header />
      <div className="w-full flex flex-row gap-16 items-center justify-center pt-7">
        <div className="w-full md:w-4/5 h-[90%] gap-8 md:gap-12 lg:gap-16 flex flex-col md:flex-row mb-24">
          <div className="flex md:hidden">
            <Dropdown path={params.slug} />
          </div>
          <div className="left w-1/4 hidden md:block">
            <LeftPart path={params.slug}/>
          </div>
          <div className="right w-full md:w-3/4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 gap-x-8">
              {tagPosts?.map((item) => {
                return <BlogCard key={item.uuid} item={item} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Tags;
