"use client";

import Link from "next/link";
import styles from "./NavbarYariv.module.scss";
import { useState, useRef, useEffect } from "react";
import { animate, motion } from "framer-motion";
import Toggle from "../Toggle/Toggle";
import { usePathname } from 'next/navigation';
import { useDrawerContext } from '@/app/DrawerContext';

type TabId = "myWork" | "about";

interface UnderlineProperties {
    width: number;
    left: number;
    height: number;
    opacity: number
}

const NavbarYariv = () => {

    const { closeDrawerNew } = useDrawerContext();
    const initialPath = usePathname();
    const getInitialActiveTab = (): TabId => initialPath === "/" ? "myWork" : "about";
    const ref = useRef<HTMLDivElement>(null);
    const [activeById, setActiveById] = useState<TabId>(getInitialActiveTab());
    const [hasShadow, setHasShadow] = useState(false); 
    const [underlineProperties, setUnderlineProperties] = useState<UnderlineProperties | null>(null);

    const tabs = [
        { id: "myWork" as const, name: "My work", href: "/" },
        { id: "about" as const, name: "About", href: "/about" },
    ];

    const getTabProperties = (tabId: TabId): UnderlineProperties => {
        const element = document.getElementsByClassName(tabId)[0] as HTMLDivElement;
        return {
            width: (element?.offsetWidth) || 0,
            left: element?.offsetLeft || 0,
            height: 4,
            opacity: 0,
        };
    };

    //set underline properties
    useEffect(() => {
        const initialProperties = getTabProperties(activeById);
        setUnderlineProperties(initialProperties);

        const handleResize = () => {
            setUnderlineProperties(getTabProperties(activeById));
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [activeById]);

    //add shadow on scroll
    useEffect(() => {
        const handleScroll = () => {
            setHasShadow(window.scrollY > 0);
        };
        
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    return (
        <div className={`${styles.NavbarYariv} ${hasShadow ? styles.shadow : ''}`}>
            <div
                className={styles.tabsFlex}
                ref={ref}>
                {tabs.map((tab) => (
                    <Link
                        href={tab.href}
                        key={tab.id}
                        className={`${styles.tab + " " + tab.id} ${activeById === tab.id ? styles.activeTab : ''}`}
                        onClick={() => {
                            setActiveById(tab.id);
                            closeDrawerNew()
                        }}
                    >
                        <motion.span className={styles.tabSpan}>{tab.name}</motion.span>
                    </Link>
                ))}
                {underlineProperties && (
                    <motion.div
                        className={styles.underline}
                        initial={false} // Prevent animation from zero values
                        animate={{
                            width: underlineProperties.width,
                            left: underlineProperties.left,
                            height: underlineProperties.height,
                            opacity: 1
                        }} 
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                        }}
                    />
                )}
            </div>
            <Toggle />
        </div>
    );
};

export default NavbarYariv;