'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Qna.module.css';

interface QnAProps {
  question: string;
  answer: string[];
}

export default function QnA({ question, answer }: QnAProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.qnaContainer}>
      <button 
        className={`${styles.questionButton} ${isExpanded ? styles.expanded : ''}`}
        onClick={toggleExpanded}
        aria-expanded={isExpanded}
      >
        <h3 className={styles.question}>{question}</h3>
        <Image 
          src="/images/Plus.svg" 
          alt={isExpanded ? "Collapse" : "Expand"}
          width={40}
          height={40}
          className={`${styles.icon} ${isExpanded ? styles.expanded : ''}`}
        />
      </button>
      
      <div className={`${styles.answerWrapper} ${isExpanded ? styles.expanded : styles.collapsed}`}>
        <div className={styles.answer}>
          {answer.map((paragraph, index) => (
            <p key={index} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}