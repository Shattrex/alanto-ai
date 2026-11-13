import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { CAL_URL, isCalConfigured } from "../config/site";
import BookingModal from "../components/BookingModal";

interface BookingCtx {
  openBooking: () => void;
}

const Ctx = createContext<BookingCtx>({ openBooking: () => {} });

/**
 * One handler for every booking CTA. With a real CAL_URL it opens Cal.com in a
 * new tab; otherwise it opens the placeholder PRIVATE DEMO modal.
 */
export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openBooking = useCallback(() => {
    if (isCalConfigured) window.open(CAL_URL, "_blank", "noopener,noreferrer");
    else setOpen(true);
  }, []);

  const value = useMemo(() => ({ openBooking }), [openBooking]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <BookingModal open={open} onClose={() => setOpen(false)} />
    </Ctx.Provider>
  );
}

export const useBooking = () => useContext(Ctx);
