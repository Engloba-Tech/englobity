import { Button, Chip, FormHelperText, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import { Skeleton } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDropzoneFolderStyles } from './dropzoneFolder.styles';

export function DropzoneFolder({
  onDrop,
  accept,
  disabled,
  labelDrop,
  isLoading,
  skeletonHeight = 48,
  required,
  errorMessage,
  submitted,
  maxFiles,
  maxFileSize,
  folderName,
  handleDeleteFolder
}) {
  const theme = useTheme();
  const classes = useDropzoneFolderStyles();
  const isRequiredError = required && submitted && !folderName;

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
      onDrop(acceptedFiles);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    disabled,
    maxFiles: maxFiles,
    maxSize: maxFileSize,
    onDrop: handleOnDrop,
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave
  });

  return (
    <div style={{ flex: 1 }}>
      <div
        {...getRootProps()}
        className={`${classes.root} ${isRequiredError ? 'Mui-error' : ''} ${disabled ? 'Mui-disabled' : ''}`}
      >
        <div className={classes.wrapper}>
          <input {...getInputProps()} webkitdirectory="" type="file" mozdirectory="" directory="" />
          {folderName ? (
            isLoading ? (
              <Skeleton width="215px" height={skeletonHeight} />
            ) : (
              <Chip
                disabled={disabled}
                icon={<FolderOpenOutlinedIcon />}
                label={folderName}
                onDelete={() => handleDeleteFolder()}
                className={classes.chip}
              />
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

DropzoneFolder.propTypes = {
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
  maxFiles: PropTypes.string,
  maxFileSize: PropTypes.string,
  folderName: PropTypes.string,
  handleDeleteFolder: PropTypes.func
};
