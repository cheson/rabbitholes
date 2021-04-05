import React, { useState } from "react";
import Dropzone from "react-dropzone";
import cameraImg from "../../assets/camera.png";
import styles from "./CreateFlowBlock.module.css";

function CreateFlowBlock() {
  const [image, setImage] = useState(cameraImg);

  const onDrop = (acceptedImageArray) => {
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
    <div>
      <form action="/api/images" method="post" encType="multipart/form-data">
        <Dropzone onDrop={onDrop} maxFiles={1} accept="image/*">
          {({ getRootProps, getInputProps }) => (
            <div className={styles.dropzone} {...getRootProps()}>
              {imgPreview}
              <input {...getInputProps()} />
            </div>
          )}
        </Dropzone>

        <label htmlFor="title">Title</label>
        <input
          placeholder="title"
          className={styles.titleText}
          type="text"
          name="text"
        ></input>

        <label htmlFor="description">Description</label>
        <textarea
          className={styles.descriptionText}
          placeholder="description"
          type="text"
          name="text"
        ></textarea>
      </form>
    </div>
  );
}

export default CreateFlowBlock;
