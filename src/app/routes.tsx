import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
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
const ServicesPage = lazy(() => import('@/pages/Services/ServicesPage'));
const AboutPage = lazy(() => import('@/pages/About/AboutPage'));
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
      { path: 'services', element: <ServicesPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
