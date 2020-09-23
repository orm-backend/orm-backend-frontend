const http = {
  baseURL:
    process.env.NODE_ENV === "development" ? process.env.VUE_APP_URL : "",

  getParams: {
    method: "GET",
    mode: "cors",
    cache: "default",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  },

  postParams: {
    method: "POST",
    mode: "cors",
    cache: "default",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  },

  post: async function (url, data) {
    let request, response, params, result;

    params = Object.assign({}, this.getParams);
    request = new Request(this.baseURL + "/token", params);
    response = await fetch(request);

    if (response) {
      result = await response.json();
      data._token = result.csrf_token;
    } else {
      throw new Error("Something went wrong on api server.");
    }

    params = Object.assign({}, this.postParams);
    params.body = JSON.stringify(data);
    request = new Request(this.baseURL + url, params);
    response = await fetch(request);

    if (response.ok || response.status == 422) {
      try {
        result = await response.json(); // Can be empty
      } catch (e) {}

      return result;
    }

    throw new Error("Something went wrong on api server.");
  },

  get: async function (url) {
    let request, response, params, result;

    params = Object.assign({}, this.getParams);
    request = new Request(this.baseURL + url, params);
    response = await fetch(request);

    if (response.ok) {
      result = await response.json();
      return result;
    }

    throw new Error("Something went wrong on api server.");
  },
};

export default http;
