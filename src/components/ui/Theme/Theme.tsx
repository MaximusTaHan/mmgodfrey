import styles from './Theme.module.css';
import Image from 'next/image';
export default function Theme() {
    return (
        <div id="theme" className={styles.themeContainer}>
            <h2 className={styles.header}>Dresscode & Tema</h2>
            <Image alt="Girls looking fancy" src="/images/Theme.png" width="900" height="380"></Image>
            <div className={styles.bottomContainer}>
                <div className={styles.textContainer}>
                    <p>
                        Vårt bröllopstema är glamour deluxe – tänk Dynasty-drama, glitter, diamanter, pärlor och päls. Vi älskar over the top men framför allt att alla ska känna sig fantastiska!
                    </p>
                    <p>
                        Det finns inget krav på att klä sig extravagant, men det är mer än välkommet om du vill gå all in. Klä upp dig så mycket – eller så lagom – du själv vill.
                    </p>
                    <p>
                        Eftersom vi är två män och ingen klassisk brud finns, vill vi gärna lyfta att kvinnor självklart är välkomna att bära vitt. Har du en gammal brudklänning som längtar efter att se dansgolvet igen? Ta fram den – det är bara kul!
                    </p>
                    <p>
                        Så ta fram paljetterna, diademet, smokingen, pärlorna eller din mest glamorösa kreation – vi längtar efter att se hur ni tolkar vår Dynasty-värld! 
                    </p>
                    <p>
                        Själva bröllopets färgtema är dark teal och bränt orange. För att låta våra brudtärnor och best men glänsa i sina outfits önskar vi att gäster undviker just dessa två färger.
                    </p>

                </div>
                <Image alt="Collage of people" src="/images/Style2.png" width="458" height="879"></Image>
            </div>
        </div>
    )
}