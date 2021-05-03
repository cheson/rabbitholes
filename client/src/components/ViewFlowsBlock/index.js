import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./ViewFlowsBlock.module.css";

function ViewFlowsBlock(props) {
  const flow = props.flow;
  // const width = Math.floor(Math.random() * 1000);
  // const height = Math.floor(Math.random() * 1000);
  const width = 1500;
  const height = 800;
  const imgURL = `https://picsum.photos/${width}/${height}`;
  return (
    // TODO: temp solution, do not actually wrap div in <a> tag to make it clickable
    // bad for accessibility because all that becomes content of the link
    <Link to={`viewFlow/${flow._id}`}>
      <div className={styles.flowBlock}>
        <img className={styles.image} src={imgURL} />
        <div className={styles.title}>
          {" "}
          {flow.flowTitle || "flow title tee hee"}{" "}
        </div>
        <div className={styles.description}>
          {" "}
          {flow.flowDescription ||
            "flow description blah blah blah blah blah description blah blah blah blah blah"}{" "}
        </div>
        <div className={styles.metadata}>
          <span>
            username: {flow.user?.username || flow.user?.name || "gooduser"}
          </span>
          <span>views: {flow.numViews || 1}</span>
        </div>
        {console.log(flow)}
      </div>
    </Link>
  );
}

ViewFlowsBlock.propTypes = {
  flow: PropTypes.object,
};

export default ViewFlowsBlock;
