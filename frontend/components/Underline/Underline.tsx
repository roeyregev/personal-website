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
            // scaleY: [1, 1.8, 1],  // Bounce effect in Y direction
            // scaleX: [1, 2, 1],  // Bounce effect in X direction
            transition: {
                type: "spring",
                duration: 0.6,     // Adjust duration as needed
                bounce: 0.4,
                stiffness: 100,    // Tighter bounce
            },
        },
    };

    return (
        <motion.div
            className={styles.underline}
            style={{ position: 'absolute', left, width }}
            // style={{ left, width }} // Set origin for scale
            animate="animate"
            variants={underlineVariants}
            // initial={false}
            
        />
    );
};

export default Underline;