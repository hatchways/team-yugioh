import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { orange } from '@material-ui/core/colors';

import axios from 'axios';
import FormData from 'form-data';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  avatar: {
    backgroundColor: orange[100],
    color: orange[600],
    width: theme.spacing(22),
    height: theme.spacing(22),
    margin: '2rem 5rem',
  },
}));

export default function UploadDialog(props) {
  const { onClose, open } = props;
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/image-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      console.log('File Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  return (
    <Dialog
      className={classes.root}
      onClose={handleClose}
      aria-labelledby='simple-dialog-title'
      open={open}
    >
      <DialogTitle id='simple-dialog-title'>Profile photo</DialogTitle>

      <Avatar className={classes.avatar} />
      {/* REACT FORM SUBMIT */}
      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
    </Dialog>
  );
}

UploadDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
