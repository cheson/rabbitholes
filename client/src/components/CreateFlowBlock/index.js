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
          defaultValue={block.url}
          maxLength="250"
        ></input>
      </div>

      <div className={styles.descriptionSection}>
        <label htmlFor={`description:${block.id}`}>
          Description (max 1000 characters)
        </label>
        <textarea
          className={styles.descriptionText}
          type="text"
          id={`description:${block.id}`}
          name={`description:${block.id}`}
          defaultValue={block.description}
          maxLength="1000"
        ></textarea>
      </div>

      {/* TODO: figure out best way to limit max height here naturally */}
      <div className={styles.imageSection}>
        <label htmlFor={`image:${block.id}`}>Image</label>
        <ImageDropzone
          imageId={block.id}
          style={{
            height: "100%",
            maxHeight: "200px",
            boxSizing: "border-box",
          }}
          initialImageUrl={block.image}
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
