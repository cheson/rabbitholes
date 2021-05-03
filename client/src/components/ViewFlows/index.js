import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ViewFlowsBlock from "../ViewFlowsBlock";
import styles from "./ViewFlows.module.css";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ViewFlows(props) {
  const searchQuery = useQuery().get("search");
  console.log(searchQuery); // Can be used in the future for search keywords

  const [flows, setFlows] = useState([]);
  // TODO: do we need a loaded boolean for all pages that load from api?
  useEffect(() => {
    props.apiService.viewFlows().then((flows) => setSortedFlows(flows));
  }, []);

  function descendingSort(a, b) {
    return (b.numViews || 0) - (a.numViews || 0);
  }

  function setSortedFlows(flows, sortBy) {
    console.log(sortBy);
    const sortedFlows = flows.sort(descendingSort);
    setFlows(sortedFlows);
  }

  return (
    <div>
      <Dropdown className={styles.dropdownButton}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Sort By
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Views</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Title</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Created By</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div className={styles.flowBlockContainer}>
        {flows.map((flow) => (
          <ViewFlowsBlock key={flow._id} flow={flow} />
        ))}
      </div>
    </div>
  );
}

ViewFlows.propTypes = {
  apiService: PropTypes.object,
};
