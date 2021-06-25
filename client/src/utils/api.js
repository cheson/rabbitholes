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
    return this.GET("/1/users", undefined, true);
  }

  updateUser(formData, userId) {
    console.log(formData, userId);
    return this.PUT(`/1/users/${userId}`, formData, true);
  }

  deleteUser(userId) {
    return this.DELETE(`/1/users/${userId}`);
  }

  createFlow(formData) {
    return this.POST("/1/flows/create", formData, true);
  }

  viewFlow(flowId) {
    return this.GET(`/1/flows/${flowId}`);
  }

  viewFlows(searchParams = {}) {
    // text or uid
    return this.GET("/1/flows", searchParams);
  }

  deleteFlow(flowId) {
    return this.DELETE(`/1/flows/${flowId}`);
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

  formQueryString(obj) {
    return Object.keys(obj)
      .map((key) => key + "=" + obj[key])
      .join("&");
  }

  async GET(urlBase, searchParamsObj = {}, requireAuth = false) {
    let url = urlBase + "?" + this.formQueryString(searchParamsObj);
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

  async PUT(url, body, isFormData = false) {
    const idToken = await this.getFirebaseIdToken();
    let requestOptions = {
      method: "PUT",
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

  async DELETE(url) {
    const idToken = await this.getFirebaseIdToken();
    const requestOptions = {
      method: "DELETE",
      headers: { authorization: idToken },
    };
    return fetch(url, requestOptions).then(this.handleResponse);
  }
}
