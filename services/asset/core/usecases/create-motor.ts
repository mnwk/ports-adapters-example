import {AssetRepositoryInterface} from "../ports/driven/asset-repository-interface";
import {CreateMotorInterface, CreateMotorProps} from "../ports/driver/create-motor-interface";
import {Asset, AssetType} from "../entities/asset";


export class CreateMotor implements CreateMotorInterface {
    constructor(private _assetRepository: AssetRepositoryInterface) {
    }

    async createMotor(assetProps: CreateMotorProps): Promise<string> {
        const motor = Asset.createBaseAsset({
            name: assetProps.name,
            devices: assetProps.devices,
            type: AssetType.MOTOR_UNIT
        });
        await this._assetRepository.storeAsset(motor);
        return motor.id;
    }
}