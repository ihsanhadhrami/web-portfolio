import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '@/components/layout/root-layout';

/**
 * Route configuration. Pages are code-split with `lazy` so each route ships
 * its own chunk and the initial bundle stays small.
 */
const HomePage = lazy(() => import('@/pages/Home/HomePage'));
const ProjectsPage = lazy(() => import('@/pages/Projects/ProjectsPage'));
const ProjectDetailsPage = lazy(
  () => import('@/pages/ProjectDetails/ProjectDetailsPage'),
);
const ArticlesPage = lazy(() => import('@/pages/Articles/ArticlesPage'));
const ArticleDetailsPage = lazy(
  () => import('@/pages/ArticleDetails/ArticleDetailsPage'),
);
const ServicesPage = lazy(() => import('@/pages/Services/ServicesPage'));
const BackgroundPage = lazy(() => import('@/pages/About/BackgroundPage'));
const ContactPage = lazy(() => import('@/pages/Contact/ContactPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFound/NotFoundPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'projects/:slug', element: <ProjectDetailsPage /> },
      { path: 'articles', element: <ArticlesPage /> },
      { path: 'articles/:slug', element: <ArticleDetailsPage /> },
      { path: 'services', element: <ServicesPage /> },
      // The About page merged into the homepage's About section; old links
      // and search results land there instead.
      { path: 'about', element: <Navigate to="/#about" replace /> },
      { path: 'about/background', element: <BackgroundPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
