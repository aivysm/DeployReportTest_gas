function findLatestEntry() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
    var data = sheet.getDataRange().getValues();

    var latestStartTime = null;
    var latestRow = -1;

    for (var i = 1; i < data.length; i++) { // 1行目はヘッダーと仮定
        if (data[i][0] === 'orange') { // 列A（インデックス0）で 'orange' を検索
            var startTime = new Date(data[i][1]); // 列B（インデックス1）の開始時刻

            if (!latestStartTime || startTime > latestStartTime) {
                latestStartTime = startTime;
                latestRow = i;
            }
        }
    }

    if (latestRow !== -1) {
        // 最新日時の行の値を取得して変数に入れる
        var start = data[latestRow][1]; // 列Bの値
        var end = data[latestRow][2];   // 列Cの値
        var body = data[latestRow][3];  // 列Dの値

        var formatDate = function (date) {
            var pad = function (n) { return n < 10 ? '0' + n : n; };
            return date.getFullYear() + '/' + pad(date.getMonth() + 1) + '/' + pad(date.getDate()) + ' ' + pad(date.getHours()) + ':' + pad(date.getMinutes());
        };

        var formattedStart = formatDate(new Date(start));
        var formattedEnd = formatDate(new Date(end));

        console.log("Start Time: " + formattedStart);
        console.log("End Time: " + formattedEnd);
        console.log("Body: " + body);

        var sheet2 = SpreadsheetApp.getActiveSpreadsheet().insertSheet('報告出力');

        var message = "@aさん @bさん\n\nサービスxxの工事を予定しているため、工事内容を報告させていただきます。\n\n1.工事時間\n" + formattedStart + " ~ " + formattedEnd + "\n2.工事内容\n" + body;
        sheet2.getRange("A2").setValue(message);
    } else {
        console.log("No matching data found.");
    }
}
