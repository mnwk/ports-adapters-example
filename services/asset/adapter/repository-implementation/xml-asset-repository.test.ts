import {Asset} from "../../core/entities/asset";
import {AssetType} from "../../core/entities/asset/asset-type";
import {DeviceDto} from "../../core/entities/asset/device";
import {AssetRepositoryInterface} from "../../core/ports/driven/asset-repository-interface";
import fs from "fs/promises";
import path from "node:path";
import {XmlAssetRepository} from "./xml-asset-repository";

jest.mock("fs/promises");

let repository: AssetRepositoryInterface;
const storagePath = './test-storage';
beforeEach(() => {
    repository = new XmlAssetRepository(storagePath);
    jest.clearAllMocks();
});

test("save asset with one device as xml", () => {

    const asset = Asset.createBaseAsset(
        {
            name: "test",
            idFactory: ()=>'123',
            type: AssetType.CONTROL_UNIT,
            devices: [
                new DeviceDto(
                    '1',
                    'DeviceA'
                )
            ]
        }
    )
    repository.storeAsset(asset);
    const expectedFilePath = path.join(storagePath, 'asset-123.json');
    const expectedXmlFileContentEncoding = "utf8"
    const expectedXmlFileContent = `<?xml version="1.0" encoding="UTF-8"?>
<asset>
    <id>123</id>
    <name>test</name>
    <type>CONTROL_UNIT</type>
    <devices>
        <device>
            <id>1</id>
            <name>DeviceA</name>
        </device>
    </devices>
</asset>`


    expect(fs.writeFile).toHaveBeenCalledWith(expectedFilePath, expectedXmlFileContent, expectedXmlFileContentEncoding);

})

test("save asset with multiple devices as xml", () => {

    const asset = Asset.createBaseAsset(
        {
            name: "test-multi",
            idFactory: ()=>'456',
            type: AssetType.MOTOR_UNIT,
            devices: [
                new DeviceDto('1', 'DeviceA'),
                new DeviceDto('2', 'DeviceB'),
                new DeviceDto('3', 'DeviceC')
            ]
        }
    )
    repository.storeAsset(asset);
    const expectedFilePath = path.join(storagePath, 'asset-456.json');
    const expectedXmlFileContentEncoding = "utf8"
    const expectedXmlFileContent = `<?xml version="1.0" encoding="UTF-8"?>
<asset>
    <id>456</id>
    <name>test-multi</name>
    <type>MOTOR_UNIT</type>
    <devices>
        <device>
            <id>1</id>
            <name>DeviceA</name>
        </device>
        <device>
            <id>2</id>
            <name>DeviceB</name>
        </device>
        <device>
            <id>3</id>
            <name>DeviceC</name>
        </device>
    </devices>
</asset>`
    // Check that writeFile was called with the correct path
    expect(fs.writeFile).toHaveBeenCalledWith(
        expectedFilePath,
        expectedXmlFileContent,
        expectedXmlFileContentEncoding
    );

})

test("load asset from xml file", async () => {
    // Mock the readFile function to return XML data
    const xmlData = `<?xml version="1.0" encoding="UTF-8"?>
<asset>
    <id>789</id>
    <name>test-load</name>
    <type>CONTROL_UNIT</type>
    <devices>
        <device>
            <id>10</id>
            <name>DeviceX</name>
        </device>
        <device>
            <id>20</id>
            <name>DeviceY</name>
        </device>
    </devices>
</asset>`;
    
    (fs.readFile as jest.Mock).mockResolvedValue(xmlData);
    
    // Load the asset
    const asset = await repository.loadAsset('789');
    
    // Verify the asset properties
    expect(asset.id).toBe('789');
    expect(asset.name).toBe('test-load');
    expect(asset.type).toBe(AssetType.CONTROL_UNIT);
    expect(asset.devices.length).toBe(2);
    expect(asset.devices[0].id).toBe('10');
    expect(asset.devices[0].name).toBe('DeviceX');
    expect(asset.devices[1].id).toBe('20');
    expect(asset.devices[1].name).toBe('DeviceY');
})