import React from "react";
import ImageDropzone from "../ImageDropzone";
import PropTypes from "prop-types";
import styles from "./CreateFlowBlock.module.css";

function CreateFlowBlock(props) {
  const block = props.blockData;
  return (
    <div className={styles.flowBlock}>
      <button type="button" onClick={() => props.removeBlock(block.id)}>
        Remove
      </button>

      <ImageDropzone imageId={block.id} />

      <label htmlFor={block.id}>URL</label>
      <input
        placeholder={block.url}
        className={styles.urlText}
        type="text"
        id={block.id}
        name={`url:${block.id}`}
      ></input>

      <label htmlFor="description">Description</label>
      <textarea
        className={styles.descriptionText}
        placeholder={block.description}
        type="text"
        id={block.id}
        name={`description:${block.id}`}
      ></textarea>
    </div>
  );
}

CreateFlowBlock.propTypes = {
  blockData: PropTypes.object,
  removeBlock: PropTypes.func,
};

export default CreateFlowBlock;
