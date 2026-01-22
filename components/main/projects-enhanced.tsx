'use client';

import { PROJECTS } from '@/constants';
import {
  ArrowsUpDownIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import React, { useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { getMotionScale } from '@/lib/motion-scale';
import { ProjectCard } from '../sub/project-card';

const ProjectsEnhanced = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const flipStateRef = useRef<Flip.FlipState | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedTech, setSelectedTech] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Extract unique values for filters
  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(PROJECTS.map((p) => p.year))).sort(
      (a, b) => b - a
    );
    return uniqueYears;
  }, []);

  const technologies = useMemo(() => {
    const allTech = PROJECTS.flatMap((p) => p.techStack);
    return Array.from(new Set(allTech)).sort();
  }, []);

  const companies = useMemo(() => {
    return Array.from(new Set(PROJECTS.map((p) => p.company))).sort();
  }, []);

  // Filter projects based on search and filters
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        project.company.toLowerCase().includes(searchQuery.toLowerCase());

      // Year filter
      const matchesYear =
        selectedYear === 'all' || project.year === parseInt(selectedYear);

      // Technology filter
      const matchesTech =
        selectedTech === 'all' ||
        (project.techStack as readonly string[]).includes(selectedTech);

      // Company filter
      const matchesCompany =
        selectedCompany === 'all' || project.company === selectedCompany;

      return matchesSearch && matchesYear && matchesTech && matchesCompany;
    }).sort((a, b) => b.year - a.year); // Sort by year descending (latest first)
  }, [searchQuery, selectedYear, selectedTech, selectedCompany]);

  const captureFlipState = () => {
    if (!gridRef.current) return;
    const items = gridRef.current.querySelectorAll('.js-project-card');
    if (!items.length) return;
    flipStateRef.current = Flip.getState(items);
  };

  const resetFilters = () => {
    captureFlipState();
    setSearchQuery('');
    setSelectedYear('all');
    setSelectedTech('all');
    setSelectedCompany('all');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedYear !== 'all' ||
    selectedTech !== 'all' ||
    selectedCompany !== 'all';

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedYear, selectedTech, selectedCompany]);

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger, Flip);
    const scale = getMotionScale();

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>('.js-project-reveal');
      targets.forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6 * scale,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  React.useEffect(() => {
    if (!gridRef.current || !flipStateRef.current) return;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) {
      flipStateRef.current = null;
      return;
    }

    const scale = getMotionScale();
    Flip.from(flipStateRef.current, {
      duration: 0.6 * scale,
      ease: 'power2.out',
      stagger: 0.02,
      absolute: true,
    });
    flipStateRef.current = null;
  }, [paginatedProjects]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      data-cursor="rocket"
      className="flex flex-col items-center justify-center py-10 sm:py-12 md:py-16 lg:py-20"
    >
      <div className="w-full max-w-7xl px-4">
        {/* Header */}
        <h2 className="section-title js-project-reveal py-4 text-start sm:py-6 md:py-8 md:text-center lg:py-10">
          <span className="text-white">Featured </span>
          <span className="section-title-gradient">Projects</span>
        </h2>

        {/* Search and Filter Bar */}
        <div className="js-project-reveal mb-6 space-y-3 sm:mb-8 sm:space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="text-muted h-5 w-5" />
            </div>
            <input
              type="text"
              className="ui-input bg-space-800/50 text-ink placeholder:text-muted min-h-12 touch-manipulation py-3 pr-4 pl-10 text-sm sm:py-3.5 sm:text-base"
              placeholder="Search projects..."
              aria-label="Search projects by name, technology, or company"
              value={searchQuery}
              onChange={(e) => {
                captureFlipState();
                setSearchQuery(e.target.value);
              }}
            />
          </div>

          {/* Filter Toggle Button and Sort */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                aria-controls="project-filters"
                className="bg-space-800/50 text-ink flex min-h-11 w-full touch-manipulation items-center justify-center gap-2 rounded-xl border border-cyan-500/30 px-3 py-2.5 text-sm transition-colors duration-200 ease-out hover:-translate-y-0.5 hover:border-cyan-500 active:translate-y-0 sm:w-auto sm:px-4 sm:py-3 sm:text-base"
                {...(showFilters && { 'aria-expanded': 'true' })}
              >
                <FunnelIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="ml-1 rounded-full bg-purple-500 px-1.5 py-0.5 text-xs text-white sm:ml-2 sm:px-2">
                    Active
                  </span>
                )}
              </button>

              {/* Sort Dropdown - Full width on mobile */}
              <div className="bg-space-800/50 relative flex min-h-11 w-full items-center gap-2 rounded-xl border border-purple-500/30 px-4 py-3 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-purple-500/60 active:translate-y-0 sm:w-auto md:py-2">
                <ArrowsUpDownIcon className="h-5 w-5 shrink-0 text-purple-400" />
                <select
                  value={selectedYear}
                  onChange={(e) => {
                    captureFlipState();
                    setSelectedYear(e.target.value);
                  }}
                  aria-label="Sort projects by year"
                  className="text-ink flex-1 cursor-pointer appearance-none bg-transparent pr-6 text-sm focus:outline-none sm:text-base"
                >
                  <option value="all">All Years (Latest First)</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <svg
                  className="text-muted pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <div className="text-muted text-start text-sm sm:text-right">
              Showing{' '}
              <span className="font-semibold text-purple-400">
                {paginatedProjects.length}
              </span>{' '}
              of{' '}
              <span className="font-semibold text-cyan-400">
                {filteredProjects.length}
              </span>{' '}
              projects
            </div>
          </div>

          {/* Filter Dropdowns */}
          {showFilters && (
            <div
              id="project-filters"
              className="bg-space-800/30 grid grid-cols-1 gap-4 rounded-2xl border border-purple-500/20 p-4 md:grid-cols-3"
            >
              {/* Year Filter */}
              <div>
                <label className="text-muted mb-2 block text-sm">Year</label>
                <select
                  className="ui-input text-ink w-full px-4 py-2"
                  value={selectedYear}
                  onChange={(e) => {
                    captureFlipState();
                    setSelectedYear(e.target.value);
                  }}
                  aria-label="Filter by year"
                >
                  <option value="all">All Years</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Technology Filter */}
              <div>
                <label className="text-muted mb-2 block text-sm">
                  Technology
                </label>
                <select
                  className="ui-input text-ink w-full px-4 py-2"
                  value={selectedTech}
                  onChange={(e) => {
                    captureFlipState();
                    setSelectedTech(e.target.value);
                  }}
                  aria-label="Filter by technology"
                >
                  <option value="all">All Technologies</option>
                  {technologies.map((tech) => (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  ))}
                </select>
              </div>

              {/* Company Filter */}
              <div>
                <label className="text-muted mb-2 block text-sm">Company</label>
                <select
                  className="ui-input text-ink w-full px-4 py-2"
                  value={selectedCompany}
                  onChange={(e) => {
                    captureFlipState();
                    setSelectedCompany(e.target.value);
                  }}
                  aria-label="Filter by company"
                >
                  <option value="all">All Companies</option>
                  {companies.map((company) => (
                    <option key={company} value={company}>
                      {company}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset Button */}
              {hasActiveFilters && (
                <div className="flex justify-end md:col-span-3">
                  <button
                    onClick={resetFilters}
                    className="rounded-xl bg-linear-to-r from-purple-500 to-cyan-500 px-4 py-2 text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:opacity-80 active:translate-y-0"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <>
            <div
              ref={gridRef}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {paginatedProjects.map((project, index) => (
                <ProjectCard
                  key={index}
                  src={project.image}
                  title={project.title}
                  description={project.description}
                  link={project.link}
                  techStack={project.techStack}
                  role={project.role}
                  company={project.company}
                  year={project.year}
                  className="js-project-reveal js-project-card"
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => {
                    captureFlipState();
                    setCurrentPage(Math.max(1, currentPage - 1));
                  }}
                  disabled={currentPage === 1}
                  className="bg-space-800/50 text-ink rounded-xl border border-purple-500/30 px-4 py-2 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-purple-500 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => {
                          captureFlipState();
                          setCurrentPage(page);
                        }}
                        className={`h-10 w-10 rounded-xl transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 ${
                          currentPage === page
                            ? 'bg-linear-to-r from-purple-500 to-cyan-500 text-white'
                            : 'bg-space-800/50 text-ink border border-purple-500/30 hover:border-purple-500'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() => {
                    captureFlipState();
                    setCurrentPage(Math.min(totalPages, currentPage + 1));
                  }}
                  disabled={currentPage === totalPages}
                  className="bg-space-800/50 text-ink rounded-xl border border-purple-500/30 px-4 py-2 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-purple-500 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="py-20 text-start">
            <MagnifyingGlassIcon className="mx-auto mb-4 h-24 w-24 text-purple-400" />
            <h3 className="text-muted mb-2 text-2xl">No projects found</h3>
            <p className="text-muted mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={resetFilters}
              className="rounded-xl bg-linear-to-r from-purple-500 to-cyan-500 px-6 py-3 text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:opacity-80 active:translate-y-0"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsEnhanced;
