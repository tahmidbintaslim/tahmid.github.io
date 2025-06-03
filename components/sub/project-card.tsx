import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  src: string;
  title: string;
  description: string;
  link: string;
};

export const ProjectCard = ({
  src,
  title,
  description,
  link,
}: ProjectCardProps) => {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noreferrer noopener"
      className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61]"
    >
      <div className="relative w-full min-h-[275px]">
        <Image
          src={src}
          alt={title}
          layout="fill"
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      <div className="relative p-4">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <p className="mt-2 text-gray-300">{description}</p>
      </div>
    </Link>
  );
};
