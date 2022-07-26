import DefaultLayout from "@/layouts/DefaultLayout";
import sanityClient from "@/lib/sanityClient";
import { CustomNextPage } from "@/types/next";
import {
  PostWithAuthorAndTags,
  SlugType,
  TagType,
} from "@/types/sanity-api-types";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { useState } from "react";
import DefaultPostCard from "@/components/cards/DefaultPostCard";

type Props = {
  tag: TagType;
  posts: PostWithAuthorAndTags[];
  postsCount: number;
};

const TagPage: CustomNextPage<Props> = (props) => {
  const [posts, setPosts] = useState(props.posts);

  return (
    <>
      <div className="my-16 md:my-32">
        <div className="container mx-auto px-4 text-center xl:max-w-7xl">
          <h1 className="text-4xl font-black">{props.tag.title}</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {props.postsCount} Posts
          </p>
        </div>
      </div>
      <div className="container mx-auto my-16 px-4 md:my-32 xl:max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <DefaultPostCard item={post} key={post._id} />
          ))}
        </div>
      </div>
    </>
  );
};

TagPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default TagPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const tags: { slug: SlugType }[] = await sanityClient.fetch(
    `*[_type == "tag"]{slug}`
  );
  const paths = tags.map((item) => `/tags/${item.slug.current}`);
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

  const tag = await sanityClient.fetch(
    `*[_type == "tag" && slug.current == $tag][0]`,
    {
      tag: slug,
    }
  );

  const posts = await sanityClient.fetch(
    `*[_type == "post" && $tagId in tags[]._ref]{
      ...,
      author->,
      "tags": *[_type == "tag" && _id in ^.tags[]._ref]
    } | order(publishedAt desc, title asc)[0..9]`,
    { tagId: tag._id }
  );

  const postsCount = await sanityClient.fetch(
    `count(*[_type == "post" && $tagId in tags[]._ref])`,
    { tagId: tag._id }
  );

  return {
    props: {
      tag,
      posts,
      postsCount,
    },
  };
};
