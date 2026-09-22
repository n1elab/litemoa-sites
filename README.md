# Litemoa Server Website + Wiki + NEWS

`litemoa.n1e.net` の中に、

- 公式サイト
- NEWS
- 公式Wiki

を **1つのAstroプロジェクト**としてまとめた構成です。

見た目は同じにせず、役割ごとに分けています。

- `/` : 公式サイト向けのダークなMinecraftサーバーデザイン
- `/news/` : 公式サイトと同じデザインのお知らせ
- `/wiki/` : 日本のゲームWikiを意識した、情報を探しやすいWikiデザイン

## URL

- `https://litemoa.n1e.net/`
- `https://litemoa.n1e.net/news/`
- `https://litemoa.n1e.net/wiki/`
- `https://litemoa.n1e.net/wiki/join/`
- `https://litemoa.n1e.net/wiki/rules/`
- `https://litemoa.n1e.net/wiki/policy/`

## なぜ1プロジェクトで問題ない？

Astroの普通のページは `src/pages/`、
WikiはStarlightの `src/content/docs/wiki/` と役割を分けています。

CSSも、

- `src/styles/site.css`
- `src/styles/wiki.css`

で分離しています。

そのため、デプロイ・依存関係・ドメイン管理は1つにしながら、
公式サイトとWikiは別サイトに近い感覚で編集できます。

Starlight側では `disable404Route: true` にしているため、
404は `src/pages/404.astro` の1ページを共通利用します。

## NEWSの追加方法

`src/content/news/` にMarkdownファイルを追加してください。

例:

```text
src/content/news/2026-09-22-maintenance.md
```

内容:

```md
---
title: メンテナンスのお知らせ
description: 9月22日にメンテナンスを実施します。
publishedAt: 2026-09-22
category: メンテナンス
draft: false
---

ここに本文を書きます。
```

`draft: true` にするとサイトへ表示されません。

トップページには新しい順で3件、
`/news/` には公開中のNEWSすべてが表示されます。

## Wiki記事の追加

Wiki記事は:

```text
src/content/docs/wiki/
```

にMarkdown / MDXで追加します。

サイドバーへ常時表示したい記事は
`astro.config.mjs` の `sidebar` に追加してください。

## Wikiデザイン

`src/styles/wiki.css` にまとめています。

一般的な日本のゲームWikiでよく見られる、

- 明るい本文
- 緑のアクセント
- はっきりした見出し
- 左サイドバー
- 表を見やすく
- 「よく見るページ」カード
- 情報ボックス

を意識しています。

特定のWikiサイトのデザインをコピーしているわけではありません。

Wikiトップのカード内容は:

```text
src/components/WikiPortal.astro
```

で編集できます。

## Discord / X 埋め込み

トップページの:

```text
src/components/SocialEmbeds.astro
```

にまとめています。

Discord:
- Server ID: `1320711247301316628`

X:
- `https://x.com/litemoa`

埋め込みを削除・変更するときはこの1ファイルを編集してください。

### プライバシーについて

Discord・Xの埋め込みは外部サービスのコンテンツを読み込みます。
公開前に、現在のプライバシーポリシーが埋め込みサービスの利用実態に合っているか確認してください。

## 404

404は公式サイトとWikiで共通です。

```text
src/pages/404.astro
```

存在しないURLが `/wiki/` から始まる場合は、
ブラウザ側で自動的にWiki向けの案内文へ切り替わります。

例:

```text
/hogehoge
→ 公式サイト寄りの案内

/wiki/hogehoge
→ Wiki寄りの案内
```

ただしページ自体は1ファイルなので、管理が簡単です。

## 主な編集場所

### 公式サイト
- `src/pages/index.astro`
- `src/styles/site.css`

### NEWS
- `src/content/news/`

### Wiki
- `src/content/docs/wiki/`
- `src/components/WikiPortal.astro`
- `src/styles/wiki.css`

### ヘッダー / フッター / SEO
- `src/layouts/SiteLayout.astro`

### 404
- `src/pages/404.astro`

## 開発

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
```

出力先:

```text
dist/
```

## 公開前の確認

`src/content/docs/wiki/policy.md` のデータ保持期間には、
以前のWikiから引き継いだ

`通常[例: 3ヶ月〜6ヶ月]`

という仮記載があります。

実際の運用に合わせて確認してください。

またDiscord・X埋め込みを追加したため、
プライバシーポリシーの外部サービス記載も実際の運用と一致するか確認してください。


## サーバーコンセプトについて

公式サイトの文章は、現時点のLitemoaの方向性をもとにしています。

主なイメージ:
- Minecraft本来のサバイバルを土台にする
- 「もう一つの日常」をのんびり楽しめる
- プレイヤー同士の売買やお店が経済の中心
- 鯖民同士の雑談や交流も大切にする
- 運営も鯖民と近い距離で一緒に遊ぶ
- Java版 / 統合版のクロスプレイ

まだ方針が変わる可能性がある部分は、断定的な仕様ではなく柔らかい表現にしています。
トップページの文章を変更する場合は `src/pages/index.astro` を編集してください。


## ライト / ダークテーマ

公式サイト・NEWS・共通404は、ヘッダー右上のテーマボタンで切り替えできます。

- 初回: OS / ブラウザの `prefers-color-scheme` に合わせる
- 切り替え後: `localStorage` の `litemoa-theme` に保存
- 対応範囲: 公式サイト / NEWS / 共通404
- Wiki: Starlight標準のライト / ダーク切り替えを利用

公式サイト側の配色は `src/styles/site.css` の以下で編集できます。

```css
:root[data-theme='dark'] { ... }
:root[data-theme='light'] { ... }
```

## もう1枠広告を追加するなら

おすすめ位置:

```text
FEATURES
↓
広告
↓
NEWS
```

トップのヒーロー直下には置かず、サイト内容をある程度見てもらった後に配置します。
NEWS記事本文の途中にも置かないため、読みやすさを崩しにくい位置です。

推奨サイズ:

- PC（800px以上）: `728 × 90`
- タブレット（500〜799px）: `468 × 60`
- スマホ（500px未満）: `320 × 100`

`src/styles/site.css` に `.recommended-ad-slot` を用意してあります。

実際の広告コードを取得したら、`src/pages/index.astro` の FEATURES 終了直後へ
新しい広告コンポーネントを追加してください。

現在の `AdSlot.astro` は既存広告用なので、
広告サービス側で2つ目の広告タグを発行できる場合は
`AdBannerSlot.astro` など別ファイルに分けるのがおすすめです。
