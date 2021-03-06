import { DbLogicSuper, TableInfo, IndexInfo } from './dbLogicSuper';

const dbVersion: number = 1; 
const dbName: string = 'imageUploader';
const tableName: string = 'image';

const objStoreInfo: IDBObjectStoreParameters = {
    keyPath: 'id',
    autoIncrement: false,
}

const indexesInfo: Array<IndexInfo> = [
    { name: 'id', keyPath: 'id', options: {unique: true}},
    { name: 'image', keyPath: 'imageBinary', options: {unique: false}},
    { name: 'date', keyPath: 'date', options: {unique: false}},
    { name: 'amount', keyPath: 'amount', options: {unique: false}},
    { name: 'note', keyPath: 'note', options: {unique: false}},
]

export type ImgObject ={
    id: string,
    imageBinary: string,
    date: Date | null,
    amount: string | null,
    note: string | null,
}

export class ImageDbLogic extends DbLogicSuper {

    // インスタンス
    private static _instance: ImageDbLogic;

    // インスタンスの取得
    public static getInstance(): ImageDbLogic {
        // インスタンスがない場合のみ新しくnewする
        if(!this._instance) this._instance = new ImageDbLogic();
        return this._instance;
    }
    
    private constructor() {
        super(new TableInfo(dbVersion, dbName, tableName, objStoreInfo, indexesInfo));
    }
}



