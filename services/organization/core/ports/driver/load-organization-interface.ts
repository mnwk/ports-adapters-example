import {Organization} from "../../entities/organization";

export interface LoadOrganizationInterface {
    loadOrganization(id: string): Promise<Organization>
}