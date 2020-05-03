export class DbLogic {

    // インスタンス
    private static _instance: DbLogic;

    public dbVersion: number = 2;
    public storeName: string = 'img';
    public dbName: string = 'sampleDBtest';
    public count: number = 0;
    private db!: IDBDatabase;

    // インスタンスの取得
    public static getInstance(): DbLogic
    {
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
                const objectStore = this.db.createObjectStore(this.storeName, { keyPath: 'id' })
                objectStore.createIndex("id", "id", { unique: true });
                objectStore.createIndex("imageUrl", "imagUrl", { unique: false });
                console.log('DB接続時スキーマアップデート');
            }
            //onupgradeneededの後に実行。更新がない場合はこれだけ実行`
            openReq.onsuccess = (event) => {

                this.db = (event.target as IDBRequest).result;
                var trans_g = this.db.transaction(this.storeName, 'readonly');
                var store_g = trans_g.objectStore(this.storeName);
                var getReq_g = store_g.get(1);

                getReq_g.onsuccess = (event) => {
                    // 取得したデータがundefinedだったら0をセット
                    // でーたがあれば++
                    resolve('テーブル作成完了');
                }
            }
        });
    }

    update(imgObject: ImgObject): Promise<string> {
        return new Promise<string> ((resolve, reject) => {
            var trans = this.db.transaction(this.storeName, "readwrite");
            var store = trans.objectStore(this.storeName);
            var putReq = store.put({
                id: imgObject.key,
                imageUrl: imgObject.url,
            });
            console.log(imgObject.url);
    
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

    get(key: string) : any {
        var returnString = '';
        var trans = this.db.transaction(this.storeName, "readonly");
        var store = trans.objectStore(this.storeName);
        var readReq = store.get(key);
        readReq.onsuccess = (event) => {
            console.log(readReq.result);
            console.log(readReq.result.imageUrl);
            returnString = readReq.result.imageUrl as string;
        }
        return returnString;
    }
}

export type ImgObject ={
    key: string,
    url: string,
}

