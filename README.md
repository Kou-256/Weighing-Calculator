# 酸化物秤量計算

Vercelの無料枠で静的サイトとして配信できる、酸化物前駆体の秤量計算アプリです。サーバー、DB、外部APIを使わず、計算はブラウザ内で完結します。

## ローカル確認

```bash
node server.mjs 4173
```

http://localhost:4173 を開きます。

## テスト

```bash
node calculator.test.mjs
```

## Vercelへの配置

このフォルダをGitHubなどに置き、VercelでImport Projectします。Framework PresetはOtherのままで動作します。ビルドコマンドは不要です。

## 計算モデル

- 基準組成の元素モル数: `作製モル数 x 係数`
- 置換添加の元素モル数: `作製モル数 x 置換先係数 x mol% / 100`
- 外添加の元素モル数: `作製モル数 x mol% / 100`
- 酸化物モル数: `必要元素モル数 / 酸化物式中の元素数`
- 秤量質量: `酸化物モル数 x 酸化物式量 / 純度`
