import React from "react";
import styles from "./CreateFlowIntro.module.css";
import ImageDropzone from "../ImageDropzone";
import PropTypes from "prop-types";

function CreateFlowIntro(props) {
  return (
    <div className={styles.centered}>
      <div className={styles.formEntry}>
        <label className={styles.label}>Image</label>
        <ImageDropzone
          imageId="intro"
          style={{ width: "100%", height: "20vh" }}
          initialImageUrl={props.image}
        />
      </div>

      <div className={styles.formEntry}>
        <label className={styles.label} htmlFor="title">
          Title
        </label>
        <input
          id="title"
          defaultValue={props.title}
          className={styles.titleText}
          name="flowTitle"
        ></input>
      </div>

      <div className={styles.formEntry}>
        <label className={styles.label} htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          className={styles.descriptionText}
          defaultValue={props.description || ""}
          name="flowDescription"
        ></textarea>
      </div>
    </div>
  );
}

CreateFlowIntro.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

export default CreateFlowIntro;
