import styles from './Schedule.module.css';
export default function Schedule() {
    return (
        <div className={styles.scheduleContainer}>
            <h2>Bröllopsdagen</h2>
            <h3>September 26</h3>
            <p>Sammling Kl 14:00</p>
            <p>Motaggning och aktiviteter</p>
            <p>Middag</p>
            <p>Vigsel</p>
            <p>Fest</p>
            <h3>September 27</h3>
            <p>Kl 10:00 - 11:30</p>
            <p>Brunch/Frukost för dem som anmält</p>
        </div>
    )
}