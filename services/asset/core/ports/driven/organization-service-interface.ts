import {Organization} from "../../entities/organization";


export interface OrganizationServiceInterface {
    createOrganization(organizationName: string): Promise<Organization>;
    loadOrganization(organizationId: string): Promise<Organization>;
}