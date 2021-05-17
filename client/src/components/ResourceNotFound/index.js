import React from "react";
import styles from "./ResourceNotFound.module.css";
import resourceNotFoundRabbit from "../../assets/404_rabbit.jpeg";
import { Link } from "react-router-dom";

export default function ResourceNotFound() {
  return (
    <div className={styles.centered}>
      <img src={resourceNotFoundRabbit} className={styles.img}></img>
      <Link to="/">
        <button>return home</button>
      </Link>
    </div>
  );
}
