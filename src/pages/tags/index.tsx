import TagCell from "@/components/cards/TagCell";
import DefaultLayout from "@/layouts/DefaultLayout";
import sanityClient from "@/lib/sanityClient";
import { CustomNextPage } from "@/types/next";
import { TagType } from "@/types/sanity-api-types";
import { GetStaticProps } from "next";
import React from "react";

type Props = {
  tags: TagType[];
};

const TagsPage: CustomNextPage<Props> = (props) => {
  return (
    <>
      <div className="my-16 md:my-32">
        <div className="container mx-auto px-4 text-center xl:max-w-7xl">
          <h1 className="text-4xl font-black">All Tags</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {props.tags.length} Tags
          </p>
        </div>
      </div>
      <div className="container mx-auto my-16 px-4 md:my-32 xl:max-w-4xl">
        <ul className="flex flex-wrap gap-4">
          {props.tags.map((item) => (
            <li key={item._id}>
              <TagCell data={item} size="large" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

TagsPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default TagsPage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const tags = await sanityClient.fetch(
    `*[_type == "tag"] | order(_createdAt desc, title asc)`
  );
  return {
    props: {
      tags,
    },
  };
};
