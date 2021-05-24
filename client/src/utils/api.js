// Parts of HTTP wrapper taken from this article:
// https://jasonwatmore.com/post/2020/04/18/fetch-a-lightweight-fetch-wrapper-to-simplify-http-requests

export class APIService {
  constructor(firebase) {
    this.firebase = firebase;
  }

  /* ----------- API FUNCTIONS ----------- */

  async registerUser() {
    const idToken = await this.getFirebaseIdToken();
    return this.POST("/1/users/register", { token: idToken });
  }

  listUsers() {
    return this.GET("/1/users", true);
  }

  createFlow(formData) {
    return this.POST("/1/flows/create", formData, true);
  }

  viewFlow(flowId) {
    return this.GET(`/1/flows/${flowId}`);
  }

  viewFlows() {
    return this.GET("/1/flows");
  }

  viewMyFlows() {
    return this.GET("/1/flows");
  }

  /* ----------- HELPER FUNCTIONS ----------- */

  getFirebaseIdToken() {
    const currentUser = this.firebase.auth().currentUser;
    if (currentUser) {
      return currentUser.getIdToken(/* forceRefresh */ true);
    }
  }

  async handleResponse(response) {
    return response.text().then((text) => {
      const isJSONResponse =
        (response.headers.get("content-type") || "").indexOf(
          "application/json"
        ) !== -1;
      const data = isJSONResponse ? JSON.parse(text) : text;

      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }

      return data;
    });
  }

  async GET(url, requireAuth = false) {
    let requestOptions = {
      method: "GET",
    };
    if (requireAuth) {
      const idToken = await this.getFirebaseIdToken();
      Object.assign(requestOptions, { headers: { authorization: idToken } });
    }
    return fetch(url, requestOptions).then(this.handleResponse);
  }

  async POST(url, body = {}, isFormData = false) {
    const idToken = await this.getFirebaseIdToken();
    let requestOptions = {
      method: "POST",
      headers: { authorization: idToken },
    };
    if (isFormData) {
      requestOptions.body = body;
    } else {
      requestOptions.body = JSON.stringify(body);
      requestOptions.headers["Content-Type"] = "application/json";
    }
    return fetch(url, requestOptions).then(this.handleResponse);
  }

  // Currently unused HTTP calls

  // async PUT(url, body) {
  //   const requestOptions = {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(body)
  //   };
  //   return fetch(url, requestOptions).then(handleResponse);
  // }

  // async DELETE(url) {
  //   const requestOptions = {
  //       method: 'DELETE'
  //   };
  //   return fetch(url, requestOptions).then(handleResponse);
  // }
}
