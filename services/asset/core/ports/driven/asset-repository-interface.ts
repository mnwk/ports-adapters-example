import {Asset} from "../../entities/asset";


export interface AssetRepositoryInterface {
    storeAsset(asset: Asset): Promise<void>;
    loadAsset(assetId: string): Promise<Asset>;
}