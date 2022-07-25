import { SITE_INFO } from "@/constants/site";
import DefaultLayout from "@/layouts/DefaultLayout";
import { CustomNextPage } from "@/types/next";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";

type Props = {
  posts: any[];
};

const HomePage: CustomNextPage<Props> = () => {
  return (
    <>
      <LandingHeader />
      <section className="my-32">
        <div className="container mx-auto px-4 xl:max-w-5xl">
          <SectionHeader title="Featured Courses" />
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8 lg:row-span-2">
              <TitleInsideThumbCard />
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <TopThumbBottomContentCard
                title="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                thumb="https://images.unsplash.com/photo-1650724668061-a755d0dd744f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1337&q=80"
                href="#"
                tags={[
                  {
                    label: "TypeScript",
                    href: "/categories/typescript",
                  },
                  {
                    label: "React",
                    href: "/categories/react",
                  },
                ]}
              />
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <TopThumbBottomContentCard
                title="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                thumb="https://images.unsplash.com/photo-1650724668061-a755d0dd744f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1337&q=80"
                href="#"
                tags={[
                  {
                    label: "TypeScript",
                    href: "/categories/typescript",
                  },
                  {
                    label: "React",
                    href: "/categories/react",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="my-32">
        <div className="container mx-auto px-4 xl:max-w-5xl">
          <SectionHeader title="Featured Tutorials" />
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-6">
              <TopThumbBottomContentCard
                title="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                thumb="https://images.unsplash.com/photo-1650724668061-a755d0dd744f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1337&q=80"
                href="#"
                tags={[
                  {
                    label: "TypeScript",
                    href: "/categories/typescript",
                  },
                  {
                    label: "React",
                    href: "/categories/react",
                  },
                ]}
                excerpt="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus voluptatum laboriosam ducimus autem vel voluptates tempore obcaecati optio amet nihil."
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <TopThumbBottomContentCard
                title="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                thumb="https://images.unsplash.com/photo-1650724668061-a755d0dd744f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1337&q=80"
                href="#"
                tags={[
                  {
                    label: "TypeScript",
                    href: "/categories/typescript",
                  },
                  {
                    label: "React",
                    href: "/categories/react",
                  },
                ]}
                excerpt="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus voluptatum laboriosam ducimus autem vel voluptates tempore obcaecati optio amet nihil."
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <TopThumbBottomContentCard
                title="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                thumb="https://images.unsplash.com/photo-1650724668061-a755d0dd744f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1337&q=80"
                href="#"
                tags={[
                  {
                    label: "TypeScript",
                    href: "/categories/typescript",
                  },
                  {
                    label: "React",
                    href: "/categories/react",
                  },
                ]}
                excerpt="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus voluptatum laboriosam ducimus autem vel voluptates tempore obcaecati optio amet nihil."
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <TopThumbBottomContentCard
                title="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                thumb="https://images.unsplash.com/photo-1650724668061-a755d0dd744f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1337&q=80"
                href="#"
                tags={[
                  {
                    label: "TypeScript",
                    href: "/categories/typescript",
                  },
                  {
                    label: "React",
                    href: "/categories/react",
                  },
                ]}
                excerpt="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus voluptatum laboriosam ducimus autem vel voluptates tempore obcaecati optio amet nihil."
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

HomePage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default HomePage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      posts: [],
    },
  };
};

const LandingHeader = () => (
  <header className="my-32 text-center lg:my-48">
    <div className="container mx-auto px-4 xl:max-w-5xl">
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

const SectionHeader = ({ title, desc }: { title: string; desc?: string }) => (
  <div className="mb-8">
    <p className="text-3xl font-bold">{title}</p>
    {!!desc && <p className="mt-2  text-gray-600 dark:text-gray-300">{desc}</p>}
  </div>
);

const LeftTitleRightThumbCard = () => (
  <article className="flex flex-col gap-4">
    <div className="flex gap-4">
      <div className="flex-1">
        <h2 className="mb-2 text-xl font-bold leading-relaxed">
          <Link href="">
            <a>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum!
            </a>
          </Link>
        </h2>
        <ul className="flex gap-4">
          <li>
            <Link href="/">
              <a>TypeScript</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>React</a>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <Link href="/">
          <a className="group relative block aspect-video w-36 overflow-hidden rounded-xl md:w-48">
            <Image
              src="https://images.unsplash.com/photo-1650724668061-a755d0dd744f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1337&q=80"
              alt="thumbnail"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-center opacity-0 group-hover:opacity-100">
              <p className="text-white">Read More</p>
            </div>
          </a>
        </Link>
      </div>
    </div>
    <p className="text-gray-600 line-clamp-2 dark:text-gray-300">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas minima
      temporibus deleniti amet doloremque fuga deserunt blanditiis quia tempore
      ea aliquam fugiat, facilis ad quidem distinctio nostrum voluptates cumque
      illum. Officiis, asperiores!
    </p>
  </article>
);

const TopThumbBottomContentCard = (props: {
  title: string;
  thumb: string;
  href: string;
  excerpt?: string;
  tags?: {
    label: string;
    href: string;
  }[];
}) => (
  <article>
    <Link href={props.href}>
      <a className="group relative mb-4 block aspect-video w-full overflow-hidden rounded-xl">
        <Image
          src={props.thumb}
          alt="thumbnail"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-center opacity-0 group-hover:opacity-100">
          <p className="text-white">Read More</p>
        </div>
      </a>
    </Link>

    <div>
      <h2 className="text-2xl font-bold leading-snug">
        <Link href={props.href}>
          <a>{props.title}</a>
        </Link>
      </h2>
      {!!props.tags && props.tags.length > 0 && (
        <ul className="mt-2 flex gap-4">
          {props.tags.map((tag, index) => (
            <li key={index}>
              <Link href={tag.href}>
                <a>{tag.label}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {!!props.excerpt && (
        <p className="mt-2 text-gray-600 line-clamp-2 dark:text-gray-300">
          {props.excerpt}
        </p>
      )}
    </div>
  </article>
);

const TitleInsideThumbCard = () => (
  <article className="relative aspect-square overflow-hidden rounded-xl bg-gray-500">
    <Image
      src="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80"
      alt="thumbnail"
      layout="fill"
      objectFit="cover"
    />
    <div className="absolute inset-0 flex flex-col justify-end p-8">
      <h2 className="text-4xl font-bold leading-snug text-white">
        <Link href="#">
          <a>Lorem ipsum dolor sit amet consectetur adipisicing elit.</a>
        </Link>
      </h2>
    </div>
  </article>
);
