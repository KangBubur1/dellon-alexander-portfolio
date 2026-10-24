import React, { useCallback, useEffect, useRef, useState } from 'react';
import { projects, type Project } from './data/portfolio';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProofBar } from './components/ProofBar';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectModal } from './components/ProjectModal';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const findProjectFromHash = useCallback((hash: string): Project | null => {
    const clean = hash.replace(/^#/, '');
    if (!clean) return null;
    const slug = clean.startsWith('project-') ? clean.slice('project-'.length) : clean;
    return projects.find((p) => p.slug === slug) ?? null;
  }, []);

  // Open modal on initial load if URL hash matches a project slug, and listen to Back/Forward
  useEffect(() => {
    const syncFromLocation = () => {
      const matched = findProjectFromHash(window.location.hash);
      setActiveProject(matched);
    };
    syncFromLocation();
    window.addEventListener('popstate', syncFromLocation);
    window.addEventListener('hashchange', syncFromLocation);
    return () => {
      window.removeEventListener('popstate', syncFromLocation);
      window.removeEventListener('hashchange', syncFromLocation);
    };
  }, [findProjectFromHash]);

  const handleSelectProject = useCallback(
    (project: Project, triggerEl: HTMLElement | null = null) => {
      lastTriggerRef.current = triggerEl;
      setActiveProject(project);
      const nextHash = `#${project.slug}`;
      if (window.location.hash !== nextHash) {
        window.history.pushState({ projectSlug: project.slug }, '', nextHash);
      }
    },
    []
  );

  const handleCloseModal = useCallback(() => {
    setActiveProject(null);
    if (window.location.hash && findProjectFromHash(window.location.hash)) {
      window.history.pushState(
        {},
        '',
        `${window.location.pathname}${window.location.search}`
      );
    }
    const trigger = lastTriggerRef.current;
    if (trigger) {
      window.requestAnimationFrame(() => trigger.focus());
    }
  }, [findProjectFromHash]);

  const handlePrevProject = useCallback(() => {
    if (!activeProject || projects.length <= 1) return;
    const idx = projects.findIndex((p) => p.slug === activeProject.slug);
    const prev = projects[(idx - 1 + projects.length) % projects.length];
    handleSelectProject(prev, lastTriggerRef.current);
  }, [activeProject, handleSelectProject]);

  const handleNextProject = useCallback(() => {
    if (!activeProject || projects.length <= 1) return;
    const idx = projects.findIndex((p) => p.slug === activeProject.slug);
    const next = projects[(idx + 1) % projects.length];
    handleSelectProject(next, lastTriggerRef.current);
  }, [activeProject, handleSelectProject]);

  const handleModalContactClick = useCallback(() => {
    setActiveProject(null);
    window.history.pushState({}, '', '#contact');
    const contactEl = document.getElementById('contact');
    contactEl?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-gold-400 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy-950"
      >
        Skip to content
      </a>

      <Navbar />

      <main className="flex-1">
        <Hero onOpenFeatured={() => handleSelectProject(projects[0])} />
        <ProofBar />
        <AboutSection />
        <ProjectsSection onSelectProject={handleSelectProject} />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>

      <Footer />

      <ProjectModal
        project={activeProject}
        onClose={handleCloseModal}
        onPrev={handlePrevProject}
        onNext={handleNextProject}
        hasMultiple={projects.length > 1}
        onContactClick={handleModalContactClick}
      />
    </div>
  );
};

export default App;
