import { Dialog, Box, CardMedia } from "@material-ui/core";
import React, { useState } from "react";

export type Props = {
    isOpen: boolean,
    imageBinary: string,
    onClose: Function,
}

const ImageDialog: React.FC<Props> = (props: Props) => {

    const onClose = () => {
        props.onClose();
    }

    return (
        <Box>
            <Dialog
                open={props.isOpen}
                onClick={onClose}
                maxWidth={false}
            >
                <Box>
                    <CardMedia
                        component="img"
                        image={props.imageBinary}
                    />
                </Box>

            </Dialog>
        </Box>
    )
}
export default ImageDialog;