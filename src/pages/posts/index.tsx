import DefaultPostCard from "@/components/cards/DefaultPostCard";
import DefaultLayout from "@/layouts/DefaultLayout";
import sanityClient from "@/lib/sanityClient";
import { CustomNextPage } from "@/types/next";
import { PostWithAuthorAndTags } from "@/types/sanity-api-types";
import { GetStaticProps } from "next";
import React, { useEffect } from "react";

type Props = {
  posts: PostWithAuthorAndTags[];
  postsCount: number;
};

const PostsListPage: CustomNextPage<Props> = (props) => {
  useEffect(() => {
    console.log(props);
  }, [props]);

  const { postsCount, posts } = props;
  return (
    <>
      <div className="my-16 md:my-32">
        <div className="container mx-auto px-4 text-center xl:max-w-7xl">
          <h1 className="text-4xl font-black">All Posts</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {postsCount} Posts
          </p>
        </div>
      </div>
      <div className="container mx-auto my-16 px-4 md:my-32 xl:max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((item) => (
            <DefaultPostCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </>
  );
};

PostsListPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default PostsListPage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc, title asc)[0..8]{
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
    }`
  );
  const postsCount = await sanityClient.fetch(`count(*[_type == "post"])`);
  return {
    props: {
      posts,
      postsCount,
    },
  };
};
