import express from "express";
import { Router } from "express";
import {userRegister,userLogin,currentUser,getAllusers} from "../Controllers/userControllers.js";
import { validateToken } from  "../middleware/validateTokenHandler.js";

const router = Router();

router.route("/register").post(userRegister);


router.route("/login").post(userLogin);


router.route("/current").get(validateToken,currentUser);


router.route("/users").get(getAllusers);



export { router } ;