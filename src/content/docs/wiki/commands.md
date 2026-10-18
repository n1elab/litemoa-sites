---
title: コマンド一覧
description: 一般プレイヤー向けのメニュー、ショップ、土地保護、Home・移動申請の構文と使用例。
---

2026年10月18日時点のプラグインソースを確認した一覧です。運営から導入済みと確認していますが、実サーバーでの操作試験は未実施です。権限・本番設定・現在地によって使用できない場合があります。

`<名前>` は必須、`[名前]` は省略可能です。山括弧・角括弧そのものは入力しません。使用例の `PlayerName` は実際のプレイヤー名に置き換えてください。以下の基本権限はソースの初期値では一般プレイヤーに許可されています。

## メニュー・ワールド移動

[ロビーから遊び始める手順](/wiki/start/#2-ロビーでメニューを開く)

<div class="command-table" role="region" aria-label="メニューとワールド移動のコマンド表" tabindex="0">

| 用途 | 構文 | 使用例 | 利用条件・権限 |
| --- | --- | --- | --- |
| メニューを開く | `/menu` | `/menu` | `menu.use` |
| スマホを受け取る | `/phone` | `/phone` | `menu.phone`。空きがなければ足元に落ちます |
| ワールド移動 | `/worldwarp <行き先> [lastまたはspawn]` | `/worldwarp lobby spawn` | `menu.worldwarp`。行き先ワールドが利用可能なこと |

</div>

行き先キーは `lobby`・`life`・`life_nether`・`life_end`・`adventure`・`jinko`。`last` は前回地点、`spawn` はスポーンへの移動です。省略時は `last` として処理されますが、ロビーと人工資源（`jinko`）は常にスポーンへ移動します。実際の行き先が分からないときはメニューから選んでください。キー名は建築や採集の許可範囲を保証するものではありません。`/ltww` は `/worldwarp` の別名です。

## ショップ

[お店で売り買いする](/wiki/play/#お店で売り買いする)

<div class="command-table" role="region" aria-label="ショップのコマンド表" tabindex="0">

| 用途 | 構文 | 使用例 | 利用条件・権限 |
| --- | --- | --- | --- |
| ショップ画面 | `/shop` | `/shop` | `shop.use` |
| 自分の店を作る | `/chestshop <販売価格> <買取価格>` | `/chestshop 100 50` | `chestshop.create`。商品を持ち、対応する容器を見る |

</div>

`/cshop` は `/chestshop` の別名です。価格は店主から見た値で、0の側は取引無効、両方0は不可。既存店での取引には `chestshop.use` が必要です。
所持金確認・送金は `/menu` から行えます。未確認の経済プラグイン用コマンドは掲載していません。

## 土地保護

[土地と持ち物を守る](/wiki/play/#土地と持ち物を守る)。共通権限は `land.use`。所有者・編集権限・残高・範囲制限の確認も受けます。

<div class="command-table" role="region" aria-label="土地保護のコマンド表" tabindex="0">

| 用途 | 構文 | 使用例 | 利用条件 |
| --- | --- | --- | --- |
| 管理画面 | `/land` | `/land` | 作成・管理の入口 |
| 範囲選択の道具 | `/land wand` | `/land wand` | 角1を左、角2を右クリック |
| 土地調査の道具 | `/land inspect` | `/land inspect` | 土地の状態を調べる道具を受け取る |
| 選択・入力の中止 | `/land cancel` | `/land cancel` | 進行中の操作を中止 |
| 土地作成 | `/land create [名前]` | `/land create 自宅` | 範囲選択済み。省略時は名前入力へ |
| 立体区画作成 | `/land unit [名前]` | `/land unit 一階` | 自分の親土地内などの作成条件を満たすこと |
| 一覧・現在地の情報 | `/land list`、`/land info` | `/land info` | 情報を確認 |
| 土地の移動先へ | `/land tp [土地名またはID]` | `/land tp 自宅` | 対象への移動が許可されていること |
| 土地の移動先登録 | `/land sethome` | `/land sethome` | 管理可能な土地内の安全な場所 |
| メンバー追加・削除 | `/land trust <名前>`、`/land untrust <名前>` | `/land trust PlayerName` | 管理可能な土地内。サーバーで認識済みの名前 |
| 操作権限の設定 | `/land permissions [名前]` | `/land permissions PlayerName` | 管理可能な土地内。省略時は土地全体の権限画面 |
| 名前の変更 | `/land rename [名前]` | `/land rename 新しい家` | 管理可能な土地内 |
| 削除確認 | `/land delete` | `/land delete` | 管理可能な土地内。確認画面が開きます |
| 範囲変更 | `/land resize`、`/land resize confirm`、`/land resize cancel` | `/land resize` | 所有・編集条件を満たす土地。変更内容を見て確定 |
| 売買・賃貸の一覧 | `/land offers` | `/land offers` | 売出し中の土地を確認 |
| 売却・賃貸設定 | `/land market sell <価格>`、`/land market rent <価格> [日数]` | `/land market rent 100 30` | 所有・経済連携などの条件を満たすこと |
| 市場設定解除・看板 | `/land market off`、`/land market sign` | `/land market off` | 管理対象の土地内 |
| 土地購入・賃借 | `/land buy [土地ID]`、`/land lease [土地ID]` | `/land buy` | 省略時は現在地。対象の販売条件・残高を確認 |

</div>

`/land sethome` は土地用の移動先です。下記のLiteTravelの `/sethome` とは別に保存されます。

## 容器・ドアなどの個別ロック

共通権限は `litelock.use`。保護されたブロックや看板を見て実行し、所有者など管理できる人に限ります。

<div class="command-table" role="region" aria-label="個別ロックのコマンド表" tabindex="0">

| 用途 | 構文 | 使用例 |
| --- | --- | --- |
| 管理画面 | `/lock gui` | `/lock gui` |
| メンバー確認 | `/lock members` | `/lock members` |
| メンバー追加 | `/lock add <名前>` | `/lock add PlayerName` |
| メンバー削除 | `/lock remove <名前>` | `/lock remove PlayerName` |

</div>

## Home・移動申請

[Home・ワープ・移動申請の使い方](/wiki/play/#homeワープ移動申請)。共通して `litetravel.use` が必要です。

<div class="command-table" role="region" aria-label="Homeと移動申請のコマンド表" tabindex="0">

| 用途 | 構文 | 使用例 | 追加の権限・条件 |
| --- | --- | --- | --- |
| 移動メニュー | `/travel` | `/travel` | `/tpmenu`、`/litetravel` も可 |
| 操作ヘルプ | `/travel help` | `/travel help` | 移動機能の案内を表示 |
| 相手へ移動申請 | `/tpa [名前]` | `/tpa PlayerName` | `litetravel.tpa`。省略時は選択画面 |
| 相手を呼ぶ申請 | `/tpahere [名前]` | `/tpahere PlayerName` | `litetravel.tpa` |
| 承認・拒否 | `/tpaccept [名前]`、`/tpdeny [名前]` | `/tpaccept PlayerName` | 有効な申請を受信していること |
| 送信した申請の取消 | `/tpcancel` | `/tpcancel` | `litetravel.tpa` |
| 申請一覧 | `/travel requests` | `/travel requests` | 自分の申請を確認 |
| Home登録 | `/sethome [ID]` | `/sethome base` | `litetravel.sethome` と `litetravel.home`。省略時のIDは `home` |
| Homeへ移動 | `/home [ID]` | `/home base` | `litetravel.home`。省略時は `home`、なければ一覧 |
| Home一覧 | `/homes` | `/homes` | `litetravel.home` |
| Home削除確認 | `/delhome [ID]` | `/delhome base` | 自分のHome。省略時のIDは `home` |

</div>

HomeのIDは半角英数字で1〜24文字です。スポットのIDは半角英字で始まり、半角英数字・`_`・`-` を使って1〜24文字です。登録上限・禁止ワールド・安全確認などの制限があります。

`/tpayes` は `/tpaccept` の別名です。

## ワープスポット

共通して `litetravel.use`、閲覧・移動には `litetravel.spot.use`、作成には `litetravel.spot.create` が必要です。編集操作は所有者などに限られます。**新規作成時は公開される実装です。** 非公開の拠点にはHomeを使ってください。

<div class="command-table" role="region" aria-label="ワープスポットのコマンド表" tabindex="0">

| 用途 | 構文 | 使用例 |
| --- | --- | --- |
| 公開一覧 | `/spot` | `/spot` |
| 自分の一覧・お気に入り | `/spot mine`、`/spot favorites` | `/spot mine` |
| 検索 | `/spot search <検索語>` | `/spot search 商店` |
| 現在地に作成 | `/spot create <ID>` | `/spot create shop` |
| 作成の別コマンド | `/setwarpspot [ID]` | `/setwarpspot shop` |
| IDで移動 | `/warpspot [ID]` | `/warpspot shop` |
| 所有者と表示名で移動 | `/spot go <所有者> <表示名>` | `/spot go PlayerName shop` |
| お気に入り切り替え | `/spot favorite <所有者> <表示名>` | `/spot favorite PlayerName shop` |
| 編集画面・削除確認 | `/spot edit <ID>`、`/spot delete <ID>` | `/spot edit shop` |
| 公開・非公開 | `/spot publish <ID>`、`/spot unpublish <ID>` | `/spot unpublish shop` |
| 現在地へ更新確認 | `/spot update <ID>` | `/spot update shop` |

</div>

IDと表示名は別です。上の例はどちらも `shop` として登録した場合です。`/warpspot` はID、`/spot go` と `/spot favorite` は所有者と表示名で探します。移動先を特定できない場合は、公開一覧から選んでください。

