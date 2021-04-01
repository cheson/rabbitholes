import React, { useState } from "react";
import Dropzone from "react-dropzone";
import cameraImg from "../../assets/camera.png";

function CreateFlowBlock() {
  const [image, setImage] = useState([]);

  const onDrop = (acceptedImage) => {
    setImage(
      acceptedImage.map((img) =>
        Object.assign(img, {
          preview: URL.createObjectURL(img),
        })
      )
    );

    acceptedImage.forEach((img) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(img);
    });
  };

  const imgStyle = {
    display: "block",
    width: "auto",
    height: "100%",
  };

  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };

  const thumbnail = image.map((img) => (
    <div style={thumb} key={img.name}>
      <div style={thumbInner}>
        <img src={img.preview} style={imgStyle} />
      </div>
    </div>
  ));

  return (
    <div>
      <form action="/api/images" method="post" encType="multipart/form-data">
        <div>
          <input type="text" name="text"></input>
        </div>
        <div>
          <input type="file" name="image" />
        </div>
        <Dropzone onDrop={onDrop} maxFiles={1} accept="image/*">
          {({ getRootProps, getInputProps }) => (
            <div
              style={{
                backgroundColor: "green",
                height: 100,
                width: 100,
                margin: 15,
              }}
              {...getRootProps()}
            >
              <img style={{ width: "100%" }} src={cameraImg} alt="image" />
              <input {...getInputProps()} />
            </div>
          )}
        </Dropzone>
      </form>
      <div>{thumbnail}</div>
    </div>
  );
}

export default CreateFlowBlock;
