"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { memo, useState } from "react";
import type { IconType } from "react-icons";
import { useInView } from "react-intersection-observer";

// Individual icon imports to reduce bundle size (tree-shakeable)
import { FaAws } from "react-icons/fa";
import {
  SiAngular,
  SiDjango,
  SiFastapi,
  SiFlask,
  SiGithubactions,
  SiGooglecloud,
  SiKubernetes,
  SiLaravel,
  SiOpenai,
  SiPhp,
  SiPython,
  SiPytorch,
  SiRedis,
  SiRemix,
  SiRuby,
  SiRubyonrails,
  SiRust,
  SiShopify,
  SiStrapi,
  SiTensorflow,
  SiTerraform,
  SiTypeorm,
  SiVuedotjs,
  SiWordpress,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";

type SkillDataProviderProps = {
  src?: string;
  svgIcon?: string;
  name: string;
  width: number;
  height: number;
  index: number;
};

// Map of svgIcon keys to react-icons
const iconMap: { [key: string]: { Icon: IconType; color: string } } = {
  python: { Icon: SiPython, color: "#3776AB" },
  php: { Icon: SiPhp, color: "#777BB4" },
  rust: { Icon: SiRust, color: "#000000" },
  ruby: { Icon: SiRuby, color: "#CC342D" },
  django: { Icon: SiDjango, color: "#092E20" },
  flask: { Icon: SiFlask, color: "#000000" },
  fastapi: { Icon: SiFastapi, color: "#009688" },
  laravel: { Icon: SiLaravel, color: "#FF2D20" },
  rails: { Icon: SiRubyonrails, color: "#CC0000" },
  vue: { Icon: SiVuedotjs, color: "#4FC08D" },
  remix: { Icon: SiRemix, color: "#000000" },
  angular: { Icon: SiAngular, color: "#DD0031" },
  redis: { Icon: SiRedis, color: "#DC382D" },
  typeorm: { Icon: SiTypeorm, color: "#FE0803" },
  aws: { Icon: FaAws, color: "#FF9900" },
  azure: { Icon: VscAzure, color: "#0078D4" },
  gcp: { Icon: SiGooglecloud, color: "#4285F4" },
  kubernetes: { Icon: SiKubernetes, color: "#326CE5" },
  cicd: { Icon: SiGithubactions, color: "#2088FF" },
  terraform: { Icon: SiTerraform, color: "#7B42BC" },
  shopify: { Icon: SiShopify, color: "#7AB55C" },
  wordpress: { Icon: SiWordpress, color: "#21759B" },
  headless: { Icon: SiStrapi, color: "#8E75FF" },
  openai: { Icon: SiOpenai, color: "#412991" },
  tensorflow: { Icon: SiTensorflow, color: "#FF6F00" },
  pytorch: { Icon: SiPytorch, color: "#EE4C2C" },
};

export const SkillDataProvider = memo(({
  src,
  svgIcon,
  name,
  width,
  height,
  index,
}: SkillDataProviderProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [showTooltip, setShowTooltip] = useState(false);

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const animationDelay = 0.1;

  // Get icon from react-icons
  const iconData = svgIcon ? iconMap[svgIcon.toLowerCase()] : null;
  const IconComponent = iconData?.Icon;
  const iconColor = iconData?.color || "#a855f7";

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      variants={imageVariants}
      animate={inView ? "visible" : "hidden"}
      custom={index}
      transition={{ delay: index * animationDelay }}
      className="relative flex flex-col items-center gap-2"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      role="img"
      aria-label={`${name} skill`}
      title={name}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center"
      >
        {src ? (
          <Image
            src={`/skills/${src}`}
            width={width}
            height={height}
            alt={`${name} logo`}
            loading="lazy"
            quality={75}
            className="transition-transform duration-300"
          />
        ) : IconComponent ? (
          <IconComponent
            className="transition-transform duration-300"
            style={{ width: width, height: height, color: iconColor }}
            aria-label={`${name} icon`}
          />
        ) : (
          <div className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg text-white font-semibold text-sm min-w-[80px] h-[80px] transition-transform duration-300">
            {name}
          </div>
        )}
      </motion.div>

      {/* Tooltip for SEO and accessibility */}
      {showTooltip && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded text-xs whitespace-nowrap z-10 pointer-events-none">
          {name}
        </div>
      )}

      {/* Hidden text for SEO */}
      <span className="sr-only">{name}</span>
    </motion.div>
  );
});

SkillDataProvider.displayName = "SkillDataProvider";
