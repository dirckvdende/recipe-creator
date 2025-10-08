
import React from "react"
import styles from "./center-content.module.scss"

export default function CenterContent({children}: Readonly<{children:
React.ReactNode}>) {
    return <div className={styles.centerContent}>
        <div>
            {children}
        </div>
    </div>
}