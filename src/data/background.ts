import type { Certificate, Education } from '@/types';

/**
 * Education and certificates for /about/background. Facts come from the
 * certificates themselves and from Ihsan's LinkedIn profile; nothing is
 * inferred. Work experience is deliberately left out: the projects show it.
 * Certificate images are rendered from the original PDFs into
 * /public/certificates.
 */

export const education: readonly Education[] = [
  {
    institution: 'Al al-Bayt University',
    qualification: 'Bachelor of Arts, Arabic Language and Literature',
    location: 'Jordan',
    start: '2019-09',
    end: '2023-06',
    grade: '3.56',
  },
];

/** Newest first. */
export const certificates: readonly Certificate[] = [
  {
    title: 'Google Prompting Essentials',
    issuer: 'Google, via Coursera',
    date: '2026-06',
    detail: '4-course specialization',
    image: '/certificates/google-prompting-essentials.jpg',
    verifyUrl: 'https://coursera.org/verify/specialization/YQE9BLTEWQPD',
  },
  {
    title: 'Master of ChatGPT',
    issuer: 'Coursiv',
    date: '2026-06',
    detail: '6 hours',
    image: '/certificates/coursiv-master-of-chatgpt.jpg',
    credentialId: 'RGRCCJJW',
  },
  {
    title: 'Master of Claude',
    issuer: 'Coursiv',
    date: '2026-05',
    detail: '5 hours',
    image: '/certificates/coursiv-master-of-claude.jpg',
    credentialId: '7AUJORHA',
  },
  {
    title: 'Complete Python Mastery',
    issuer: 'Code with Mosh',
    date: '2026-02',
    image: '/certificates/mosh-complete-python-mastery.jpg',
    credentialId: 'cert_tffqf823',
  },
  {
    title: 'Professional Certificate in Data Driven Digital Marketing',
    issuer: 'IACT College, with Dattel Asia',
    date: '2023-12',
    image: '/certificates/iact-data-driven-digital-marketing.jpg',
  },
];

// en-US, not en-GB: en-GB abbreviates September as "Sept".
const monthYear = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

/** "2026-06" -> "Jun 2026". */
export function formatMonth(isoMonth: string): string {
  return monthYear.format(new Date(`${isoMonth}-01T00:00:00Z`));
}
