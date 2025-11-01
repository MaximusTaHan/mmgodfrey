import styles from './Schedule.module.css';

interface Props {
    translations: {
        schedule: {
            header: string;
            date1: string;
            gathering: string;
            reception: string;
            dinner: string;
            ceremony: string;
            party: string;
            closing: string;
            date2: string;
            brunch: string;
        };
    };
}

export default function Schedule({ translations }: Props) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.scheduleContainer}>
                <h2>{translations.schedule.header}</h2>
                <h3>{translations.schedule.date1}</h3>
                <p>{translations.schedule.gathering}</p>
                <p>{translations.schedule.reception}</p>
                <p>{translations.schedule.dinner}</p>
                <p>{translations.schedule.ceremony}</p>
                <p>{translations.schedule.party}</p>
                <p>{translations.schedule.closing}</p>
                <h3>{translations.schedule.date2}</h3>
                <p>{translations.schedule.brunch}</p>
            </div>
        </div>
    )
}