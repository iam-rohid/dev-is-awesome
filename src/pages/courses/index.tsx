import DefaultLayout from "@/layouts/DefaultLayout";
import { CustomNextPage } from "@/types/next";
import React from "react";

type Props = {};

const CoursesPage: CustomNextPage<Props> = () => {
  return <div>CoursesPage</div>;
};

CoursesPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default CoursesPage;
