const express = require('express');
const router = express.Router();

const connection = require("./../db/db");

connection.connect();


//用户
router.post('/api/login', function (req, res) {

    //前端请求头设置"Content-Type":"application/x-www-form-urlencoded;charset=utf-8"，避免两次post请求，node需要对请求参数做处理
    //console.log(JSON.parse(Object.keys(req.body)[0]));
    let username=JSON.parse(Object.keys(req.body)[0]).username;
    let password=JSON.parse(Object.keys(req.body)[0]).password;
    const sql='select * from login where username='+username.toString()+' and password='+password.toString();
    console.log(sql);
    connection.query(sql,function (err,result) {
        //console.log('kkk');
        //console.log(err);
        //console.log(result);

        if(result.length!==0)
        {
            //console.log('ok');
            res.send({success_code: 200, message: 'ok'});
        }else{
            //console.log('账号或密码错误！');
            res.send('账号或密码错误！');
        }
    });

});


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


router.get('/api/myshoplist', function (req, res) {

    const  sql ='select * from myshoplist  ';
    connection.query(sql,function (err,result) {
        if (err) {
            res.json("查询失败");
        } else if (result) {
            res.json({success_code: 200, message: result});
        }
    });
});




module.exports = router;
