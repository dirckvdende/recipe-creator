
import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.scss";
import Header from "./components/header";
import Footer from "./components/footer";
import MainContainer from "./components/main-container";

// Default font in the app
const fredoka = Fredoka({
    variable: "--fredoka-sans",
    subsets: ["latin"],
    weight: "variable",
})

// App metadata
export const metadata: Metadata = {
    title: "Recipe Creator",
    description: "An app for creating ",
}

const iconsURL = ("https://fonts.googleapis.com/css2?family=Material+Symbols+" +
"Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200")

/**
 * Root layout
 * @param param0 Layout options:
 * - `children` The children passed to the layout
 * @returns Root layout component
 */
export default function RootLayout({children}: Readonly<{children:
React.ReactNode}>) {
    return <html lang="en">
        <head>
            <link rel="stylesheet" href={iconsURL} />
        </head>
        <body className={fredoka.variable}>
            <Header sitename="Recipe Creator"></Header>
            <MainContainer>{children}</MainContainer>
            <Footer></Footer>
        </body>
    </html>
}
