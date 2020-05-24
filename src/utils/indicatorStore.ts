class IndicatorStore {
    public setIndicator: any = null;
    private inProgressNumber:number = 0;

    public openIndicator = (): void => {
        // 複数買い呼び出しても1回のみ描画設定
        if(this.inProgressNumber === 0) this.setIndicator(true);
        this.inProgressNumber++;
    };
    public closeIndicator = (): void => {
        // 全ての処理が終わったらインジケーターを非表示にする
        this.inProgressNumber--;
        if(this.inProgressNumber === 0) this.setIndicator(false);
    }
}

export default new IndicatorStore();