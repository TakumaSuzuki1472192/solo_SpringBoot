# 要約機能付 SPRING NOTE アプリ

## 概要

気になった記事やメモをノートに残して保存できます。
長めの記事も要約機能で簡潔にまとめることが可能です。

## 機能

- CREATE : ノートの追加
- READ : ノートの一覧、詳細表示
- UPDATE : ノートの書き換え
- DELETE : ノートの削除
- 追加機能 : openAI api によるノートの要約と保存
- 追加機能 : 書いたノートの検索

## 未実装の機能

- デプロイできてません
- ロード画面の作成
- ユーザー認証、ログインなど

## 使用技術

フロントエンド

- React
- Typescript(ちゃんと型定義できていない箇所が多々あります)
- vite
- Mantine UI

バックエンド

- SpringBoot
- Kotlin
- postgreSQL
- openAI api

## セットアップ手順

1.リポジトリをクローンします

```bash
git clone git@git@github.com:TakumaSuzuki1472192/solo_SpringBoot.git
```

### バックエンド

1.クローン先のファイルを intelliJ で開く
<br> 2.環境変数の設定 resources/application.properties に下記を記載

```properties
spring.application.name=noteApp
spring.datasource.url=jdbc:postgresql://localhost/solo_notedb
spring.datasource.username=user ※自身の設定
spring.datasource.password= ※自身の設定
spring.datasource.driverClassName=org.postgresql.Driver
```

3.環境変数ファイルの作成 resources/api.properties を作成し、下記を記載 [openAPI Key の取得](https://platform.openai.com/docs/quickstart?context=python)

```properties
spring.datasource.apikey=※取得したAPIキーを貼り付け
```

4.DB の作成

```bash
$psql
createdb solo_notedb
```

5.サーバーを起動

```bash
./gradlew build
./gradlew bootrun
```

### フロントエンド

1.依存関係のインストール

```bash
cd soloSpringBoot(クローン先フォルダ)/frontend
npm install
```

2.サーバー起動

```bash
npm run dev
```
