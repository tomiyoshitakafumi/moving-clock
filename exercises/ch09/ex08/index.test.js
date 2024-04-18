import { setAlarm, setAlarmTimeReached, snooze, snoozeTimeReached, unsetAlarm } from './index.js';

describe('alerm', () => {
    test('通常 -> アラームセット中: アラーム設定 成功', () => {
        expect(setAlarm('normal')).toBe('alarmSet');
    });
    test('通常 -> アラームセット中: アラーム設定　失敗', () => {
        expect(() => setAlarm('alarmSounding')).toThrow('Invalid state');
    });

    test('アラーム解除　成功', () => {
        expect(unsetAlarm('alarmSet')).toBe('normal');
        expect(unsetAlarm('alarmSounding')).toBe('normal');
        expect(unsetAlarm('snooze')).toBe('normal');
    });
    test('アラーム解除　失敗', () => {
        expect(() => unsetAlarm('normal')).toThrow('Invalid state');
    });

    test('アラームセット中 --> アラーム鳴動中: アラーム設定時刻到達 成功', () => {
        expect(setAlarmTimeReached('alarmSet')).toBe('alarmSounding');
    });
    test('アラームセット中 --> アラーム鳴動中: アラーム設定時刻到達　失敗', () => {
        expect(() => setAlarmTimeReached('normal')).toThrow('Invalid state');
    });

    test('アラーム鳴動中 --> スヌーズ中: スヌーズ 成功', () => {
        expect(snooze('alarmSounding')).toBe('snooze');
    });

    test('アラーム鳴動中 --> スヌーズ中: スヌーズ 失敗', () => {
        expect(() => snooze('snooze')).toThrow('Invalid state');
    });

    test('スヌーズ中 --> アラーム鳴動中: スヌーズ設定時間経過 成功', () => {
        expect(snoozeTimeReached('snooze')).toBe('alarmSounding');
    });

    test('スヌーズ中 --> アラーム鳴動中: スヌーズ設定時間経過 失敗', () => {
        expect(() => snoozeTimeReached('normal')).toThrow('Invalid state');
    });
});