import {Asset} from "../../core/entities/asset";
import {AssetRepositoryInterface} from "../../core/ports/driven/asset-repository-interface";
import * as fs from 'fs/promises';
import * as path from "node:path";
import {DeviceDto} from "../../core/entities/asset/device";
import {AssetType} from "../../core/entities/asset/asset-type";

export class CsvAssetRepository implements AssetRepositoryInterface {
    static readonly DEVICE_DELIMITER = ';';
    
    constructor(private _storagePath: string) {
    }

    async storeAsset(asset: Asset): Promise<void> {
        const filePath = path.join(this._storagePath, `asset-${asset.id}.json`);
        const csvData = this.toCsv(asset);
        await fs.writeFile(filePath, csvData, 'utf8');
    }

    async loadAsset(assetId: string): Promise<Asset> {
        const filePath = path.join(this._storagePath, `asset-${assetId}.json`);
        const csvData = await fs.readFile(filePath, 'utf8');
        return this.fromCsv(csvData.toString());
    }

    private toCsv(asset: Asset): string {
        // Create a simple CSV format based on the test expectations
        const deviceString = asset.devices.map(device => `${device.id}:${device.name}`).join(CsvAssetRepository.DEVICE_DELIMITER);
        return `id,name,type,devices\n${asset.id},${asset.name},${asset.type},${deviceString}`;
    }

    private fromCsv(csvData: string): Asset {
        // Parse the CSV data
        const lines = csvData.split('\n');
        
        // Get the data line - if there's only one line, use it directly
        // Otherwise, skip the header line and use the second line
        const dataLine = lines.length === 1 ? lines[0] : lines[1];
        
        // Split by comma to get fields
        const [id, name, type, devicesStr] = dataLine.split(',');
        
        // Parse devices
        const devices: DeviceDto[] = [];
        if (devicesStr) {
            const deviceEntries = devicesStr.split(CsvAssetRepository.DEVICE_DELIMITER);
            for (const entry of deviceEntries) {
                const [deviceId, deviceName] = entry.split(':');
                devices.push(new DeviceDto(deviceId, deviceName));
            }
        }
        
        // Create and return the asset
        return Asset.createBaseAsset({
            idFactory: () => id,
            name,
            type: type as AssetType,
            devices
        });
    }
}
