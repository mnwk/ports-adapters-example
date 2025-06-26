import {Asset} from "../../entities/asset/asset";

interface AssignOrganizationPropsBase {
    assetId: string;
}

export type AssignOrganizationProps =
    | (AssignOrganizationPropsBase & { organizationId: string; organizationName?: never })
    | (AssignOrganizationPropsBase & { organizationId?: never; organizationName: string });

export interface AssignOrganizationInterface {
    assignOrganizationToAsset(props: AssignOrganizationProps): Promise<Asset>;
}