"use client"

import React from "react";
import styles from './page.module.scss';
import CopyEmailButton from "@/components/CopyEmailButton/CopyEmailButton";
import DownloadCvButton from "@/components/DownloadCvButton/DownloadCvButton";
import Footer from "@/components/Footer/Footer";
import { motion } from "framer-motion";


function AboutPage() {

    // Animation variants
    const containerVariants = {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.4
            }
        }
    };

    const childVariants = {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div
            className={styles.about}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={containerVariants}
        >
            <div className={styles.aboutFlex}>
                <motion.div 
                className={styles.aboutSection}
                variants={childVariants}
                >
                    <h2 className={styles.aboutTitle}>The man</h2>
                    <p className={styles.paragraph}>I’m Roey and… I design as you’ve probably already guessed. Professionally I grew up in startups (going on 15 years now holy s#%t)
                        making whatever is needed, but mainly animation and motion design. In the past 2 years the focus has shifted to UI/UX but I love it all,
                        especially when I can combine it all together, including the business side.
                    </p>
                    <p className={styles.paragraph}>Lately I’ve also graduated from a full-stack development course. Don’t know…
                        just wanted to add an extra little something to my creation range. So I also dabble with that lately.</p>
                </motion.div>

                <motion.div 
                className={styles.aboutSection}
             
                variants={childVariants}
                >
                    <h2 className={styles.aboutTitle}>The name</h2>
                    <ul className={styles.paragraph}>
                        <li>It’s pronounced Ro-EE (unless you’re American, then it’s probably Raw-EE).</li>
                        <li>It means “My shepherd” in hebrew. It’s not me, it's the bible.</li>
                        {/* <li>It’s not special - #5 on the top most common names in Israel of all times</li> */}
                    </ul>
                </motion.div>

                <motion.div 
                className={styles.aboutSection}
                variants={childVariants}
                >
                    <h2 className={styles.aboutTitle}>The mail</h2>
                    <div className={styles.emailSection}>
                        <p className={styles.paragraph}>Contact me at &nbsp;</p>
                        <div className={styles.emailFlex}>
                            <CopyEmailButton />
                        </div>
                    </div>

                    <div className={styles.emailSection}>
                        <p className={styles.paragraph}>You can also &nbsp;</p>
                        <div className={styles.emailFlex}>
                            <DownloadCvButton />
                        </div>
                    </div>
                </motion.div>

            </div>
            <Footer />
        </motion.div>
    );
}



export default AboutPage;