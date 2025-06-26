import {DeviceDto} from "../../entities/asset/device";

export interface CreateMotorProps {
    name: string;
    devices: DeviceDto[];
}

export interface CreateMotorInterface {
    createMotor(assetProps: CreateMotorProps): Promise<string>;
}