import { SITE_INFO } from "@/constants/site";
import React from "react";

const AppLogo = () => (
  <p className="uppercase text-xl font-bold">{SITE_INFO.title}</p>
);

export default AppLogo;
