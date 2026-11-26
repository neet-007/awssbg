"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/articles", label: "Articles" },
  { href: "/team", label: "Team" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === "/home";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className={`site-header${open ? " is-open" : ""}`}>
      <div className="container header-inner">
        <Link className="logo" href="/" aria-label="AWSSBG — home">
          <span className="logo__mark" aria-hidden="true">
            <svg viewBox="0 0 64 40" fill="currentColor" shapeRendering="crispEdges">
              <rect x="8" y="20" width="48" height="14" />
              <rect x="18" y="12" width="20" height="8" />
              <rect x="34" y="6" width="18" height="14" />
            </svg>
          </span>
          <span className="logo__text">
            <span className="logo__name">AWSSBG</span>
            <span className="logo__sub">University of Khartoum</span>
          </span>
        </Link>

        <nav className="main-nav" aria-label="Primary">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="menu-toggle-btn"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <span className="menu-toggle" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div id="mobile-nav" className="mobile-nav">
        <button
          type="button"
          className="mobile-nav__scrim"
          aria-label="Close navigation menu"
          onClick={() => setOpen(false)}
        />
        <div className="mobile-nav__panel">
          <nav aria-label="Mobile">
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}