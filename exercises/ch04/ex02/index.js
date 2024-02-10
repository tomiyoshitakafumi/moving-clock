function changeEscapeSquence(str) {
    if (str === null) {
        return "\0";
    }

    for (let i = 0; i < str.length; i++) {
        const charUnicode = char.charCodeAt(i);
        if (charUnicode === "\u0000") {
            return "\\0";
        } else if (charUnicode === "\u0008") {
            return "\\b";
        } else if (charUnicode === "\u0009") {
            return "\\t";
        } else if (charUnicode === "\u000A") {
            return "\\n";
        } else if (charUnicode === "\u000B") {
            return "\\v";
        } else if (charUnicode === "\u000C") {
            return "\\f";
        } else if (charUnicode === "\u000D") {
            return "\\r";
        } else if (charUnicode === "\u00022") {
            return '\\"';
        } else if (charUnicode === "\u00027") {
            return "\\'";
        } else if (charUnicode === "\u005C") {
            return "\\\\";
        }
    }
    return new Error();
}

function changeEscapeSquence2(str) {
    if (str === null) {
        return "\0";
    }

    for (let i = 0; i < str.length; i++) {
        const charUnicode = char.charCodeAt(i);
        switch (charUnicode) {
            case ("\u0000"):
                return "\\0";
            case ("\u0008"):
                return "\\b";
            case ("\u0009"):
                return "\\t";
            case ("\u000A"):
                return "\\n";
            case ("\u000B"):
                return "\\v";
            case ("\u000C"):
                return "\\f";
            case ("\u000D"):
                return "\\r";
            case ("\u0022"):
                return '\\"';
            case ("\u0027"):
                return "\\'";
            case ("\u005C"):
                return "\\\\";
            default:
                break;
        }
    }
    return new Error();
}