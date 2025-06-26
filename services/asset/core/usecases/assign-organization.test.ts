import {AssignOrganization} from "./assign-organization";
import {Asset, AssetType, Device} from "../entities/asset";
import {Organization} from "../entities/organization";


test("assign a new organization to an asset", async () => {
    const assetMock = Asset.createBaseAsset({
        name: "Asset",
        devices: [new Device("1", "Device")],
        type: AssetType.MOTOR_UNIT
    });

    const assetRepository = {
        loadAsset: jest.fn().mockResolvedValue(assetMock),
        storeAsset: jest.fn().mockImplementation((asset) => Promise.resolve()),
    }

    const organizationRepository = {
        loadOrganization: jest.fn(),
        createOrganization: jest.fn().mockImplementation((asset) => Promise.resolve(new Organization('111-222-333-444', 'MyNewOrga'))),
    }

    const usecase = new AssignOrganization(
        assetRepository,
        organizationRepository
    );

    const result = await usecase.assignOrganizationToAsset({
        assetId: "1",
        organizationName: "MyNewOrga"
    });

    expect(result.organization?.id).toBe("111-222-333-444");
    expect(assetRepository.storeAsset).toHaveBeenCalledTimes(1);
    expect(organizationRepository.createOrganization).toHaveBeenCalledTimes(1);
});

test("assign existing organization to an asset", async () => {
    const assetMock = Asset.createBaseAsset({
        name: "Asset",
        devices: [new Device("1", "Device")],
        type: AssetType.MOTOR_UNIT
    });

    const assetRepository = {
        loadAsset: jest.fn().mockResolvedValue(assetMock),
        storeAsset: jest.fn().mockImplementation((asset) => Promise.resolve()),
    }

    const organizationRepository = {
        loadOrganization: jest.fn().mockResolvedValue(new Organization("1234567890", "MyOldOrga")),
        createOrganization: jest.fn()
    }

    const usecase = new AssignOrganization(
        assetRepository,
        organizationRepository
    );

    const result = await usecase.assignOrganizationToAsset({
        assetId: "1",
        organizationId: "1234567890"
    });

    expect(result.organization?.id).toBe("1234567890");
    expect(assetRepository.storeAsset).toHaveBeenCalledTimes(1);
});

test("Have to pass OrgaId or Name", async () => {

    const assetRepository = {
        loadAsset: jest.fn(),
        storeAsset: jest.fn(),
    }

    const organizationRepository = {
        loadOrganization: jest.fn(),
        createOrganization: jest.fn()
    }

    const usecase = new AssignOrganization(
        assetRepository,
        organizationRepository
    );

    const brokenProps = {
        assetId: "1",
    } as any;

    await expect(
        () => usecase.assignOrganizationToAsset(brokenProps)
    ).rejects.toThrow("No Organization provided");
});
