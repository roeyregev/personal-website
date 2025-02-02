import { easeIn, motion } from "framer-motion";

function IconClose() {
    return (
        <motion.svg
            width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.51477 7.51465L24.4853 24.4852" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M24.4854 7.51465L7.51479 24.4852" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </motion.svg>
    );
}

export default IconClose;