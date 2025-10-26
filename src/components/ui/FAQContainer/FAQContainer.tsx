import QnA from '../QnA/QnA';
import styles from './Faqcontainer.module.css';
import Image from 'next/image';

export default function FAQContainer() {
    return (
        <div id="faq" className={styles.container}>
            <div className={styles.flowers}>
                <Image src="/images/QnAFlowers.png" alt="Curved flowers" width="620" height="620"/>
            </div>
            <h2 className={styles.header}>Frågor och svar</h2>
            <QnA 
                question="Vilken typ av bröllopsgåvor?"
                answer={[
                    "Inga blommor. Alla buketter kommer lämnas till Liselotte (...Mor till ena brudgummen)",
                    "Gärna en donation till resekassan"
                ]}
            />
            <QnA
                question="Får man ta med egen dryck?"
                answer={[
                    "Nej, på grund av lokalens alkohol tillstånd så får ingen egen dryck med tas",
                    "Välkomst dryck och 3 dryckes kuponger kommer delas ut till alla"
                ]}
            />
            <QnA
                question="Är bröllopet barnfritt?"
                answer={[
                    "Barn är välkommna på mottagningen fram till innan middagen"
                ]}
            />
        </div>
    )
}