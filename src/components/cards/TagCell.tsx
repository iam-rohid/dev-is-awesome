import { TagType } from "@/types/sanity-api-types";
import classNames from "classnames";
import Link from "next/link";
import React from "react";

const TagCell = ({
  data,
  count,
  size = "medium",
}: {
  data: TagType;
  count?: number;
  size?: "small" | "medium" | "large";
}) => {
  return (
    <Link href={`/tags/${data.slug.current}`}>
      <a
        className={classNames(
          "flex items-center justify-center bg-gray-100 font-medium hover:brightness-90 dark:bg-gray-900 dark:hover:brightness-90",
          {
            "rounded-md px-2 py-1 text-sm": size === "small",
            "rounded-md px-2.5 py-1.5": size === "medium",
            "rounded-md px-3 py-1.5 text-lg": size === "large",
          }
        )}
        style={{
          backgroundColor: data.backgroundColor,
          color: data.foregroundColor,
        }}
      >
        #{data.slug.current} {!!count && ` - ${count}`}
      </a>
    </Link>
  );
};

export default TagCell;
