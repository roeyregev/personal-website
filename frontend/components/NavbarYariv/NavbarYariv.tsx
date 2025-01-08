"use client";

import Link from "next/link";
import styles from "./NavbarYariv.module.scss";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";




const NavbarYariv = () => {

    const ref = useRef<HTMLDivElement>(null);
    const [activeById, setActiveById] = useState<string>("myWork");

    const tabs = [
        { id: "myWork", name: "My work", href: "/" },
        { id: "about", name: "About", href: "/about" },
    ];

    const [underlineProperties, setUnderlineProperties] = useState<any>({
        width: 0,
        left: 0,
        height: 0,
    })

    const getTabElement = (tabClassname: string) => {
        const element = ref.current?.getElementsByClassName(tabClassname)[0];
        return element as HTMLDivElement;
    }

    useEffect(() => {
        const activeTab = getTabElement(activeById);
        // console.log(activeTab);
        setUnderlineProperties({
            width: activeTab?.offsetWidth,
            left: activeTab?.offsetLeft,
            height: 4,
        })
    }, [activeById])



    return (
        <div className={styles.NavbarYariv}>
            <div className={styles.tabsFlex} ref={ref} >
                {tabs.map((tab, index) => (
                    <Link
                        href={tab.href}
                        key={tab.id}
                        className={styles.tab + " " + tab.id}
                        onClick={() =>
                            setActiveById(tab.id)}
                    >
                        <motion.span className={styles.tabSpan}>{tab.name}</motion.span>
                    </Link>

                ))}
                <motion.div
                    className={styles.underline}
                    variants={{
                        initial: {
                            width: 116,
                            left: 0,
                            height:4
                        },
                        slideRight:{
                            width: 116,
                            left: 0,
                            height:4
                        }
                    }}
                    // initial={underlineProperties}
                    animate={underlineProperties}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                    }}

                />
            </div>
        </div>
    );
};

export default NavbarYariv;