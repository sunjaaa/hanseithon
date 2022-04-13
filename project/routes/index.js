var express = require('express');
var router = express.Router();
const app = express();
var request = require('request');
const locationModel = require("../model/location");
const dailyModel = require("../model/daily")
var MongoClient = require('mongodb').MongoClient;

var myaddr = 'http://openapi.seoul.go.kr:8088/424a6b69626a757337386e64596a6a/json/TbCorona19CountStatusJCG/1/1'


router.get('/', (req, res, next) => {
  res.render('index')
});

router.get('/login/forgot-pw', (req, res, next) => {
  res.render('forgot-pw')
});

router.get('/login/make-id', (req, res, next) => {
  res.render('make_id')
});

router.get('/search', (req, res, next) => {
  res.render('search')
});

router.get('/find_H', (req, res, next) => {
  res.render('find_H')
});

router.get('/favorite', (req, res, next) => {
  res.render('favorite')
});

router.get('/find_R', (req, res, next) => {
  res.render('find_R')
});


router.post('/location', (req, res, next) => {
  const {title, address, lat, lng} = req.body;
  let location = new locationModel();
  location.title = title;
  location.address = address;
  location.lat = lat;
  location.lng = lng;
  location.save().then((result) => {
    console.log(result);
  
  res.json({
    message: "데이터를 정상적으로 보냈습니다."
  });
}).catch((error) => {
  console.log(error);
  res.json({
    message: "에러가 발생했습니다",
  });
});
});

router.get("/location", (req, res, next) => {
  locationModel
  .find({}, {})
  .then((result) => {
    console.log(result);
    res.json({
      message: "success",
      data: result,
    });
  })
  .catch((error) => {
    res.json({
      message: "error",
    });
  });
});

router.get('/daily', function(req, res, next){
  request(myaddr, function(error, response, body){
    if(error){
      console.log(error)
    }
    var obj = JSON.parse(body)
    console.log(JSON.stringify(obj.TbCorona19CountStatusJCG.row)) // 콘솔창에 찍어보기

    let SEONGBUK = obj.TbCorona19CountStatusJCG.row[0].SEONGBUK;
    let SEONGBUKADD = obj.TbCorona19CountStatusJCG.row[0].SEONGBUKADD;
    let JONGNO = obj.TbCorona19CountStatusJCG.row[0].JONGNO;
    let JONGNOADD = obj.TbCorona19CountStatusJCG.row[0].JONGNOADD;
    let SDM = obj.TbCorona19CountStatusJCG.row[0].SDM;
    let SDMADD = obj.TbCorona19CountStatusJCG.row[0].SDMADD;
    let MAPO = obj.TbCorona19CountStatusJCG.row[0].MAPO;
    let MAPOADD = obj.TbCorona19CountStatusJCG.row[0].MAPOADD;
    let YONGSAN = obj.TbCorona19CountStatusJCG.row[0].YONGSAN;
    let YONGSANADD = obj.TbCorona19CountStatusJCG.row[0].YONGSANADD;
    let JUNGGU = obj.TbCorona19CountStatusJCG.row[0].JUNGGU;
    let JUNGGUADD = obj.TbCorona19CountStatusJCG.row[0].JUNGGUADD;
    let SEONGDONG = obj.TbCorona19CountStatusJCG.row[0].SEONGDONG;
    let SEONGDONGOADD = obj.TbCorona19CountStatusJCG.row[0].SEONGDONGADD;
    let DDM = obj.TbCorona19CountStatusJCG.row[0].DDM;
    let DDMADD = obj.TbCorona19CountStatusJCG.row[0].DDMADD;
  })
})



module.exports = router;
