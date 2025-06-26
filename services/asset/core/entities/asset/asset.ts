import {AssetType} from "./asset-type";
import {Device, DeviceDto} from "./device";
import {v4} from "uuid";
import {AssignedOrganizationId} from "./assigned-organization-id";

export interface CreateAssetProps {
    name: string;
    devices: DeviceDto[];
    type: AssetType;
    idFactory?: () => string;
}

type CreateBaseAssetProps = CreateAssetProps

export class Asset {


    private _id: string;
    private _devices: Device[];
    private _name: string;
    private _type: AssetType;
    private _organization?: AssignedOrganizationId;

    private constructor(
        props: CreateAssetProps
    ) {
        this._id = props.idFactory ? props.idFactory() : v4();
        this._devices = props.devices.map(dto => new Device(dto.id, dto.name));
        this._name = props.name;
        this._type = props.type;
    }

    static createBaseAsset(createAssetProps: CreateBaseAssetProps): Asset {
        if (createAssetProps.devices.length === 0) {
            throw new Error("Asset must have at least one device");
        }
        return new Asset(createAssetProps);
    }

    assignComponentToDevice(deviceId: string, name: string): void {
        const device = this._devices.find(device => device.id === deviceId);
        if (!device) {
            throw new Error("Device not found");
        }
        device.assignComponent(name);
    }

    assignOrganization(id: string): void {
        this._organization = new AssignedOrganizationId(id);
    }

    get organization(): AssignedOrganizationId | undefined {
        return this._organization;
    }

    get name(): string {
        return this._name;
    }

    get id(): string {
        return this._id;
    }

    get type(): AssetType {
        return this._type;
    }

    get devices(): DeviceDto[] {
        return this._devices.map(device => device.toDto());
    }
}