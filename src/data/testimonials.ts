import type { Testimonial } from '@/types';

export const testimonials: readonly Testimonial[] = [
  {
    id: 'maya',
    quote:
      'Aria delivered a level of craft we did not think was possible on our timeline. The product feels effortless — which is the hardest thing to pull off.',
    author: 'Maya Fernandes',
    title: 'Head of Product',
    company: 'Nova',
  },
  {
    id: 'daniel',
    quote:
      'One of the rare engineers who cares equally about architecture and pixels. Our design system finally became something the whole team trusts.',
    author: 'Daniel Osei',
    title: 'Design Director',
    company: 'Atlas',
  },
  {
    id: 'priya',
    quote:
      'Communicative, fast, and meticulous. Our conversion numbers moved the week after launch and have not looked back.',
    author: 'Priya Sharma',
    title: 'Founder',
    company: 'Fern',
  },
];
