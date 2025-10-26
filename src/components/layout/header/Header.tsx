'use client';

import { useState } from 'react';
import styles from './header.module.css';
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
    };
}

export default function Header({ translations }: Props ) {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            <nav>
                <div className={styles.leftNav}>
                    <div 
                        className={styles.chapter} 
                        onClick={scrollToTop}
                        style={{ cursor: 'pointer' }}
                        role="button"
                        tabIndex={0}
                    >
                        {translations.header.start}
                    </div>
                </div>
                <div className={styles.logo}>
                    M&M
                </div>
                <div className={styles.rightNav}>
                    <div 
                        className={styles.chapter}
                        onClick={scrollToLocation}
                        style={{ cursor: 'pointer' }}
                        role="button"
                        tabIndex={0}
                    >
                        {translations.header.location}
                    </div>
                    <div 
                        className={styles.chapter}
                        onClick={scrollToTheme}
                        style={{ cursor: 'pointer' }}
                        role="button"
                        tabIndex={0}
                    >
                        {translations.header.theme}
                    </div>
                    <div 
                        className={styles.chapter}
                        onClick={scrollToFAQ}
                        style={{ cursor: 'pointer' }}
                        role="button"
                        tabIndex={0}
                    >
                        {translations.header.faq}
                    </div>
                    <div 
                        className={`${styles.chapter} ${styles.rsvp}`}
                        onClick={openRSVPModal}
                        style={{ cursor: 'pointer' }}
                        role="button"
                        tabIndex={0}
                    >
                        {translations.header.rsvp}
                    </div>
                </div>
            </nav>

            <RSVPModal isOpen={isModalOpen} onClose={closeModal} />
        </header>
    )
}