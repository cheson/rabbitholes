import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import styles from "./ViewFlowsBlock.module.css";

function ViewFlowsBlock(props) {
  const flow = props.flow;

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  const width = getRandomInt(1300, 1600);
  const height = getRandomInt(600, 900);
  const imgURL = `https://picsum.photos/${width}/${height}`;

  const history = useHistory();
  function onClick() {
    const isTextSelected = window.getSelection().toString();
    if (!isTextSelected) {
      history.push(`viewFlow/${flow._id}`);
    }
  }

  return (
    <div className={styles.flowBlock} onClick={onClick}>
      <img className={styles.image} src={imgURL} />
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
      {console.log(flow)}
    </div>
  );
}

ViewFlowsBlock.propTypes = {
  flow: PropTypes.object,
};

export default ViewFlowsBlock;
