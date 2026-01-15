"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/review_form", label: "Leave a Review" },
  { href: "/reviews", label: "Browse Reviews" }, // ← reviews page
  { href: "/feedback_form", label: "Suggest a Club" },
  { href: "/terms", label: "Terms" },
];

export default function TopLeftNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div className="fixed top-4 left-4 z-50" ref={ref}>
      {/* Hamburger Icon */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open menu"
        className="flex flex-col justify-center gap-1.5 p-2"
      >
        <span className="w-6 h-[2px] bg-gray-400 rounded"></span>
        <span className="w-6 h-[2px] bg-gray-400 rounded"></span>
        <span className="w-6 h-[2px] bg-gray-400 rounded"></span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="mt-2 w-56 rounded-xl bg-white/95 backdrop-blur border border-black/10 shadow-lg p-1">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm transition ${
                  active
                    ? "bg-black/5 font-semibold"
                    : "hover:bg-black/5"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
