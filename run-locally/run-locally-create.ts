import {handler as addMotor} from "../app-lambda/lambda-motor-create-new";

async function run(){
 await addMotor({
     body: {
         name: "Asset",
         defaultDeviceName: "Device",
         defaultDeviceId: "1"
     }
 })
}

run().then(() => console.log("done"));