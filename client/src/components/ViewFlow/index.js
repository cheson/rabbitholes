import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
// import styles from "./ViewFlow.module.css";

export default function ViewFlow(props) {
  let { flowId } = useParams();
  const [flow, setFlow] = useState({});

  useEffect(() => {
    props.apiService.viewFlow(flowId).then((flow) => setFlow(flow));
  }, []);

  return (
    <div>
      <h2>View Flow: {flowId}</h2>
      {JSON.stringify(flow)}
    </div>
  );
}

ViewFlow.propTypes = {
  apiService: PropTypes.object,
};
