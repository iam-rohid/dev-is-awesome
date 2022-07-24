import { SITE_INFO } from "@/constants/site";
import DefaultLayout from "@/layouts/DefaultLayout";
import { CustomNextPage } from "@/types/next";
import { GetStaticProps } from "next";
import Link from "next/link";

type Props = {
  posts: any[];
};

const HomePage: CustomNextPage<Props> = ({ posts }) => {
  return (
    <>
      <LandingHeader />
      <div></div>
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
  <header className="py-32 text-center lg:py-48">
    <div className="mx-auto max-w-4xl px-4">
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
