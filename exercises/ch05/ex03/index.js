export function isHolidayIf(day) {
    if (day === "土" || day === "日") {
        return true;
    } else if (day === "月" || day === "火" || day === "水" || day === "木" || day === "金") {
        return false;
    } else {
        return new Error("曜日エラー");
    }
}

export function isHolidaySwitch(day) {
    switch (day) {
        case ("月") :
            return false;
        case ("火") :
            return false;
        case ("水"):
            return false;
        case ("木") :
            return false;
        case ("金"):
            return false;
        case("土") :
            return true;
        case ("日"):
            return true;
        default:
            return new Error("曜日エラー");
    }
}