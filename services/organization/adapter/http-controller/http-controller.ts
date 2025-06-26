import {CreateOrganizationInterface} from "../../core/ports/driver/create-organization-interface";
import {LoadOrganizationInterface} from "../../core/ports/driver/load-organization-interface";

export interface CreateOrganizationReq {
    name: string;
}

export interface CreateOrganizationRes {
    id: string;
    name: string;
    someOrgaServiceOnlyAttribute: string;
}

export interface LoadOrganizationRes {
    id: string;
    name: string;
    someOrgaServiceOnlyAttribute: string;
}

export interface LoadOrganizationReq {
    organizationId: string;
}

export class HttpController {
    constructor(
        private _createOrganizationPort: CreateOrganizationInterface,
        private _loadOrganizationPort: LoadOrganizationInterface
    ) {

    }

    async createOrganization(request: CreateOrganizationReq): Promise<CreateOrganizationRes> {
        const organization = await this._createOrganizationPort.createOrganization(request.name);
        return {
            id: organization.id,
            name: organization.name,
            someOrgaServiceOnlyAttribute: organization.someOrgaServiceOnlyAttribute
        }
    }

    async loadOrganization(request: LoadOrganizationReq): Promise<LoadOrganizationRes> {
        const organization = await this._loadOrganizationPort.loadOrganization(request.organizationId);
        return {
            id: organization.id,
            name: organization.name,
            someOrgaServiceOnlyAttribute: organization.someOrgaServiceOnlyAttribute
        }
    }
}