export class TableInfo {
    public readonly dbVersion: number;
    public readonly dbName: string;
    public readonly tableName: string;
    public readonly objStoreInfo: IDBObjectStoreParameters;
    public readonly indexesInfo: Array<IndexInfo>;
    
    constructor(dbVersion: number, dbName: string, tableName: string, objStoreInfo: IDBObjectStoreParameters, indexesInfo: Array<IndexInfo>){
        this.dbVersion = dbVersion;
        this.dbName = dbName;
        this.tableName = tableName;
        this.objStoreInfo = objStoreInfo;
        this.indexesInfo = indexesInfo;
    }
}

export type IndexInfo = {
    name: string,
    keyPath: string | Iterable<string>, 
    options?: IDBIndexParameters | undefined
}

export abstract class DbLogicSuper {

    private tableInfo: TableInfo;
    private db!: IDBDatabase;
    
    protected constructor(
        tableInfo: TableInfo
    ) {
        this.tableInfo = tableInfo;
    }
    
    protected open (): Promise<IDBDatabase> {
        return new Promise<IDBDatabase>((resolve, reject) => {
            // DB名を指定して接続
            var openReq = indexedDB.open(this.tableInfo.dbName, this.tableInfo.dbVersion);
            
            // 接続に失敗時
            openReq.onerror = (event) => {
                reject(event);
            }

            // DBのバージョン更新(DBの新規作成も含む)時のみ実行
            openReq.onupgradeneeded = (event) => {
                this.db = (event.target as IDBRequest).result;
                const objectTable = this.db.createObjectStore(this.tableInfo.tableName, this.tableInfo.objStoreInfo)
                this.tableInfo.indexesInfo.map(i => {
                    objectTable.createIndex(i.name, i.keyPath, i.options);
                });
                console.log('DB接続時スキーマアップデート');
            }

            // open成功時
            openReq.onsuccess = (event) => {
                var db = (event.target as IDBRequest).result;
                resolve(db);
            }
        });
    }

    putSingle<T> (data: T): Promise<string> {
        return new Promise<string> ((resolve, reject) => {
            this.open()
                .then((db: IDBDatabase) => {
                    var table = db.transaction(this.tableInfo.tableName, AccessModeEnum.ReadWrite).objectStore(this.tableInfo.tableName);
                    var putReq = table.put(data);
                    
                    putReq.onsuccess = () => {
                        resolve('更新成功');
                        db.close();
                    };

                    putReq.onerror = (event) => {
                        reject(event);
                        db.close();
                    };
                })
                .catch((event) => {
                    reject(event);
                })
        })
    }

    // 負荷確認時に途中で止まってしまったため、コメントアウト（400毎写真アップロード時）
    // putMultiple<T> (objects: Array<T>) : Promise<void> {
    //     return new Promise<void> ((resolve, reject) => {
    //         this.open()
    //             .then((db: IDBDatabase) => {
    //                 var table = db.transaction(this.tableInfo.tableName, AccessModeEnum.ReadWrite).objectStore(this.tableInfo.tableName);
    //                 var successNum: number = 0;
    //                 objects.map(o => {
    //                     var putReq = table.put(o);
    //                     putReq.onsuccess = () => {
    //                         successNum++;
    //                         console.log(putReq.result);
    //                         if(successNum == objects.length) resolve(); db.close();
    //                     }

    //                     putReq.onerror = (event) => {
    //                         reject(event);
    //                     }
    //                 })
    //             })
    //             .catch((event) => {
    //                 reject(event);
    //             })
    //     })
    // }

    getSingle<T> (id: string) : Promise<T> {
        return new Promise<T> ((resolve, reject) => {
            this.open()
                .then((db: IDBDatabase) => {
                    var table = this.db.transaction(this.tableInfo.tableName, AccessModeEnum.ReadOnly).objectStore(this.tableInfo.tableName);
                    var readReq = table.get(id);
                    readReq.onsuccess = () => {
                        resolve(readReq.result as T);
                    }
                    readReq.onerror = (event) => {
                        reject(event);
                    }
                    db.close();
                })
                .catch((event) => {
                    reject(event);
                })

        })
    }

    // 400枚の写真を取得したところ、getSingleをループした時と速さが変わらなかったためコメントアウト
    // getSingleForMultiple<T> (id: string, db: IDBDatabase) : Promise<T> {
    //     return new Promise<T> ((resolve, reject) => {
    //         var table = db.transaction(this.tableInfo.tableName, AccessModeEnum.ReadOnly).objectStore(this.tableInfo.tableName);
    //         var readReq = table.get(id);
    //         readReq.onsuccess = () => {
    //             resolve(readReq.result as T);
    //         }
    //         readReq.onerror = (event) => {
    //             reject(event);
    //         }
    //     });
    // }
    // getMultiple<T> (ids: Array<string>) : Promise<Array<T>> {
    //     return new Promise<Array<T>> ((resolve, reject) => {
    //         this.open()
    //             .then((db: IDBDatabase) => {
    //                 var returnObjs = new Array<T>();
    //                 ids.map(i => {
    //                     this.getSingleForMultiple(i, db)
    //                         .then((result) => {
    //                             returnObjs.push(result as T);
    //                             if(returnObjs.length == ids.length) resolve(returnObjs); db.close();
    //                         }).catch((event) => {
    //                             reject(event);
    //                             db.close();
    //                         });
    //                 })
    //             })
    //             .catch((event) => {
    //                 reject(event);
    //             });
    //     });
    // }

    getAll<T> () : Promise<Array<T>> {
        return new Promise<Array<T>> ((resolve, reject) => {
            this.open()
                .then((db: IDBDatabase) => {
                    var table = db.transaction(this.tableInfo.tableName, AccessModeEnum.ReadOnly).objectStore(this.tableInfo.tableName);
                    var readReq = table.getAll();
                    readReq.onsuccess = () => {
                        resolve(readReq.result as Array<T>);
                        db.close();
                    }
                    readReq.onerror = (event) => {
                        reject(event);
                    }
                })
                .catch((event) => {
                    reject(event);
                })
        })
    }

    delete(id: string) : Promise<void> {
        return new Promise<void> ((resolve, reject) => {
            this.open()
                .then((db: IDBDatabase) => {
                    var table = db.transaction(this.tableInfo.tableName, AccessModeEnum.ReadWrite).objectStore(this.tableInfo.tableName);
                    var deleteReq = table.delete(id);
                    deleteReq.onsuccess = () => {
                        resolve();
                        db.close();
                    }
                    deleteReq.onerror = event => {
                        reject(event);
                        db.close();
                    }
                })
                .catch((event) => {
                    reject(event);
                });
        })
    }

    deleteAll() : Promise<void> {
        return new Promise<void> ((resolve, reject) => {
            this.open()
                .then((db: IDBDatabase) => {
                    var table = db.transaction(this.tableInfo.tableName, AccessModeEnum.ReadWrite).objectStore(this.tableInfo.tableName);
                    var deleteReq = table.clear();
                    deleteReq.onsuccess = () => {
                        resolve();
                        db.close();
                    }
                    deleteReq.onerror = event => {
                        reject(event);
                        db.close();
                    }
                })
                .catch((event) => {
                    reject(event);
                });
        })
    }
}

// DBアクセスモード
enum AccessModeEnum {
    ReadOnly = 'readonly',
    ReadWrite = 'readwrite',
    VersionChange= 'versionchange',
}

