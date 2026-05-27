import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Materials from '@/components/Materials';
import Projects from '@/components/Projects';
import Process from '@/components/Process';
import LeadForm from '@/components/LeadForm';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Materials />
        <Projects />
        <Process />
        <LeadForm />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
