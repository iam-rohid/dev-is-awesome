import DefaultLayout from "@/layouts/DefaultLayout";
import sanityClient from "@/lib/sanityClient";
import { CustomNextPage } from "@/types/next";
import { PostWithAuthorAndTags, TagType } from "@/types/sanity-api-types";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import DefaultPostCard from "@/components/cards/DefaultPostCard";

type Props = {
  posts: PostWithAuthorAndTags[];
  tag: TagType;
  postsCount: number;
};

const TagPage: CustomNextPage<Props> = (props) => {
  const { posts, postsCount, tag } = props;

  return (
    <>
      <div className="my-16 md:my-32">
        <div className="container mx-auto px-4 text-center xl:max-w-7xl">
          <h1 className="text-4xl font-black">{tag.title}</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {postsCount} Posts
          </p>
        </div>
      </div>
      <div className="container mx-auto my-16 px-4 md:my-32 xl:max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <DefaultPostCard item={post} key={post.id} />
          ))}
        </div>
      </div>
    </>
  );
};

TagPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default TagPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const tags: { slug: string }[] = await sanityClient.fetch(
    `*[_type == "tag"]{
      "slug": slug.current
    }`
  );
  const paths = tags.map((item) => `/tags/${item.slug}`);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const slug = context.params ? context.params["slug"] : undefined;

  if (!slug || typeof slug !== "string") {
    return {
      notFound: true,
    };
  }

  const { posts, tag, postsCount } = await sanityClient.fetch(
    `*[_type == "tag" && slug.current == $slug][0]{
      "tag": {
        "id": _id,
        title,
        "slug": slug.current,
        backgroundColor,
        foregroundColor,
      },
      "posts": *[_type == "post" && ^._id in tags[]._ref] | order(publishedAt desc, title asc){
        "id": _id,
        title,
        excerpt,
        publishedAt,
        "slug": slug.current,
        coverImage,
        tags[]->{
          "id": _id,
          backgroundColor,
          foregroundColor,
          "slug": slug.current,
        }, 
        author->{
          "id": _id,
          name,
          "slug": slug.current,
        }
      },
      "postsCount": count(*[_type == "post" && ^._id in tags[]._ref])
    }`,
    {
      slug,
    }
  );

  return {
    props: {
      posts,
      tag,
      postsCount,
    },
  };
};
