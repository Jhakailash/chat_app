const mongoose = require('mongoose');

const connection = () =>{
    mongoose.connect(`mongodb+srv://arjun:arjun@cluster0.yv7wj4c.mongodb.net/?retryWrites=true&w=majority`).then(() =>{
        console.log({msg : "Connection Successfully!"})
    }).catch((error) =>{
        console.log({msg : "Connection Failed!", error})
    })
}
module.exports = {
    connection
}