import {Asset} from "../../core/entities/asset";
import {AssetRepositoryInterface} from "../../core/ports/driven/asset-repository-interface";
import * as fs from 'fs/promises';
import * as path from "node:path";

export class FileAssetRepository implements AssetRepositoryInterface {
    constructor(private _storagePath: string) {
    }

    async storeAsset(asset: Asset): Promise<void> {
        const filePath = path.join(this._storagePath, `asset-${asset.id}.json`);
        const data = JSON.stringify(this.toPersistence(asset), null, 2);
        await fs.writeFile(filePath, data, 'utf8');

    }

    async loadAsset(assetId: string): Promise<Asset> {
        const filePath = path.join(this._storagePath, `asset-${assetId}.json`);
        const data = await fs.readFile(filePath, 'utf8');
        const parsed = JSON.parse(data);
        return this.fromPersistence(parsed);
        // todo: error handling
    }

    private toPersistence(asset: Asset): any {
        return {
            id: asset.id,
            name: asset.name,
            type: asset.type,
            organization: asset.organization ? asset.organization.id : undefined,
            devices: asset.devices,
        };
    }

    private fromPersistence(data: any): Asset {
        return Asset.createBaseAsset({
            idFactory: () => data.id,
            name: data.name,
            type: data.type,
            devices: data.devices,
        });
    }

}
