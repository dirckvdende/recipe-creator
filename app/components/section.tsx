
import { ReactNode } from "react";
import styles from "./section.module.scss";

export default function Section({children}: Readonly<{children?: ReactNode}>) {
    return <div className={styles.section}>{children ?? ""}</div>
}