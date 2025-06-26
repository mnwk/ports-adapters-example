import {Organization} from "../entities/organization";
import {OrganizationRepositoryInterface} from "../ports/driven/organization-repository-interface";
import {LoadOrganizationInterface} from "../ports/driver/load-organization-interface";

export class LoadOrganization implements LoadOrganizationInterface{
    constructor(
        private _organizationRepository: OrganizationRepositoryInterface
    ) {
    }

    async loadOrganization(id: string): Promise<Organization> {
        // add authorization checks for row level access here
        return await this._organizationRepository.findOrganizationById(id);
    }
}