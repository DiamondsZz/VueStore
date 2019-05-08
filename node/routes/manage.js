const express =require('express');
const router = express.Router();

const fs = require('fs');
const UUID =require('uuid')
const  mysql =require('mysql');

const  connection=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'manage'
});
connection.connect();

router.get('/shop',function (req,res) {
    const sql = 'select * from shop where shopIsDelete = 0';
    connection.query(sql, function (err, result) {

        if (result.length !== 0) {
            res.send({success_code: 200, message: result});
        } else {
            res.send('商品为空');
        }
    });
})

router.get('/deleteShop', function (req, res) {

    const shopId = req.query.shopId;
    console.log(shopId);
    const deleteSql = 'update  shop set shopIsDelete=1 where shopId='+shopId;
    console.log(deleteSql);
    connection.query(deleteSql, function (err, result) {

        console.log(result);
        if (result.length !== 0) {
            const selectSql = 'select * from shop where shopIsDelete = 0';
            connection.query(selectSql, function (err, result) {
                if (result.length !== 0){
                    res.send({success_code: 200, message: result});
                }else{
                    res.send({success_code: 200, message: []});
                }
            })
        } else {
            res.send('删除失败');
        }
    });
});

router.post('/updateShop', function (req, res) {

    const shop = req.body.shop;
    console.log(shop);

    const updateSql = 'update shop set shopName="'+shop.shopName+'",shopPrice='+shop.shopPrice+',shopDes="'+shop.shopDes+'" where shopId='+shop.shopId;
    console.log(updateSql);

    connection.query(updateSql, function (err, result) {

        //console.log(result);
        if (result.length !== 0) {
            const selectSql = 'select * from shop where shopIsDelete = 0';
            connection.query(selectSql, function (err, result) {
                if (result.length !== 0){
                    res.send({success_code: 200, message: result});
                }else{
                    res.send({success_code: 200, message: []});
                }
            })
        } else {
            res.send('修改失败');
        }
    });


});

router.post('/addShopImg', function (req, res) {
    res.send('ok')
})

router.post('/addShop', function (req, res) {

    console.log(req.body.shop);

    //获取图片后缀格式
    let getImgFormat=req.body.shop.shopImgType.substring(req.body.shop.shopImgType.indexOf('/') + 1)
    
    //格式化base64图片
    let imgPattern =new RegExp('^data:image\/'+getImgFormat+';base64,');

    let imgBuffer=Buffer.from(req.body.shop.shopImg.replace(imgPattern,''),'base64');//对base64图片进行处理 并获取对应buffer

    let uuid =UUID.v1();//图片名字唯一标识
    //console.log(uuid);

    let shopName=req.body.shop.shopName;
    let shopPrice=req.body.shop.shopPrice;
    let shopDes=req.body.shop.shopDes;
    let shopImg=req.body.shop.shopImg;


   let shopImgWriteSrc='./../public/images/shop/shop'+uuid+'.'+getImgFormat;//图片写入路径
   let shopImgSrc='http://127.0.0.1:3003/images/shop/shop'+uuid+'.'+getImgFormat; //数据库存取图片路径
    
    fs.writeFile(shopImgWriteSrc,imgBuffer,function (err) {
        if(err)
        {
            console.log(err);
        }else{
            const sql='insert  into shop (shopName,shopImg,shopPrice,shopDes) values ("'+shopName+'","'+shopImgSrc+'",'+shopPrice+',"'+shopDes+'")'
            console.log(sql);
            connection.query(sql,function (err,result) {
                if(err)
                {
                    console.log(err);
                }else{
                    const selectSql = 'select * from shop where shopIsDelete = 0';
                    connection.query(selectSql, function (err, result) {
                        if (result.length !== 0){
                            res.send({success_code: 200, message: result});
                        }else{
                            res.send({success_code: 200, message: []});
                        }
                    })

                }

            })
        }
    })


});








router.get('/user',function (req,res) {
    const sql = 'select * from user ';
    connection.query(sql, function (err, result) {

        if (result.length !== 0) {
            res.send({success_code: 200, message: result});
        } else {
            res.send('用户为空');
        }
    });
})







module.exports=router;