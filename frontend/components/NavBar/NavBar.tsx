import React from "react";
import styles from "./NavBar.module.scss";
import Link from "next/link";

function NavBar() {
    return (
        <div className={styles.navbar}>
            <Link className={styles.tab} href="/">
                <div>My Work</div>
            </Link>
            <Link className={styles.tab} href="/about">
                <div>About</div>
            </Link>
        </div>
    );
}

export default NavBar