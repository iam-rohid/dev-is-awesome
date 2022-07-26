import { createClient } from "next-sanity";

export default createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: process.env.NEXT_PUBLIC_VERCEL_ENV === "production",
  apiVersion: "2021-10-21",
});
