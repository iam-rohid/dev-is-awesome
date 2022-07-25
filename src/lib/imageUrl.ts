import { ImageType } from "@/types/sanity-api-types";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "./sanityClient";

const builder = imageUrlBuilder(sanityClient);

export default function imageUrl(source: ImageType) {
  return builder.image(source);
}
