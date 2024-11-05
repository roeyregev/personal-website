import React from "react";
import styles from "./NavBar.module.scss";
import Link from "next/link";

function NavBar() {
    return (
        <div className={styles.navbar}>
            <Link href="/">
                <div>My Work</div>
            </Link>
            <Link href="/about">
                <div>About</div>
            </Link>
        </div>
    );
}

export default NavBar