const express = require('express');
const router = express.Router();

const fs = require('fs');


const connection = require("./../db/db");

connection.connect();


//用户登录
router.post('/api/login', function (req, res) {

    //前端请求头设置"Content-Type":"application/x-www-form-urlencoded;charset=utf-8"，避免两次post请求，node需要对请求参数做处理
    //console.log(JSON.parse(Object.keys(req.body)[0]));
   /* let username = JSON.parse(Object.keys(req.body)[0]).username;
    let password = JSON.parse(Object.keys(req.body)[0]).password;*/

    let username =req.body.username;
    let password = req.body.password;

    const sql = 'select * from login where username="' + username + '" and password="' + password + '"';
    console.log(sql);
    connection.query(sql, function (err, result) {
        //console.log('kkk');
        //console.log(err);
        //console.log(result);

        if (result.length !== 0) {
            //console.log('ok');
            res.send({success_code: 200, message: 'ok'});
        } else {
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
    let pageSzie = req.query.pageSize || 1;
    let count = req.query.count || 10;
    const sql = 'select * from shoplist limit ' + (pageSzie - 1) * count + ',' + count;
    console.log(sql);
    connection.query(sql, function (err, result) {
        if (err) {
            res.json("查询失败");
        } else if (result) {
            res.json({success_code: 200, message: result});
        }
    });
});


router.get('/api/myshoplist', function (req, res) {

    const sql = 'select * from myshoplist  ';
    connection.query(sql, function (err, result) {
        if (err) {
            res.json("查询失败");
        } else if (result) {
            res.json({success_code: 200, message: result});
        }
    });
});


//用户查询信息
router.post('/api/userget', function (req, res) {

    //前端请求头设置"Content-Type":"application/x-www-form-urlencoded;charset=utf-8"，避免两次post请求，node需要对请求参数做处理
    /*console.log(JSON.parse(Object.keys(req.body)[0]));
    const username = JSON.parse(Object.keys(req.body)[0]).username;
    const password = JSON.parse(Object.keys(req.body)[0]).password;*/

    const username = req.body.username;
    const password = req.body.password;

    const sql = 'select * from user where username="' + username + '" and password="' + password + '"';
    console.log(sql);
    connection.query(sql, function (err, result) {


        if (result.length !== 0) {
            res.send({success_code: 200, message: result[0]});
        } else {
            res.send('查询失败');
        }
    });
});

//用户修改信息
router.post('/api/userset', function (req, res) {

    //前端请求头设置"Content-Type":"application/x-www-form-urlencoded;charset=utf-8"，避免两次post请求，node需要对请求参数做处理
    /*const icon = JSON.parse(Object.keys(req.body)[0]).icon;
    const name = JSON.parse(Object.keys(req.body)[0]).name;
    const sex = JSON.parse(Object.keys(req.body)[0]).sex;
    const address = JSON.parse(Object.keys(req.body)[0]).address;
    const birth = JSON.parse(Object.keys(req.body)[0]).birth;
    const style = JSON.parse(Object.keys(req.body)[0]).style;
    const username = JSON.parse(Object.keys(req.body)[0]).username;
    const password = JSON.parse(Object.keys(req.body)[0]).password;*/

    const icon = req.body.icon;
    const name = req.body.name;
    const sex = req.body.sex;
    const address = req.body.address;
    const birth = req.body.birth;
    const style = req.body.style;
    const username = req.body.username;
    const password = req.body.password;

    const sql = 'update user set icon="' + icon + '",name="' + name + '",sex="' + sex + '",address="' + address + '",birth="' + birth + '",style="' + style + '"where username="' + username + '" and password="' + password + '"';
    console.log(sql);
    connection.query(sql, function (err, result) {

        console.log(result);
        /*if(result.length!==0)
        {
            res.send({success_code: 200, message: 'ok'});
        }else{
            res.send('修改失败');
        }*/
    });
});


//头像上传
router.post('/api/iconUpLoad', function (req, res) {

    /* let img = '';
     for(let index in Object.keys(req.body))
     {
         img+=Object.keys(req.body)[index]+req.body[Object.keys(req.body)[index]];
     }*/  //避免两次post请求时
    console.log(req.body.img.replace(/^data:image\/png;base64,/,''));
    let imgBuffer=Buffer.from(req.body.img.replace(/^data:image\/png;base64,/,''),'base64');//对base64图片进行处理 并获取对应buffer
    console.log(imgBuffer);
     fs.writeFile('./../public/images/user/user'+req.body.id+'.'+req.body.type.substring(req.body.type.indexOf('/')+1),imgBuffer,function (err) {
         if(err)
         {
             console.log(err);
         }else{
             const sql='update user set icon="http://127.0.0.1:3003/images/user/user' +req.body.id +'.'+req.body.type.substring(req.body.type.indexOf('/')+1)+ '"where id="' + req.body.id +'"';
             connection.query(sql,function (err,result) {
                 if(err)
                 {
                     console.log(err);
                 }else{
                     res.send({icon:"http://127.0.0.1:3003/images/user/user"+req.body.id +'.'+req.body.type.substring(req.body.type.indexOf('/')+1)})
                 }
                 console.log(result);
             })
         }
     })


});


module.exports = router;
