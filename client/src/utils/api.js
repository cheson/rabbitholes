export class APIService {
  constructor(firebase) {
    this.firebase = firebase;
  }

  // TODO: abstract out to a post(url, data) api that will always include the firebase current user code
  // or "withAuthentication"

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

  createFlow(formData) {
    fetch("/1/flows/create", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", JSON.stringify(response)));
  }

  viewFlow(flowId) {
    return fetch(`/1/flows/${flowId}`).then((response) => response.json());
    // TODO: figure out json parse error checking with promises
    // .catch((error) => console.error("Error:", error))
    // .then((response) => console.log("Success:", JSON.stringify(response)));
  }
}
