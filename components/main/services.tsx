'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

import { AnimatedUnderline } from '@/components/sub/animated-underline';
import { AnimatedWords } from '@/components/sub/animated-words';

export const Services = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const flipCtxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const galleryElement = galleryRef.current;
    if (!galleryElement) return;

    // Skip animation on mobile where layout changes to single column
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger, Flip);

    const createTween = () => {
      // Check if mobile on resize
      const isMobileNow = window.innerWidth <= 768;
      if (isMobileNow) {
        flipCtxRef.current?.revert();
        return;
      }

      const galleryItems = galleryElement.querySelectorAll('.gallery__item');
      if (!galleryItems.length) return;

      flipCtxRef.current?.revert();
      galleryElement.classList.remove('gallery--final');

      flipCtxRef.current = gsap.context(() => {
        galleryElement.classList.add('gallery--final');
        const flipState = Flip.getState(galleryItems);
        galleryElement.classList.remove('gallery--final');

        const flip = Flip.to(flipState, {
          simple: true,
          ease: 'expoScale(1, 5)',
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: galleryElement,
            start: 'center center',
            end: '+=100%',
            scrub: true,
            pin: galleryElement.parentElement,
          },
        });
        tl.add(flip);

        return () => gsap.set(galleryItems, { clearProps: 'all' });
      });
    };

    createTween();
    window.addEventListener('resize', createTween);

    return () => {
      window.removeEventListener('resize', createTween);
      flipCtxRef.current?.revert();
    };
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative">
      <div className="gallery-wrap">
        <div
          ref={galleryRef}
          className="gallery gallery--bento gallery--switch"
          id="services-gallery"
        >
          <div className="gallery__item">
            <Image
              src="/services/service-1.jpg"
              alt="Product Engineering"
              width={1200}
              height={800}
              className="h-auto w-full"
            />
          </div>
          <div className="gallery__item">
            <Image
              src="/services/service-2.jpg"
              alt="E-commerce Solutions"
              width={1200}
              height={800}
              className="h-auto w-full"
            />
          </div>
          <div className="gallery__item">
            <Image
              src="/services/service-3.jpg"
              alt="Platform Modernization"
              width={1200}
              height={800}
              className="h-auto w-full"
            />
          </div>
          <div className="gallery__item">
            <Image
              src="/services/service-4.jpg"
              alt="AI Integration"
              width={1200}
              height={800}
              className="h-auto w-full"
            />
          </div>
          <div className="gallery__item">
            <Image
              src="/services/service-5.jpg"
              alt="Performance Optimization"
              width={1200}
              height={800}
              className="h-auto w-full"
            />
          </div>
          <div className="gallery__item">
            <Image
              src="/services/service-6.jpg"
              alt="Scalable Architecture"
              width={1200}
              height={800}
              className="h-auto w-full"
            />
          </div>
          <div className="gallery__item">
            <Image
              src="/services/service-7.jpg"
              alt="DevOps & CI/CD"
              width={1200}
              height={800}
              className="h-auto w-full"
            />
          </div>
          <div className="gallery__item">
            <Image
              src="/services/service-8.jpg"
              alt="Security & Compliance"
              width={1200}
              height={800}
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>

      <div className="section">
        <div className="mb-8 space-y-4">
          <p className="section-kicker">
            Services
          </p>
          <AnimatedWords
            text="Building systems that scale and convert"
            className="section-title"
          />
          <AnimatedUnderline className="h-3 w-48" />
        </div>

        <h2 className="subsection-title mb-6">Expert Services</h2>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-xl font-semibold text-purple-400">
              Product Engineering
            </h3>
            <p className="section-lead mb-4">
              Full-stack delivery for modern web products with measurable
              performance, reliability, and business impact. From concept to
              deployment, I build scalable solutions that drive results.
            </p>
            <ul className="text-muted space-y-1">
              <li>• Performance tuning & optimization</li>
              <li>• Scalable architecture design</li>
              <li>• API strategy & development</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xl font-semibold text-cyan-400">
              E-commerce & Growth
            </h3>
            <p className="section-lead mb-4">
              Shopify headless builds, conversion-focused UX, and integration
              pipelines that lift revenue and retention. Specialized in modern
              commerce solutions.
            </p>
            <ul className="text-muted space-y-1">
              <li>• Headless commerce platforms</li>
              <li>• Checkout optimization</li>
              <li>• Marketing automation</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xl font-semibold text-blue-400">
              Platform Modernization
            </h3>
            <p className="section-lead mb-4">
              Refactor legacy stacks into modern, maintainable systems without
              disrupting day-to-day operations. Breathe new life into existing
              applications.
            </p>
            <ul className="text-muted space-y-1">
              <li>• Migration planning & execution</li>
              <li>• CI/CD pipeline setup</li>
              <li>• Technical debt reduction</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xl font-semibold text-pink-400">
              AI-Enabled Experiences
            </h3>
            <p className="section-lead mb-4">
              Applied AI to automate workflows, personalize experiences, and
              unlock new product capabilities. Future-proof your applications
              with intelligent features.
            </p>
            <ul className="text-muted space-y-1">
              <li>• LLM integration</li>
              <li>• Smart search & recommendations</li>
              <li>• Workflow automation</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted mx-auto max-w-2xl">
            A focused set of offerings designed to move fast without sacrificing
            quality—ideal for product teams, founders, and scaling businesses.
            Each engagement is scoped around measurable gains: speed, stability,
            and conversion.
          </p>
        </div>
      </div>
    </section>
  );
};
