import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import EditFlowBlock from "../EditFlowBlock";
import styles from "./MyFlows.module.css";

export default function MyFlows(props) {
  const [myFlows, setMyFlows] = useState([]);
  console.log(JSON.stringify(myFlows));
  // TODO: do we need a loaded boolean for all pages that load from api?
  useEffect(() => {
    props.apiService.viewMyFlows().then((myFlows) => setMyFlows(myFlows));
  }, []);

  return (
    <div>
      {/* TODO: consolidate all the header stylings */}
      <div className={styles.header}>
        <div className={styles.headerElements}>
          <h3> My Flows </h3>
        </div>
        <hr />
      </div>

      <div className={styles.flowBlockContainer}>
        {/* <EditFlowBlock key={flow._id} flow={flow} /> */}
        {myFlows.map((flow) => ({ flow }))}
      </div>
    </div>
  );
}

MyFlows.propTypes = {
  apiService: PropTypes.object,
};
