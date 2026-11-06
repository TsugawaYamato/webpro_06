const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));

app.use("/public", express.static(__dirname + "/public"));
let station = [
  { id: 1, code: "JE01", name: "東京駅" },
  { id: 2, code: "JE07", name: "舞浜駅" },
  { id: 3, code: "JE12", name: "新習志野駅" },
  { id: 4, code: "JE13", name: "幕張豊砂駅" },
  { id: 5, code: "JE14", name: "海浜幕張駅" },
  { id: 6, code: "JE05", name: "新浦安駅" }
];

app.get("/keiyo", (req, res) => {
  res.render("db2", { data: station });
});

app.get("/keiyo_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;

  let newdata = { id: id, code: code, name: name };
  station.push(newdata);

  
  res.render("db2", { data: station });
});

app.use("/public", express.static(__dirname + "/public"));
let mh = [
  { id: 1, code: "MH", name: "リオレウス" },
  { id: 2, code: "MHG", name: "リオレウス亜種" },
  { id: 3, code: "MHP", name: "リオレウス" },
  { id: 4, code: "MH2", name: "クシャルダオラ" },
  { id: 5, code: "MHP2nd", name: "ティガレックス" },
  { id: 6, code: "MHP2ndG", name: "ナルがクルガ" },
  { id: 7, code: "MH3rd", name: "ラギアクルス" },
  { id: 8, code: "MHP3", name: "ジンオウガ" },
  { id: 9, code: "MH3G", name: "ブラキディオス" },
  { id: 10, code: "MH4", name: "ゴア・マガラ" },
  { id: 11, code: "MH4G", name: "セルレギオス" },
  { id: 12, code: "MHX", name: "ディノバルド" },
  { id: 13, code: "MHXX", name: "バルファルク" },
  { id: 14, code: "MHWORLD", name: "ネルギガンテ" },
  { id: 15, code: "MHW:ICEBORNE", name: "イヴェルカーナ" },
  { id: 16, code: "MRISE", name: "マガイマガド" },
  { id: 17, code: "MHR:SUNBRAKE", name: "メル・ゼナ" },
  { id: 18, code: "MHWILDS", name: "アルシュベルド" }
];

app.get("/MHmain", (req, res) => {
  res.render("MH", { data: mh });
});

app.get("/MHmain_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;

  let newdata = { id: id, code: code, name: name };
  mh.push(newdata);

  
  res.render("MH", { data: mh });

});

app.get("/MHmain_form", (req, res) => {
  res.sendFile(__dirname + "/public/MHmain_add.html");
});
