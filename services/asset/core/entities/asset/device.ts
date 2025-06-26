import {AssignedComponent} from "./assigned-component";

export class DeviceDto {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly assignedComponent?: AssignedComponent
    ) {
    }
}

export class Device {

    private _assignedComponent?: AssignedComponent;

    constructor(
        private _id: string,
        private _name: string,
    ) {
    }

    assignComponent(name: string): void {
        this._assignedComponent = new AssignedComponent(name);
    }

    toDto(): DeviceDto {
        return new DeviceDto(this._id, this._name, this._assignedComponent);
    }

    get assignedComponent(): AssignedComponent | undefined {
        return this._assignedComponent;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }
}