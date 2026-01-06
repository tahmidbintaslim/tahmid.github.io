"use client";

import React, { useState, useMemo } from "react";
import { ProjectCard } from "../sub/project-card";
import { PROJECTS } from "@/constants";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";

const ProjectsEnhanced = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedTech, setSelectedTech] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

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
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedYear !== "all" ||
    selectedTech !== "all" ||
    selectedCompany !== "all";

  return (
    <section
      id="projects"
      className="flex flex-col items-center justify-center py-20"
    >
      <div className="w-full max-w-7xl px-4">
        {/* Header */}
        <h1 className="text-[40px] md:text-[50px] font-bold text-center py-10">
          <span className="text-white">Featured </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            Projects
          </span>
        </h1>

        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 bg-[#1a1a2e]/50 border border-purple-500/30 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="Search projects by name, technology, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Toggle Button and Sort */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 md:py-2 bg-[#1a1a2e]/50 border border-cyan-500/30 rounded-lg text-gray-200 hover:border-cyan-500 transition-colors min-h-[44px]"
              >
                <FunnelIcon className="h-5 w-5" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="ml-2 px-2 py-0.5 bg-purple-500 text-white text-xs rounded-full">
                    Active
                  </span>
                )}
              </button>

              {/* Sort Dropdown */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-3 md:py-2 bg-[#1a1a2e]/50 border border-purple-500/30 rounded-lg text-gray-200 focus:outline-none focus:border-purple-500 transition-colors cursor-pointer min-h-[44px]"
              >
                <option value="all">📅 All Years (Latest First)</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-gray-400 text-sm">
              Showing{" "}
              <span className="text-purple-400 font-semibold">
                {filteredProjects.length}
              </span>{" "}
              of{" "}
              <span className="text-cyan-400 font-semibold">
                {PROJECTS.length}
              </span>{" "}
              projects
            </div>
          </div>

          {/* Filter Dropdowns */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-[#1a1a2e]/30 border border-purple-500/20 rounded-lg animate-fade-in">
              {/* Year Filter */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Year
                </label>
                <select
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
                <label className="block text-sm text-gray-400 mb-2">
                  Technology
                </label>
                <select
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
                <label className="block text-sm text-gray-400 mb-2">
                  Company
                </label>
                <select
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
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
