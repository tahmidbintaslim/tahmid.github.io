"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

// Icon imports from simple-icons for proper tree-shaking
import {
  siAngular,
  siDjango,
  siFastapi,
  siFlask,
  siGithubactions,
  siGooglecloud,
  siKubernetes,
  siLaravel,
  siNodedotjs,
  siPhp,
  siPytorch,
  siRedis,
  siRemix,
  siRuby,
  siRubyonrails,
  siRust,
  siShopify,
  siTensorflow,
  siTerraform,
  siVuedotjs,
  siWordpress,
} from "simple-icons";

type SkillDataProviderProps = {
  src?: string;
  svgIcon?: string;
  name: string;
  width: number;
  height: number;
  index: number;
};

// Map of svgIcon keys to imported icons
const simpleIconsMap: { [key: string]: { svg: string; hex: string } } = {
  php: siPhp,
  rust: siRust,
  ruby: siRuby,
  django: siDjango,
  flask: siFlask,
  fastapi: siFastapi,
  laravel: siLaravel,
  rails: siRubyonrails,
  vue: siVuedotjs,
  remix: siRemix,
  angular: siAngular,
  redis: siRedis,
  gcp: siGooglecloud,
  kubernetes: siKubernetes,
  cicd: siGithubactions,
  terraform: siTerraform,
  shopify: siShopify,
  wordpress: siWordpress,
  tensorflow: siTensorflow,
  pytorch: siPytorch,
  nodejs: siNodedotjs,
};

// Helper to get Simple Icon SVG
const getSimpleIconSvg = (iconKey: string): string | null => {
  const icon = simpleIconsMap[iconKey.toLowerCase()];
  return icon?.svg || null;
};

// Get icon color from simple-icons
const getSimpleIconColor = (iconKey: string): string => {
  const icon = simpleIconsMap[iconKey.toLowerCase()];
  return icon?.hex ? `#${icon.hex}` : "#a855f7";
};

export const SkillDataProvider = ({
  src,
  svgIcon,
  name,
  width,
  height,
  index,
}: SkillDataProviderProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const [showTooltip, setShowTooltip] = useState(false);

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const animationDelay = 0.1;

  // Get SVG icon from simple-icons
  const svgIconSvg = svgIcon ? getSimpleIconSvg(svgIcon) : null;
  const iconColor = svgIcon ? getSimpleIconColor(svgIcon) : "#a855f7";

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
            className="transition-transform duration-300"
          />
        ) : svgIconSvg ? (
          <div
            className="flex items-center justify-center transition-transform duration-300 svg-icon"
            style={{
              width: `${width}px`,
              height: `${height}px`,
              color: iconColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            dangerouslySetInnerHTML={{ __html: svgIconSvg }}
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
};
