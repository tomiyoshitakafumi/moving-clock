import { countWeekDays, getDayofWeek, getDays, getFirstDayOfLstMonth } from './index';
// import { factorial } from "../../ch01/ex05/index.js";

test('getDays', () => {
    expect(getDays(2024, 5)).toBe(31);
    //うるう年
    expect(getDays(2024, 2)).toBe(29);
    expect(getDays(2022, 1)).toBe(31);
});

test('countWeekDays', () => {
    expect(countWeekDays('2024-05-01', '2024-05-31')).toBe(23);
    expect(countWeekDays('2023-12-01', '2024-01-03')).toBe(24);
    expect(() => countWeekDays('3000-01-01', '2024-01-01',)).toThrow("エラー");
});

test('getDayofWeek', () => {
    expect(getDayofWeek('2024-05-16', 'en-US')).toBe('Thursday');
    expect(getDayofWeek('2024-04-16', 'de-DE')).toBe('Dienstag');
});

test('getFirstDayOfLstMonth', () => {
    let date = new Date(getFirstDayOfLstMonth());
    let now = new Date();
    expect(date).toEqual(new Date(now.getFullYear(), now.getMonth() - 1, 1));

});