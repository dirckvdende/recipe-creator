
import styles from "./not-found.module.scss"
import Link from "next/link"

export default function NotFound({}: Readonly<{}>) {
    return <div className={styles.container}>
        <h1>404: Page not found</h1>
        <p><Link href="/">Back to app</Link></p>
    </div>
}