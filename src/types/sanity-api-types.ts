export type ReferanceType = {
  _type: "referance";
  _ref: string;
  _key?: string;
};

export type SlugType = {
  _type: "slug";
  current: string;
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
  _type: "course";
  _id: string;
  _rev: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  excerpt?: string;
  featured?: boolean;
  slug: SlugType;
  publishedAt: string;
  coverImage: ImageType;
};

export type LessionType = {
  _type: "lession";
  _id: string;
  _rev: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: SlugType;
  excerpt?: string;
};

export type TopicType = {
  _type: "topic";
  _id: string;
  _rev: string;
  _createdAt: string;
  _updatedAt: string;
  emoji: string;
  title: string;
  slug: SlugType;
  excerpt: string;
  body: string;
};

export type PostType = {
  _type: "post";
  _id: string;
  _rev: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: SlugType;
  excerpt: string;
  publishedAt: string;
  body: string;
  coverImage: ImageType;
  keywords: string[];
  featured?: boolean;
};

export type TagType = {
  _type: "tag";
  _id: string;
  _rev: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: SlugType;
  description?: string;
  foregroundColor?: string;
  backgroundColor?: string;
};

export type AuthorType = {
  _type: "author";
  _id: string;
  _rev: string;
  _createdAt: string;
  _updatedAt: string;
  avatar: ImageType;
  name: string;
  slug: SlugType;
  bio?: string;
  twitter?: string;
  instagram?: string;
};
