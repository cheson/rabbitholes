import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import styles from "./ViewFlowsBlock.module.css";
import { Button } from "react-bootstrap";

function ViewFlowsBlock(props) {
  const flow = props.flow;

  const history = useHistory();
  function onClick() {
    const isTextSelected = window.getSelection().toString();
    if (!isTextSelected) {
      history.push(`viewFlow/${flow._id}`);
    }
  }

  return (
    // TODO: Adding an actual <a> link would help with accessibility
    <div className={styles.flowBlock} onClick={onClick}>
      {flow.imgUrl && <img className={styles.image} src={flow.imgUrl} />}
      <div className={styles.title}>
        {flow.flowTitle || "flow title tee hee"}
      </div>
      <div className={styles.description}>
        {flow.flowDescription ||
          "flow description blah blah blah blah blah description blah blah blah blah blah"}
      </div>
      <div className={styles.metadata}>
        <span>
          username: {flow.user?.username || flow.user?.name || "gooduser"}
        </span>
        <span>views: {flow.numViews || 1}</span>
      </div>
      {props.deleteFn && (
        <div className={styles.deleteButton}>
          <Button
            onClick={(e) => props.deleteFn(flow.id, e)}
            variant="danger"
            block
          >
            Delete flow
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
