"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { PostOrPage } from "@tryghost/content-api";
import { format } from "date-fns";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import SampleBlog from '../../../../public/images/blog_images/SampleBlog.jpg'

function BlogCard({ item }: { item: PostOrPage }) {
  return (
    // <Link href='/blog/abcd'>
    <div className="flex flex-col gap-7 p-6 pb-8 w-full h-full hover:bg-zinc-800 rounded-lg">
      <div className="w-full h-auto">
        {item.featured !== null && item.feature_image !== undefined ? (
          <Link href={`/blog/read/${item.slug}`}>
            <Image
              className="w-full mr-0"
              width={item.featured ? 600 : 300}
              height={item.featured ? 300 : 150}
              src={item.feature_image || SampleBlog}
              alt={item.feature_image_alt || item.title || ""}
              style={{width: '100%', height: '240px', objectFit: 'cover', borderRadius: '10px', objectPosition: '50% 50'}}
            />
          </Link>
        ) : (
          " "
        )}
        <div className="flex mt-1">
          {item.published_at !== null && item.published_at !== undefined ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {format(new Date(item.published_at), "dd MMMM, yyyy")}
            </p>
          ) : (
            ""
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400 mx-1"> , </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {item.reading_time} min read
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Link href={`/blog/read/${item.slug}`}>
          <div className="flex justify-between items-start">
            <span className="font-spacegrotesk font-medium text-xl leading-6">
              {item.title}
            </span>
            <ArrowOutwardIcon />
          </div>
        </Link>
        <div className="font-inter font-normal text-base leading-6 text-[#A1A1AA]">
          {item.excerpt}
        </div>
      </div>
    </div>
    // </Link>
  );
}

export default BlogCard;
