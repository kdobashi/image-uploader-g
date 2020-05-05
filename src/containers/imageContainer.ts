import { useState } from 'react';
import { createContainer } from 'unstated-next';
import { ImgObject, ImageDbLogic } from '../dblogic/imageDbLogic';

const useImageContainer = () => {
    const [imgObjects, setImgObjects] = useState<Array<ImgObject>>(new Array<ImgObject>());

    const getAllImage = () => {
        ImageDbLogic.getInstance().getAll<ImgObject>()
            .then(result => {
                setImgObjects(result as Array<ImgObject>);
            })
            .catch(error => {
                console.log(error);
            });
    }
      // 写真をアップロード
    const addImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files == null || e.target.files.length <= 0) return;
        
        Array.from(e.target.files).map(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                var imgObject : ImgObject = {
                    id: `${file.name}_${file.lastModified}`,
                    imageBinary: reader.result as string,
                }
                ImageDbLogic.getInstance().putSingle(imgObject)
                .then(() => {
                    ImageDbLogic.getInstance().getAll<ImgObject>().then(result => {
                        setImgObjects(result);
                    });
                });
        }});
        
    }
    
    return {
        addImage,
        getAllImage,
        imgObjects, setImgObjects,
    };
}
export const ImageContainer = createContainer(useImageContainer);
