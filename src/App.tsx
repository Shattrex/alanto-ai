import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Loader from "./components/Loader";
import DemoPage from "./pages/DemoPage";
import UseCasePage from "./pages/UseCasePage";
import StartPage from "./pages/StartPage";
import { goTo, readPage, type PageId } from "./nav";

const params = new URLSearchParams(window.location.search);
const preview = params.get("preview") === "1";
const showLoader = params.get("loader") === "1";

export default function App() {
  const [page, setPage] = useState<PageId>(readPage);
  const [typedDone, setTypedDone] = useState(preview);
  const [generating, setGenerating] = useState(showLoader);
  const [ready, setReady] = useState(preview);

  useEffect(() => {
    const onHash = () => {
      setPage(readPage());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const finish = useCallback(() => {
    setGenerating(false);
    setReady(true);
    goTo("demo");
  }, []);

  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden bg-cream-100 bg-cream-glow">
      <Header page={page} />

      <main key={page} className="reveal">
        {page === "meet" && (
          <Hero
            typedDone={typedDone}
            onTypedDone={() => setTypedDone(true)}
            onGenerate={() => setGenerating(true)}
          />
        )}
        {page === "demo" && (
          <DemoPage ready={ready} onGenerate={() => setGenerating(true)} />
        )}
        {page === "usecase" && <UseCasePage />}
        {page === "start" && <StartPage />}
      </main>

      <AnimatePresence>{generating && <Loader onDone={finish} />}</AnimatePresence>

      <footer className="border-t border-ink-700/10 py-10 text-center text-xs text-ink-400">
        Alanto AI · Richard Morgin Alter Ego · We don’t compete — we obsolete.
      </footer>
    </div>
  );
}
