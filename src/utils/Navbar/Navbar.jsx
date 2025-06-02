import React, { useState, useRef, useEffect } from 'react';
import styles from './Navbar.module.css';
import logo from '../../assets/logoblack.png';
import { useAuth } from '../../auth/context';

const Navbar = () => {
    const { user, logout } = useAuth();
    const avatar = user?.picture || logo;
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    const handleAvatarClick = () => setMenuOpen((open) => !open);

    const handleProfileSettings = () => {
        setMenuOpen(false);
        window.location.href = '/profile';
    };

    const handleLogout = () => {
        setMenuOpen(false);
        logout();
    };

    return (
        <div className={styles.navbarWrapper}>
            <nav className={styles.navbar}>
                <div className={styles.left}>
                    <img src={logo} alt="Logo" className={styles.logo} />
                </div>
                <div className={styles.right}>
                    <div className={styles.notification}>
                        <span className={styles.bell}>
                            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 01-3.46 0" />
                            </svg>
                        </span>
                        <span className={styles.badge}>3</span>
                    </div>
                    <div className={styles.avatarWrapper} ref={menuRef}>
                        <img
                            src={avatar}
                            alt="User"
                            className={styles.avatar}
                            style={{
                                objectFit: 'cover',
                                borderRadius: '50%',
                                background: '#fff',
                                border: '2px solid #e5e7eb',
                                width: 36,
                                height: 36,
                                cursor: 'pointer'
                            }}
                            onClick={handleAvatarClick}
                        />
                        {menuOpen && (
                            <div className={styles.menu}>
                                <button className={styles.menuItem} onClick={handleProfileSettings}>
                                    <span className={styles.menuIcon}>
                                        {/* Settings (gear) icon */}
                                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="3"/>
                                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09A1.65 1.65 0 0 0 12 3.09V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                                        </svg>
                                    </span>
                                    Profile Settings
                                </button>
                                <button className={styles.menuItem} onClick={handleLogout}>
                                    <span className={styles.menuIcon}>
                                        {/* Logout icon */}
                                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                            <polyline points="16 17 21 12 16 7"/>
                                            <line x1="21" y1="12" x2="9" y2="12"/>
                                        </svg>
                                    </span>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;