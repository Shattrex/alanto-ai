import { useState } from "react";
import { BRAND } from "../config/brand";
import { CTA, FOOTER_LINKS, SECTION } from "../config/site";
import { useBooking } from "../hooks/useBooking";
import { scrollToId } from "../lib/utils";
import AlantoLogo from "./AlantoLogo";
import Modal from "./ui/Modal";

const linkCls = "text-left text-[13px] text-mute transition-colors hover:text-fg";

export default function Footer() {
  const { openBooking } = useBooking();
  const [legal, setLegal] = useState<"Privacy" | "Terms" | null>(null);

  return (
    <footer className="relative border-t border-line bg-base">
      <div className="shell py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <AlantoLogo variant="horizontal" height={22} />
            <p className="label-xs mt-5">{BRAND.descriptor}</p>
          </div>

          <nav aria-label="Footer">
            <div className="label-xs mb-5 text-fg">PRODUCT</div>
            <ul className="space-y-3">
              {FOOTER_LINKS.product.map((l) => (
                <li key={l.id}>
                  <button className={linkCls} onClick={() => scrollToId(l.id)}>
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <div className="label-xs mb-5 text-fg">COMPANY</div>
            <ul className="space-y-3">
              {FOOTER_LINKS.legal.map((l) => (
                <li key={l}>
                  <button className={linkCls} onClick={() => setLegal(l)}>
                    {l}
                  </button>
                </li>
              ))}
              <li>
                <button className="text-left text-[13px] text-fg transition-colors hover:text-ice" onClick={openBooking}>
                  {CTA.bookDemo.charAt(0) + CTA.bookDemo.slice(1).toLowerCase()}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
          <span className="label-xs">© {new Date().getFullYear()} ALANTO</span>
          <button className="label-xs transition-colors hover:text-fg" onClick={() => scrollToId(SECTION.top)}>
            BACK TO TOP ↑
          </button>
        </div>
      </div>

      <Modal open={!!legal} onClose={() => setLegal(null)} title={legal ?? ""} eyebrow="ALANTO / LEGAL" size="md">
        <div className="p-6 md:p-8">
          <div className="label mb-4 text-ice">COMING SOON</div>
          <p className="text-[14.5px] leading-relaxed text-mute">
            The {legal} page will be published here before launch.
          </p>
        </div>
      </Modal>
    </footer>
  );
}
