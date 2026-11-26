/* TODO s:
 * The links in the footer
*/

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__main">
          <div className="footer-brand">
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
            <p>
              AWS Student Builder Group — a student-led technology community
              exploring cloud computing, software engineering, and real-world
              building.
            </p>

            <ul className="socials">
              <li>
                <a href="#" aria-label="AWSSBG on GitHub">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.7.9 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" aria-label="AWSSBG on LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.7c0-1.36-.03-3.1-1.9-3.1-1.9 0-2.2 1.47-2.2 3v5.8h-4z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" aria-label="AWSSBG on Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" aria-label="AWSSBG on X">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.9 2H22l-7 8 8.2 12h-6.6l-5.2-7.6L5.4 22H2.3l7.5-8.6L2 2h6.7l4.7 6.9zM17.8 20h1.8L7.3 3.9H5.4z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" aria-label="Email AWSSBG">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 10 6 10-6" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col" />

          <div className="footer-col">
            <h3>Community</h3>
            <ul>
              <li><Link href="/events">Events</Link></li>
              <li><Link href="/articles">Articles</Link></li>
              <li><Link href="/team">Team</Link></li>
              <li><a href="#linktree">Linktree</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Organization</h3>
            <ul>
              <li><a href="#">AWS SBG</a></li>
              <li><a href="#">About</a></li>
              <li><Link href="/team">Team</Link></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 AWSSBG · University of Khartoum</p>
        </div>
      </div>
    </footer>
  );
}