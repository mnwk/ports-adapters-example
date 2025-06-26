import {FileAssetRepository} from "../services/asset/adapter/repository-implementation/file-asset-repository";
import {CreateMotor} from "../services/asset/core/usecases/create-motor";
import {AssignOrganization} from "../services/asset/core/usecases/assign-organization";
import {LambdaController} from "../services/asset/adapter/lambda/lambda-controller";
import {HttpOrganizationGateway} from "../services/asset/adapter/http-gateways/http-organization-gateway";

export function getController(): LambdaController {

    const orgaServiceGateway = new HttpOrganizationGateway(
        'http://localhost',
        '3000'
    )
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