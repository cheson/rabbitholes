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

      <div>
        <label htmlFor={`image:${block.id}`}>Image</label>
        <ImageDropzone
          imageId={`image:${block.id}`}
          style={{ width: "200px", height: "100px" }}
        />
      </div>

      <div>
        <label htmlFor={block.id}>URL</label>
        <input
          placeholder={block.url}
          className={styles.urlText}
          type="text"
          id={`url:${block.id}`}
          name={`url:${block.id}`}
        ></input>
      </div>

      <div>
        <label htmlFor={`description:${block.id}`}>Description</label>
        <textarea
          className={styles.descriptionText}
          placeholder={block.description}
          type="text"
          id={`description:${block.id}`}
          name={`description:${block.id}`}
        ></textarea>
      </div>
    </div>
  );
}

CreateFlowBlock.propTypes = {
  blockData: PropTypes.object,
  removeBlock: PropTypes.func,
};

export default CreateFlowBlock;
