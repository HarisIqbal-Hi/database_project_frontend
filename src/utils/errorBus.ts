type ErrorCallback = (msg: string) => void;
let errorHandler: ErrorCallback | null = null;


export function setGlobalErrorHandler(cb: ErrorCallback) {
    errorHandler = cb;
}

export function triggerGlobalError(msg: string) {
    console.log("info2",msg)
    if (
        errorHandler &&
        msg.toLowerCase().includes("session")
    ) {
        console.log("info3",msg)
        errorHandler(msg);
    }
}
