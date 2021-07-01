import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import imageIcon from "../../assets/image.png";
import PropTypes from "prop-types";
import styles from "./ImageDropzone.module.css";

function ImageDropzone(props) {
  const [image, setImage] = useState(props.initialImageUrl || imageIcon);
  const [isDragged, setIsDragged] = useState(false);

  useEffect(() => {
    setImage(props.initialImageUrl || imageIcon);
  }, [props.initialImageUrl]);

  // Dropzone doesn't handle image uploading well. This is a hack to temporarily disable drag-and-drop functionality.
  // Eg. image will show up but will not be present in formData submitted to server.
  // https://github.com/react-dropzone/react-dropzone/issues/131
  const onDragEnter = () => {
    setIsDragged(true);
  };
  const onDragLeave = () => {
    setIsDragged(false);
  };

  const onDrop = (acceptedImageArray) => {
    if (isDragged) {
      setIsDragged(false);
      return;
    }

    // TODO: instead of returning, show some UI that only 1 image can be uploaded.
    if (acceptedImageArray.length == 0) return;

    // No need to work with arrays here because we limit dropzone to accept only 1 file.
    const acceptedImage = acceptedImageArray[0];
    setImage(URL.createObjectURL(acceptedImage));

    const reader = new FileReader();
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {};
    reader.readAsArrayBuffer(acceptedImage);
  };

  const imgPreview = (
    <img
      src={image}
      className={image == imageIcon ? styles.imgIcon : styles.imgPreview}
    />
  );

  return (
    <Dropzone
      onDragLeave={onDragLeave}
      onDragEnter={onDragEnter}
      onDrop={onDrop}
      maxFiles={1}
      accept="image/*"
    >
      {({ getRootProps, getInputProps }) => (
        <div
          className={styles.dropzone}
          style={props.style}
          {...getRootProps()}
        >
          {imgPreview}
          <input {...getInputProps({ name: props.imageId })} />
        </div>
      )}
    </Dropzone>
  );
}

ImageDropzone.propTypes = {
  initialImageUrl: PropTypes.string,
  imageId: PropTypes.string,
  useSmallDropzone: PropTypes.bool,
  style: PropTypes.object,
};

export default ImageDropzone;
