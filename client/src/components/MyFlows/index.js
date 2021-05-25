import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import EditFlowBlock from "../EditFlowBlock";
import styles from "./MyFlows.module.css";
import ResourceNotFound from "../ResourceNotFound";

export default function MyFlows(props) {
  const [myFlows, setMyFlows] = useState([]);
  // TODO: do we need a loaded boolean for all pages that load from api?
  useEffect(() => {
    if (props.authUser) {
      props.apiService
        .viewFlows({
          searchString: "testing the search string",
          userId: props.authUser.uid,
        })
        .then((myFlows) => setMyFlows(myFlows));
    }
  }, [props.authUser]);

  return props.authUser ? (
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
        {myFlows.map((flow) => JSON.stringify(flow))}
      </div>
    </div>
  ) : (
    <ResourceNotFound message={`No user logged in.`} />
  );
}

MyFlows.propTypes = {
  apiService: PropTypes.object,
  authUser: PropTypes.object,
};
