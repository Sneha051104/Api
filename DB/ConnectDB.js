const mongoose = require('mongoose')



const connectDb= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_LIVE_URL)
      //  await mongoose.connect(process.env.liveMongodb_url)
        console.log("Mongo DB Connect")

    }catch(error){
        console.log(error)
    }
}
module.exports = connectDb