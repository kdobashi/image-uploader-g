import { useState } from 'react';
import { createContainer } from 'unstated-next';
import { ImgObject, ImageDbLogic } from '../dblogic/imageDbLogic';
import IndicatorStore from '../utils/indicatorStore';

const useImageContainer = () => {
    const [imgObjects, setImgObjects] = useState<Array<ImgObject>>(new Array<ImgObject>());

    const getAllImage = () => {
        IndicatorStore.openIndicator();
        ImageDbLogic.getInstance().getAll<ImgObject>()
            .then(result => {
                setImgObjects(result as Array<ImgObject>);
                IndicatorStore.closeIndicator();
            })
            .catch(error => {
                console.log(error);
                IndicatorStore.closeIndicator();
            });
    }
      // 写真をアップロード
    const addImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files == null || e.target.files.length <= 0) return;
        
        IndicatorStore.openIndicator();
        Array.from(e.target.files).map(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                var imgObject : ImgObject = {
                    id: `${file.name}_${file.lastModified}`,
                    imageBinary: reader.result as string,
                    date: null,
                    amount: null,
                    note: null,
                }
                ImageDbLogic.getInstance().putSingle(imgObject)
                .then(() => {
                    ImageDbLogic.getInstance().getAll<ImgObject>().then(result => {
                        setImgObjects(result);
                        IndicatorStore.closeIndicator();
                    });
                });
        }});
    }
    // 日付変更
    const handleDateChange = (date: Date | null, imgObject: ImgObject) => {
        imgObject.date = date;
        ImageDbLogic.getInstance().putSingle(imgObject)
        .then(() => {
            ImageDbLogic.getInstance().getAll<ImgObject>().then(result => {
                setImgObjects(result); //getAllするかはあとで再考する
            })
        })
    };
    
    return {
        addImage,
        getAllImage,
        handleDateChange,
        imgObjects, setImgObjects,
    };
}
export const ImageContainer = createContainer(useImageContainer);
