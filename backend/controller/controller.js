const dbConnect = require("../config/dbConnect.js")
const mysql = require("mysql")
const bcrypt = require("bcrypt")
const path = require("path")
const { validationResult } = require("express-validator")
require("dotenv").config({
  path: path.resolve(__dirname, "../config.env")
})

const jwt = require("jsonwebtoken")
const { connect } = require("tls")

const signup = async function (req, res) {
  console.log("enter sign up")
  const name = req.body.fullname
  const password = req.body.password
  const email = req.body.email
  const rep=req.body.rep
  const company=req.body.company
  const usertype=req.body.user
  const height=req.body.height
  const weight=req.body.weight
  const allergies=req.body.allergies
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    console.log(errors)
    res.status(500).send(errors)
  } else {
    const hashedPassword = await bcrypt.hash(password, 10)
    dbConnect.getConnection(async (err, connection) => {
      if (err) console.log(err)
      const sqlSearch = "SELECT * FROM user WHERE email = ?"
      const sqlrep="SELECT rep_number FROM rep WHERE rep_number=?"
      const sqlcomapny="SELECT company_name FROM company WHERE company_name=?"
      const search_query = mysql.format(sqlSearch, [email])
      const search_rep=mysql.format(sqlrep, [rep])
      const search_comapny=mysql.format(sqlcomapny, [company])
      const sqlInsert = "INSERT INTO user (name,password,email,company,rep_number,height,weight,med_condition,user_type) VALUES (?,?,?,?,?,?,?,?,?)"
      const insert_query = mysql.format(sqlInsert, [name, hashedPassword, email,company,rep,height,weight,allergies,usertype])
      await connection.query(search_query, [name, hashedPassword, email], async (err1, result1) => {
        if (err1) console.log(err1)
        if (result1.length != 0) {
          //connection.release()
          res.status(200).send("User Exist")
        } else {
          if(usertype==="admin"){
            await connection.query(search_rep, (err3, result3) => {
              //
              if (err3) console.log(err3)
              else{
                if(result3.length!=0){
                  connection.query(search_comapny, (err4, result4) => {
                    //
                    if (err4) console.log(err4)
                    else{
                      if(result4.length!=0){
                        connection.query(insert_query, (err2, result2) => {
                          //
                          if (err2) console.log(err2)
              
                          res.status(200).send("Success")
                          connection.release()
                        })
                      }else{
                        res.status(200).send("Company name invalid")
                      }            
                    }
                  })
                }else{
                  res.status(200).send("Rep No. invalid")
                }
               
              }
            })
          }else{
            await connection.query(insert_query, (err2, result2) => {
              //
              if (err2) console.log(err2)
  
              res.status(200).send("Success")
              connection.release()
            })
          }

        }
      }) //end of connection.query()
    })
  } //end of db.getConnection()
};
module.exports.signup = signup;

const update = async function(req, res){
  console.log("enter update")
  console.log(req.body)
  const id = req.body.userid
  const password = req.body.password
  const height=req.body.height
  const weight=req.body.weight
  const allergies=req.body.medRecord
  const hashedPassword = await bcrypt.hash(password, 10)
  dbConnect.getConnection(async (err, connection) => {
    if (err) console.log(err)
    const sqlUpdate= "UPDATE user SET password=?,height=?,weight=?,med_condition=? WHERE id=?"
    const update_query = mysql.format(sqlUpdate, [hashedPassword,height,weight,allergies,id])

    await connection.query(update_query, async (err1, result) => {
      if (err1) console.log(err1)
      console.log(result)
      if(result){
        console.log("updated")
        res.status(200).send("updated")
      }


      connection.release()
    }) //end of connection.query()
  }) //end of db.connection()
}
module.exports.update = update;

const login = async function (req, res) {
  console.log("enter login")
  const password = req.body.password
  const email = req.body.email
  const usertype=req.body.userType

  dbConnect.getConnection(async (err, connection) => {
    if (err) console.log(err)
    const sqlSearch = "SELECT * FROM user WHERE email = ?"
    const search_query = mysql.format(sqlSearch, [email])

    await connection.query(search_query, async (err1, result) => {
      if (err1) console.log(err1)
      if (result.length == 0) {
        res.json({
          login: false,
          error: "incorrect",
          status: 401
        })
      } else {
        const hashedPassword = result[0].password
        if (await bcrypt.compare(password, hashedPassword)) {
          console.log(result[0].user_type)
          if(result[0].user_type===usertype){

            const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15d" })
            let userid= JSON.stringify(result[0].id)
            res.json({ login: true, email: email, accessToken: accessToken,id:userid})

          } else {
            //res.status(401).send("Password Incorrect!")
            res.json({
              login: false,
              error: "incorrect",
              status: 401
            })
            connection.release()
            // res.send("Password incorrect!")
          }

        } else {
          //res.status(401).send("Password Incorrect!")
          res.json({
            login: false,
            error: "incorrect",
            status: 401
          })
          connection.release()
          // res.send("Password incorrect!")
        } //end of bcrypt.compare()
      } //end of User exists i.e. results.length==0
    }) //end of connection.query()
  }) //end of db.connection()
};
module.exports.login = login;

const auth = async function (req, res) {
  console.log("enter auth")
  const token = req.body.accessToken
  if (token != null) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
      if (err) {
        res.json({ message: "session timeout" })
      } else {
        res.json({ message: "ok" })
      }
    })
  }
};
module.exports.auth = auth;
const getDetail = async function (req, res) {
  console.log("enter get detail")
  const id=req.body.userid
  console.log(id)
  dbConnect.getConnection(async (err, connection) => {
    if (err) console.log(err)
    const sqlgetDetail= "SELECT * FROM user WHERE id = ?"
    const search_query = mysql.format(sqlgetDetail, [id])

    await connection.query(search_query, async (err1, result) => {
      if (err1) console.log(err1)
      if (result.length === 0) {
        res.status(200).send("User does not exist error happen")
      } else {
        console.log(result)
        res.status(200).send(result)
      } //end of User exists i.e. results.length==0
      connection.release()
    }) //end of connection.query()
  }) //end of db.connection()

};
module.exports.getDetail = getDetail;

const userpolicies = async function (req, res) {
  console.log("enter policies")
  const id=req.body.userid
  console.log(id)
  dbConnect.getConnection(async (err, connection) => {
    if (err) console.log(err)
    const sqlGetPolicies= "SELECT * FROM policies WHERE user_id = ?"
    const search_query = mysql.format(sqlGetPolicies, [id])

    await connection.query(search_query, async (err1, result) => {
      if (err1) console.log(err1)
      if (result.length === 0) {
        res.status(200).send("User do not have any policies")
      } else {
        console.log(result)
        res.status(200).send(result)
      } //end of User exists i.e. results.length==0
    }) //end of connection.query()
  }) //end of db.connection()

};
module.exports.userpolicies = userpolicies;

const addpolicies = async function (req, res) {
  console.log("enter add policies")
  const product=req.body.product
  const type=req.body.type
  const company=req.body.company
  const id=req.body.id
  console.log(id)
  dbConnect.getConnection(async (err, connection) => {
    if (err) console.log(err)
    const sqlAddPolicies= "INSERT INTO policies (policies_name,user_id,policies_type,policies_company) VALUE (?,?,?,?)"
    const insert_query = mysql.format(sqlAddPolicies, [product,id,type,company])

    await connection.query(insert_query, async (err1, result) => {
      if (err1) console.log(err1)
        
      res.status(200).send("Success")
      connection.release()
    }) //end of connection.query()
  }) //end of db.connection()

};
module.exports.addpolicies = addpolicies;