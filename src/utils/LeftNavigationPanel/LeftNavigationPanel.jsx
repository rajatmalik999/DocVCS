import React from 'react';
import styles from './LeftNavigationPanel.module.css';
import { NavLink } from 'react-router-dom';

const LeftNavigationPanel = () => {
  return (
    <nav className={styles.leftNav}>
      <ul className={styles.navList}>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            <span className={styles.icon}>
              {/* Home icon SVG */}
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M3 12L12 3l9 9" />
                <path d="M9 21V9h6v12" />
              </svg>
            </span>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            <span className={styles.icon}>
              {/* Chat icon SVG */}
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </span>
            User Chat
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/approvals"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            <span className={styles.icon}>
              {/* Check icon SVG */}
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            Approvals
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/documents"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            <span className={styles.icon}>
              {/* Document Vault icon SVG */}
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M16 3v4M8 3v4M3 11h18" />
                <circle cx="12" cy="15" r="2" />
              </svg>
            </span>
            Document Vault
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/help"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            <span className={styles.icon}>
              {/* Help icon SVG */}
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 1 1 5.82 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12" y2="17" />
              </svg>
            </span>
            Help & Support
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default LeftNavigationPanel;
