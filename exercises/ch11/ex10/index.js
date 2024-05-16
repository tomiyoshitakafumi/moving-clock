export function getDays(year, month) {
    let date = new Date(year, month, 0);
    return date.getDate();
}

export function countWeekDays(from, until) {
    let fromDate = new Date(from);
    let untilDate = new Date(until);
    if (fromDate > untilDate) {
        throw new Error("エラー");
    }
    let count = 0;
    for (let date = fromDate; date <= untilDate; date.setDate(date.getDate() + 1)) {
        if (1 <= date.getDay() && date.getDay() <= 5) {
            count++;
        }
    }
    return count;
}

export function getDayofWeek(d, locale) {
    let date = new Date(d);
    return date.toLocaleDateString(locale, {weekday: 'long'});
}

export function getFirstDayOfLstMonth() {
    let now = new Date();
    let ms = now.getDate() * 24 * 60 * 60 * 1000 + now.getHours() * 60 * 60 * 1000 + now.getMinutes() * 60 * 1000 + now.getSeconds() * 1000 + now.getMilliseconds()
    //先月の月末日0時0分0秒のDateオブジェクト
    let date = new Date(now - ms);
    //月末日の日付を引くことで先月1日0時0分0秒のDateオブジェクトとする ex:月末が30日なら29日の時間を引く
    return new Date(date - (date.getDate() - 1) * 24 * 60 * 60 * 1000);
}