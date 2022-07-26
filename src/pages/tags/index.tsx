import DefaultLayout from "@/layouts/DefaultLayout";
import sanityClient from "@/lib/sanityClient";
import { CustomNextPage } from "@/types/next";
import { TagType } from "@/types/sanity-api-types";
import { GetStaticProps } from "next";
import Link from "next/link";
import React, { useCallback } from "react";

type TagWithPostCount = TagType & {
  postCount: number;
};

type Props = {
  tags: TagWithPostCount[];
};

const TagsPage: CustomNextPage<Props> = (props) => {
  const renderItem = useCallback((item: TagWithPostCount) => {
    return (
      <li key={item._id}>
        <Link href={`/tags/${item.slug.current}`}>
          <a
            className="flex items-center justify-center rounded-md border border-gray-200 bg-gray-100 py-1.5 px-3.5 font-medium hover:brightness-95 dark:border-gray-800 dark:bg-gray-900 dark:hover:brightness-75"
            style={{
              backgroundColor: item.backgroundColor,
              color: item.foregroundColor,
            }}
          >
            #{item.slug.current} - {item.postCount}
          </a>
        </Link>
      </li>
    );
  }, []);
  return (
    <>
      <header className="my-32">
        <div className="container mx-auto px-4 text-center xl:max-w-7xl">
          <h1 className="text-4xl font-black">All Tags</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {props.tags.length} Tags
          </p>
        </div>
      </header>
      <div className="container mx-auto my-32 px-4 xl:max-w-7xl">
        <ul className="flex flex-wrap gap-4">
          {props.tags.map((item) => renderItem(item))}
        </ul>
      </div>
    </>
  );
};

TagsPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default TagsPage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const tags = await sanityClient.fetch(`*[_type == "tag"]{
    ...,
    "postCount": count(*[_type == "post" && ^._id in tags[]._ref])
  }`);
  return {
    props: {
      tags,
    },
  };
};
