import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { orange } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";

import { useUserData, useSetUserData } from "../../providers/Context";

import axios from "axios";
import FormData from "form-data";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  avatar: {
    backgroundColor: orange[100],
    color: orange[600],
    width: theme.spacing(22),
    height: theme.spacing(22),
    margin: "2rem 5rem",
  },
  input: {
    display: "none",
  },
  button: {
    marginBottom: theme.spacing(3),
  },
}));

export default function UploadDialog(props) {
  const { onClose, open } = props;
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [saveDisabled, setSaveDisabled] = useState(true);

  const classes = useStyles();

  // Assigns Context Hooks to vars
  const setUserData = useSetUserData();
  const userData = useUserData();
  const {photoUrl} = userData

  const handleClose = () => {
    onClose();
    setSaveDisabled(true);
  };

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);

      return;
    }
    setSaveDisabled(false);
    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (saveDisabled) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/api/image-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(true);
      
      const { awsUrl } = res.data;
    
      setUserData({ ...userData, photoUrl: awsUrl });
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      setMessage(false);
      handleClose();
    }, 2000);
  };

  return (
    <Dialog
      className={classes.root}
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Update profile photo</DialogTitle>

      {message && <Alert>Your profile photo was updated!</Alert>}

      <Avatar className={classes.avatar} src={preview ? preview : photoUrl} />

      <form onSubmit={onSubmit}>
        <Box display="flex" justifyContent="space-around">
          <span className={classes.button}>
            <input
              type="file"
              accept="image/*"
              className={classes.input}
              id="upload-button-file"
              multiple
              onChange={onChange}
            />
            <label htmlFor="upload-button-file">
              <Button variant="contained" component="span">
                Select a photo
              </Button>
            </label>
          </span>
          <span className={classes.button}>
            <input
              type="submit"
              className={classes.input}
              value="Upload"
              id="submit-button-file"
            />
            <label htmlFor="submit-button-file">
              <Button
                color="primary"
                variant="outlined"
                component="span"
                disabled={saveDisabled}
              >
                Set as profile photo
              </Button>
            </label>
          </span>
        </Box>
      </form>
    </Dialog>
  );
}

UploadDialog.PropTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  fileName: PropTypes.string.isRequired,
};
