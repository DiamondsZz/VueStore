const express =require('express');
const router = express.Router();

const  mysql =require('mysql');

const  connection=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'manage'
});


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

module.exports=router;