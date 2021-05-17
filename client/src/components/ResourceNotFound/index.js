import React from "react";
import styles from "./ResourceNotFound.module.css";
import resourceNotFoundRabbit from "../../assets/404_rabbit.jpeg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function ResourceNotFound(props) {
  return (
    <div className={styles.container}>
      <img src={resourceNotFoundRabbit} className={styles.img}></img>
      <span>
        <h2>404</h2>
        <h4>{props.message}</h4>
        <Link to="/">
          <button>return home</button>
        </Link>
      </span>
    </div>
  );
}

ResourceNotFound.propTypes = {
  message: PropTypes.string,
};
