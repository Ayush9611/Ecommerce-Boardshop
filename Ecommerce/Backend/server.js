import express from "express";
import mysql from "mysql";
import cors from "cors";

const server = express();
server.use(express.json());
server.use(cors())
const port = 3308;

server.listen(4400, function () {
  console.log("it works");
});

server.listen(port, function () {
  console.log("Server started and running on port no", port);
});

const dbboardshop = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "boardshop",
});

dbboardshop.connect(function (error) {
  if (error) {
    console.log("Connection to SQL failed", error);
    return;
  } else {
    console.log("Succesfully connected to students");
  }
});


server.post("/addnewproduct", function (req, res) {
  let SQLquery = "CALL `addnewproducts`(?,?,?,?,?,?)";
  dbboardshop.query(
    SQLquery,
    [
      req.body.name,
      req.body.stars,
      req.body.description,
      req.body.favourite,
      req.body.price,
      req.body.imageUrl
    ],
    function (error, data) {
      if (error) {
        res.json({ error_message: error });
      } else {
        res.json({ data: data[0] });
      }
    }
  );
});

server.delete("/products/:id", function (req, res) {
  let SQLquery = "CALL `deleteproduct`(?)";
  dbboardshop.query(
    SQLquery,
    [req.params.id],
     (error, data) => {
      (error) ? res.json({ error_message: error }) : res.json({ message: "deleted" });
    }
  );
});

server.get("/products", function (req, res) {
  let SQLquery = "CALL `getallproducts`()";
  dbboardshop.query(SQLquery, (error, data) => {
    (error) ? res.json({ error_message: error }) : res.json({ productdata: data[0] });
  });
});



server.put("/products/:id", (req, res) => {
  let SQLquery = "CALL `updateproduct`(?,?,?,?,?,?,?)";
  dbboardshop.query(
    SQLquery,
    [req.body.price, req.params.id, req.body.name, req.body.stars, req.body.description, req.body.favourite, req.body.imageUrl],
     (error, data) => {
      (error) ? res.json({ error_message: error }) : res.json({ message: "updated", data: data[0] });
    }
  );
});

server.get("/products/:id", (req, res) => {
  // let reqParamID = req.params.id;
  // console.log(reqParamID);
  // res.json({id: reqParamID})
  let SQLquery = "CALL `getproduct`(?)";
  dbboardshop.query(SQLquery, [req.params.id], (error, data) => {
    (error) ? res.json({ error_message: error }) : res.json(  data[0][0] );
  });
});

server.put("/setlive/:id", (req,res) => {

  let SQLquery = " CALL `setlive`(?)";
  dbboardshop.query(SQLquery, [req.params.id], (error, data) => {
    (error) ? res.json({ error_message: error }) : res.json({message : "success"});
  });
});

server.get("/showlive", (req,res) => {
  let SQLquery = "CALL `showlive`()";
  dbboardshop.query(SQLquery, (error,data) =>{
    (error) ? res.json({ error_message: error }) : res.json({ productdata: data[0] });
  })

})

server.post('/validateuser', (req, res) => {
  let SQLQuery = "CALL `validateuser`(?, ?)";
  dbboardshop.query(SQLQuery, [req.body.email, req.body.password], (error, data) => {
      if(error){
          res.json({ error_message: error});
      }
      else{
         if(data[0].length > 0){
          res.json({message: "Logged in succesfully"});
         }
         else{
          res.json(false);
         }
      }
  })
})

server.put('/setLivestatus/:id', (req,res) => {
  let SQLQuery = "CALL `setLivestatus`(?, ?)";
  dbboardshop.query(SQLQuery, [req.params.id, req.body.Live], (error,data) => {
    if(error){
      res.json(error)
    }else{
      res.json(req.body.Live);
    }
  })
})

server.put("/setoffline/:id", (req,res) => {

  let SQLquery = " CALL `setoffline`(?)";
  dbboardshop.query(SQLquery, [req.params.id], (error, data) => {
    (error) ? res.json({ error_message: error }) : res.json({message : "success"});
  });
});
