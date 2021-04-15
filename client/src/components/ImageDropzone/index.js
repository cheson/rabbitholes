import React, { useState } from "react";
import Dropzone from "react-dropzone";
import cameraImg from "../../assets/camera.png";
import PropTypes from "prop-types";
import styles from "./ImageDropzone.module.css";

// TODO/BUG: Drag and drop doesn't work for this input: https://github.com/react-dropzone/react-dropzone/issues/131
function ImageDropzone() {
  const [image, setImage] = useState(cameraImg);

  const onDrop = (acceptedImageArray) => {
    // TODO: instead of returning, show some UI that only 1 image can be uploaded.
    if (acceptedImageArray.length == 0) return;

    // No need to work with arrays here because we limit dropzone to accept only 1 file.
    const acceptedImage = acceptedImageArray[0];
    setImage(URL.createObjectURL(acceptedImage));

    const reader = new FileReader();
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      const binaryStr = reader.result;
      console.log(binaryStr);
    };
    reader.readAsArrayBuffer(acceptedImage);
  };

  const imgPreview = (
    <img
      src={image}
      className={image == cameraImg ? styles.dropzoneCamera : styles.imgPreview}
    />
  );

  return (
    <Dropzone onDrop={onDrop} maxFiles={1} accept="image/*">
      {({ getRootProps, getInputProps }) => (
        <div className={styles.dropzone} {...getRootProps()}>
          {imgPreview}
          <input {...getInputProps({ name: "flowImage" })} />
        </div>
      )}
    </Dropzone>
  );
}

// props should include: styles for big or small, name to identify if for intro or blocks
ImageDropzone.propTypes = {
  imageIdentifier: PropTypes.string,
  useSmallDropzone: PropTypes.bool,
};

export default ImageDropzone;
