import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { useTheme } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { Button, Chip, FormHelperText, Tooltip, Typography } from '@material-ui/core';
import { FileCopy } from '@material-ui/icons';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useDropzoneStyles } from './dropzone.styles';

export function Dropzone({
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
  const classes = useDropzoneStyles();

  useEffect(() => {
    return setFilesReaded(file && !Array.isArray(file) ? [file] : file);
  }, [file]);

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

  return (
    <div style={{ flex: 1 }}>
      <div
        {...getRootProps()}
        className={`${classes.root} ${isRequiredError ? 'Mui-error' : ''} ${disabled ? 'Mui-disabled' : ''}`}
      >
        <div className={classes.wrapper}>
          <input {...getInputProps()}  /* webkitdirectory="" mozdirectory="" directory=""*/ />
          {filesReaded?.length ? (
            isLoading ? (
              <Skeleton width="215px" height={skeletonHeight} />
            ) : (
              filesReaded.map((f, i) => <Tooltip title={f}>
                <Chip
                  disabled={disabled}
                  icon={<FileCopy />}
                  label={f}
                  onDelete={() => handleDeleteFile(f, i)}
                  className={classes.chip}
                />
              </Tooltip>)
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

Dropzone.propTypes = {
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
