import QnA from '../QnA/QnA';
import styles from './Faqcontainer.module.css';
import Image from 'next/image';

interface Props {
    translations: {
        faq: {
            header: string;
            q1: { question: string; answer: string[] };
            q2: { question: string; answer: string[] };
            q3: { question: string; answer: string[] };
            q4: { question: string; answer: string[] };
            q5: { question: string; answer: string[] };
            q6: { question: string; answer: string[] };
            q7: { question: string; answer: string[] };
            q8: { question: string; answer: string[] };
            q9: { question: string; answer: string[] };
            q10: { question: string; answer: string[] };
            q11: { question: string; answer: string[] };
            q12: { question: string; answer: string[] };
            q13: { question: string; answer: string[] };
            q14: { question: string; answer: string[] };
            q15: { question: string; answer: string[] };
            q16: { question: string; answer: string[] };
        };
    };
}

export default function FAQContainer({ translations }: Props) {
    return (
        <div id="faq" className={styles.wrapper}>
            <div className={styles.container}>


                <div className={styles.flowers}>
                    <Image src="/images/QnAFlowers.png" alt="Curved flowers" width="620" height="620" />
                </div>
                <h2 className={styles.header}>{translations.faq.header}</h2>
                <QnA
                    question={translations.faq.q1.question}
                    answer={translations.faq.q1.answer}
                />
                <QnA
                    question={translations.faq.q2.question}
                    answer={translations.faq.q2.answer}
                />
                <QnA
                    question={translations.faq.q3.question}
                    answer={translations.faq.q3.answer}
                />
                <QnA
                    question={translations.faq.q4.question}
                    answer={translations.faq.q4.answer}
                />
                <QnA
                    question={translations.faq.q5.question}
                    answer={translations.faq.q5.answer}
                />
                <QnA
                    question={translations.faq.q6.question}
                    answer={translations.faq.q6.answer}
                />
                <QnA
                    question={translations.faq.q7.question}
                    answer={translations.faq.q7.answer}
                />
                <QnA
                    question={translations.faq.q8.question}
                    answer={translations.faq.q8.answer}
                />
                <QnA
                    question={translations.faq.q9.question}
                    answer={translations.faq.q9.answer}
                />
                <QnA
                    question={translations.faq.q10.question}
                    answer={translations.faq.q10.answer}
                />
                <QnA
                    question={translations.faq.q11.question}
                    answer={translations.faq.q11.answer}
                />
                <QnA
                    question={translations.faq.q12.question}
                    answer={translations.faq.q12.answer}
                />
                <QnA
                    question={translations.faq.q13.question}
                    answer={translations.faq.q13.answer}
                />
                <QnA
                    question={translations.faq.q14.question}
                    answer={translations.faq.q14.answer}
                />
                <QnA
                    question={translations.faq.q15.question}
                    answer={translations.faq.q15.answer}
                />
                <QnA
                    question={translations.faq.q16.question}
                    answer={translations.faq.q16.answer}
                />
            </div>
        </div>
    )
}