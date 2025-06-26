import {AssetRepositoryInterface} from "../ports/driven/asset-repository-interface";
import {Organization} from "../entities/organization";
import {Asset} from "../entities/asset";
import {AssignOrganizationInterface, AssignOrganizationProps} from "../ports/driver/assign-organization-interface";
import {OrganizationServiceInterface} from "../ports/driven/organization-service-interface";

export class AssignOrganization implements AssignOrganizationInterface {
    constructor(
        private _assetRepository: AssetRepositoryInterface,
        private _organizationService: OrganizationServiceInterface
    ) {

    }

    async assignOrganizationToAsset(props: AssignOrganizationProps): Promise<Asset> {

        const asset = await this._assetRepository.loadAsset(props.assetId);
        let organization: Organization;

        if (props.organizationId) {
            organization = await this._organizationService.loadOrganization(props.organizationId);
        } else if (props.organizationName) {
            organization = await this._organizationService.createOrganization(props.organizationName!);
        } else {
            throw new Error("No Organization provided");
        }
        asset.assignOrganization(organization.id);
        await this._assetRepository.storeAsset(asset);
        return asset;
    }
}