const fs = require("fs");
const os = require("os")
// const [ , , num1,num2, msg, numofFiles] = process.argv;

// const sum = (n1, n2) => n1+n2;
// console.log(sum(+num1, +num2));

// const welcome = (message)=>{
//  console.log(`Hi ${message} welcome to node js`)
// }
// welcome(msg);

///file reading 
fs.readFile("./sample.txt", "utf-8", (err, data)=>{
    if(err) {
        console.log(err)
    } else {
        console.log("file read succesfully")
        console.log(data)
    }
})
const content = "new from file inbuild node package"

// file create a file 
fs.writeFile("./newfile.txt", content, (err)=>{
    if(err){
        console.log(err)
    }else {
        console.log("file written succesfull")
    }
})
const newContent = "\nNew content added"
// update in the existing file 
fs.appendFile("./newfile.txt",newContent, (err)=>{
    if(err){
        console.log(err)
    }else {
        console.log("file updated successfully")
    } 
} )

// delete a file
// fs.unlink("./newfile.txt", (err)=>{
//     if(err){
//     console.log(err)
//     }else {
//         console.log("deleted the file")
//     }
// })

fs.readdir("./newfolder/", (err, data)=>{
    console.log("Directory", data);
})


// process.argv folder = create file five files (loop)

// eg
// backup1.txt
// backup2.txt

// const [,,num] = process.argv


//delete all the files you created in that directory (readdir unink)


// when ever it is required 
// readfileSync(), writefileSync(), appendfileSync()

// date functions
let time = Date.now()
console.log(time)
let date = new Date();
let utc = date.toUTCString();
let today = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();
console.log("date", date)
console.log("utc", utc)
console.log("all functions are :", today, month, year)


// os functions 
 console.log("Os version-------", os.version());
 console.log("Free Memory-------", os.freemem());
 console.log("Total Memory------", os.totalmem());
 console.log("CPU-------", os.cpus());

