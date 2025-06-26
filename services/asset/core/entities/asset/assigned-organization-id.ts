// an object to showcase DDD ValueObject
export class AssignedOrganizationId {
    constructor(
        private _id: string,
    ) {
    }

    get id(): string {
        return this._id;
    }

}