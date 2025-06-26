import {Asset, AssetType, Device} from "../../core/entities/asset";
import {LambdaController} from "./lambda-controller";

test('create motor', async () => {
    const createMotorUseCaseMock = {
        createMotor: jest.fn().mockResolvedValue("1")
    }
    const assignOrganizationUseCaseMock = {
        assignOrganizationToAsset: jest.fn().mockRejectedValue(new Error("not implemented"))  // ugly mock problem, would be solved with proper DI framework
    }
    const requestMock = {
        body: {
            name: "Asset",
            defaultDeviceName: "Device",
            defaultDeviceId: "1"
        }
    }

    const resultMock = {
        send: jest.fn()
    };

    const controller = new LambdaController(
        createMotorUseCaseMock,
        assignOrganizationUseCaseMock
    );

    const result =  await controller.createMotor(requestMock);
    expect(createMotorUseCaseMock.createMotor).toHaveBeenCalledTimes(1); // todo: really weak test
});

test('save assign orga by name', async () => {
    const createMotorUseCaseMock = {
        createMotor: jest.fn().mockRejectedValue(new Error("not implemented")) // ugly mock problem, would be solved with proper DI framework
    }
    const assignOrganizationUseCaseMock = {
        assignOrganizationToAsset: jest.fn().mockResolvedValue(
            Asset.createBaseAsset(
                {
                    name: "Asset",
                    devices: [new Device("1", "Device")],
                    type: AssetType.MOTOR_UNIT
                }
            )
        )
    }

    const requestMock = {
        body: {
            assetId: "assetId",
            organizationName: "orga"
        }
    }

    const controller = new LambdaController(
        createMotorUseCaseMock,
        assignOrganizationUseCaseMock
    );

    await controller.saveOrgaRelation(requestMock);
    expect(assignOrganizationUseCaseMock.assignOrganizationToAsset).toHaveBeenCalledTimes(1);
});
