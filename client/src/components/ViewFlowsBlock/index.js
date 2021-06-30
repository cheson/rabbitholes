import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import styles from "./ViewFlowsBlock.module.css";
import { Button } from "react-bootstrap";

function ViewFlowsBlock(props) {
  const flow = props.flow;

  const history = useHistory();
  function viewFlowClick() {
    const isTextSelected = window.getSelection().toString();
    if (!isTextSelected) {
      history.push(`viewFlow/${flow._id}`);
    }
  }

  function editFlowClick(e) {
    e.stopPropagation();
    history.push(`edit/${flow._id}`);
  }

  return (
    // TODO: Adding an actual <a> link would help with accessibility
    <div className={styles.flowBlock} onClick={viewFlowClick}>
      {flow.imgUrl && <img className={styles.image} src={flow.imgUrl} />}
      <h6 className={styles.title}>{flow.flowTitle || "Untitled"}</h6>
      <div className={styles.description}>
        {flow.flowDescription || "No description provided."}
      </div>
      <div className={styles.metadata}>
        <span>
          Author: {flow.user?.username || flow.user?.name || "Anonymous"}
        </span>
        <span>Views: {flow.numViews || 1}</span>
      </div>
      {/* Existence of deleteFn prop indicates this ViewFlowsBlock component is used in MyFlows */}
      {props.deleteFn && (
        <div className={styles.buttonControls}>
          <Button
            onClick={(e) => editFlowClick(e)}
            variant="primary"
            className={styles.editButton}
          >
            Edit
          </Button>
          <Button onClick={(e) => props.deleteFn(flow.id, e)} variant="danger">
            X
          </Button>
        </div>
      )}
    </div>
  );
}

ViewFlowsBlock.propTypes = {
  flow: PropTypes.object,
  deleteFn: PropTypes.func,
};

export default ViewFlowsBlock;
