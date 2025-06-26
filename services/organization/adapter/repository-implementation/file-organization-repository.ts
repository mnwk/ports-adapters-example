import * as fs from 'fs/promises';
import * as path from 'path';
import {Organization} from "../../core/entities/organization";
import {OrganizationRepositoryInterface} from "../../core/ports/driven/organization-repository-interface";

export class FileOrganizationRepository implements OrganizationRepositoryInterface {
    private storagePath: string;

    constructor(storagePath: string) {
        this.storagePath = storagePath;
    }

    async storeOrganization(organization: Organization): Promise<void> {
        const filePath = path.join(this.storagePath, `orga-${organization.id}.json`);
        const data = JSON.stringify({
            id: organization.id,
            name: organization.name,
            someOrgaServiceOnlyAttribute: organization.someOrgaServiceOnlyAttribute
        }, null, 2);

        await fs.writeFile(filePath, data, 'utf8');
    }

    async findOrganizationById(organizationId: string): Promise<Organization> {
        const filePath = path.join(this.storagePath, `orga-${organizationId}.json`);
        const data = await fs.readFile(filePath, 'utf8');
        const parsed = JSON.parse(data);
        return new Organization(parsed.id, parsed.name, parsed.someOrgaServiceOnlyAttribute);
        // todo: error handling
    }
}