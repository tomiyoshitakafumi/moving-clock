window.addEventListener('load', () => {
    console.log("1.nav 要素内のリンク (<a>)" + document.querySelector('nav a'));

    console.log("2.商品リスト (.product-list) 内の最初の商品 (.product-item)" + document.querySelector('.product-list .product-item').textContent);

    console.log(" 3.カートアイコンの画像 (<img>)" + document.querySelector('.cart img').alt);

    document.querySelectorAll('.product-list .price').forEach(element => console.log("4.商品リスト (.product-list) 内の価格 (.price) を表示する要素" + element.textContent));

    document.querySelectorAll('.product-list .product-item img').forEach(img => console.log(" 5.商品リスト (.product-list) 内の全ての商品 (.product-item) の画像 (<img>)" + img.alt));

    console.log(" 6.検索バー (.search-bar) 内の検索ボタン (<button>)" + document.querySelector('.search-bar button').textContent);

    console.log(" 7.フッター (footer) 内のパラグラフ (<p>) 要素" + document.querySelector('footer p').textContent);

    // 1から始まるので+1
    document.querySelectorAll('.product-list .product-item').forEach((item, i) => (i + 1) % 2 === 0 &&
        console.log(" 8.商品リスト (.product-list) 内の偶数番目の商品 (.product-item)" + item.textContent)
    )

    console.log("9.ヘッダー (header) 内のアカウントリンク (.account) の画像 (<img>)" + document.querySelector('header .account img').alt);

    console.log("10.ナビゲーションリンクのうち、\"会社情報\" のリンク" + document.querySelector('nav a[href="#about"]'));
});