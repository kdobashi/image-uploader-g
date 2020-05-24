import { CardMedia, makeStyles, Box } from "@material-ui/core"
import ImageDialog from './imageDialog'
import React, { useState } from "react";

type Props = {
    id: string,
    imageBinary: string,
}

// スタイル
const useStyles = makeStyles(() => ({
    
  }));

const ImageTile: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
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
            <Box>
                <CardMedia
                    className={classes.imageBox}
                    key={props.id}
                    component="img"
                    image={props.imageBinary}
                    onClick={onClickImage}
                />
            </Box>
        </>
    )
}
export default ImageTile;