import { PostWithAuthorAndTags } from "@/types/sanity-api-types";
import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import imageUrl from "@/lib/imageUrl";

const DefaultPostCard = ({ item }: { item: PostWithAuthorAndTags }) => {
  const postLink = useMemo(() => `/posts/${item.slug.current}`, [item]);

  return (
    <article>
      <Link href={postLink}>
        <a className="group relative block aspect-video overflow-hidden rounded-xl">
          <Image
            src={imageUrl(item.coverImage).url()}
            alt={`${item.title} - Cover Image`}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 backdrop-blur-sm group-hover:opacity-100 dark:text-white">
            <p>Read More</p>
          </div>
        </a>
      </Link>
      {item.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <li key={tag._id}>
              <Link href={`/tags/${tag.slug.current}`}>
                <a
                  className="rounded-md border border-gray-200 bg-gray-100 px-2 py-1.5 text-sm hover:brightness-95 dark:border-gray-800 dark:bg-gray-900 dark:hover:brightness-75"
                  style={{
                    backgroundColor: tag.backgroundColor,
                    color: tag.foregroundColor,
                  }}
                >
                  #{tag.slug.current}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <h2 className="mt-4 text-2xl font-bold line-clamp-2">
        <Link href={postLink}>{item.title}</Link>
      </h2>
      <p className="mt-2 text-sm uppercase text-gray-600 line-clamp-2 dark:text-gray-300">
        <span>
          <b>{moment(item.publishedAt).format("MMM DD, YYYY")}</b>
        </span>{" "}
        •{" "}
        <span>
          By{" "}
          <Link href={`/authors/${item.author.slug.current}`}>
            <a>
              <b>{item.author.name}</b>
            </a>
          </Link>
        </span>
      </p>
    </article>
  );
};

export default DefaultPostCard;
