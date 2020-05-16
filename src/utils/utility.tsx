import Indicator from "./indicator"
import React, { useState } from "react"
import IndicatorStore from './indicatorStore'

export default () => {
    // インジケーター
    const [isOpenIndicator, setIsOpenIndicator] = useState<boolean>(false);

    // 他ファイルからアクセスができるようIndicatorStoreにセット
    IndicatorStore.setIndicator = setIsOpenIndicator;

    return (
        <>
            <Indicator open={isOpenIndicator} />
        </>
    )
}