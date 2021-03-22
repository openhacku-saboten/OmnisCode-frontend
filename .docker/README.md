# dockerで開発する手順
## dockerを入れる
- **目標**
  - docker engineとdocker composeを入れる
- **手順**
  - https://docs.docker.com/get-docker/ にしたがってdockerを入れる
    - WindowsはHyper-V有効化など難しいかもしれない
  - https://docs.docker.com/compose/install/ にしたがってdocker-composeを入れる
    - Windows/MacOSの人はDocker Desktopに入っているのでcomposeを入れる必要はないです
  - 以下のコマンドで確認

```shell
## dockerの確認
docker ps
# 以下のような表示になればOK
CONTAINER ID        IMAGE                  COMMAND                  CREATED             STATUS              PORTS               NAMES

## docker-composeの確認
docker-compose -v
# 以下のような表示がでればOK
docker-compose version 1.25.0, build unknown
```

## gcloudコマンドを入れる
- **目標**
  - gcloudを入れる
- **手順**
  - https://cloud.google.com/sdk/docs/install?hl=ja にしたがってgcloud sdkを入れる
  - @kaitoにメールアドレスをDMで送り、権限をつけてもらう
  - 認証後にdockerに認可を与えてバックエンドのイメージを入れる(auth手順で説明)

## auth手順
- **目標**
  - firebaseを用いてloginするためのcredentialファイルを手に入れる(秘密鍵なのでGitHubにpushしないように！)
  - gloud authする
- **手順**
  - @kaitoに連絡してfirebase projectから鍵をダウンロードできる権限をつけてもらう
  - firebaseから鍵をダウンロード
  - `firebaseCredential.json` にファイル名を変更する。gitignoreにはすでに追加しているので、ちゃんとignoreされていることを確かめる
  - これでfirebase周りはOK
  - gcloudは以下の流れで認証とdockerへの権限付与を行う

```shell
## loginする(ブラウザが立ち上がるので、連絡したメールアドレスで認証を行う)
gcloud auth login

## dockerへ権限を渡す
gcloud auth configure-docker
```

## 毎回やる開発の流れ
- upしたあと、ファイルを変更すれば自動で反映されると思います(packageのインストールとかはdownしてupする手順が必要になります。tsファイルの編集についてはホットリロードされて問題ないはず)

```shell
## OmnisCode-frontend$ で
## アプリを立ち上げる時
docker-compose -f .docker/docker-compose.dev.yml up
# localhost:3000でアクセスできる。localhost:8080でバックエンドにアクセス
# バックエンドは backend:8080 でアクセスできる


## アプリを落とすとき
docker-compose -f .docker/docker-compose.dev.yml down
```