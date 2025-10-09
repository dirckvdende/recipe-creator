
import { Attributes, Children, cloneElement, isValidElement, ReactNode } from "react";
import styles from "./editable.module.scss";

export default function Editable({children}: Readonly<{children: ReactNode}>) {
    return <>
        {Children.map(children, child => !isValidElement(child) ? undefined :
        cloneElement(child, {
            contentEditable: "plaintext-only",
            suppressContentEditableWarning: true,
        } as Attributes))}
    </>
}