import {getController} from "./di";

export async function handler(event: any) {
    const controller = getController();
    const id = await controller.saveOrgaRelation(event);
    return {
        statusCode: 200,
        body: JSON.stringify({
            orgaId: id,
            message: `Orga with with id: ${id} assigned.`
        }),
    }
}