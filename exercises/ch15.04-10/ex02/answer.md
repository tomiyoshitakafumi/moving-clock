1 Tailwind CSS がどういったフレームワークか調べなさい。
* 基本的なcssのユーティリティがそろっており、それを組み合わせることでカスタマイズできる
* Reactのフレームワークでは、jsxの中でtailwindcssのクラスを使うことで、簡単にスタイリングができる

他のフレームワーク(Bootstrap)と違いやはり組み合わせてカスタマイズができるのが強味?


2. @tailwind base;
   @tailwind components;
   @tailwind utilities;
の基本のtailwindcssのをインポートしているディレクティブでありこれをもとに> npx tailwindcss -i ./ex02/input.css -o ./ex02/style.css コマンドでtailWind cssのスタイルを生成している。