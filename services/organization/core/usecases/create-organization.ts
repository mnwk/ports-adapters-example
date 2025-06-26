import {Organization} from "../entities/organization";
import {OrganizationRepositoryInterface} from "../ports/driven/organization-repository-interface";
import {v4} from "uuid";
import {CreateOrganizationInterface} from "../ports/driver/create-organization-interface";

export class CreateOrganization implements CreateOrganizationInterface {
    constructor(
        private _organizationRepository: OrganizationRepositoryInterface,
        private _uuidFactory: () => string = () => v4()
    ) {
    }

    async createOrganization(name: string): Promise<Organization> {
        const organization = new Organization(this._uuidFactory(), name, "someOrgaServiceOnlyAttribute");
        // some more business logic here
        await this._organizationRepository.storeOrganization(organization);
        return organization;
    }
}