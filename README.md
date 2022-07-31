# gulp + ejs 開発環境

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