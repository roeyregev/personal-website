"use client";

import Link from "next/link";
import styles from "./NavbarYariv.module.scss";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Toggle from "../Toggle/Toggle";
import { usePathname, useRouter } from 'next/navigation'


const NavbarYariv = () => {
    const router = useRouter(); // Initialize router
    const initialPath = usePathname();
    const initialActiveTab = () => initialPath === "/" ? "myWork" : "about";

    const ref = useRef<HTMLDivElement>(null);
    const [activeById, setActiveById] = useState<string>(initialActiveTab);

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



    //------------------------------------------------------------

    // New handler for navigation
    const handleNavigation = (tab: { id: string; href: string }, e: React.MouseEvent) => {
        e.preventDefault(); // Prevent default Link behavior
        setActiveById(tab.id);
        
        // If navigating from about page to home, add the 'from' parameter
        if (initialPath === '/about' && tab.href === '/') {
            router.push('/?from=about');
        } else {
            router.push(tab.href);
        }
    };

    //------------------------------------------------------------


    return (
        <div className={styles.NavbarYariv}>
            <div className={styles.tabsFlex} ref={ref} >
                {tabs.map((tab, index) => (
                    <Link
                        href={tab.href}
                        key={tab.id}
                        className={`${styles.tab + " " + tab.id} ${activeById === tab.id ? styles.activeTab : ''}`}
                        // onClick={() =>
                        //     setActiveById(tab.id)}

                        onClick={(e) => handleNavigation(tab, e)}
                    >
                        <motion.span className={styles.tabSpan}>{tab.name}</motion.span>
                    </Link>

                ))}
                <motion.div
                    className={styles.underline}
                    animate={underlineProperties}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                    }}

                />
            </div>
            <Toggle />
        </div>
    );
};

export default NavbarYariv;