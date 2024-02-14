export function parse(json) {
    try {
        return {success: true, data: JSON.parse(json)};
    } catch {
        return {success: false, error: new Error('Invalid JSON input')};
    }
}
