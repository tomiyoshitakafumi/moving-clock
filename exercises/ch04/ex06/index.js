// 何らかのリサイズを行う関数と思って読んで下さい
//
// - params には undefined またはオブジェクトが与えられる
// - params.maxWidth が与えられる場合 (正の整数と仮定して良い) はその値を利用する
// - params.maxHeight が与えられる場合 (正の整数と仮定して良い) はその値を利用する
function resize(params) {
    let maxWidth = 600;
    let maxHeight = 480;

    if (params && params.maxWidth) {
        maxWidth = params.maxWidth;
    }

    if (params && params.maxHeight) {
        maxHeight = params.maxHeight;
    }

    console.log({maxWidth, maxHeight});
}

function resize1(params) {
    let maxWidth = params && params.maxWidth || 600;
    let maxHeight = params && params.maxHeight || 480;
    console.log({maxWidth, maxHeight});
}

function resize2(params) {
    let maxWidth = params?.maxWidth ?? 600;
    let maxHeight = params?.maxHeight ?? 480;
    console.log({maxWidth, maxHeight});
}