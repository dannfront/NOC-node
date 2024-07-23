import { PrismaClient } from "@prisma/client";
import { env } from "./config/plugins/env.plugins";
import { MongoDataBase } from "./data/mongo/init";
import { Server } from "./presentation/server";


// console.log(env);

(()=>{
    main()
})()

async function main(){
    await MongoDataBase.connect({
        mongoUrl:env.MONGO_URL,
        dbName:env.MONGO_DB_NAME
    })

    const prisma = new PrismaClient()

    // await prisma.logModel.create({
    //     data:{
    //         level:"HIGH",
    //         message:"test prisma",
    //         origtin:"app.ts"
    //     }
    // })
    // const logs = await prisma.logModel.findMany({
    //     where:{
    //         level:"HIGH"
    //     }
    // })
    // console.log(logs);
    
    Server.start()
}