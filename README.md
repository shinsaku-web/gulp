# gulp + ejs 開発環境

## ejsメモ

- jsを書く
<% %>

- 出力、エスケープしない
<%- %>

- 出力、エスケープあり
<%= %>

- インクルード、引数あり
<%- include('components/_header', {data: 'test'}) %>

- インクルード、引数なし
<% include('components/_header') %>