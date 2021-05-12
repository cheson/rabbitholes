import React from "react";
import ImageDropzone from "../ImageDropzone";
import PropTypes from "prop-types";
import { XCircle } from "react-bootstrap-icons";
import styles from "./CreateFlowBlock.module.css";

function CreateFlowBlock(props) {
  const block = props.blockData;
  return (
    <div className={styles.flowBlock}>
      <div className={styles.controlsSection}>
        <div className={styles.index}>{props.index + 1}</div>
        <XCircle
          className={styles.xCircle}
          onClick={() => props.removeBlock(block.id)}
        />
      </div>

      <div className={styles.urlSection}>
        <label htmlFor={`url:${block.id}`}>URL</label>
        <input
          className={styles.urlText}
          type="text"
          id={`url:${block.id}`}
          name={`url:${block.id}`}
        ></input>
      </div>

      <div className={styles.descriptionSection}>
        <label htmlFor={`description:${block.id}`}>Description</label>
        <textarea
          className={styles.descriptionText}
          type="text"
          id={`description:${block.id}`}
          name={`description:${block.id}`}
        ></textarea>
      </div>

      <div className={styles.imageSection}>
        <label htmlFor={`image:${block.id}`}>Image</label>
        <ImageDropzone
          imageId={`image:${block.id}`}
          style={{ height: "100%", boxSizing: "border-box" }}
        />
      </div>
    </div>
  );
}

CreateFlowBlock.propTypes = {
  blockData: PropTypes.object,
  removeBlock: PropTypes.func,
  index: PropTypes.number,
};

export default CreateFlowBlock;
