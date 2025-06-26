import {CreateMotor} from "./create-motor";
import {Device} from "../entities/asset";

test("create new motor", async () => {
    const assetRepositoryMock = {
        storeAsset: jest.fn().mockImplementation((asset) => Promise.resolve()),
        loadAsset: jest.fn().mockRejectedValue(new Error("should not be used"))
    }

    const usecase = new CreateMotor(assetRepositoryMock);
    const newAssetId = await usecase.createMotor(
        {
            name: "Asset",
            devices: [new Device("1", "Device")]
        }
    );
    expect(newAssetId).toBeDefined();
    expect(assetRepositoryMock.storeAsset).toHaveBeenCalledTimes(1);
});