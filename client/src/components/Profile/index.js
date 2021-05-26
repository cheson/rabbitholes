import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./Profile.module.css";
import ResourceNotFound from "../ResourceNotFound";
import ImageDropzone from "../ImageDropzone";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function Profile(props) {
  const [showError, setShowError] = useState(false);
  const [showUpdating, setShowUpdating] = useState(false);

  function deleteUser(user, apiService, history) {
    confirmAlert({
      message: "Are you sure you want to delete your account?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            user
              .delete()
              .then(apiService.deleteUser(user.uid))
              .then(() => {
                history.push("/home");
              })
              .catch((error) => {
                console.log(error);
                if (error.code == "auth/requires-recent-login") {
                  setShowError(true);
                  setTimeout(function () {
                    setShowError(false);
                  }, 10000);
                }
              });
          },
        },
        {
          label: "No",
        },
      ],
    });
  }

  let form = useRef(null);
  const onSubmit = (e) => {
    setShowUpdating(true);
    e.preventDefault();
    const formData = new FormData(form.current);
    props.apiService
      .updateUser(formData, props.authUser.uid)
      .then((updatedUser) => {
        setShowUpdating(false);
        props.authUser.updateProfile({
          displayName: updatedUser.name,
          email: updatedUser.email,
          photoURL: updatedUser.profilePictureURL,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return props.authUser ? (
    <div>
      <div className={styles.header}>
        <h3> Profile </h3>
        <hr />
      </div>

      <div className={styles.profileBody}>
        <form onSubmit={onSubmit} ref={form}>
          <ImageDropzone
            imageId="image"
            initialImageUrl={props.authUser.photoURL}
          />

          <div className={styles.formEntry}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              defaultValue={props.authUser.email}
              className={styles.emailText}
            ></input>
          </div>

          <div className={styles.formEntry}>
            <label className={styles.label} htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              defaultValue={props.authUser.displayName}
              className={styles.nameText}
            ></input>
          </div>

          <div className={styles.formEntry}>
            <Button type="submit" variant="primary">
              Save changes
            </Button>
            {showUpdating && <div>updating</div>}
          </div>
          <div className={styles.formEntry}>
            <Button
              variant="danger"
              onClick={() =>
                deleteUser(props.authUser, props.apiService, props.history)
              }
            >
              Delete account
            </Button>
          </div>
          {showError && (
            <div>
              Oops, to delete account you need to logout and login again.
            </div>
          )}
        </form>
      </div>
    </div>
  ) : (
    <ResourceNotFound message={`No user logged in.`} />
  );
}

Profile.propTypes = {
  authUser: PropTypes.object,
  apiService: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(Profile);
