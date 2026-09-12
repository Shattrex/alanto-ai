import Logo from "./Logo";
import { PAGES, goTo, type PageId } from "../nav";

export default function Header({ page }: { page: PageId }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-ink-700/5 bg-cream-100/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center gap-4 px-5 sm:px-8">
        <Logo />
        <nav className="ml-auto flex items-center gap-1 overflow-x-auto no-scrollbar">
          {PAGES.map((p) => {
            const active = p.id === page;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => goTo(p.id)}
                aria-current={active ? "page" : undefined}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2.5 text-[14px] font-semibold transition sm:text-[15px] ${
                  active
                    ? "bg-ink-900 text-white shadow-card"
                    : "text-ink-500 hover:bg-white hover:text-ink-900"
                }`}
              >
                <p.icon />
                <span className="hidden sm:inline">{p.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
