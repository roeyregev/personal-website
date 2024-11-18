import React from "react";
import styles from './page.module.scss';

function AboutPage() {
    return (
        <div className={styles.about}>
            <div className={styles.aboutSection}>
                <h2 className={styles.aboutTitle}>The man</h2>
                <p className={styles.paragraph}>I’m Roey and… I design as you’ve probably already guessed. Professionally I grew up in startups (going on 15 years now holy s#%t)
                    making whatever is needed, but mainly animation and motion design. In the past 2 years the focus has shifted to UI/UX but I love it all,
                    especially when I can combine it all together, including the business side.
                </p>
                <p className={styles.paragraph}>Lately I’ve also graduated from a full-stack development course. Don’t know…
                    just wanted to add an extra little something to my creation range. So I also dabble with that lately.</p>
            </div>

            <div className={styles.aboutSection}>
                <h2 className={styles.aboutTitle}>The name</h2>
                <ul className={styles.paragraph}>
                    <li>It’s pronounced Ro-EE (unless you’re American, then it’s probably Raw-EE)</li>
                    <li>It means “My shepherd” in hebrew. It’s not me, it's the bible</li>
                    <li>It’s not special - #5 on the top most common names in Israel of all times</li>
                </ul>
            </div>

            <div className={styles.aboutSection}>
                <h2 className={styles.aboutTitle}>The mail</h2>
                <p className={styles.paragraph}>Feel free to drop me a line  at <a className={styles.email} href="#" >roeyregev@gmail.com</a> <br/> If I’m not hungry I’m usually very nice.</p>
                <p className={styles.paragraph}>You can also</p><button className={styles.button}>Download my CV</button>
            </div>
        </div>
    );
}



export default AboutPage;