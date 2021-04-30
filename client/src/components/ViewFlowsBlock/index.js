import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./ViewFlowsBlock.module.css";

function ViewFlowsBlock(props) {
  const flow = props.flow;
  return (
    // TODO: temp solution, do not actually wrap div in <a> tag to make it clickable
    // bad for accessibility because all that becomes content of the link
    <Link to={`viewFlow/${flow._id}`}>
      <div className={styles.flowBlock}>
        username: {flow.user?.username} <br></br>
        name: {flow.user?.name} <br></br>
        flowTitle: {flow.flowTitle} <br></br>
        flowDescription: {flow.flowDescription} <br></br>
        numViews: {flow.numViews} <br></br>
        imageURL: {flow.imageURL} <br></br>
        {console.log(flow)}
      </div>
    </Link>
  );
}

ViewFlowsBlock.propTypes = {
  flow: PropTypes.object,
};

export default ViewFlowsBlock;
