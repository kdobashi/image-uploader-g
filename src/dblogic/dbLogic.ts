export class DbLogic {

    // インスタンス
    private static _instance: DbLogic;

    public dbVersion: number = 2;
    public tableName: string = 'image';
    public dbName: string = 'sampleDBtest';
    public count: number = 0;
    private db!: IDBDatabase;

    // インスタンスの取得
    public static getInstance(): DbLogic {
        // インスタンスがない場合のみ新しくnewする
        if(!this._instance) this._instance = new DbLogic();
        return this._instance;
    }
    
    private constructor() {
        this.open();
    }
    
    private open(): Promise<string> {
        console.log('open処理発火');
        return new Promise<string>((resolve, reject) => {
            //promise objの中で実際の処理をする
                //　DB名を指定して接続
            var openReq = indexedDB.open(this.dbName, this.dbVersion);
            // 接続に失敗
            openReq.onerror = (event) => {
                console.log(event);
                reject('DB接続失敗');
            }

            //DBのバージョン更新(DBの新規作成も含む)時のみ実行
            openReq.onupgradeneeded = (event) => {
                this.db = (event.target as IDBRequest).result;
                const objectTable = this.db.createObjectStore(this.tableName, { keyPath: 'id' })
                objectTable.createIndex("id", "id", { unique: true });
                objectTable.createIndex("imageBinary", "imageBinary", { unique: false });
                console.log('DB接続時スキーマアップデート');
            }
            //onupgradeneededの後に実行。更新がない場合はこれだけ実行`
            openReq.onsuccess = (event) => {
                this.db = (event.target as IDBRequest).result;
                var table = this.createTransaction(AccessModeEnum.ReadOnly);
                var getReq = table.getAll();

                getReq.onsuccess = (event) => {
                    // 取得したデータがundefinedだったら0をセット
                    // でーたがあれば++
                    resolve('テーブル作成完了');
                }
            }
        });
    }

    update(imgObject: ImgObject): Promise<string> {
        return new Promise<string> ((resolve, reject) => {
            var table = this.createTransaction(AccessModeEnum.ReadWrite);
            var putReq = table.put({
                id: imgObject.key,
                imageBinary: imgObject.imageBinary,
            });
            console.log(imgObject.imageBinary);
    
            putReq.onsuccess = (event) => {
                console.log('更新成功');
                resolve('更新成功');
            };

            putReq.onerror = () => {
                console.log('更新失敗');
                reject('更新失敗');
            }
        })
    }

    getSingle(key: string) : Promise<ImgObject> {
        return new Promise<ImgObject> ((resolve, reject) => {
            var table = this.createTransaction(AccessModeEnum.ReadOnly);
            var readReq = table.get(key);
            readReq.onsuccess = (event) => {
                resolve(readReq.result as ImgObject);
            }
            readReq.onerror = (event) => {
                reject(null);
            }
        })
    }

    getMultiple(keys: Array<string>) : Promise<Array<ImgObject>> {
        return new Promise<Array<ImgObject>> ((resolve, reject) => {
            var returnObj = new Array<ImgObject>();
            keys.map(k => {
                this.getSingle(k).then((result) => {
                    returnObj.push(result);
                }).catch(() => {
                    reject('存在しない写真が選択されました');
                });
            })
            resolve(returnObj);
        })
    }

    getAll() : Promise<Array<ImgObject>> {
        return new Promise<Array<ImgObject>> ((resolve, reject) => {
            var table = this.createTransaction(AccessModeEnum.ReadOnly);
            var readReq = table.getAll();
            readReq.onsuccess = (event) => {
                resolve(readReq.result as Array<ImgObject>); 
            }
            readReq.onerror = (event) => {
                reject( new Array<ImgObject>() );
            }
        })
    }

    // delete(key: string) : any {

    // }

    createTransaction(mode: AccessModeEnum) : IDBObjectStore {
        var trans = this.db.transaction(this.tableName, mode);
        var table = trans.objectStore(this.tableName);
        return table;
    }
}

// DBアクセスモード
enum AccessModeEnum {
    ReadOnly = 'readonly',
    ReadWrite = 'readwrite',
    VersionChange= 'versionchange',
}

export type ImgObject ={
    key: string,
    imageBinary: string,
}

