# todoapp

シンプルで使いやすい TODO アプリ

## todo アプリ のスクリーンショット

デプロイしたアプリを[AWS ECS]()で確認できます

![image](https://github.com/Ai1029/todoapp/blob/main/images/desktop.png?raw=true)

- [todoapp](#todoapp)
  - [todo アプリ のスクリーンショット](#todo-アプリ-のスクリーンショット)
  - [機能・ページ遷移図](#機能ページ遷移図)
    - [工夫した点](#工夫した点)
  - [設計](#設計)
  - [環境構成](#環境構成)
  - [環境構築](#環境構築)
  - [確認方法](#確認方法)
  - [使用技術](#使用技術)

## 機能・ページ遷移図

日々のタスクを作成、編集、閲覧、削除することができます。
タスクのカテゴリーを選ぶことができます。

![image](https://github.com/Ai1029/todoapp/blob/main/images/function.png?raw=true)

### 工夫した点

デザインをできるだけシンプルにして使い方に困らないアプリを目指しました。

落ち着いた配色をベースとして毎日見ても飽きないよう調整しました。

日々のタスクで完了したものを視覚的に見せたかったため、削除ボタンとは別にチェックボックスも用意しました。どれだけのタスクをこなしたかわかります。（削除してしまうと消えてしまいます）

## 設計

- [API 設計](https://github.com/Ai1029/todoapp/blob/main/API.md)
- ER 図

![image](https://github.com/Ai1029/todoapp/blob/main/images/ER.png?raw=true)

## 環境構成

| 項目         | 内容                   | ポート |
| ------------ | ---------------------- | ------ |
| データベース | MySQL                  | 3306   |
| API サーバ   | Express （TypeScript） | 3001   |
| └ ORM        | Prisma                 |        |
| フロント     | React（TypeScript）    | 3000   |

![image](https://github.com/Ai1029/todoapp/blob/main/images/environment.png?raw=true)

## 環境構築

このアプリをクローンして実行するには、コンピュータに Git と Node.js がインストールされている必要があります。

**ダウンロードとインストールの手順**

1. このリポジトリを git clone します。

```bash
$ git clone https://github.com/Ai1029/todoapp.git
```

2. todoapp に入ります

```bash
$ cd todoapp
```

3. todoapp ディレクトリの直下に`.env` ファイルを作成

```
DB_ROOT_HOST=todo_db
DB_NAME=todo
DB_USER=（ユーザー名を入れてください）
DB_PASS=（パスワードを入れてください）
TZ=Asia/Tokyo
```

4. client ディレクトリの直下に`.env`ファイルを作成します。

```
REACT_APP_PUBLIC_API_URL=http://localhost:3001
REACT_APP_SITE_URL=http://localhost:3000
REACT_APP_API_URL=http://localhost:3001
REACT_APP_API_URL_SSR=http://server:3001
```

5. server ディレクトリの直下に`.env`ファイルを作成します。
   DATABASE_URL のユーザー名とパスワードの部分は、 MyPortfolio ディレクトリの直下に作成した`.env`ファイルのユーザー名とパスワードに修正します。

```
DATABASE_URL="mysql://ユーザー名:パスワード@todo_db:3306/todo"
```

6. client ディレクトリと server ディレクトリで依存関係をインストールします

```bash
$ cd client
$ npm install
```

```bash
$ cd server
$ npm install
```

7. 以下のコマンドで Docker のコンテナを立ち上げます

```bash
$ docker compose up -d
```

8. 作成したデータベースに Prisma を使用してマイグレーションします。 さらに選択が必要なカテゴリーは seed ファイルでデータを入れ込みます。

```bash
$ npx prisma migrate dev
$ npx prisma db seed
```

## 確認方法

http://localhost:3000 をブラウザで開き、表示を確認します。

## 使用技術

- React ^18.2.0 　※フロントエンド
- TypeScript ^4.9.5
- Express ~4.16.1 　※バックエンド
- ECS（Fargate）
- RDS（MySQL 8.0.23）
- ECR
