"use client"

import React from "react";
import styles from "./header.module.scss";

/**
 * Navigation item component
 * @param param0 Props:
 * - `children` - Child elements of the component
 * - `icon` - Google icon name, defaults to "menu"
 * - `onClick` - Handler when the item is clicked
 * @returns The component
 */
function NavItem({children, icon, onClick}: Readonly<{children?:
React.ReactNode, icon?: string, onClick?: () => void}>) {
    return <li className={styles.navItem}>
        <button onClick={onClick ?? (() => {})}>
            <span className={`${styles.icon} material-symbols-outlined`}>
                {icon ?? "menu"}
            </span>
            <span className={styles.text}>{children}</span>
        </button>
    </li>
}

/**
 * Header component
 * @param param0 Props:
 * - `sitename` - The website name to display in the header
 * @returns The component
 */
export default function Header({sitename}: Readonly<{sitename?: string}>) {
    const items = [
        <NavItem key="print" icon="print" onClick={() => window.print()}>
        Print</NavItem>,
        <NavItem key="delete" icon="delete">Delete all</NavItem>,
    ]
    return <header className={styles.header}>
        <div className={styles.left}>
            <h1 className={styles.title}>{sitename ?? ""}</h1>
        </div>
        <div className={styles.right}>
            <ul>{items}</ul>
        </div>
    </header>
}