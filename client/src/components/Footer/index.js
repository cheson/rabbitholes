import React from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { PRIVACY_POLICY } from "../../constants/routes";

export default function Footer() {
  return (
    <div className={styles.footer}>
      footer placeholder / fix to bottom, add privacy policy? terms of use?
      contact? site improvements.
      <Link to={PRIVACY_POLICY}>privacy policy</Link>
    </div>
  );
}

// https://www.freeprivacypolicy.com/live/48077487-3e10-4a68-be1b-5019afc0fdd6
