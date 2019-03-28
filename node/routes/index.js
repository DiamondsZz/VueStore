const express = require('express');
const router = express.Router();

const connection = require("./../db/db");

connection.connect();


//请求首页轮播图
router.get('/api/homecarousel', function (req, res) {
    const sql = 'select * from homeCarousel';
    connection.query(sql, function (err, result) {
        if (err) {
            res.json("查询失败");
        } else if (result) {
            res.json({success_code: 200, message: result});
        }
    });
});

//请求首页导航图
router.get('/api/homenav', function (req, res) {
    const homenav = require('./../data/homenav');
    res.json({success_code: 200, message: homenav});
});

//请求首页商品列表
router.get('/api/homeshoplist', function (req, res) {
    let pageSzie=req.query.pageSize||1;
    let count=req.query.count||10;
    const  sql ='select * from shoplist limit '+(pageSzie-1)*count+','+count;
    console.log(sql);
    connection.query(sql,function (err,result) {
        if (err) {
            res.json("查询失败");
        } else if (result) {
            res.json({success_code: 200, message: result});
        }
    });
});





module.exports = router;
