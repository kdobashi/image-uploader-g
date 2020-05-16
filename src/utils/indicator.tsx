import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { CircularProgress } from '@material-ui/core';

export default function Indicator(props: IndicatorProps) {
    return (
        <Dialog open={props.open} maxWidth={false}>
            <DialogContent>
                <CircularProgress />
            </DialogContent>
        </Dialog>
    )
}

export type IndicatorProps = {
    open: boolean,
}