/**
 * Function that picks properties from object. Tree-shakeable equivalent of function with same name from popular library
 * @param obj object or class
 * @param keys object keys
 * @returns object containing only 'key' properties
 */
export function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
    return Object.assign(
        {},
        ...keys.map(key => ({ [key]: obj[key] }))
    );
}
