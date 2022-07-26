import { PostType } from "@/types/sanity-api-types";
import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import imageUrl from "@/lib/imageUrl";

const FeaturedPostCard = ({ data, pos }: { data: PostType; pos: number }) => {
  const postLink = useMemo(() => `/posts/${data.slug}`, [data]);
  return (
    <article>
      <Link href={postLink}>
        <a className="group relative block aspect-video overflow-hidden rounded-xl">
          <Image
            src={imageUrl(data.coverImage).url()}
            alt={`${data.title} - Cover Image`}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 backdrop-blur-sm group-hover:opacity-100 dark:text-white">
            <p>Read More</p>
          </div>
        </a>
      </Link>
      <div className="mt-4 flex gap-4">
        <div className="h-full border-r border-gray-500 pr-4 text-3xl text-gray-500 dark:border-gray-400 dark:text-gray-400">
          <span>{pos}</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold line-clamp-2">
            <Link href={postLink}>{data.title}</Link>
          </h2>
        </div>
      </div>
    </article>
  );
};

export default FeaturedPostCard;
