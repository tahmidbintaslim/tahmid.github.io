'use client';

import { PROJECTS } from '@/constants';
import {
  ArrowsUpDownIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import React, { useMemo, useState } from 'react';
import { ProjectCard } from '../sub/project-card';

const ProjectsEnhanced = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedTech, setSelectedTech] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

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

  const resetFilters = () => {
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

  return (
    <section
      id="projects"
      className="flex flex-col items-center justify-center py-10 sm:py-12 md:py-16 lg:py-20"
    >
      <div className="w-full max-w-7xl px-4">
        {/* Header */}
        <h1 className="py-4 text-left text-[26px] leading-tight font-bold sm:py-6 sm:text-[32px] md:py-8 md:text-center md:text-[40px] lg:py-10 lg:text-[50px]">
          <span className="text-white">Featured </span>
          <span className="bg-linear-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
            Projects
          </span>
        </h1>

        {/* Search and Filter Bar */}
        <div className="mb-6 space-y-3 sm:mb-8 sm:space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="min-h-[48px] w-full touch-manipulation rounded-lg border border-purple-500/30 bg-[#1a1a2e]/50 py-3 pr-4 pl-10 text-sm text-gray-200 placeholder-gray-400 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none sm:py-3.5 sm:text-base"
              placeholder="Search projects..."
              aria-label="Search projects by name, technology, or company"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Toggle Button and Sort */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex min-h-[44px] w-full touch-manipulation items-center justify-center gap-2 rounded-lg border border-cyan-500/30 bg-[#1a1a2e]/50 px-3 py-2.5 text-sm text-gray-200 transition-colors hover:border-cyan-500 sm:w-auto sm:px-4 sm:py-3 sm:text-base"
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
              <div className="relative flex min-h-[44px] w-full items-center gap-2 rounded-lg border border-purple-500/30 bg-[#1a1a2e]/50 px-4 py-3 sm:w-auto md:py-2">
                <ArrowsUpDownIcon className="h-5 w-5 flex-shrink-0 text-purple-400" />
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  aria-label="Sort projects by year"
                  className="flex-1 cursor-pointer appearance-none bg-transparent pr-6 text-sm text-gray-200 focus:outline-none sm:text-base"
                >
                  <option value="all">All Years (Latest First)</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400"
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

            <div className="text-left text-sm text-gray-400 sm:text-right">
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
            <div className="animate-fade-in grid grid-cols-1 gap-4 rounded-lg border border-purple-500/20 bg-[#1a1a2e]/30 p-4 md:grid-cols-3">
              {/* Year Filter */}
              <div>
                <label className="mb-2 block text-sm text-gray-400">Year</label>
                <select
                  className="w-full rounded-lg border border-purple-500/30 bg-[#1a1a2e] px-4 py-2 text-gray-200 transition-colors focus:border-purple-500 focus:outline-none"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
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
                <label className="mb-2 block text-sm text-gray-400">
                  Technology
                </label>
                <select
                  className="w-full rounded-lg border border-cyan-500/30 bg-[#1a1a2e] px-4 py-2 text-gray-200 transition-colors focus:border-cyan-500 focus:outline-none"
                  value={selectedTech}
                  onChange={(e) => setSelectedTech(e.target.value)}
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
                <label className="mb-2 block text-sm text-gray-400">
                  Company
                </label>
                <select
                  className="w-full rounded-lg border border-green-500/30 bg-[#1a1a2e] px-4 py-2 text-gray-200 transition-colors focus:border-green-500 focus:outline-none"
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
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
                    className="rounded-lg bg-linear-to-r from-purple-500 to-cyan-500 px-4 py-2 text-white transition-opacity hover:opacity-80"
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg border border-purple-500/30 bg-[#1a1a2e]/50 px-4 py-2 text-gray-200 transition-colors hover:border-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`h-10 w-10 rounded-lg transition-all duration-300 ${
                          currentPage === page
                            ? 'bg-linear-to-r from-purple-500 to-cyan-500 text-white'
                            : 'border border-purple-500/30 bg-[#1a1a2e]/50 text-gray-200 hover:border-purple-500'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-lg border border-purple-500/30 bg-[#1a1a2e]/50 px-4 py-2 text-gray-200 transition-colors hover:border-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="py-20 text-center">
            <MagnifyingGlassIcon className="mx-auto mb-4 h-24 w-24 text-purple-400" />
            <h3 className="mb-2 text-2xl text-gray-300">No projects found</h3>
            <p className="mb-6 text-gray-400">
              Try adjusting your search or filters
            </p>
            <button
              onClick={resetFilters}
              className="rounded-lg bg-linear-to-r from-purple-500 to-cyan-500 px-6 py-3 text-white transition-opacity hover:opacity-80"
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
