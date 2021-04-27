import React from "react";
import PropTypes from "prop-types";
import styles from "./ViewFlowsBlock.module.css";

function ViewFlowsBlock(props) {
  const flow = props.flow;
  return (
    // TODO: temp solution, do not actually wrap div in <a> tag to make it clickable
    <a href={`viewFlow/${flow._id}`}>
      <div className={styles.flowBlock}>
        userId: {flow.userId} <br></br>
        flowTitle: {flow.flowTitle} <br></br>
        flowDescription: {flow.flowDescription} <br></br>
        numViews: {flow.numViews} <br></br>
        imageURL: {flow.imageURL} <br></br>
      </div>
    </a>
  );
}

ViewFlowsBlock.propTypes = {
  flow: PropTypes.object,
};

export default ViewFlowsBlock;
