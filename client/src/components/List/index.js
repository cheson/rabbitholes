import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./List.module.css";

function List(props) {
  const [list, setList] = useState();

  useEffect(() => {
    props.apiService.listUsers().then((list) => setList(list));
  }, []);

  return !list ? (
    <div></div>
  ) : (
    <div className="App">
      <h1 className={styles.title}>List of Items</h1>
      {/* Check to see if any items are found*/}
      {list.length ? (
        <div>
          {/* Render the list of items */}
          {list.map((item) => {
            return <div key={item.firebase_id}>{item.email}</div>;
          })}
        </div>
      ) : (
        <div>
          <h2>No List Items Found</h2>
        </div>
      )}
    </div>
  );
}

List.propTypes = {
  apiService: PropTypes.object,
};

export default List;
