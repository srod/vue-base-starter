import Vue from "vue";

class BaseApi {
  /**
   * The constructor of the BaseApi.
   *
   * @param {string} endpoint   The endpoint being used.
   * @param {Object} parameters The parameters for the request.
   */
  constructor(endpoint, parameters = {}) {
    this.endpoint = endpoint;
    this.parameters = parameters;
  }

  /**
   * Method used to set the base URL.
   *
   * @param {String} url The given url.
   *
   * @returns {BaseApi} The instance of the api.
   */
  setBaseURL(url) {
    Vue.$http.defaults.baseURL = url;

    return this;
  }

  /**
   * Method used to remove the base URL.
   *
   * @returns {BaseApi} The instance of the api.
   */
  removeBaseURL() {
    delete Vue.$http.defaults.baseURL;

    return this;
  }

  /**
   * Method used to set the headers.
   *
   * @param {Object} headers The given headers.
   *
   * @returns {BaseApi} The instance of the api.
   */
  setHeaders(headers = {}) {
    Object.keys(headers).forEach(key => {
      Vue.$http.defaults.headers.common[key] = headers[key];
    });

    return this;
  }

  /**
   * Method used to remove the headers.
   *
   * @param {Object} headers The given headers.
   *
   * @returns {BaseApi} The instance of the api.
   */
  removeHeaders(headers = {}) {
    Object.keys(headers).forEach(key => {
      delete Vue.$http.defaults.headers.common[key];
    });

    return this;
  }

  /**
   * Method used to set the query parameters.
   *
   * @param {Object} parameters The given parameters.
   *
   * @returns {BaseApi} The instance of the api.
   */
  setParameters(parameters) {
    Object.keys(parameters).forEach(key => {
      this.parameters[key] = parameters[key];
    });

    return this;
  }

  /**
   * Method used to set a single parameter.
   *
   * @param {string} parameter The given parameter.
   * @param {*} value The value to be set.
   *
   * @returns {BaseApi} The instance of the api.
   */
  setParameter(parameter, value) {
    if (!parameter) {
      throw new Error("Parameter is missing");
    }
    this.parameters[parameter] = value;

    return this;
  }

  /**
   * Method used to remove all the parameters.
   *
   * @param {Array} parameters The given parameters.
   *
   * @returns {BaseApi} The instance of the api.
   */
  removeParameters(parameters) {
    parameters.forEach(parameter => {
      delete this.parameters[parameter];
    });

    return this;
  }

  /**
   * Method used to remove a single parameter.
   *
   * @param {string} parameter The given parameter.
   *
   * @returns {BaseApi} The instance of the api.
   */
  removeParameter(parameter) {
    if (!parameter) {
      throw new Error("Parameter is missing");
    }
    delete this.parameters[parameter];

    return this;
  }

  /**
   * The method used to perform an AJAX-request.
   *
   * @param {string}      requestType The request type.
   * @param {string}      url         The URL for the request.
   * @param {Object|null} data        The data to be send with the request.
   *
   * @returns {Promise} The result in a promise.
   */
  submit(requestType, url, data = null) {
    if (!requestType) {
      throw new Error("requestType is missing");
    }
    if (!url) {
      throw new Error("url is missing");
    }
    return new Promise((resolve, reject) => {
      Vue.$http[requestType](url + this.getParameterString(), data)
        .then(response => {
          resolve(response.data);
        })
        .catch(({ response }) => {
          if (response) {
            reject(response.data);
          } else {
            reject();
          }
        });
    });
  }

  /**
   * Method used to fetch all items from the API.
   *
   * @returns {Promise} The result in a promise.
   */
  all() {
    return this.submit("get", `/${this.endpoint}`);
  }

  /**
   * Method used to fetch a single item from the API.
   *
   * @param {int} id The given identifier.
   *
   * @returns {Promise} The result in a promise.
   */
  find(id) {
    if (!id) {
      throw new Error("id is missing");
    }
    return this.submit("get", `/${this.endpoint}/${id}`);
  }

  /**
   * Method used to create an item.
   *
   * @param {Object} item The given item.
   *
   * @returns {Promise} The result in a promise.
   */
  create(item) {
    if (!item) {
      throw new Error("item is missing");
    }
    return this.submit("post", `/${this.endpoint}`, item);
  }

  /**
   * Method used to update an item.
   *
   * @param {int}    id   The given identifier.
   * @param {Object} item The given item.
   *
   * @returns {Promise} The result in a promise.
   */
  update(id, item) {
    if (!id) {
      throw new Error("id is missing");
    }
    if (!item) {
      throw new Error("item is missing");
    }
    return this.submit("put", `/${this.endpoint}/${id}`, item);
  }

  /**
   * Method used to destroy an item.
   *
   * @param {int} id The given identifier.
   *
   * @returns {Promise} The result in a promise.
   */
  destroy(id) {
    if (!id) {
      throw new Error("id is missing");
    }
    return this.submit("delete", `/${this.endpoint}/${id}`);
  }

  /**
   * Method used to transform a parameters object to a parameters string.
   *
   * @returns {string} The parameter string.
   */
  getParameterString() {
    const keys = Object.keys(this.parameters);

    const parameterStrings = keys
      .filter(key => !!this.parameters[key])
      .map(key => `${key}=${this.parameters[key]}`);

    return parameterStrings.length === 0
      ? ""
      : `?${parameterStrings.join("&")}`;
  }
}

export default BaseApi;
