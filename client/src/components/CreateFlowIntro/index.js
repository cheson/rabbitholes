import React from "react";
import styles from "./CreateFlowIntro.module.css";
import ImageDropzone from "../ImageDropzone";

function CreateFlowIntro() {
  return (
    <div>
      {/* TODO: add the identifier and backend code to handle image submission for flow */}
      <ImageDropzone />

      <label htmlFor="title">Title</label>
      <input
        id="title"
        placeholder="title"
        className={styles.titleText}
        name="flowTitle"
      ></input>

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        className={styles.descriptionText}
        placeholder="description"
        name="flowDescription"
      ></textarea>
    </div>
  );
}

export default CreateFlowIntro;
