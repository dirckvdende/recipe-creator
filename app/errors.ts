
/**
 * Severity of an error
 */
export enum ErrorLevel { Note, Warning, Error }

/**
 * Error with severity and content
 */
export type Error = {
    level: ErrorLevel,
    content: string,
}

// Currently displayed errors
export const displayedErrors = reactive([] as Error[]);

/**
 * Display an error and remove it after a certain time period
 * @param error The error to display
 * @param time The time in milliseconds to display the error for, defaults to
 * 5000
 */
export function displayError(error: Error, time?: number) {
    displayedErrors.push(error)
    setTimeout(() => {
        const index = displayedErrors.indexOf(error)
        if (index == -1)
            return
        displayedErrors.splice(index, 1)
    }, time ?? 5000)
}