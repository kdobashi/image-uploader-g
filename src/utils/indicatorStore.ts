class IndicatorStore {
    public setIndicator: any = null;

    public openIndicator = (): void => {
        this.setIndicator(true);
    };
    public closeIndicator = (): void => {
        this.setIndicator(false);
    }
}

export default new IndicatorStore();