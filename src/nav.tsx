import type { ReactElement } from "react";

export type PageId = "meet" | "demo" | "usecase" | "start";

export const PAGES: { id: PageId; label: string; icon: () => ReactElement }[] = [
  { id: "meet", label: "Meet Richard", icon: HomeIcon },
  { id: "demo", label: "Alter Ego Demo", icon: UsersIcon },
  { id: "usecase", label: "Market Impact", icon: MapIcon },
  { id: "start", label: "Get Started", icon: SparkIcon },
];

export function readPage(): PageId {
  const id = window.location.hash.replace(/^#\/?/, "") as PageId;
  return PAGES.some((p) => p.id === id) ? id : "meet";
}

export function goTo(id: PageId) {
  window.location.hash = `#/${id}`;
}

function HomeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20h14V9.5" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.2 2.7-5.2 6-5.2s6 2 6 5.2" />
      <path d="M16.5 5.2a3.2 3.2 0 0 1 0 6.1M18 14.4c2 .7 3.5 2.5 3.5 5.1" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 3.5 3.5 5.5v15L9 18.5l6 2 5.5-2v-15L15 5.5l-6-2Z" />
      <path d="M9 3.5v15M15 5.5v15" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3.5l1.8 4.7L18.5 10l-4.7 1.8L12 16.5l-1.8-4.7L5.5 10l4.7-1.8L12 3.5Z" />
      <path d="M18.5 16.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z" />
    </svg>
  );
}
