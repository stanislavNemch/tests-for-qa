// Utility function to safely parse JSON with a fallback value
export function safeParseJSON<T>(raw: string, fallback: T): T {
    try {
        return JSON.parse(raw) as T;
    } catch {
        return fallback;
    }
}
