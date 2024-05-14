export function isEmailAddress(str) {
    //local-part@domain
    // local-part: 最大64文字
    // domain: 最大253文字（
    // local-part@domain 全体: 最大254文字 
    //グループマッチでつなげる 
    const strCountLimit = /(?=^[^@]{1,64}@[^@]{1,253}$).{1,254}$/u;
    // .が2回以上続く場合NG
    const twoDots = /[.]{2}/u;
    // local-partの前後　domainの前後に.がある場合NG
    const firstEndDots = /^[.]|[.]@|@[.]|[.]$/u;

    // アルファベット（大文字 & 小文字)52文字 → A~Z, a~z
    // 数字10文字 → 0~9
    // 記号19文字 → !#$%&'*+-/=?^_`{|}~.
    const wordChar = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+$/u;
    return strCountLimit.test(str) && !twoDots.test(str) && !firstEndDots.test(str) && wordChar.test(str);
}