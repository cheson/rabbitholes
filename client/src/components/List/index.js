import React, { useState, useEffect } from "react";
import styles from "./List.module.css";

function List() {
  const [list, setList] = useState([]);

  useEffect(() => {
    // setList(["1"])
    fetch("/api/getList")
      .then((res) => res.json())
      .then((list) => setList(list));
  }, []);

  return (
    <div className="App">
      <h1 className={styles.title}>List of Items</h1>
      {/* Check to see if any items are found*/}
      {list.length ? (
        <div>
          {/* Render the list of items */}
          {list.map((item) => {
            return <div>{item}</div>;
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

export default List;
