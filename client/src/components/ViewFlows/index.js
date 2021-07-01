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

  const sortTypes = {
    VIEWS_ASCENDING: "VIEWS_ASCENDING",
    VIEWS_DESCENDING: "VIEWS_DESCENDING",
    TITLE: "TITLE",
  };
  const [activeSortType, setActiveSortType] = useState(
    sortTypes.VIEWS_DESCENDING
  );

  // TODO: this is a good candidate for jest testing
  const sortFunctions = {
    VIEWS_ASCENDING: (a, b) => {
      return (a.numViews || 0) - (b.numViews || 0);
    },
    VIEWS_DESCENDING: (a, b) => {
      return (b.numViews || 0) - (a.numViews || 0);
    },
    TITLE: (a, b) => {
      if (a.flowTitle === "" || a.flowTitle === null) return 1;
      if (b.flowTitle === "" || b.flowTitle === null) return -1;
      if (a.flowTitle === b.flowTitle) return 0;
      return a.flowTitle.toLowerCase().localeCompare(b.flowTitle.toLowerCase());
    },
  };

  function setSortedFlows(sortType, optFlows) {
    const unsortedFlows = [...(optFlows || flows)];
    setActiveSortType(sortType);
    setFlows(unsortedFlows.sort(sortFunctions[sortType]));
  }

  const [flows, setFlows] = useState([]);
  // TODO: do we need a loaded boolean for all pages that load from api?
  useEffect(() => {
    props.apiService
      .viewFlows(searchQuery ? { search: searchQuery } : {})
      .then((newFlows) => setSortedFlows(activeSortType, newFlows));
  }, [searchQuery]);

  return (
    <div>
      {/* TODO: consolidate all the header stylings */}
      <div className={styles.header}>
        <div className={styles.headerElements}>
          <h3> View Lists </h3>
          <Dropdown
            onSelect={(sortType) => setSortedFlows(sortType)}
            style={{ fontFamily: "Source Sans Pro" }}
          >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Sort By
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                active={activeSortType == sortTypes.VIEWS_DESCENDING}
                eventKey={sortTypes.VIEWS_DESCENDING}
              >
                Views Descending
              </Dropdown.Item>
              <Dropdown.Item
                active={activeSortType == sortTypes.VIEWS_ASCENDING}
                eventKey={sortTypes.VIEWS_ASCENDING}
              >
                Views Ascending
              </Dropdown.Item>
              <Dropdown.Item
                active={activeSortType == sortTypes.TITLE}
                eventKey={sortTypes.TITLE}
              >
                Title
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <hr />
      </div>

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
