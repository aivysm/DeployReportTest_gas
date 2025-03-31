# どんなプログラムか？
このコードは、Googleスプレッドシートの「シート1」のデータを調べて、
「A列に 'orange' が入っている行」の中で、B列の開始時刻が一番新しい（最新の）行 を探します。

そして、その行の「開始時刻（B列）、終了時刻（C列）、工事内容（D列）」を取り出し、
「シート2」のA2セルに、フォーマット済みのテキストとして書き込む という動作をします。

# 使い方
・管理用ファイルをDLする</br>
・GoogleDriveのどこかしらにファイルをうp</br>
・スプレッドシートで管理用ファイルを開く</br>
・GoogleAppScriptを起動する</br>
・スクリプトを転記する</br>
・Runする</br>
</br>
※deployはしない</br>
※フォーマットに合わせて修正</br>


## コード内容の備忘（自分用）

### (4) `latestRow = i` は `i - 1` でなくてよいか？
`latestRow = i;` で問題ありません。

#### 理由
`data` はスプレッドシートの行順そのままに取得されるので、`data[i]` の `i` はスプレッドシートの「行番号 - 1」になります。

例えば、スプレッドシートの 2 行目（実際の行番号 2）は、`data[1]` に入っています。  
`i - 1` を使うと 1 行ずれてしまうので、単純に `i` を使うのが正解です。

---

### (6) `formatDate` の処理の詳細
```javascript
var formatDate = function(date) {
    if (!(date instanceof Date)) {
        throw new Error('Invalid input: Expected a Date object');
    }
    var pad = function(n) { return n < 10 ? '0' + n : n; };
    return date.getFullYear() + '/' + pad(date.getMonth() + 1) + '/' + pad(date.getDate()) + ' ' + pad(date.getHours()) + ':' + pad(date.getMinutes());
};
```

#### この関数の目的
日付オブジェクト（`Date`）を「`yyyy/mm/dd HH:MM`」形式にフォーマットします。

- `getFullYear()` → 年（4 桁）
- `getMonth() + 1` → 月（0 から始まるので +1）
- `getDate()` → 日
- `getHours()` → 時間（24 時間制）
- `getMinutes()` → 分

---

#### `pad(n)` について
```javascript
var pad = function(n) { return n < 10 ? '0' + n : n; };
```
これは「1 桁の数字を 0 埋めする」処理です。

- `1` → `"01"`
- `9` → `"09"`
- `10` → `"10"`

こうすることで、「`2025/3/5 9:3`」ではなく「`2025/03/05 09:03`」のように整えられます。
