# ridaisai

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Local server

See [Initialize the SDK](https://firebase.google.com/docs/admin/setup#initialize_the_sdk).

### サービス アカウント用の秘密鍵ファイルを生成するには:

Firebase コンソール(Trousse)で、[設定] > [サービス アカウント] を開きます。

[新しい秘密鍵の生成] をクリックし、[キーを生成] をクリックして確定します。

キーを含む JSON ファイルを安全に保管します。(github にあげちゃダメだよ!!)

### 環境変数を設定するには:(毎度ターミナルを開くたびに打つ必要あり)

環境変数 GOOGLE_APPLICATION_CREDENTIALS を、サービス アカウント キーが含まれる JSON ファイルのファイルパスに設定します。この変数は現在のシェル セッションにのみ適用されるので、新しいセッションを開く場合は、変数を再度設定してください。

```
\$ export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/service-account-file.json"
```

/home/user/Downloads/は秘密鍵が置いてある場所、service-account-file.json は鍵の名前

上記の手順を完了すると、アプリケーションのデフォルト認証情報（ADC）は認証情報を暗黙的に判別できるようになり、Google 以外の環境でテストするか実行するときに、サービス アカウントの認証情報を使用できます。

### 環境変数を設定するには:(毎度ターミナルを開くたびに打つ必要なし)

direnv をインストールします。

```
brew install direnv
```

trousse のディレクトリに移動して、

```
direnv edit .
```

エディタ(たぶん vim)が立ち上がるので、 i を押した後に

```
export GOOGLE_APPLICATION_CREDENTIALS="$HOME/service-account-file.json"
```

と書いて ESC キーを押して :wq で保存

```
echo $GOOGLE_APPLICATION_CREDENTIALS
```

を実行すると環境変数がセットされているかをチェックできます。
