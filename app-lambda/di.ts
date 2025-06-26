import {
    FileOrganizationRepository
} from "../services/organization/adapter/repository-implementation/file-organization-repository";
import {OrganizationServiceAdapter} from "../services/organization/adapter/service/OrganizationServiceAdapter";
import {CreateOrganization} from "../services/organization/core/usecases/create-organization";
import {LoadOrganization} from "../services/organization/core/usecases/load-organization";
import {ServiceOrganizationGateway} from "../services/asset/adapter/service-gateways/service-organization-gateway";
import {FileAssetRepository} from "../services/asset/adapter/repository-implementation/file-asset-repository";
import {CreateMotor} from "../services/asset/core/usecases/create-motor";
import {AssignOrganization} from "../services/asset/core/usecases/assign-organization";
import {LambdaController} from "../services/asset/adapter/lambda/lambda-controller";

export function getController(): LambdaController {
    const orgaFileRepository = new FileOrganizationRepository('./data/');
    const orgaService = new OrganizationServiceAdapter(
        new CreateOrganization(orgaFileRepository),
        new LoadOrganization(orgaFileRepository)
    )
    const orgaServiceGateway = new ServiceOrganizationGateway(orgaService);

    const fileAssetRepository = new FileAssetRepository('./data/');

    const controller = new LambdaController(
        new CreateMotor(
            fileAssetRepository
        ),
        new AssignOrganization(
            fileAssetRepository,
            orgaServiceGateway
        )
    );
    return controller;
}