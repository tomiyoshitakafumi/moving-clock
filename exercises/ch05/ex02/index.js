export function changeEscapeSquence(str) {
    if (str === null) {
        return "\\0";
    }
    let result = '';
    for (let i = 0; i < str.length; i++) {
        // 16進数のunicodeを取得
        const charUnicode = str.charCodeAt(i).toString(16).toUpperCase();
        if (charUnicode === "8") {
            result += "\\b";
        } else if (charUnicode === "9") {
            result += "\\t";
        } else if (charUnicode === "A") {
            result += "\\n";
        } else if (charUnicode === "B") {
            result += "\\v";
        } else if (charUnicode === "C") {
            result += "\\f";
        } else if (charUnicode === "D") {
            result += "\\r";
        } else if (charUnicode === "22") {
            result += '\\"';
        } else if (charUnicode === "27") {
            result += "\\'";
        } else if (charUnicode === "5C") {
            result += "\\\\";
        } else {
            result += str[i];
        }
    }
    return result;
}

export function changeEscapeSquence2(str) {
    if (str === null) {
        return "\\0";
    }
    let result = '';
    for (let i = 0; i < str.length; i++) {
        // 16進数のunicodeを取得
        const charUnicode = str.charCodeAt(i).toString(16).toUpperCase();
        switch (charUnicode) {
            case ("8") :
                result += "\\b";
                break;
            case ("9") :
                result += "\\t";
                break;
            case ("A"):
                result += "\\n";
                break;
            case ("B") :
                result += "\\v";
                break;
            case ("C"):
                result += "\\f";
                break;
            case("D") :
                result += "\\r";
                break;
            case  ("22"):
                result += '\\"';
                break;
            case ("27") :
                result += "\\'";
                break;
            case("5C"):
                result += "\\\\";
                break;
            default:
                result += str[i];
                break;
        }
    }
    return result;
}