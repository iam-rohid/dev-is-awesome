import DefaultPostCard from "@/components/cards/DefaultPostCard";
import FeaturedPostCard from "@/components/cards/FeaturedPostCard";
import TagCell from "@/components/cards/TagCell";
import SectionHeader from "@/components/SectionHeader";
import { SITE_INFO } from "@/constants/site";
import DefaultLayout from "@/layouts/DefaultLayout";
import imageUrl from "@/lib/imageUrl";
import sanityClient from "@/lib/sanityClient";
import { CustomNextPage } from "@/types/next";
import {
  CourseType,
  PostType,
  PostWithAuthorAndTags,
  TagType,
} from "@/types/sanity-api-types";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect } from "react";

type Props = {
  featuredCourses: CourseType[];
  featuredPosts: PostType[];
  recentPosts: PostWithAuthorAndTags[];
  popularTags: TagType[];
  popularPosts: PostType[];
};

const HomePage: CustomNextPage<Props> = (props) => {
  useEffect(() => {
    console.log(props);
  }, [props]);

  const {
    featuredCourses,
    featuredPosts,
    recentPosts,
    popularTags,
    popularPosts,
  } = props;
  return (
    <>
      <LandingHeader />
      <FeaturedCoursesSection data={featuredCourses} />
      <FeaturedPostsSection data={featuredPosts} />
      <div className="container mx-auto my-32 flex flex-col gap-16 px-4 md:flex-row xl:max-w-7xl">
        <div className="flex-1">
          <RecentPostsSection data={recentPosts} />
        </div>
        <div className="flex flex-col gap-16 md:w-80">
          <PopularTagsSection data={popularTags} />
          <PopularPostsSection data={popularPosts} />
        </div>
      </div>
    </>
  );
};

HomePage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default HomePage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const featuredCourses = await sanityClient.fetch(
    `*[_type == "course" && featured == true] | order(publishedAt desc, title asc)[0..2]{
      "id": _id,
      title,
      coverImage,
      "slug": slug.current
    }`
  );
  const featuredPosts = await sanityClient.fetch(
    `*[_type == "post" && featured == true] | order(publishedAt desc, title asc)[0..3]{
      "id": _id,
      title,
      coverImage,
      "slug": slug.current,
    }`
  );
  const recentPosts = await sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc, title asc)[0..9]{
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
  const popularTags = await sanityClient.fetch(
    `*[_type == "tag"] | order(_createdAt desc, title asc)[0..9]{
      "id": _id,
      backgroundColor,
      foregroundColor,
      "slug": slug.current,
    }`
  );
  const popularPosts = await sanityClient.fetch(
    `*[_type == "post"] | order(_createdAt desc, title asc)[0..2]{
      "id": _id,
      title,
      coverImage,
      "slug": slug.current,
    }`
  );
  return {
    props: {
      featuredCourses,
      featuredPosts,
      recentPosts,
      popularTags,
      popularPosts,
    },
  };
};

const FeaturedCoursesSection = (props: { data: CourseType[] }) => {
  const renderItem = useCallback((item: CourseType, index: number) => {
    const href = `/courses/${item.slug}`;
    return (
      <article
        className="col-span-12 md:col-span-6 lg:col-span-4"
        key={item.id}
      >
        <Link href={href}>
          <a className="group relative block aspect-video overflow-hidden rounded-xl">
            <Image
              src={imageUrl(item.coverImage).width(395).url()}
              alt={`${item.title} - Cover Image`}
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100">
              <p>View Course</p>
            </div>
          </a>
        </Link>
        <div className="mt-4 flex gap-4">
          <div className="h-full border-r border-gray-500 pr-4 text-3xl text-gray-500 dark:border-gray-400 dark:text-gray-400">
            <span>{index + 1}</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold line-clamp-2">
              <Link href={href}>{item.title}</Link>
            </h2>
          </div>
        </div>
      </article>
    );
  }, []);

  if (props.data && props.data.length === 0) {
    return null;
  }

  return (
    <section className="my-32" id="featured-courses">
      <div className="container mx-auto px-4 xl:max-w-7xl">
        <SectionHeader
          title="Featured Courses"
          moreLink={{
            label: "All Courses",
            href: "/courses",
          }}
        />
        <div className="grid grid-cols-12 gap-8">
          {props.data.map((item, index) => renderItem(item, index))}
        </div>
      </div>
    </section>
  );
};

const FeaturedPostsSection = (props: { data: PostType[] }) => {
  if (props.data && props.data.length === 0) {
    return null;
  }

  return (
    <section className="my-32" id="featured-posts">
      <div className="container mx-auto px-4 xl:max-w-7xl">
        <SectionHeader
          title="Featured Posts"
          moreLink={{
            label: "All Posts",
            href: "/posts",
          }}
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {props.data.map((item, index) => (
            <FeaturedPostCard data={item} pos={index + 1} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

const RecentPostsSection = (props: { data: Props["recentPosts"] }) => {
  if (props.data && props.data.length === 0) {
    return null;
  }
  return (
    <section>
      <SectionHeader
        title="Recent Posts"
        moreLink={{
          label: "All Posts",
          href: "/posts",
        }}
      />
      <div className="grid gap-8 lg:grid-cols-2">
        {props.data.map((item) => (
          <DefaultPostCard item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};

const LandingHeader = () => (
  <header className="my-32 text-center lg:my-48">
    <div className="container mx-auto px-4 xl:max-w-4xl">
      <div className="prose min-w-0 max-w-none dark:prose-invert md:prose-lg lg:prose-xl">
        <h1>
          Learn <span style={{ color: "#0EA5E9" }}>Web</span> &{" "}
          <span style={{ color: "#A755F7" }}>Mobile</span> <br /> Development in{" "}
          <span style={{ color: "#EC4899" }}>Modern Way</span>.{" "}
        </h1>
        <p>
          In <b>{SITE_INFO.domain}</b> you will find{" "}
          <Link href="/tutorials">
            <a>Tutorials</a>
          </Link>{" "}
          and{" "}
          <Link href="/courses">
            <a>Courses</a>
          </Link>{" "}
          which will help you learn and build <b>Web</b> & <b>Mobile</b> apps in
          the most <b>Fun</b> &<b>Modern</b> way possible. BTW{" "}
          <b>everything is for free!</b>{" "}
        </p>
      </div>
    </div>
  </header>
);

const PopularTagsSection = (props: { data: TagType[] }) => {
  if (props.data.length === 0) return null;

  return (
    <section>
      <SectionHeader
        title="Popular Tags"
        moreLink={{
          label: "All Tags",
          href: "/tags",
        }}
      />
      <ul className="flex flex-wrap gap-2">
        {props.data.map((item, index) => (
          <li key={item.id}>
            <TagCell data={item} />
          </li>
        ))}
      </ul>
    </section>
  );
};

const PopularPostsSection = (props: { data: PostType[] }) => {
  if (props.data.length === 0) return null;

  return (
    <section id="popular-posts">
      <SectionHeader
        title="Popular Posts"
        moreLink={{
          label: "All Posts",
          href: "/posts",
        }}
      />
      <div className="grid gap-8">
        {props.data.map((item, index) => (
          <FeaturedPostCard data={item} pos={index + 1} key={item.id} />
        ))}
      </div>
    </section>
  );
};
