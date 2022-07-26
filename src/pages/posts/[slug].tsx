import DefaultLayout from "@/layouts/DefaultLayout";
import sanityClient from "@/lib/sanityClient";
import { CustomNextPage } from "@/types/next";
import { PostWithAuthorAndTags, SlugType } from "@/types/sanity-api-types";
import moment from "moment";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import imageUrl from "@/lib/imageUrl";
import readingTime, { ReadTimeResults } from "reading-time";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import TagCell from "@/components/cards/TagCell";

type Props = {
  post: PostWithAuthorAndTags;
  timeStats: ReadTimeResults;
  mdxSource: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
};

const PostPage: CustomNextPage<Props> = (props) => {
  useEffect(() => {
    console.log(props);
  }, [props]);

  const { post, mdxSource, timeStats } = props;
  return (
    <div className="container mx-auto my-16 flex gap-16 px-4 xl:max-w-7xl">
      <div className="flex-1 overflow-hidden">
        <div>
          <h1 className="text-5xl font-black">{post.title}</h1>
          <p className="mt-4 uppercase text-gray-600 dark:text-gray-300">
            <span>
              Published at{" "}
              <b>{moment(post.publishedAt).format("MMM DD, YYYY")}</b>
            </span>{" "}
            •{" "}
            <span>
              By{" "}
              <Link href={`/authors/${post.author.slug.current}`}>
                <a>
                  <b>{post.author.name}</b>
                </a>
              </Link>
            </span>{" "}
            • <span>{timeStats.text}</span>
          </p>
          <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl">
            <Image
              src={imageUrl(post.coverImage).url()}
              alt={`${post.title} - Cover Image`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="prose min-w-0 max-w-none py-8 dark:prose-invert lg:prose-xl lg:px-8">
          <MDXRemote {...mdxSource} />
        </div>
      </div>
      <div className="hidden w-64 flex-col gap-16 lg:flex">
        <ul className="flex flex-wrap gap-2">
          {post.tags.map((item) => (
            <li key={item._id}>
              <TagCell data={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

PostPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await sanityClient.fetch(`*[_type == "post"]{slug}`)).map(
    (item: { slug: SlugType }) => `/posts/${item.slug.current}`
  );
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const slug = context.params ? context.params["slug"] : undefined;
  if (!slug || typeof slug !== "string") {
    return {
      notFound: true,
    };
  }
  const post = await sanityClient.fetch(
    `*[_type == "post" && $slug == slug.current][0]{
      ...,
      author->,
      "tags":  *[_type == "tag" && _id in ^.tags[]._ref]
    }`,
    {
      slug,
    }
  );
  const mdxSource = await serialize(post.body);

  const stats = readingTime(post.body);
  return {
    props: {
      post,
      timeStats: stats,
      mdxSource,
    },
  };
};
