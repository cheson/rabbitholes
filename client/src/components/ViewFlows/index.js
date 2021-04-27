import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ViewFlows(props) {
  const searchQuery = useQuery().get("search");

  const [flows, setFlows] = useState({});
  useEffect(() => {
    props.apiService.viewFlows().then((flows) => setFlows(flows));
  }, []);

  return (
    <div>
      <h2>View Flows: {searchQuery}</h2>
      {JSON.stringify(flows)}
    </div>
  );
}

ViewFlows.propTypes = {
  apiService: PropTypes.object,
};
