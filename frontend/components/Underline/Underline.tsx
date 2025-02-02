import React from "react";
import { motion } from "framer-motion";
import styles from "./Underline.module.scss"

interface UnderlineProps {
    left: number;
    width: number;
    targetLeft: number;
    targetWidth: number;
}

const Underline: React.FC<UnderlineProps> = ({ left, width, targetLeft, targetWidth }) => {
    const underlineVariants = {
        animate: {
            left: targetLeft,
            width: targetWidth,
            transition: {
                type: "spring",
                duration: 0.6,
                bounce: 0.4,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div
            className={styles.underline}
            style={{ position: 'absolute', left, width }}
            animate="animate"
            variants={underlineVariants}  
        />
    );
};

export default Underline;