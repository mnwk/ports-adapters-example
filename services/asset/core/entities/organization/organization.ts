// now only represents what is needed for in asset service
export class Organization {
    constructor(
        private _id: string,
        private _name: string
    ) {
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

}