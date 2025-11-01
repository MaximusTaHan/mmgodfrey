import styles from './Location.module.css';
import Image from 'next/image';

interface Props {
    translations: {
        location: {
            preHeader: string;
            header: string;
            description1: string;
            description2: string;
            description3: string;
            descriptionMobile2: string;
            descriptionMobile3: string;
        };
    };
}

export default function Location({ translations }: Props) {
    return (
        <div id="location" className={styles.wrapper}>
            <div className={styles.locationContainer}>

                <div className={styles.textWrapper}>
                    <p className={styles.preHeader}>{translations.location.preHeader}</p>
                    <h2 className={styles.header}>{translations.location.header}</h2>
                    <div className={styles.details}>
                        <p>{translations.location.description1} <a href="https://lunnedet.se/">Lunnedet.se</a></p>
                        <p>{translations.location.description2}</p>
                        <p>{translations.location.description3}</p>
                    </div>
                    <Image className={styles.flowers} alt="Curved flowers" src="/images/flowers/LocationFlowers.png" width="609" height="609"></Image>
                </div>
                <Image alt="Image of Lunedet" src="/images/Location.png" width="663" height="405"></Image>
                <div className={styles.detailsMobile}>
                    <p>{translations.location.description1} <a href="https://lunnedet.se/">Lunnedet.se</a></p>
                    <p>{translations.location.descriptionMobile2}</p>
                    <p>{translations.location.descriptionMobile3}</p>
                    <p>{translations.location.description3}</p>
                </div>
            </div>

        </div>
    )
}