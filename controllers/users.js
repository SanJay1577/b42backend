import {client} from "../db.js"
import { ObjectId } from "../db.js";
import jwt from "jsonwebtoken"; 


export function addUsers(userDetails) {
    return client
     .db("guvi")
     .collection("users")
     .insertOne(userDetails)
 }

 export function getUser(userEmail){
    return client
    .db("guvi")
    .collection("users")
    .findOne({email:userEmail})
 }

 export function getUserById(id){
    return client
    .db("guvi")
    .collection("users")
    .findOne({_id:new ObjectId(id)})
 }

 export function getAllUsers(){
    return client
    .db("guvi")
    .collection("users")
    .find()
    .toArray()
 }

 export function generateToken(id){
    return jwt.sign({id}, process.env.SECRET_KEY, {expiresIn:"30d"})
 }