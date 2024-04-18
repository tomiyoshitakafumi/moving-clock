// 以下の各々の状態遷移を関数化することで入力と出力のみのテストに絞ることができる
// [*] -> 通常
// 通常 -> アラームセット中: アラーム設定
// アラームセット中 -> 通常: アラーム解除
// アラームセット中 --> アラーム鳴動中: アラーム設定時刻到達
// アラーム鳴動中 --> 通常: アラーム解除
// アラーム鳴動中 --> スヌーズ中: スヌーズ
// スヌーズ中 --> アラーム鳴動中: スヌーズ設定時間経過
// スヌーズ中 --> 通常: アラーム解除

export function setAlarm(state) {
    if (state === 'normal') {
        return 'alarmSet';
    }
    throw new Error('Invalid state');
}

export function unsetAlarm(state) {
    if (state === 'alarmSet' || state === 'alarmSounding' || state === 'snooze') {
        return 'normal';
    }
    throw new Error('Invalid state');
}

export function setAlarmTimeReached(state) {
    if (state === 'alarmSet') {
        return 'alarmSounding';
    }
    throw new Error('Invalid state');
}

export function snooze(state) {
    if (state === 'alarmSounding') {
        return 'snooze';
    }
    throw new Error('Invalid state');
}

export function snoozeTimeReached(state) {
    if (state === 'snooze') {
        return 'alarmSounding';
    }
    throw new Error('Invalid state');
}