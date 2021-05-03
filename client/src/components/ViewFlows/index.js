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

  const sortTypes = {
    VIEWS_ASCENDING: "VIEWS_ASCENDING",
    VIEWS_DESCENDING: "VIEWS_DESCENDING",
    TITLE: "TITLE",
  };

  const sortFunctions = {
    VIEWS_ASCENDING: (a, b) => {
      return (a.numViews || 0) - (b.numViews || 0);
    },
    VIEWS_DESCENDING: (a, b) => {
      return (b.numViews || 0) - (a.numViews || 0);
    },
    TITLE: (a, b) => {
      return a.title > b.title;
    },
  };

  function setSortedFlows(sortType, optFlows) {
    const unsortedFlows = [...(optFlows || flows)];
    setFlows(unsortedFlows.sort(sortFunctions[sortType]));
  }

  const [flows, setFlows] = useState([]);
  // TODO: do we need a loaded boolean for all pages that load from api?
  useEffect(() => {
    props.apiService
      .viewFlows()
      .then((newFlows) => setSortedFlows(sortTypes.VIEWS_DESCENDING, newFlows));
  }, []);

  return (
    <div>
      <Dropdown
        onSelect={(sortType) => setSortedFlows(sortType)}
        className={styles.dropdownButton}
      >
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Sort By
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey={sortTypes.VIEWS_DESCENDING}>
            Views Descending
          </Dropdown.Item>
          <Dropdown.Item eventKey={sortTypes.VIEWS_ASCENDING}>
            Views Ascending
          </Dropdown.Item>
          <Dropdown.Item eventKey={sortTypes.TITLE}>Title</Dropdown.Item>
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
