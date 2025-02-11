import styles from './page.module.scss';
import CopyEmailButton from "@/components/CopyEmailButton/CopyEmailButton";
import DownloadCvButton from "@/components/DownloadCvButton/DownloadCvButton";
import { lazy } from 'react';
const Footer = lazy(() => import('@/components/Footer/Footer'));


function AboutPage() {
    return (
        <div className={styles.about}>
            <div className={styles.aboutFlex}>
                <div className={`${styles.aboutSection} ${styles.fadeIn}`}>
                    <div className={styles.aboutTitleFlex}>
                        <h2 className={styles.aboutTitle}>The man</h2>
                        <DownloadCvButton />
                    </div>
                    <p className={styles.paragraph}>I&apos;m Roey and well, I design. My 15 years of experience include mostly working in startups, making whatever is needed.
                    </p>
                    <p className={styles.paragraph}>My biggest projects were animation and motion design, but in the past 2 years the focus has shifted to UI/UX. I love it all though, especially when I can combine it all together, including the business side.
                    </p>
                    <p className={styles.paragraph}>Lately I&apos;ve also learned full-stack development. Just wanted to add an extra little something to my creation range. So I also dabble with that lately.</p>
                </div>

                <div className={`${styles.aboutSection} ${styles.fadeIn}`}>
                    <h2 className={styles.aboutTitle}>The name</h2>
                    <ul className={styles.paragraph}>
                        <li>It&apos;s pronounced Ro-EE (unless you&apos;re American, in which case it&apos;s probably Raw-EE).
                        </li>
                        <li>It means &quot;My shepherd&quot; in Hebrew. It&apos;s not me, it&apos;s the bible.</li>
                        <li>#21 top most common name in Israel of all times. So, not special.</li>
                    </ul>
                </div>

                <div className={`${styles.aboutSection} ${styles.fadeIn}`}>
                    <h2 className={styles.aboutTitle}>The mail</h2>
                    <div className={styles.emailFlex}>
                        <CopyEmailButton />
                        <p className={styles.paragraph}>Feel free to contact me. I&apos;m adorable.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AboutPage;