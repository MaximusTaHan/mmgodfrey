import styles from './Location.module.css';
import Image from 'next/image';

export default function Location() {
    return (
        <div id="location" className={styles.locationContainer}>
            <div className={styles.textWrapper}>
                <p className={styles.preHeader}>Välkommen till...</p>
                <h2 className={styles.header}>Lunedet</h2>
                <div className={styles.details}>
                    <p>Anmäl dig senast sista December, skicka gärna om du inte kommer</p>
                    <p>Vi har reserverat alla stugor som finns tillgängliga, önskas det hyras så gör man det via anmälningsformuläret. </p>
                </div>
                <Image className={styles.flowers} alt="Curved flowers" src="/images/flowers/LocationFlowers.png" width="609" height="609"></Image>
            </div>
            <Image alt="Image of Lunedet" src="/images/Location.png" width="663" height="405"></Image>
        </div>
    )
}