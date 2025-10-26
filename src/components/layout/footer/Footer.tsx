import styles from './footer.module.css';
import Image from 'next/image';

interface Props {
    translations: {
        footer: {
            contactUs: string;
            toastmasterContact: string;
        };
    };
}

export default function Footer({ translations }: Props) {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.contactWrapper}>
                    <h3>{translations.footer.contactUs}</h3>
                    <div className={styles.contact}>
                        <p>Max Hansen - 076 344 56 87</p>
                        <p>Max.95hansen@gmail.com</p>
                    </div>
                    <div className={styles.contact}>
                        <p>Miku Godfrey - 070 733 55 55</p>
                        <p>MikuGodfrey@gmail.com</p>
                    </div>
                    <h3>{translations.footer.toastmasterContact}</h3>
                    <div className={styles.contact}>
                        <p>Andreas Kullander - telefon</p>
                        <p>Mail</p>
                    </div>
                    <div className={styles.contact}>
                        <p>Malin Ekberg</p>
                        <p>Mail</p>
                    </div>
                </div>
                <div className={styles.faceCard}>
                    <span className={styles.logo}>M&M</span>
                    <Image alt="" src={'/images/FooterImage.png'} width="270" height="283"></Image>
                </div>
            </div>
        </footer>
    )
}