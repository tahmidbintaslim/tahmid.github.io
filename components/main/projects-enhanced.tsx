"use client";

import { PROJECTS } from "@/constants";
import { ArrowsUpDownIcon, FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useMemo, useState } from "react";
import { ProjectCard } from "../sub/project-card";

const ProjectsEnhanced = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedTech, setSelectedTech] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Extract unique values for filters
  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(PROJECTS.map((p) => p.year))).sort((a, b) => b - a);
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
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        project.company.toLowerCase().includes(searchQuery.toLowerCase());

      // Year filter
      const matchesYear =
        selectedYear === "all" || project.year === parseInt(selectedYear);

      // Technology filter
      const matchesTech =
        selectedTech === "all" || (project.techStack as readonly string[]).includes(selectedTech);

      // Company filter
      const matchesCompany =
        selectedCompany === "all" || project.company === selectedCompany;

      return matchesSearch && matchesYear && matchesTech && matchesCompany;
    }).sort((a, b) => b.year - a.year); // Sort by year descending (latest first)
  }, [searchQuery, selectedYear, selectedTech, selectedCompany]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedYear("all");
    setSelectedTech("all");
    setSelectedCompany("all");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedYear !== "all" ||
    selectedTech !== "all" ||
    selectedCompany !== "all";

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
        <h1 className="text-[26px] sm:text-[32px] md:text-[40px] lg:text-[50px] font-bold text-left md:text-center py-4 sm:py-6 md:py-8 lg:py-10 leading-tight">
          <span className="text-white">Featured </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            Projects
          </span>
        </h1>

        {/* Search and Filter Bar */}
        <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 sm:py-3.5 bg-[#1a1a2e]/50 border border-purple-500/30 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base min-h-[48px] touch-manipulation"
              placeholder="Search projects..."
              aria-label="Search projects by name, technology, or company"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Toggle Button and Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#1a1a2e]/50 border border-cyan-500/30 rounded-lg text-gray-200 hover:border-cyan-500 transition-colors min-h-[44px] text-sm sm:text-base touch-manipulation w-full sm:w-auto"
              >
                <FunnelIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 bg-purple-500 text-white text-xs rounded-full">
                    Active
                  </span>
                )}
              </button>

              {/* Sort Dropdown - Full width on mobile */}
              <div className="relative flex items-center gap-2 px-4 py-3 md:py-2 bg-[#1a1a2e]/50 border border-purple-500/30 rounded-lg min-h-[44px] w-full sm:w-auto">
                <ArrowsUpDownIcon className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <select
                  aria-label="Sort projects by year"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="bg-transparent text-gray-200 focus:outline-none cursor-pointer appearance-none pr-6 flex-1 text-sm sm:text-base"
                >
                  <option value="all">All Years (Latest First)</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="text-gray-400 text-sm text-left sm:text-right">
              Showing{" "}
              <span className="text-purple-400 font-semibold">
                {paginatedProjects.length}
              </span>{" "}
              of{" "}
              <span className="text-cyan-400 font-semibold">
                {filteredProjects.length}
              </span>{" "}
              projects
            </div>
          </div>

          {/* Filter Dropdowns */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-[#1a1a2e]/30 border border-purple-500/20 rounded-lg animate-fade-in">
              {/* Year Filter */}
              <div>
                <label htmlFor="year-filter" className="block text-sm text-gray-400 mb-2">
                  Year
                </label>
                <select
                  id="year-filter"
                  aria-label="Filter projects by year"
                  className="w-full px-4 py-2 bg-[#1a1a2e] border border-purple-500/30 rounded-lg text-gray-200 focus:outline-none focus:border-purple-500 transition-colors"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
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
                <label htmlFor="tech-filter" className="block text-sm text-gray-400 mb-2">
                  Technology
                </label>
                <select
                  id="tech-filter"
                  aria-label="Filter projects by technology"
                  className="w-full px-4 py-2 bg-[#1a1a2e] border border-cyan-500/30 rounded-lg text-gray-200 focus:outline-none focus:border-cyan-500 transition-colors"
                  value={selectedTech}
                  onChange={(e) => setSelectedTech(e.target.value)}
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
                <label htmlFor="company-filter" className="block text-sm text-gray-400 mb-2">
                  Company
                </label>
                <select
                  id="company-filter"
                  aria-label="Filter projects by company"
                  className="w-full px-4 py-2 bg-[#1a1a2e] border border-green-500/30 rounded-lg text-gray-200 focus:outline-none focus:border-green-500 transition-colors"
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
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
                <div className="md:col-span-3 flex justify-end">
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:opacity-80 transition-opacity"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-[#1a1a2e]/50 border border-purple-500/30 text-gray-200 hover:border-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg transition-all duration-300 ${currentPage === page
                        ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                        : 'bg-[#1a1a2e]/50 border border-purple-500/30 text-gray-200 hover:border-purple-500'
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-[#1a1a2e]/50 border border-purple-500/30 text-gray-200 hover:border-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <MagnifyingGlassIcon className="w-24 h-24 mx-auto text-purple-400 mb-4" />
            <h3 className="text-2xl text-gray-300 mb-2">No projects found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:opacity-80 transition-opacity"
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
