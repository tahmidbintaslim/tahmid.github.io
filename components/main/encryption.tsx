'use client';

import Image from 'next/image';
import { WelcomePill } from '@/components/ui/welcome-pill';

export const Encryption = () => {
  return (
    <div className="relative -z-20 flex h-full min-h-[70dvh] w-full flex-row items-center justify-center md:min-h-screen">
      <div className="absolute top-0 z-5 h-auto w-auto px-4">
        <div className="section-title text-start">
          Performance{' '}
          <span className="section-title-gradient">&</span>{' '}
          Security.
        </div>
      </div>

      <div className="absolute z-5 flex h-auto w-auto translate-y-5 flex-col items-center justify-center">
        <div className="flex h-auto w-auto flex-col items-center">
          <Image
            src="/lock-top.png"
            alt="Lock top"
            width={50}
            height={50}
            className="translate-y-5"
          />
          <Image
            src="/lock-main.png"
            alt="Lock main"
            width={70}
            height={70}
            className="z-10"
          />
        </div>

        <WelcomePill>Ensure your data is safe.</WelcomePill>
      </div>

      <div className="absolute bottom-5 z-5 px-5">
        <div className="section-lead text-start">
          Secure your data with end-to-end encryption.
        </div>
      </div>

      {/* Background Video - Behind Content */}
      <div className="absolute z-1 flex w-full items-start justify-center">
        <video
          loop
          muted
          autoPlay
          playsInline
          preload="metadata"
          className="h-auto w-full opacity-80"
        >
          <source src="/videos/encryption-bg.webm" type="video/webm" />
        </video>
      </div>
    </div>
  );
};
