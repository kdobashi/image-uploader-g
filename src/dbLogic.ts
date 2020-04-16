export class DbLogic {
    public dbVersion: number = 2;
    public storeName: string = 'img';
    public dbName: string = 'sampleDBtest';
    public count: number = 0;
    private db!: IDBDatabase;
    
    constructor() {
        //　DB名を指定して接続
        var openReq = indexedDB.open(this.dbName, this.dbVersion);
        // 接続に失敗
        openReq.onerror = (event) => {
            console.log('接続失敗');
            console.log(event);
        }

        //DBのバージョン更新(DBの新規作成も含む)時のみ実行
        openReq.onupgradeneeded = (event) => {
            this.db = (event.target as IDBRequest).result;
            const objectStore = this.db.createObjectStore(this.storeName, { keyPath: 'id' })
            objectStore.createIndex("id", "id", { unique: true });
            objectStore.createIndex("imageUrl", "imagUrl", { unique: false });
            console.log('DB更新');
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
                    console.log('テーブル作成完了');
            }
        }
    }
    
    open() {
        
    }

    update(imgObject: ImgObject){
        var trans = this.db.transaction(this.storeName, "readwrite");
        var store = trans.objectStore(this.storeName);
        var putReq = store.put({
            id: imgObject.key,
            imageUrl: imgObject.url,
        })

        putReq.onsuccess = (event) => {
            console.log('更新成功');
        }
    }
}

export type ImgObject ={
    key: string,
    url: string,
}

