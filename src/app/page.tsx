import styles from "./page.module.css";
import Image from "next/image";
import Countdown from "../components/ui/Countdown/Countdown";
import Location from "../components/ui/Location/Location";
import Theme from "@/components/ui/Theme/Theme";
import Schedule from "@/components/ui/Schedule/Schedule";
import FAQContainer from "@/components/ui/FAQContainer/FAQContainer";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.mainImage}>
          <Image src="/images/Main.png" alt="Two handsome boys looking at eachother" width="900" height="672"></Image>
          <h1 className={styles.mainHeader}>Max & Miku</h1>
          <div className={styles.leftFlowers}>
            <Image src="/images/flowers/LeftFlowers.png" alt="Left flowers" width="500" height="800"></Image>
          </div>
          <div className={styles.rightFlowers}>
            <Image src="/images/flowers/RightFlowers.png" alt="Left flowers" width="500" height="800"></Image>
          </div>
                </div>
        
        <Countdown />
        <Location />
        <Theme />
        <Schedule />
        <FAQContainer />
      </main>
    </div>
  );
}
