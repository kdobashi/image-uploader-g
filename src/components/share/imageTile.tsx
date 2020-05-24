import { CardMedia, makeStyles, Box } from "@material-ui/core"
import ImageDialog from './imageDialog'
import React, { useState } from "react";

type Props = {
    id: string,
    imageBinary: string,
}

const ImageTile: React.FC<Props> = (props: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const onClickImage = () => {
        setIsOpen(true);
    }
    const onClose = () => {
        setIsOpen(false);
    }

    return (
        <>
            <ImageDialog isOpen={isOpen} imageBinary={props.imageBinary} onClose={onClose} />
            <CardMedia
                key={props.id}
                component="img"
                image={props.imageBinary}
                onClick={onClickImage}
            />
        </>
    )
}
export default ImageTile;