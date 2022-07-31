# gulp + ejs 開発環境

## 動作環境
Node.js v.17.0.0
npm 8.1.0

正確に合わせなくても大丈夫です。
Node.jsは14以上のバージョンでないと動きません。

## 使い方
ルートディレクトリにて「npm i」コマンドを実行

## ejsメモ
### vscode拡張機能おすすめ
「EJS language support」
https://marketplace.visualstudio.com/items?itemName=DigitalBrainstem.javascript-ejs-support


- jsを書く
<% %>
「ejs」

- 出力、エスケープしない
<%- %>
「ejsesc」

- 出力、エスケープあり
<%= %>
「ejsout」

- インクルード、引数あり
<%- include('components/_header', {data: 'test'}) %>

- インクルード、引数なし
<% include('components/_header') %>
「ejsinc」