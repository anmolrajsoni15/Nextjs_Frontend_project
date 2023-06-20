import Image from "next/image";
import Link from "next/link";

import type { PostOrPage } from "@tryghost/content-api";
import type { Metadata } from "next";
import { format } from "date-fns";
import React from "react";
import { getSinglePost } from "../../../lib/ghost-client";
import "../../style.css";

// SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  let post = await getSinglePost(params.slug);
  if (post === undefined) {
    return {
      title: "404",
      description: "404",
      keywords: "404",
      openGraph: {
        title: "404",
        description: "404",
        url: "404",
        images: [
          {
            url: "404",
          },
        ],
        locale: "404",
      },
    };
  } else {
    const metaData: PostOrPage = post;
    let tags = metaData?.tags?.map((item) => item.name);
    return {
      title: metaData.title,
      description: metaData.meta_description,
      openGraph: {
        title: metaData.title,
        description: metaData.excerpt,
        url: metaData.url,
        images: [
          {
            url: metaData.feature_image || '',
          },
        ],
      },
    };
  }
}

async function Read({ params }: { params: { slug: string } }) {
  const getPost = await getSinglePost(params.slug);

  return (
    <>
      <main className="flex flex-col w-full items-center justify-start pb-24">
        <div className="w-11/12 lg:w-4/5 py-24 flex flex-col justify-center gap-16">
          <div className="flex flex-col gap-8 w-full items-center justify-center">
            <div className="font-inter font-semibold text-base leading-6 text-[#28A1FF]">
              Published{" "}
              {getPost?.published_at ? (
                <time
                  className=""
                  dateTime={getPost?.published_at}
                  title={format(
                    new Date(getPost?.published_at || ""),
                    "yyyy-MM-dd"
                  )}
                >
                  {format(
                    new Date(getPost?.published_at || ""),
                    "dd MMMM yyyy"
                  )}
                </time>
              ) : (
                ""
              )}
            </div>
            <div className="text-center font-medium font-poppins text-4xl leading-[44px] lg:text-5xl lg:leading-[58px]">
              {getPost?.title || ""}
            </div>
            <div className="text-center text-xl leading-8 font-inter font-normal text-[#A1A1AA]">
              {getPost?.excerpt || ""}
            </div>
            <div className="flex flex-row flex-wrap gap-2 items-center justify-center">
              {getPost?.tags?.map((item,index) => {
                return (
                  <span key={index} className="py-1 px-3 border border-solid rounded-2xl border-[#3C3C3C] font-inter font-medium text-sm leading-5">
                    <Link href={`/blog/tags/${item.slug}`}>{item.name}</Link>
                  </span>
                );
              })}
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
            <Image
              src={getPost?.feature_image || '/images/blog_images/SampleBlog.jpg'}
              alt={getPost?.feature_image_alt || ""}
              width={800}
              height={530}
            />
          </div>
        </div>
        <div className="content w-11/12 lg:w-4/5 flex flex-col items-center">
          <div className="flex flex-col gap-6 w-11/12 items-start justify-center">
            <div
              className="htmlClass"
              dangerouslySetInnerHTML={{ __html: getPost?.html! }}
            ></div>
          </div>
        </div>
      </main>
    </>
  );
}
export default Read;
