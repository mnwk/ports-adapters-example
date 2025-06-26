import {Asset} from "./asset";
import {Device, DeviceDto} from "./device";
import {AssetType} from "./asset-type";

test("can be created with name, device and type", () => {
    const asset = Asset.createBaseAsset({
        name: "Asset",
        devices: [new DeviceDto("1", "Device")],
        type: AssetType.MOTOR_UNIT,
        idFactory: () => "1111-2222-3333-4444"
    });
    expect(asset.name).toBe("Asset");
    expect(asset.devices[0].name).toBe("Device");
    expect(asset.devices[0].id).toBe("1");
    expect(asset.id).toBe("1111-2222-3333-4444")
});

test("can't be created without devices", () => {
    expect(() => Asset.createBaseAsset({
        name: "Asset",
        devices: [],
        type: AssetType.MOTOR_UNIT,
        idFactory: () => "1111-2222-3333-4444"
    })).toThrow("Asset must have at least one device");
});

test("devices are immutable", () => {
    const asset = Asset.createBaseAsset({
        name: "Asset",
        devices: [new DeviceDto("1", "Device")],
        type: AssetType.MOTOR_UNIT,
        idFactory: () => "1111-2222-3333-4444"
    });
    const device = asset.devices[0] as any;
    device.name = "New Name";
    expect(asset.devices[0].name).toBe("Device");
});

test("can set an Organization", () => {
    const asset = Asset.createBaseAsset({
        name: "Asset",
        devices: [new DeviceDto("1", "Device")],
        type: AssetType.MOTOR_UNIT,
        idFactory: () => "1111-2222-3333-4444"
    });
    asset.assignOrganization("1");
    expect(asset.organization!.id).toBe("1");

});

test("Organization is immutable", () => {
    const asset = Asset.createBaseAsset({
        name: "Asset",
        devices: [new DeviceDto("1", "Device")],
        type: AssetType.MOTOR_UNIT,
        idFactory: () => "1111-2222-3333-4444"
    });
    asset.assignOrganization("1");
    const organization = asset.organization as any;
    organization.name = "New Name";
});

test("can add assigned component to device", () => {
    const asset = Asset.createBaseAsset({
        name: "Asset",
        devices: [new DeviceDto("1", "Device")],
        type: AssetType.MOTOR_UNIT,
        idFactory: () => "1111-2222-3333-4444"
    });
    asset.assignComponentToDevice("1", "Component");
    expect(asset.devices[0].assignedComponent!.name).toBe("Component");
});