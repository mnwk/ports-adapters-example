import {Organization} from "../../entities/organization/organization";

export interface OrganizationRepositoryInterface {
    storeOrganization(organization: Organization): Promise<void>;
    findOrganizationById(organizationId: string): Promise<Organization>;
}