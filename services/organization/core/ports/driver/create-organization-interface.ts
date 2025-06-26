import {Organization} from "../../entities/organization";

export interface CreateOrganizationInterface {
    createOrganization(name: string): Promise<Organization>
}