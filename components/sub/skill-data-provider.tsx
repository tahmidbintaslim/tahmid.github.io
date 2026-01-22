'use client';

import Image from 'next/image';
import { memo, useState } from 'react';
import type { IconType } from 'react-icons';
import { FaAws } from 'react-icons/fa';
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
} from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';
import { skillIconColors, themeColors } from '@/lib/theme';

// Map of svgIcon keys to react-icons
const iconMap: { [key: string]: { Icon: IconType; color: string } } = {
  python: { Icon: SiPython, color: skillIconColors.python },
  php: { Icon: SiPhp, color: skillIconColors.php },
  rust: { Icon: SiRust, color: skillIconColors.rust },
  ruby: { Icon: SiRuby, color: skillIconColors.ruby },
  django: { Icon: SiDjango, color: skillIconColors.django },
  flask: { Icon: SiFlask, color: skillIconColors.flask },
  fastapi: { Icon: SiFastapi, color: skillIconColors.fastapi },
  laravel: { Icon: SiLaravel, color: skillIconColors.laravel },
  rails: { Icon: SiRubyonrails, color: skillIconColors.rails },
  vue: { Icon: SiVuedotjs, color: skillIconColors.vue },
  remix: { Icon: SiRemix, color: skillIconColors.remix },
  angular: { Icon: SiAngular, color: skillIconColors.angular },
  redis: { Icon: SiRedis, color: skillIconColors.redis },
  typeorm: { Icon: SiTypeorm, color: skillIconColors.typeorm },
  aws: { Icon: FaAws, color: skillIconColors.aws },
  azure: { Icon: VscAzure, color: skillIconColors.azure },
  gcp: { Icon: SiGooglecloud, color: skillIconColors.gcp },
  kubernetes: { Icon: SiKubernetes, color: skillIconColors.kubernetes },
  cicd: { Icon: SiGithubactions, color: skillIconColors.cicd },
  terraform: { Icon: SiTerraform, color: skillIconColors.terraform },
  shopify: { Icon: SiShopify, color: skillIconColors.shopify },
  wordpress: { Icon: SiWordpress, color: skillIconColors.wordpress },
  headless: { Icon: SiStrapi, color: skillIconColors.headless },
  openai: { Icon: SiOpenai, color: skillIconColors.openai },
  tensorflow: { Icon: SiTensorflow, color: skillIconColors.tensorflow },
  pytorch: { Icon: SiPytorch, color: skillIconColors.pytorch },
};

type SkillDataProviderProps = {
  src?: string;
  svgIcon?: string;
  name: string;
  width: number;
  height: number;
};

export const SkillDataProvider = memo(
  ({ src, svgIcon, name, width, height }: SkillDataProviderProps) => {
    const [showTooltip, setShowTooltip] = useState(false);

    // Get icon from react-icons
    const iconData = svgIcon ? iconMap[svgIcon.toLowerCase()] : null;
    const IconComponent = iconData?.Icon;
    const iconColor = iconData?.color || themeColors.accent.purple400;

    return (
      <div
        className="relative flex flex-col items-center gap-2"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        role="img"
        aria-label={`${name} skill`}
        title={name}
      >
        <div className="flex items-center justify-center">
          {src ? (
            <Image
              src={`/skills/${src}`}
              width={width}
              height={height}
              alt={`${name} logo`}
              loading="lazy"
              quality={75}
            />
          ) : IconComponent ? (
            <IconComponent
              style={{ width: width, height: height, color: iconColor }}
              aria-label={`${name} icon`}
            />
          ) : (
            <div
              className="flex h-20 min-w-20 items-center justify-center rounded-xl bg-linear-to-r from-purple-500 to-cyan-500 px-4 py-2"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-10 w-10 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3l7 4v8l-7 4-7-4V7l7-4z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.5 10.5h5v5h-5z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Tooltip for SEO and accessibility */}
        {showTooltip && (
          <div className="pointer-events-none absolute -bottom-8 left-1/2 z-10 -translate-x-1/2 transform rounded bg-space-950/90 px-3 py-1 text-xs whitespace-nowrap text-white">
            {name}
          </div>
        )}

        {/* Hidden text for SEO */}
        <span className="sr-only">{name}</span>
      </div>
    );
  }
);

SkillDataProvider.displayName = 'SkillDataProvider';
