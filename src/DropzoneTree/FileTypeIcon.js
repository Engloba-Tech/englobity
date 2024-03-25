import { FileCopy, Image } from '@material-ui/icons';
import React from 'react';

export default function FileTypeIcon({fileType = 'default'})
{
    return icons[fileType] ? icons[fileType] : icons['default'];
}

const icons = {
    'default': <FileCopy />,
    'png': <Image />,
    'jpg': <Image />
};