import { CardMedia, makeStyles, Box } from "@material-ui/core"
import ImageDialog from './imageDialog'
import React, { useState } from "react";

type Props = {
    id: string,
    imageBinary: string,
}

// スタイル
const useStyles = makeStyles(() => ({
    imageBox: {
        width:"100%",
        height:"auto",
        paddingTop:"100%",
        position:"relative",
    },
    imageSpan: {
        position:"absolute",
        top:"0",
        right:"0",
        bottom:"0",
        left:"0",
    }
    
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
            <Box className={classes.imageBox}><span className={classes.imageSpan}>
                <CardMedia
                    key={props.id}
                    component="img"
                    image={props.imageBinary}
                    onClick={onClickImage}
                />
            </span></Box>
        </>
    )
}
export default ImageTile;