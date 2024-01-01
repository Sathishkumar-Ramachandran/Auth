import mongoose from 'mongoose';


mongoose.set('strictQuery', true);


const userDB= async()=>{
    const mongoOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 30000, 
      };
    try{
     const Db = await mongoose.connect("mongodb+srv://teamproject:Sathish123@cluster0.wqp3wtc.mongodb.net/?retryWrites=true&w=majority")
     console.log(`connected to the MongoDB Database ${Db.connection.name}`);
    }
    catch(err){
     console.log(err)
     process.exit(1);
    }
}


module.exports = userDB;