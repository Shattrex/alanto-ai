import { MotionConfig } from "framer-motion";
import { BookingProvider } from "./hooks/useBooking";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CommercialPlayer from "./components/CommercialPlayer";
import AuthorityGap from "./components/AuthorityGap";
import SellerStory from "./components/SellerStory";
import HowItWorks from "./components/HowItWorks";
import AuthorityOutput from "./components/AuthorityOutput";
import EngagementPanel from "./components/EngagementPanel";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BookingProvider>
        <div className="noise relative min-h-svh bg-base">
          <Navbar />
          <main>
            <Hero />
            <CommercialPlayer />
            <AuthorityGap />
            <SellerStory />
            <HowItWorks />
            <AuthorityOutput />
            <EngagementPanel />
            <FAQ />
            <FinalCTA />
          </main>
          <Footer />
        </div>
      </BookingProvider>
    </MotionConfig>
  );
}
