export class APIService {
  constructor(firebase) {
    this.firebase = firebase;
  }

  registerUser() {
    this.firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        // Send token to your backend via HTTPS
        // ...
        console.log(`idToken is: ${idToken}`);

        fetch("/1/users/register", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: idToken }),
        }).then((res) => console.log(res.status));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  listUsers() {
    return fetch("/1/users").then((res) => res.json());
  }
}
