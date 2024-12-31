// Underline.tsx
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
            scaleY: [1, 1.4, 1], // Bounce Y
            scaleX: [1, 0.8, 1], // Bounce X 
            transition: {
                type: "spring",
                // duration: 0.4,
                visualDuration: 0.3,
                // ease: "easeInOut",
                bounce: 0.5,
                // damping: 20
            }
        },
    };

    return (
        <motion.div
            className={styles.underline}
            style={{ left, width, originY: "center", originX: "right" }} // Set origin for scale
            // style={{ left, width }} // Set initial position and width
            animate="animate"
            variants={underlineVariants}
        />
    );
};

export default Underline;