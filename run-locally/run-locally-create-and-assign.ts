import {handler as assignOrga} from "../app-lambda/lambda-motor-assign-orga";
import {handler as addMotor} from "../app-lambda/lambda-motor-create-new";

async function run() {
    const motorResult = await addMotor({
        body: {
            name: "MotorA",
            defaultDeviceName: "Device",
            defaultDeviceId: "1"
        }
    })
    const resultObj = JSON.parse(motorResult.body)
    await assignOrga({
        body: {
            assetId: resultObj.motorId,
            organizationName: "New Orga",
        }
    })
}

run().then(() => console.log("done"));