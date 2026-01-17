# Vercel デプロイガイド

## 英検7×7ナビ - Vercel デプロイ手順

このプロジェクトは Vercel にデプロイできるように設定されています。

### 前提条件

- Vercel アカウント（https://vercel.com）
- Git リポジトリ（GitHub, GitLab, Bitbucket）
- Node.js 18 以上

### デプロイ手順

#### 1. GitHub にリポジトリをプッシュ

```bash
git init
git add .
git commit -m "Initial commit: 英検7×7ナビ"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/eiken-7x7-navi.git
git push -u origin main
```

#### 2. Vercel にデプロイ

**方法A: Vercel CLI を使用**

```bash
npm i -g vercel
vercel
```

**方法B: Vercel Web UI を使用**

1. https://vercel.com/dashboard にアクセス
2. 「Add New」→「Project」をクリック
3. GitHub リポジトリを選択
4. 「Import」をクリック

#### 3. 環境変数を設定

Vercel プロジェクト設定で以下の環境変数を設定してください：

| 環境変数 | 説明 | 例 |
|---------|------|-----|
| `DATABASE_URL` | MySQL/TiDB 接続文字列 | `mysql://user:pass@host/db` |
| `JWT_SECRET` | セッション署名用シークレット | ランダムな文字列 |
| `VITE_APP_ID` | Manus OAuth アプリケーション ID | - |
| `OAUTH_SERVER_URL` | Manus OAuth サーバーURL | `https://api.manus.im` |
| `VITE_OAUTH_PORTAL_URL` | Manus OAuth ポータルURL | - |
| `OWNER_OPEN_ID` | オーナーの OpenID | - |
| `OWNER_NAME` | オーナー名 | - |
| `BUILT_IN_FORGE_API_URL` | Manus Forge API URL | - |
| `BUILT_IN_FORGE_API_KEY` | Manus Forge API キー | - |
| `VITE_FRONTEND_FORGE_API_KEY` | フロントエンド用 Forge API キー | - |
| `VITE_FRONTEND_FORGE_API_URL` | フロントエンド用 Forge API URL | - |

#### 4. デプロイ完了

デプロイが完了すると、Vercel が自動的に URL を生成します。

```
https://eiken-7x7-navi.vercel.app
```

### トラブルシューティング

#### ビルドエラー

```bash
# ローカルでビルドをテスト
pnpm build

# エラーが出た場合
pnpm install
pnpm db:push
pnpm build
```

#### データベース接続エラー

- `DATABASE_URL` が正しく設定されているか確認
- データベースが外部からアクセス可能か確認
- ファイアウォール設定を確認

#### OAuth エラー

- Manus OAuth 設定が正しいか確認
- リダイレクト URI が Vercel URL に設定されているか確認

### 本番環境での推奨設定

1. **環境変数の暗号化**: Vercel は自動的に環境変数を暗号化します
2. **カスタムドメイン**: Vercel プロジェクト設定で カスタムドメインを追加
3. **自動デプロイ**: GitHub リポジトリの `main` ブランチへのプッシュで自動デプロイ
4. **プレビューデプロイ**: プルリクエストごとにプレビュー URL を生成

### ローカル開発

```bash
# 依存関係をインストール
pnpm install

# 開発サーバーを起動
pnpm dev

# テストを実行
pnpm test

# ビルド
pnpm build

# 本番環境をシミュレート
pnpm start
```

### 詳細情報

- [Vercel ドキュメント](https://vercel.com/docs)
- [Vite デプロイガイド](https://vitejs.dev/guide/static-deploy.html)
- [Express デプロイガイド](https://expressjs.com/en/advanced/best-practice-performance.html)
