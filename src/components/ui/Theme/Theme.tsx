import styles from './Theme.module.css';
import Image from 'next/image';

interface Props {
    translations: {
        theme: {
            header: string;
            paragraph1: string;
            paragraph2: string;
            paragraph3: string;
            paragraph4: string;
            paragraph5: string;
        };
    };
}

export default function Theme({ translations }: Props) {
    return (
        <div id="theme" className={styles.themeContainer}>
            <h2 className={styles.header}>{translations.theme.header}</h2>
            <div className={styles.image}>
                <Image alt="Girls looking fancy" src="/images/Theme.png" width="900" height="380"></Image>
            </div>
            <div className={styles.bottomContainer}>
                <div className={styles.textContainer}>
                    <p>
                        {translations.theme.paragraph1}
                    </p>
                    <p>
                        {translations.theme.paragraph2}
                    </p>
                    <p>
                        {translations.theme.paragraph3}
                    </p>
                    <p>
                        {translations.theme.paragraph4}
                    </p>
                    <p>
                        {translations.theme.paragraph5}
                    </p>

                </div>
                <Image alt="Collage of people" src="/images/Style2.png" width="458" height="879"></Image>
            </div>
        </div>
    )
}