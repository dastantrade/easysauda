import Hero from '@/components/landing/Hero';
import About from '@/components/landing/About';
import CourseCards from '@/components/landing/CourseCards';
import Testimonials from '@/components/landing/Testimonials';
import FAQ from '@/components/landing/FAQ';
import CTA from '@/components/landing/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <CourseCards />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
