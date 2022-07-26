import Link from "next/link";
import { MdChevronRight } from "react-icons/md";

const SectionHeader = ({
  title,
  desc,
  moreLink,
}: {
  title: string;
  desc?: string;
  moreLink?: { label?: string; href: string };
}) => (
  <div className="mb-8">
    <div className="flex items-center gap-2 overflow-hidden">
      <p className="flex-1 truncate text-2xl font-bold">{title}</p>
      {!!moreLink && (
        <Link href={moreLink.href}>
          <a
            className="flex items-center
         justify-center gap-1 whitespace-nowrap rounded-md font-medium hover:text-gray-600 dark:hover:text-gray-300"
          >
            <span>{moreLink.label || "See all"}</span>
            <MdChevronRight className="text-2xl" />
          </a>
        </Link>
      )}
    </div>
    {!!desc && <p className="mt-2 text-gray-600 dark:text-gray-300">{desc}</p>}
  </div>
);

export default SectionHeader;
