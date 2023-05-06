// import { findAll } from "../controller/controller.js"
// const { reg } = require("../controller/testcontroller")
const controller = require("../controller/controller.js")
const Router = require("express").Router()
//const { validateUsername, validatePassword, validateEmail, validatespace, validateappname, validateplan } = require("../controller/validate")

Router.route("/signup").post(controller.signup)
Router.route("/update").post(controller.update)
Router.route("/auth").post(controller.auth)
Router.route("/login").post(controller.login)
Router.route("/getDetail").post(controller.getDetail)
Router.route("/userpolicies").post(controller.userpolicies)
Router.route("/addpolicies").post(controller.addpolicies)
module.exports = Router