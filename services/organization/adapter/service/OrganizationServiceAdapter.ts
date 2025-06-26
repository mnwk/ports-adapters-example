import {CreateOrganizationInterface} from "../../core/ports/driver/create-organization-interface";
import {LoadOrganizationInterface} from "../../core/ports/driver/load-organization-interface";

export interface OrganizationDto {
    name: string;
    id: string;
}

export class OrganizationServiceAdapter {
    constructor(
        private _createOrganization: CreateOrganizationInterface,
        private _getOrganization: LoadOrganizationInterface,
    ) {
    }

    async createOrganization(name: string): Promise<OrganizationDto> {

        const newOrga = await this._createOrganization.createOrganization(name);
        return {
            // important to return a DTO of atomics here
            // !!! cut every reference to objects
            // also look for deep references
            // if in doubt use structuredClone or hacky json.parse(json.stringify(obj))
            name: newOrga.name,
            id: newOrga.id
        };
    }

    async getOrganization(name: string): Promise<OrganizationDto> {
        const orga = await this._getOrganization.loadOrganization(name);
        return {
            // important to return a DTO of atomics here
            // !!! cut every reference to objects
            // also look for deep references
            // if in doubt use structuredClone or hacky json.parse(json.stringify(obj))
            name: orga.name,
            id: orga.id
        };
    }
}