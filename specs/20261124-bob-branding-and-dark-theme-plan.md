# 実装計画書: Bobロゴ・リンク・テーマカラー適用およびダークテーマ追加

## 基本情報

* 仕様書: 20261124-bob-branding-and-dark-theme-spec.md
* 作成日時: 2026-11-24T09:45:43Z
* 更新日時: 2026-11-24T09:45:43Z
* 作成者: Bob
* ステータス: Approved

## 変更ファイル一覧

| ファイル | 変更種別 | 変更概要 |
| --- | --- | --- |
| `index.html` | 修正 | ヘッダー内にBobロゴリンク（`bob.svg`）とテーマ切り替えボタン（`#theme-toggle`）を追加 |
| `styles.css` | 修正 | Bobテーマカラー変数更新、ダークテーマ用CSS変数（`[data-theme="dark"]`）の定義、ロゴおよびテーマ切り替えボタンのスタイル追加 |
| `app.js` | 修正 | テーマ初期化処理、切り替えイベントリスナー、`localStorage` 保存・復元ロジックの追加 |

## 実装手順

1. **HTML構造の更新 (`index.html`)**
   - ヘッダー (`.site-header .container`) の先頭に `.header-top` を追加
   - 左側に `bob.svg` を含む `<a>` タグ（`href="https://www.ibm.com/products/bob" target="_blank" rel="noopener noreferrer"`）を配置
   - 右側にテーマ切り替え用ボタン `<button id="theme-toggle" class="theme-toggle" type="button" aria-label="ダークテーマに切り替える">` を配置

2. **CSSスタイルの拡張 (`styles.css`)**
   - `:root` のカラーパレットを整理し、テーマカラーを明確化
   - `[data-theme="dark"]` セレクタでダークテーマ用のカスタムプロパティ値を定義
     - `--bg: #161616`, `--bg-sub: #262626`, `--text: #f4f4f4`, `--text-sub: #c6c6c6`, `--border: #393939`, `--blue: #4589ff`, `--blue-light: #002d9c`
   - `.header-top`、`.header-logo`、`.theme-toggle` のレイアウト・ボタンスタイル定義
   - ダークテーマ時のヘッダー背景、入力フォーム、タブ、アコーディオン、フッター等のコントラスト調整

3. **JavaScriptによるテーマ制御の実装 (`app.js`)**
   - `initTheme()` 関数を実装: `localStorage.getItem("theme")` を参照し、`"dark"` であれば `document.documentElement.setAttribute("data-theme", "dark")` を設定
   - テーマ切り替えボタン押下時のイベントリスナーを追加:
     - 現在のテーマを判定してトグル（light ⇔ dark）
     - `data-theme` 属性およびボタンのテキスト/アイコン/`aria-label` を更新
     - `localStorage.setItem("theme", newTheme)` を実行

## GUI実装

* 対象コンポーネント:
  * ヘッダーロゴリンク (`.header-logo-link`, `.header-logo-img`)
  * テーマ切り替えトグルボタン (`#theme-toggle`)
  * サイト全体（`.site-header`, `.search-input`, `.tab`, `.faq-item`, `.site-footer` など）
* スタイル:
  * Bobブルー（#0f62fe）とダークテーマ（Carbon Dark #161616 / #262626）のスタイル適用
* 状態管理:
  * DOM属性（`data-theme="dark"` / `data-theme="light"`）および `localStorage` による状態管理
* 画面遷移:
  * ロゴクリック時に新規タブで公式サイトを開く
* レスポンシブ対応:
  * モバイル幅（480px以下）でもヘッダー上部のロゴとテーマボタンが綺麗に配置されるよう flex レイアウトで対応

## テストの追加・更新

* 対象外（静的サイトのため自動テスト環境なし）

## 検証計画

1. **静的検証・構文確認**:
   - HTML/CSS/JavaScript のシンタックスエラーがないことを確認
2. **GUI・表示確認**:
   - Bobロゴ画像がタイトル上部左側に適切に表示されること
   - テーマ切り替えボタンがヘッダー右上に適切に表示されること
   - クリックでダークテーマとライトテーマが正しく切り替わること
   - ダークテーマ時にすべてのテキスト、フォーム、タブ、アコーディオンが明瞭に読めること
3. **リンク動作確認**:
   - ロゴクリック時に別タブで `https://www.ibm.com/products/bob` が開くこと
4. **永続化確認**:
   - ダークテーマに切り替えた後、ページを再読み込みしてダークテーマが維持されること

## 移行・ロールバック

* 変更前のファイルをGitで管理しているため、不具合時は直前のコミットまたは差分の破棄により即時ロールバック可能

## 未解決事項

* なし
