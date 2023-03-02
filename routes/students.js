import express from "express"
import { addBulckStudents, addStudent, deleteStudent, editStudents, getStudenteByParams, getStudents } from "../controllers/students.js";
import jwt from "jsonwebtoken"
import { getUserById } from "../controllers/users.js";




const router = express.Router(); 
// parameter functions 
router.get("/:id", async(req, res)=>{
    const {id} = req.params; 
    try {
        const student = await getStudenteByParams(id)
        if (!student) {
            res.status(400).json({data:"User not Found"})
            return
        } 
        res.status(200).json({data : student})  
    } catch (error) {
        console.log(error); 
        res.status(500).json({data : "Internal Server Error"})
    }
})

// ussing query params
router.get("/", async (req, res)=>{
    // query conditions
    if (req.query.age){
        req.query.age = +req.query.age;
    }
    try {

        const token = req.headers["x-auth-token"];
        console.log(token)
        jwt.verify(token, process.env.SECRET_KEY)
            //data retrival from database 
        const studentsData =  await getStudents(req)

    if (studentsData.length<=0) {
        res.status(404).json({data:"No Content available"})
        return
    }
    res.status(200).json({data:studentsData})
        
    } catch (error) {
        console.log("error : ", error)
        res.status(500).json({data:"Internal server error"})
    }
})

router.post("/", async (req, res)=>{
    try {
        const newData = req.body; 
        if (!newData) {
            res.status(400).json({data:"No content Provided"})
            return
        }
        const result = await addStudent(newData)
        res.status(201).json({data:"Data Added successfully"})  
    } catch (error) {
        console.log("error : ", error)
        res.status(500).json({data:"Internal server error"})
        
    }
})


router.put("/:id", async(req, res)=>{
    const {id} = req.params
    try {
        const updatedStudent = await req.body
         const result = await editStudents(id, updatedStudent)
         res.status(200).json({data:"Edited Successfully"})
        
    } catch (error) {
        console.log("error : ", error)
        res.status(500).json({data:"Internal server error"})
    }
})

router.delete("/:id", async(req, res)=>{
    const {id} = req.params
    try {
        const result = await deleteStudent(id)
        res.status(201).json({data:"Deleted Successfully"})    
    } catch (error) {
        console.log("error : ", error)
        res.status(500).json({data:"Internal server error"})
    }
})
//post many
router.post("/many", async(req, res)=>{
    const bulkData = req.body
     try {
        const result = await addBulckStudents(bulkData)
        res.status(201).json({data:"Added bulck data"})
     } catch (error) {
        console.log("error : ", error)
        res.status(500).json({data:"Internal server error"})
     }

})


export const studentsRouter = router