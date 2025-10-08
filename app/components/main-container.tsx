"use client"

import React from "react"
import styles from "./main-container.module.scss"

/**
 * Main container component
 * @param param0 Props:
 * - `children` - The child elements of the component
 * @returns The component
 */
export default function MainContainer({children}: Readonly<{children:
React.ReactNode}>) {
    return <div className={styles.mainContainer}>{children}</div>
}