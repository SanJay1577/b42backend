const express = require("express");
const {MongoClient} = require("mongodb")
const fs = require("fs")
const app = express();
const path = require("path")

const currentDir = path.join(__dirname, "express"); 
console.log(currentDir)

const secret = "hey i'm from new file"

fs.writeFile(`${currentDir}/sum.txt`,secret, (err)=>{
    if(err){
        console.log(err)
    }else {
        console.log("file created")
    }
} )
//Mongo Db Connection 

const MONGO_URL = "mongodb://127.0.0.1:27017/guvi"

async function createConnection(){
 const client = new MongoClient(MONGO_URL)
 await client.connect(); 
 console.log("Mongodb is succesfuly connected")
 return client
}

const client = createConnection();





app.use(express.static("express")); // loading the static file
app.use(express.json()) // middleware tells server to use json

app.get("/static", (req, res)=>{
    res.sendFile(path.join(__dirname, "express/sum.txt"))
})

const students = [
    {
     "name": "Sharmila ",
     "batch": "B42 WD Tamil",
     "gender": "female",
     "yearsOfExperience": "2",
     "id": "5"
    },
    {
     "name": "Sanjay",
     "batch": "B42WD",
     "gender": "male",
     "yearsOfExperience": "yearsOfExperience 6",
     "id": "6",
     "experience": "2",
     "fullWidth": "n"
    },
    {
     "name": "raja",
     "batch": "manthiri",
     "gender": "male",
     "yearsOfExperience": "yearsOfExperience 7",
     "id": "7",
     "experience": "1"
    }
   ]

app.get("/", (req, res)=>{
   res.send("Hello i'm working fine")
})

// parameters 
app.get("/students/:id", async(req, res)=>{
    const {id} = req.params; 
    console.log(req.params)
    const student = await (await client)
    .db("guvi")
    .collection("students")
    .findOne({_id :id})
    res.status(200).send(student)
})


//using query http://localhost:9000/students?gender=male

app.get("/students", async (req, res)=>{
    console.log(req.query)
    // query conditions
    if (req.query.age){
        req.query.age = +req.query.age;
    }
    //data retrival from database 
     const studentsData =  await (await client)
    .db("guvi")
    .collection("students")
    .find(req.query)
    .toArray() // to return all data from an array 
    res.status(200).json(studentsData)
})

app.post("/students", async (req, res)=>{
 const newData = req.body; 
 const result = await (await client)
 .db("guvi")
 .collection("students")
 .insertOne(newData)
 res.status(201).send(result)
})

app.put("/students/:id", (req, res)=>{
    const {id} = req.params
    const editStudent = students.find((stud)=>stud.id === id); 
    editStudent.name = req.body.name,
    editStudent.batch= req.body.batch,
    editStudent.gender= req.body.gender,
    editStudent.yearsOfExperience= req.body.yearsOfExperience,
    editStudent.id= req.body.id,
    res.send(students)
})


app.delete("/students/:id", (req, res)=>{
   
})


app.listen(9000, ()=>console.log(`server started localhost:9000`))