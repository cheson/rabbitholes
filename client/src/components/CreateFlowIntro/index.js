import React from "react";
import styles from "./CreateFlowIntro.module.css";
import ImageDropzone from "../ImageDropzone";

function CreateFlowIntro() {
  return (
    <div className={styles.flexCentered}>
      {/* TODO: add the identifier and backend code to handle image submission for flow */}
      <div className={styles.formEntry}>
        <label className={styles.label}>Image</label>
        <ImageDropzone style={{ width: "100%" }} />
      </div>

      <div className={styles.formEntry}>
        <label className={styles.label} htmlFor="title">
          Title
        </label>
        <input
          id="title"
          placeholder=""
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
          placeholder=""
          name="flowDescription"
        ></textarea>
      </div>
    </div>
  );
}

export default CreateFlowIntro;
