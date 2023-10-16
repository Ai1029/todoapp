# API 概要

| ホスト                | バージョン | データ形式 |
| --------------------- | ---------- | ---------- |
| http://localhost:3001 | v1         | JSON       |

## todo

### 新規 todo 情報を登録

```
Post / http://localhost:3001/api/v1/list
```

リクエスト内容（Json）

```
{
    "title" : "プロテインを購入",
    "detail" : "プロテインが少なくなったので、amazonで購入",
    "completed" : false,
    "categoryID": 1,
}
```

レスポンスサンプル（json）

```
{
    "id" : 1,
    "title" : "プロテインを購入",
    "detail" : "プロテインが少なくなったので、amazonで購入",
    "completed" : false,
    "categoryID": 1,
}
```

### 全ての todo 情報を取得する

```
Get / http://localhost:3001/api/v1/list
```

リクエスト内容（Json）

```
なし
```

レスポンスサンプル（Json）

```
[
   {
        "id" : 1,
        "title" : "プロテインを購入",
        "detail" : "プロテインが少なくなったので、amazonで購入",
        "completed" : false,
        "categoryID": 1,
    }
]
```

### ユーザー情報を更新する

```
Patch / http://localhost:3001/api/v1/list/:id
```

リクエスト内容（Json）

```
{
    "id" : 1,
    "title" : "プロテインを購入",
    "detail" : "プロテインが少なくなったので、amazonのセールで購入",
    "completed" : false,
    "categoryID": 1,
}
```

レスポンスサンプル（Json）

```
{
    "id" : 1,
    "title" : "プロテインを購入",
    "detail" : "プロテインが少なくなったので、amazonのセールで購入",
    "completed" : false,
    "categoryID": 1,
}
```

### todo 情報を削除する

```
Delete / http://localhost:3001/api/v1/list/:id
```

リクエスト内容（Json）

```
なし
```

レスポンスサンプル(json)

```
result 削除しました
```

## カテゴリー

### 全てのカテゴリーを取得する

```
Get / http://localhost:3001/api/v1/category
```

リクエスト内容（Json）

```
なし
```

レスポンスサンプル（Json）

```
[
    {
        "id" : 1,
        "category" : "健康"
    },
    {
        "id" : 2,
        "category" : "家事"
    }
]
```

### 指定したカテゴリーを取得する

```
Get / http://localhost:3001/api/v1/category/:id
```

リクエスト内容（Json）

```
なし
```

レスポンスサンプル（Json）

```
{
    "id" : 1,
    "category" : "健康"
}
```
