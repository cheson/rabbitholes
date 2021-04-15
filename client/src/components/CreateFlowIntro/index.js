import React from "react";
import styles from "./CreateFlowIntro.module.css";
import ImageDropzone from "../ImageDropzone";

function CreateFlowIntro() {
  // TODO: Servers can be configured with a size limit for files and HTTP requests in order to prevent abuse.
  return (
    <div>
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
