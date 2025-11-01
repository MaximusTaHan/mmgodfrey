'use client';

import { useState } from 'react';
import styles from './headerMobile.module.css';
import RSVPModal from '../../forms/RSVPModal/RSVPModal';

interface Props {
    translations: {
        header: {
            start: string;
            location: string;
            theme: string;
            faq: string;
            rsvp: string;
        };
        rsvp: {
            header: {
                title: string;
                subtitle: string;
            };
            attendance: {
                label: string;
                yesOption: string;
                noOption: string;
            };
            fields: {
                name: string;
                phone: string;
                email: string;
                accommodation: string;
                dietary: string;
                brunch: string;
                honeypot: string;
            };
            accommodationOptions: {
                select: string;
                cabin: string;
                camping: string;
                none: string;
            };
            placeholders: {
                dietary: string;
            };
            notes: {
                accommodationDetails: string;
                cabinNote: string;
                campingNote: string;
                brunchNote: string;
            };
            buttons: {
                cancel: string;
                submit: string;
                submitting: string;
            };
            errors: {
                requiredFields: string;
                sendError: string;
                unexpectedError: string;
            };
            success: {
                message: string;
            };
        };
    };
}

export default function HeaderMobile({ translations }: Props ) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const openRSVPModal = () => {
        console.log('RSVP modal opened!'); // Debug log
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const scrollToTop = () => {
        console.log('Scroll to top clicked!'); // Debug log
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const scrollToLocation = () => {
        console.log('Scroll to location clicked!'); // Debug log
        const locationElement = document.getElementById('location');
        if (locationElement) {
            const elementPosition = locationElement.offsetTop;
            const offsetPosition = elementPosition - 100; // 100px offset above the element
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const scrollToTheme = () => {
        console.log('Scroll to theme clicked!'); // Debug log
        const themeElement = document.getElementById('theme');
        if (themeElement) {
            const elementPosition = themeElement.offsetTop;
            const offsetPosition = elementPosition - 100; // 100px offset above the element
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const scrollToFAQ = () => {
        console.log('Scroll to FAQ clicked!'); // Debug log
        const faqElement = document.getElementById('faq');
        if (faqElement) {
            const elementPosition = faqElement.offsetTop;
            const offsetPosition = elementPosition - 100; // 100px offset above the element
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                M&M
            </div>
            <button className={`${styles.menuButton} ${isMenuOpen ? styles.buttonOpen : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>

            {isMenuOpen && (
                <>
                    <div className={styles.overlay} onClick={() => setIsMenuOpen(false)}></div>
                    <nav className={styles.sideMenu}>
                    <div 
                        className={styles.chapter} 
                        onClick={() => {
                            scrollToTop();
                            setIsMenuOpen(false);
                        }}
                        role="button"
                        tabIndex={0}
                    >
                        {translations.header.start}
                    </div>
                    <div 
                        className={styles.chapter}
                        onClick={() => {
                            scrollToLocation();
                            setIsMenuOpen(false);
                        }}
                        role="button"
                        tabIndex={0}
                    >
                        {translations.header.location}
                    </div>
                    <div 
                        className={styles.chapter}
                        onClick={() => {
                            scrollToTheme();
                            setIsMenuOpen(false);
                        }}
                        role="button"
                        tabIndex={0}
                    >
                        {translations.header.theme}
                    </div>
                    <div 
                        className={styles.chapter}
                        onClick={() => {
                            scrollToFAQ();
                            setIsMenuOpen(false);
                        }}
                        role="button"
                        tabIndex={0}
                    >
                        {translations.header.faq}
                    </div>
                    <div 
                        className={`${styles.chapter} ${styles.rsvp}`}
                        onClick={() => {
                            openRSVPModal();
                            setIsMenuOpen(false);
                        }}
                        role="button"
                        tabIndex={0}
                    >
                        {translations.header.rsvp}
                    </div>
                </nav>
                </>
            )}

            <RSVPModal isOpen={isModalOpen} onClose={closeModal} translations={translations} />
        </header>
    )
}