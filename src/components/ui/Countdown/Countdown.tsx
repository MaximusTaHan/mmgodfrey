'use client';

import { useState, useEffect } from 'react';
import styles from './Countdown.module.css';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2026-09-26T00:00:00').getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.countdown}>
      <h2 className={styles.title}>Bröllop - September 26, 2026</h2>
      <div className={styles.timeContainer}>
        <div className={styles.timeUnit}>
          <span className={styles.number}>{timeLeft.days}</span>
          <span className={styles.label}>Dagar</span>
        </div>
        <div className={styles.separator}>:</div>
        <div className={styles.timeUnit}>
          <span className={styles.number}>{timeLeft.hours.toString().padStart(2, '0')}</span>
          <span className={styles.label}>Timmar</span>
        </div>
        <div className={styles.separator}>:</div>
        <div className={styles.timeUnit}>
          <span className={styles.number}>{timeLeft.minutes.toString().padStart(2, '0')}</span>
          <span className={styles.label}>Minuter</span>
        </div>
        <div className={styles.separator}>:</div>
        <div className={styles.timeUnit}>
          <span className={styles.number}>{timeLeft.seconds.toString().padStart(2, '0')}</span>
          <span className={styles.label}>Sekunder</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;