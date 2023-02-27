import {client} from "../db.js"
import { ObjectId } from "../db.js";

export function getStudents(req) {
   return client
    .db("guvi")
    .collection("students")
    .find(req.query)
    .toArray() 
}

export function getStudenteByParams(id){
   return client
    .db("guvi")
    .collection("students")
    .findOne({_id :new ObjectId(id)})
}

export function addStudent(data) {
  return client
 .db("guvi")
 .collection("students")
 .insertOne(data)
}

export function editStudents(id, updateStudent){
    return client
    .db("guvi")
    .collection("students")
    .findOneAndUpdate({_id: new ObjectId(id)}, {$set:updateStudent})
}

export function deleteStudent(id){
    return client
    .db("guvi")
    .collection("students")
    .deleteOne({_id:new ObjectId(id)})
}

export function addBulckStudents(data) {
    return client
    .db("guvi")
    .collection("students")
    .insertMany(data)
}
