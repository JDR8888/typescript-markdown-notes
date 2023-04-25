import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue == null) {
            if(typeof initialValue === "function") {
                // states that initial val will be function that returns normal type (T)
                return (initialValue as () => T)()
            } else {
                return initialValue
            }
        } else {
            return JSON.parse(jsonValue)
        }
    })
    useEffect(() => {
        // basically, every time the value is updated, we update local storage
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    // return the value of T, and return whatever type setValue is
    return [value, setValue] as [T, typeof setValue]
}