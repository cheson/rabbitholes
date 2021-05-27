import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import EditFlowBlock from "../EditFlowBlock";
import ViewFlowsBlock from "../ViewFlowsBlock";
import styles from "./MyFlows.module.css";
import ResourceNotFound from "../ResourceNotFound";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

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

  function deleteFlow(id, event) {
    event.stopPropagation();
    confirmAlert({
      message: "Are you sure you want to delete this flow?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            props.apiService.deleteFlow(id).then((result) => {
              if (result == "OK") {
                setMyFlows(
                  myFlows.filter(function (flow) {
                    return flow._id != id;
                  })
                );
              } else {
                // display some error that flow was not deleted
              }
            });
          },
        },
        {
          label: "No",
        },
      ],
    });
  }

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
        {myFlows.map((flow) => (
          <ViewFlowsBlock key={flow.id} flow={flow} deleteFn={deleteFlow} />
        ))}
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
