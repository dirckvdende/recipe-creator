"use client"

import styles from "./footer.module.scss"
import Link from "next/link"

/**
 * Footer component
 * @param param0 Props (none)
 * @returns The component
 */
export default function Footer({}: Readonly<{}>) {
    return <footer className={styles.footer}>
        View more of my projects on <Link href="https://dirck.dev">
        dirck.dev</Link>
    </footer>
}