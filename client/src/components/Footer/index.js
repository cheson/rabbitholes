import React from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { PRIVACY_POLICY } from "../../constants/routes";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.copyright}>© 2021 rabbitholes</div>
      <div className={styles.content}>
        flowwebsitedev@gmail.com |&nbsp;
        <Link to={PRIVACY_POLICY} className={styles.privacyPolicyLink}>
          privacy policy
        </Link>
      </div>
    </div>
  );
}
