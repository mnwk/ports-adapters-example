import {Organization} from "../../core/entities/organization";
// IMPORTANT: ONLY IMPORTS FROM
// organization/adapter/service/OrganizationServiceAdapter
// not entities, usecases, whatsoever
import {OrganizationServiceAdapter} from "../../../organization/adapter/service/OrganizationServiceAdapter";
import {OrganizationServiceInterface} from "../../core/ports/driven/organization-service-interface";

export class ServiceOrganizationGateway implements OrganizationServiceInterface {

    constructor(private serviceAdapter: OrganizationServiceAdapter) {
    }

    async createOrganization(organizationName: string): Promise<Organization> {
        const result = await this.serviceAdapter.createOrganization(organizationName);
        return new Organization(result.id, result.name);
    }

    async loadOrganization(organizationId: string): Promise<Organization> {
        const result = await this.serviceAdapter.getOrganization(organizationId);
        return new Organization(result.id, result.name);
    }
}