import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import styles from "./ViewFlow.module.css";

export default function ViewFlow(props) {
  let { flowId } = useParams();
  const [flow, setFlow] = useState({});

  useEffect(() => {
    props.apiService.viewFlow(flowId).then((flow) => setFlow(flow));
  }, []);

  const width = 1500;
  const height = 800;
  const imgURL = `https://picsum.photos/${width}/${height}`;

  return (
    <div>
      <img className={styles.image} src={imgURL} />
      <div className={styles.title}>{flow.flowTitle}</div>
      <div className={styles.description}>{flow.flowDescription}</div>
    </div>
  );
}

ViewFlow.propTypes = {
  apiService: PropTypes.object,
};
