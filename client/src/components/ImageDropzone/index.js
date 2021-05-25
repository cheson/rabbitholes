import React, { useState } from "react";
import Dropzone from "react-dropzone";
import imageIcon from "../../assets/image.png";
import PropTypes from "prop-types";
import styles from "./ImageDropzone.module.css";

// TODO/BUG: Drag and drop doesn't work for this input: https://github.com/react-dropzone/react-dropzone/issues/131
function ImageDropzone(props) {
  const [image, setImage] = useState(props.initialImageUrl || imageIcon);

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
      className={image == imageIcon ? styles.imgIcon : styles.imgPreview}
    />
  );

  return (
    <Dropzone onDrop={onDrop} maxFiles={1} accept="image/*">
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
