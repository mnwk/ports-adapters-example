import {Asset, AssetType, DeviceDto} from "../../core/entities/asset";
import * as path from "node:path";
import * as fs from 'fs/promises';

import {FileAssetRepository} from "./file-asset-repository";

jest.mock('fs/promises');


let repository: FileAssetRepository;
const storagePath = './test-storage';
beforeEach(() => {
    repository = new FileAssetRepository(storagePath);
    jest.clearAllMocks();
});

test('save asset', async () => {

    const mockAsset = Asset.createBaseAsset({
        idFactory: () => '123',
        name: 'Test Asset',
        type: AssetType.MOTOR_UNIT,
        devices: [new DeviceDto('1', 'Device')],
    });

    const expectedFilePath = path.join(storagePath, 'asset-123.json');
    const expectedSerializedData = JSON.stringify({
        id: '123',
        name: 'Test Asset',
        type: AssetType.MOTOR_UNIT,
        organization: undefined,
        devices: [new DeviceDto('1', 'Device')],
    }, null, 2);

    await repository.storeAsset(mockAsset);

    expect(fs.writeFile).toHaveBeenCalledWith(
        expectedFilePath,
        expectedSerializedData,
        'utf8'
    );

});

test('load asset', async () => {
    const mockData = JSON.stringify({
        id: '321',
        name: 'Test Asset',
        type: AssetType.MOTOR_UNIT,
        devices: [new DeviceDto('321', 'Test Asset')],
        organization: undefined,
    });

    const expectedFilePath = path.join(storagePath, 'asset-321.json');

    (fs.readFile as jest.Mock).mockResolvedValueOnce(mockData);

    const asset = await repository.loadAsset('321');

    expect(fs.readFile).toHaveBeenCalledWith(expectedFilePath, 'utf8');
    expect(asset).toEqual(
        Asset.createBaseAsset({
            idFactory: () => '321',
            name: 'Test Asset',
            type: AssetType.MOTOR_UNIT,
            devices: [new DeviceDto('321', 'Test Asset')],
        })
    );
});