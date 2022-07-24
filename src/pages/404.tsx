import DefaultLayout from "@/layouts/DefaultLayout";
import { CustomNextPage } from "@/types/next";
import Link from "next/link";
import React from "react";

const PageNotFound: CustomNextPage = () => {
  return (
    <div className="mx-auto max-w-4xl py-32 px-4 text-center">
      <div className="prose min-w-0 max-w-full dark:prose-invert lg:prose-xl">
        <h1>Oops!</h1>
        <h3>404 - Page Not Found 😵</h3>
        <p>Seems like the page you are looking for doesn&apos;t exist.</p>
        <Link href="/">
          <a>Go Home</a>
        </Link>
      </div>
    </div>
  );
};

PageNotFound.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default PageNotFound;
