import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { useTheme } from '@material-ui/core/styles';
import { Skeleton, TreeItem, TreeView } from '@material-ui/lab';
import { Button, Chip, FormHelperText, Tooltip, Typography } from '@material-ui/core';
import { ChevronRight, ExpandMore, FileCopy } from '@material-ui/icons';
import * as Icons from '@material-ui/icons';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useDropzoneTreeStyles } from './dropzoneTree.styles';
import FileTypeIcon from './FileTypeIcon';

export function DropzoneTree({
  onDrop,
  file,
  accept,
  disabled,
  onDeleteFile,
  labelDrop,
  isLoading,
  skeletonHeight = 48,
  required,
  errorMessage,
  submitted,
  multiple = false,
}) {
  const [filesReaded, setFilesReaded] = useState(file && !Array.isArray(file) ? [file] : file);
  const isRequiredError = required && submitted && !filesReaded?.length;
  const theme = useTheme();
  const classes = useDropzoneTreeStyles();

  const [filetree, setFileTree] = useState(null);
  
  useEffect(() => {
    return setFilesReaded(file && !Array.isArray(file) ? [file] : file);
  }, [file]);
  
  useEffect(() => {
    var tree = {};

    filesReaded?.forEach((path, index) => {
      var currentNode = tree;
      path.split('/').forEach((segment, subIndex, a) => {
        if(segment !== '' || subIndex > 0)
        {
          if (currentNode[segment] === undefined) {
            currentNode[segment] = subIndex === a.length - 1 ? {index, type: segment.split('.')[1]} : {};
          }
          
          currentNode = currentNode[segment];
        }
      });
    });

    setFileTree(getChildTreeItems(tree));
  }, [filesReaded]);

  function handleDeleteFile(file, index) {
    setFilesReaded(prevFiles => prevFiles.filter((o, i) => i !== index));
    onDeleteFile(file, index);
  }

  const handleDragEnter = useCallback(
    event => {
      event.target.style.backgroundColor = theme.palette.secondary.main;
    },
    [theme]
  );

  const handleDragLeave = useCallback(event => {
    event.target.style.backgroundColor = 'unset';
  }, []);

  const handleOnDrop = useCallback(
    acceptedFiles => {
      console.log(acceptedFiles);
      onDrop(acceptedFiles);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    disabled,
    onDrop: handleOnDrop,
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
    multiple: multiple
  });

  function getChildTreeItems(item, previousId = '')
  {
    return Object.keys(item).map(key => {
      var newId = `${previousId}/${key}`;
      return <>
      {item[key].index === undefined
        ? <TreeItem nodeId={newId} label={key} onClick={e => e.stopPropagation()}
        style={{borderLeft: '1px solid' }}>
          {getChildTreeItems(item[key], newId)}
        </TreeItem>
        :<Tooltip title={key}>
          <Chip
              style={{ justifyContent: 'left' }}
              disabled={disabled}
              icon={<FileTypeIcon fileType={item[key].type} />}
              label={key}
              onDelete={() => handleDeleteFile(newId, item[key].index)}
              className={classes.chip}
          />
        </Tooltip>
        }
      </>;
    });
  }

  return (
    <div style={{ flex: 1 }}>
      <div
        {...getRootProps()}
        className={`${classes.root} ${isRequiredError ? 'Mui-error' : ''} ${disabled ? 'Mui-disabled' : ''}`}
      >
        <div className={classes.wrapper}>
          <input {...getInputProps()} webkitdirectory="" mozdirectory="" directory="" />
          {filesReaded?.length ? (
            isLoading ? (
              <Skeleton width="215px" height={skeletonHeight} />
            ) : (
              <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMore />}
                defaultExpandIcon={<ChevronRight />}
                sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
              >
                {filetree}
              </TreeView>
            )
          ) : (
            <div className={classes.message}>
              <Button disabled={disabled} variant="primary" className={classes.button}>
                <CloudUploadIcon />
              </Button>
              <Typography color="textSecondary" className={classes.label}>
                {labelDrop}
                {required && labelDrop ? <span className={classes.requiredLabel}>*</span> : ''}
              </Typography>
            </div>
          )}
        </div>
      </div>
      {isRequiredError && <FormHelperText className={classes.inputHelper}>{errorMessage}</FormHelperText>}
    </div>
  );
}

DropzoneTree.propTypes = {
  onDrop: PropTypes.func,
  onDeleteFile: PropTypes.func,
  file: PropTypes.string,
  disabled: PropTypes.bool,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  labelDrop: PropTypes.string,
  isLoading: PropTypes.bool,
  skeletonHeight: PropTypes.number,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
  submitted: PropTypes.bool,
};
