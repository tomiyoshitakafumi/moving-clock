export function changeTemplateLiteralType(string, value) {
    if (value === undefined) return string[0];
    return string[0] + typeof value + string[1];
}