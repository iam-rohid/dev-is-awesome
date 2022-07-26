export type ReferanceType = {
  _type: "referance";
  _ref: string;
  _key?: string;
};

export type ImageCropType = {
  bottom: number;
  left: number;
  right: number;
  top: number;
  _type: "sanity.imageCrop";
};

export type ImageHotspotType = {
  height: number;
  width: number;
  x: number;
  y: number;
  _type: "sanity.imageHotspot";
};

export type ImageType = {
  _type: "image";
  asset: ReferanceType;
  crop: ImageCropType;
  hotspot: ImageHotspotType;
};

export type CourseType = {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  coverImage: ImageType;
  excerpt?: string;
  featured?: boolean;
};

export type LessionType = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
};

export type TopicType = {
  id: string;
  emoji: string;
  title: string;
  slug: string;
  excerpt?: string;
  body?: string;
};

export type PostType = {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  coverImage: ImageType;
  excerpt?: string;
  body?: string;
  keywords?: string[];
  featured?: boolean;
};

export type TagType = {
  id: string;
  slug: string;
  title?: string;
  description?: string;
  foregroundColor?: string;
  backgroundColor?: string;
};

export type AuthorType = {
  id: string;
  slug: string;
  name: string;
  avatar?: ImageType;
  bio?: string;
  twitter?: string;
  instagram?: string;
};

export type PostWithAuthorAndTags = PostType & {
  tags: TagType[];
  author: AuthorType;
};
