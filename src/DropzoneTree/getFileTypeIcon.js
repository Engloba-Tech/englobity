import { FileCopy } from '@material-ui/icons';

export default function getFileTypeIcon(fileType)
{
    return icons[fileType] || icons['default'];
}

const icons = {
    'default': <FileCopy />
    
};