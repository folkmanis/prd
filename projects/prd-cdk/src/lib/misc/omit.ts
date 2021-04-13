/**
 * Clones object omitting selected keys
 * @param obj class or object
 * @param keys object keys to exclude
 * @returns new object without selected keys
 */
export function omit<T, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
    return Object.assign(
        {},
        ...(Object.keys(obj) as Array<keyof T>).filter(key => keys.every(k => k !== key)).map(key => ({ [key]: obj[key] }))
    );
}