"use client"

import React from "react";
import { usePathname } from "next/navigation";
import styles from "./NavBar.module.scss";
import Link from "next/link";
import Toggle from "../Toggle/Toggle";


function NavBar() {

    const pathname = usePathname();

    return (
        <div className={styles.navbar}>
           
            <Link
                href="/"
                className={`${styles.tab} ${pathname === "/" ? styles.active : ""}`}
            >
                <div>My Work</div>
            </Link>
            <Link
                href="/about"
                className={`${styles.tab} ${pathname === "/about" ? styles.active : ""}`}
            >
                <div>About</div>
            </Link>
            <Toggle />
        </div>
    );
}

export default NavBar