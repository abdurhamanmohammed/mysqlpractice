const express=require("express");
const mysql=require("mysql");
const app=express();
const cors = require('cors');
app.use(cors());
app.listen(9090,()=>{
    console.log("its working")
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const mysqlconnection=mysql.createConnection(
    {
        user:"dbuser",
        password:"dbusers",
        host:"127.0.0.1",
        database:"dbuser"
    }
);
mysqlconnection.connect((err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("its connected")
    }
})
app.get("/install",(req,res)=>{
    let products="CREATE TABLE if not exists products(product_id INT AUTO_INCREMENT PRIMARY KEY,product_name VARCHAR(255) NOT NULL,product_price VARCHAR(255) NOT NULL)";
    let price="CREATE TABLE if not exists prices(price_id INT AUTO_INCREMENT PRIMARY KEY,product_id INT(11) NOT NULL,price_range VARCHAR(255) NOT NULL,product_description VARCHAR(255) NOT NULL,FOREIGN KEY (product_id) REFERENCES products(product_id))";
    let adress="CREATE TABLE if not exists address(address_id INT AUTO_INCREMENT PRIMARY KEY,product_id INT(11) NOT NULL,address_town VARCHAR(255) NOT NULL,address_country VARCHAR(255) NOT NULL,FOREIGN KEY (product_id) REFERENCES products(product_id))";
    mysqlconnection.query(products,(err,results,field)=>{
        if(err){console.log(err) }
    })
    mysqlconnection.query(price,(err,results,field)=>{
        if(err){console.log(err) }
    })
    mysqlconnection.query(adress,(err,results,field)=>{
        if(err){console.log(err) }
    })
    res.end("tefetrol")
    console.log("table tefatrole")
})
app.post("/add-product",(req,res)=>{
    console.table(req.body);
    let n1=req.body.name;
    let p1=req.body.price;
    let r1=req.body.range;
    let d1=req.body.description;
    let t1=req.body.town;
    let c1=req.body.country;
    var pro = "INSERT INTO products (product_name, product_price) VALUES ('"+n1+"', '"+p1+"')";
   
    mysqlconnection.query(pro, function (err, result) {
        if (err) {console.log(err)} ;
        
        
      });
      mysqlconnection.query(`SELECT * FROM products WHERE product_name="${n1}"`, function (err, rows, fields) {
        if (err) throw err;
        // console.log(rows[0].product_id);
        let new_id=rows[0].product_id;
        var pri = `INSERT INTO prices (product_id,price_range, product_description) VALUES ("${new_id}","${r1}","${d1}")`;
        var add = `INSERT INTO address (product_id,address_town, address_country) VALUES ("${new_id}","${t1}","${c1}")`;
           mysqlconnection.query(pri, function (err, result) {
        if (err) {console.log(err)} 
       
      });
      mysqlconnection.query(add, function (err, result) {
        if (err) {console.log(err)} ;
        
      });
      });
   
      console.log("1 record inserted");
      res.end("data gebetole")
})
// app.get("/get_data",(req,res)=>{
//     mysqlconnection.query("SELECT products.product_id AS ID,products.product_name,products.product_price,prices.price_range,address.address_town FROM products JOIN prices JOIN address ON products.product_id=prices.product_id AND products.product_id=address.product_id ", function (err, result, fields) {
//         if (err) throw err;
//         res.send(result)
//         console.log("file");
//       });
// })
app.get("/get_data/:id",(req,res)=>{
    console.log(req.params.id)
    mysqlconnection.query(`SELECT products.product_id AS ID,products.product_name,products.product_price FROM products WHERE products.product_id= "${req.params.id}"`, function (err, presult, fields) {
        if (err) {console.log(err)} ;
        mysqlconnection.query(`SELECT prices.price_range FROM prices WHERE prices.product_id= "${req.params.id}"`, function (err, priresult, fields) {
            if (err) {console.log(err)} ;
            mysqlconnection.query(`SELECT address.address_town FROM address WHERE address.product_id= "${req.params.id}"`, function (err, adresult, fields) {
                if (err) {console.log(err)} ;
                        res.send({
                            Id:presult[0]?.ID,
                            Name:presult[0]?.product_name,
                            Price:presult[0]?.product_price,
                            Range:priresult[0]?.price_range,
                            Address:adresult[0]?.address_town
                        });
              });
          });
      });
})
app.put("/update",(req,res)=>{
    const{newname,id}=req.body;
    // let id=req.body.id;
    // let name1=req.body.newname;
    var updatee = `UPDATE products SET product_name = "${newname}" WHERE product_id = "${id}"`;
    mysqlconnection.query(updatee, function (err, result) {
    if (err) {console.log(err)} ;
    console.log(result.affectedRows + " record(s) updated");
    res.send(result)
  });

})
app.delete("/delete",(req,res)=>{
    const{did}=req.body;
    // let id=req.body.id;
    // let name1=req.body.newname;
    var dproduct = `DELETE FROM products WHERE product_id = "${did}"`;
    var daddress = `DELETE FROM address WHERE product_id = "${did}"`;
    var dprices = `DELETE FROM prices WHERE product_id = "${did}"`;
    mysqlconnection.query(daddress, function (err, result) {
        if (err) {console.log(err)} ;
        console.log(result.affectedRows + " record(s) updated");
          });
    mysqlconnection.query(dprices, function (err, result) {
            if (err) {console.log(err)} ;
            console.log(result.affectedRows + " record(s) updated");
              });
    mysqlconnection.query(dproduct, function (err, result) {
    if (err) {console.log(err)} ;
    console.log(result.affectedRows + " record(s) updated");
      });

})