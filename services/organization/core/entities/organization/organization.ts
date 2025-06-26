export class Organization {

    constructor(
        private _id: string,
        private _name: string,
        private _someOrgaServiceOnlyAttribute: string // just here to indicate that this entity is different from the one in /assets
    ) {
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get someOrgaServiceOnlyAttribute(): string {
        return this._someOrgaServiceOnlyAttribute;
    }

}