"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import * as SvgIcons from "./skill-svg-icons";

type SkillDataProviderProps = {
  src?: string;
  svgIcon?: string;
  name: string;
  width: number;
  height: number;
  index: number;
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

  // Get SVG icon component based on name
  const getSvgIcon = () => {
    if (!svgIcon) return null;
    
    const iconMap: { [key: string]: () => React.ReactElement } = {
      python: SvgIcons.PythonIcon,
      php: SvgIcons.PHPIcon,
      rust: SvgIcons.RustIcon,
      ruby: SvgIcons.RubyIcon,
      django: SvgIcons.DjangoIcon,
      flask: SvgIcons.FlaskIcon,
      fastapi: SvgIcons.FastAPIIcon,
      laravel: SvgIcons.LaravelIcon,
      vue: SvgIcons.VueIcon,
      remix: SvgIcons.RemixIcon,
      angular: SvgIcons.AngularIcon,
      redis: SvgIcons.RedisIcon,
      typeorm: SvgIcons.TypeORMIcon,
      aws: SvgIcons.AWSIcon,
      gcp: SvgIcons.GCPIcon,
      azure: SvgIcons.AzureIcon,
      kubernetes: SvgIcons.KubernetesIcon,
      cicd: SvgIcons.CICDIcon,
      shopify: SvgIcons.ShopifyIcon,
      wordpress: SvgIcons.WordPressIcon,
      openai: SvgIcons.OpenAIIcon,
      tensorflow: SvgIcons.TensorFlowIcon,
      pytorch: SvgIcons.PyTorchIcon,
    };

    const IconComponent = iconMap[svgIcon.toLowerCase()];
    return IconComponent ? <IconComponent /> : null;
  };

  const svgIconComponent = getSvgIcon();

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
      {src ? (
        <Image 
          src={`/skills/${src}`} 
          width={width} 
          height={height} 
          alt={`${name} logo`}
          className="transition-transform duration-300 hover:scale-110"
        />
      ) : svgIconComponent ? (
        <div className="flex items-center justify-center transition-transform duration-300 hover:scale-110">
          {svgIconComponent}
        </div>
      ) : (
        <div className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg text-white font-semibold text-sm min-w-[80px] h-[80px] transition-transform duration-300 hover:scale-110">
          {name}
        </div>
      )}
      
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
