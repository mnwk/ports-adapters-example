import {getController} from "./di";

export async function handler(event: any) {
    const controller = getController();
    const id = await controller.createMotor(event);
    return {
        statusCode: 200,
        body: JSON.stringify({
            motorId: id,
            message: `Motor with id: ${id} created.`
        }),
    }
}