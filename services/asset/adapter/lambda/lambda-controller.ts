import {DeviceDto} from "../../core/entities/asset";
import {CreateMotorInterface} from "../../core/ports/driver/create-motor-interface";
import {AssignOrganizationInterface} from "../../core/ports/driver/assign-organization-interface";

export class LambdaController {
    constructor(
        private _createMotorPort: CreateMotorInterface,
        private _assignOrgaPort: AssignOrganizationInterface
    ) { // could also see usecase class as a "port" but for consistency we strictly use ports in this example
    }

    // @ts-ignore
    async createMotor(req): Promise<string> { // very loosely coupled here, should be defined (lazy me)
        const asset = req.body;
        const assetName = asset.name;
        const defaultDeviceName = asset.defaultDeviceName;
        const defaultDeviceId = asset.defaultDeviceId;


        const result = await this._createMotorPort.createMotor({
            name: assetName,
            devices: [new DeviceDto(defaultDeviceId, defaultDeviceName)], // device dto could be defined in core/usecases as well for better decoupling
        })
        return result;
    }

    // @ts-ignore
    async saveOrgaRelation(req): Promise<string> { // again very loosely coupled here, should be defined ( still lazy me)
        const relation = req.body;
        const assetId = relation.assetId;
        const organizationName = relation.organizationName;

        const result = await this._assignOrgaPort.assignOrganizationToAsset({
            assetId: assetId, organizationName: organizationName
        });
        return result.id;
    }
}