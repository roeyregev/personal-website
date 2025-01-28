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
                    <div className={styles.aboutTitleFlex}>
                        <h2 className={styles.aboutTitle}>The man</h2>
                        <DownloadCvButton />
                    </div>
                    <p className={styles.paragraph}>I’m Roey and well, I design. My 15 years of experience include mostly working in startups, making whatever is needed.
                    </p>
                    <p className={styles.paragraph}>My biggest projects were animation and motion design, but in the past 2 years the focus has shifted to UI/UX. I love it all though, especially when I can combine it all together, including the business side.
                    </p>
                    <p className={styles.paragraph}>Lately I’ve also learned full-stack development. Just wanted to add an extra little something to my creation range. So I also dabble with that lately.</p>
                    {/* <DownloadCvButton /> */}
                </motion.div>

                <motion.div
                    className={styles.aboutSection}
                    variants={childVariants}
                >
                    <h2 className={styles.aboutTitle}>The name</h2>
                    <ul className={styles.paragraph}>
                        <li>It's pronounced Ro-EE (unless you're American, in which case it's probably Raw-EE).
                        </li>
                        <li>It means “My shepherd” in Hebrew. It’s not me, it's the bible.</li>
                        <li>#21 top most common name in Israel of all times. So, not special.</li>
                    </ul>
                </motion.div>

                <motion.div
                    className={styles.aboutSection}
                    variants={childVariants}
                >
                    <h2 className={styles.aboutTitle}>The mail</h2>
                    <div className={styles.emailFlex}>
                        <CopyEmailButton />
                        <p className={styles.paragraph}>Feel free to contact me. I'm adorable.</p>
                    </div>
                </motion.div>

            </div>
            <Footer />
        </motion.div>
    );
}

export default AboutPage;