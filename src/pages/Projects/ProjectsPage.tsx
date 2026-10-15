import { Seo } from '@/components/seo';
import { SITE } from '@/constants/site';
import { projects } from '@/data/projects';
import type { ProjectCategory } from '@/types';
import { PageHeader } from '@/components/sections/page-header';
import { FilterableIndex } from '@/components/sections/filterable-index';
import { ProjectCard } from '@/components/cards/project-card';

/** Categories actually present in the catalog, in first-seen order. */
const CATEGORIES: readonly ProjectCategory[] = Array.from(
  new Set(projects.map((project) => project.category)),
);

/**
 * schema.org has no "Portfolio" type — CollectionPage + ItemList is the
 * real, Google-recognized vocabulary for a listing page like this one.
 * Always lists the full catalog, independent of the client-side category
 * filter below, since the URL (and therefore what's indexed) never
 * changes when that filter is applied.
 */
const collectionJsonLd = {
  '@type': 'CollectionPage',
  '@id': `${SITE.url}/projects#collection`,
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE.url}/projects/${project.slug}`,
      name: project.title,
    })),
  },
};

export default function ProjectsPage() {
  return (
    <>
      <Seo
        title="Projects"
        description="Web applications, Python automation tools, and Arabic to Malay and English translation work."
        path="/projects"
        jsonLd={collectionJsonLd}
      />
      <PageHeader
        eyebrow="Portfolio"
        title="Projects & case studies."
        description="Things I've built and translated: web apps, Python automation tools, and translation from Arabic into Malay and English."
      />

      <FilterableIndex
        items={projects}
        filters={CATEGORIES}
        label="Filter projects by category"
        filterOf={(project) => project.category}
        keyOf={(project) => project.slug}
        emptyMessage="Nothing in this category yet."
      >
        {(project) => <ProjectCard project={project} />}
      </FilterableIndex>
    </>
  );
}
