import {Asset, AssetType, DeviceDto} from "../../core/entities/asset";
import path from "node:path";
import {CsvAssetRepository} from "./csv-asset-repository";
import fs from "fs/promises";

jest.mock('fs/promises');

let repository: CsvAssetRepository;
const storagePath = './test-storage';

beforeEach(() => {
    repository = new CsvAssetRepository(storagePath);
    jest.clearAllMocks();
});

test("save asset with one device as csv file",()=>{
    const storagePath = './test-storage';

    const mockAsset = Asset.createBaseAsset({
        idFactory: () => '123',
        name: 'Test Asset',
        type: AssetType.MOTOR_UNIT,
        devices: [new DeviceDto('1', 'Device')],

    });
    const expectedFilePath = path.join(storagePath, 'asset-123.json');
    const expectedSerializedData = "id,name,type,devices\n123,Test Asset,MOTOR_UNIT,1:Device";
    repository.storeAsset(mockAsset);
    expect(fs.writeFile).toHaveBeenCalledWith(
        expectedFilePath,
        expectedSerializedData,
        'utf8');
});

test("save asset with two or more device as csv file",()=>{
    const storagePath = './test-storage';

    const mockAsset = Asset.createBaseAsset({
        idFactory: () => '123',
        name: 'Test Asset',
        type: AssetType.MOTOR_UNIT,
        devices: [new DeviceDto('1', 'DeviceA'),new DeviceDto('2', 'DeviceB')],

    });
    const expectedFilePath = path.join(storagePath, 'asset-123.json');
    const expectedSerializedData = "id,name,type,devices\n123,Test Asset,MOTOR_UNIT,1:DeviceA"+CsvAssetRepository.DEVICE_DELIMITER+"2:DeviceB";
    repository.storeAsset(mockAsset);
    expect(fs.writeFile).toHaveBeenCalledWith(
        expectedFilePath,
        expectedSerializedData,
        'utf8');
});

test("load asset with one device from csv file", async () => {
    const storagePath = './test-storage';
    const expectedFilePath = path.join(storagePath, 'asset-123.json');
    const expectedSerializedData = "id,name,type,devices\n123,Test Asset,MOTOR_UNIT,1:Device";
    
    (fs.readFile as jest.Mock).mockResolvedValue(expectedSerializedData);
    
    const expectedAsset = Asset.createBaseAsset({
        idFactory: () => '123',
        name: 'Test Asset',
        type: AssetType.MOTOR_UNIT,
        devices: [new DeviceDto('1', 'Device')],
    });
    
    const result = await repository.loadAsset('123');
    
    expect(fs.readFile).toHaveBeenCalledWith(expectedFilePath, 'utf8');
    expect(result).toEqual(expectedAsset);
});

test("load asset with two or more device from csv file", async () => {
    const storagePath = './test-storage';
    const expectedFilePath = path.join(storagePath, 'asset-123.json');
    const expectedSerializedData = "id,name,type,devices\n123,Test Asset,MOTOR_UNIT,1:DeviceA" + CsvAssetRepository.DEVICE_DELIMITER + "2:DeviceB";

    (fs.readFile as jest.Mock).mockResolvedValue(expectedSerializedData);

    const expectedAsset = Asset.createBaseAsset({
        idFactory: () => '123',
        name: 'Test Asset',
        type: AssetType.MOTOR_UNIT,
        devices: [new DeviceDto('1', 'DeviceA'),new DeviceDto('2', 'DeviceB')],
    });

    const result = await repository.loadAsset('123');

    expect(fs.readFile).toHaveBeenCalledWith(expectedFilePath, 'utf8');
    expect(result).toEqual(expectedAsset);
});

test("load assets successfully even when the title line in the csv is missing", async () => {
    const storagePath = './test-storage';
    const expectedFilePath = path.join(storagePath, 'asset-123.json');
    const expectedSerializedData = "123,Test Asset,MOTOR_UNIT,1:DeviceA" + CsvAssetRepository.DEVICE_DELIMITER + "2:DeviceB";

    (fs.readFile as jest.Mock).mockResolvedValue(expectedSerializedData);

    const expectedAsset = Asset.createBaseAsset({
        idFactory: () => '123',
        name: 'Test Asset',
        type: AssetType.MOTOR_UNIT,
        devices: [new DeviceDto('1', 'DeviceA'),new DeviceDto('2', 'DeviceB')],
    });

    const result = await repository.loadAsset('123');

    expect(fs.readFile).toHaveBeenCalledWith(expectedFilePath, 'utf8');
    expect(result).toEqual(expectedAsset);
});