import Nav from '@/components/landing/Nav';
import Hero from '@/components/landing/Hero';
import Problema from '@/components/landing/Problema';
import AntiFraude from '@/components/landing/AntiFraude';
import Features from '@/components/landing/Features';
import ComoFunciona from '@/components/landing/ComoFunciona';
import Pricing from '@/components/landing/Pricing';
import Faq from '@/components/landing/Faq';
import CtaWaitlist from '@/components/landing/CtaWaitlist';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <>
      <Nav />
      <Hero />
      <Problema />
      <ComoFunciona />
      <Features />
      <AntiFraude />
      <Pricing />
      <Faq />
      <CtaWaitlist />
      <Footer />
    </>
  );
}
