import APIHandler from "~/services/APIHandler";
import HttpRequest from "~/services/HttpRequest";
import createRepository from "~/repositories/Repository";
import { mapper } from "~/mappers";
import collection from "~/mappers/models/schema/collection";
import noPaginationCollection from "~/mappers/models/schema/noPaginationCollection";

export default defineNuxtPlugin((nuxtApp) => {
  function generalRequest({
    name,
    method,
    path,
    params,
    payload = null,
    loading = true,
    alert = null,
    query = null,
    page = null,
    commits = null,
    model = null,
  }) {
    const APIHandlerInstance = new APIHandler();
    const HttpRequestInstance = new HttpRequest(nuxtApp);

    const api = APIHandlerInstance.getApi(method, path, params, query, page);
    return new Promise((resolve, reject) => {
      if (loading) {
        // bus.emit('setLoading', true)
      }
      HttpRequestInstance[api.method](api.path, payload, alert, loading)
        .then((resp) => {
          // APIHandlerInstance.performCommits(store.state, store.commit, commits, resp)
          let data;
          if (model) {
            if (model.collection) {
              if (model.pagination) {
                data = mapper(resp, collection, model.raw, model.name);
              } else {
                data = mapper(
                  resp,
                  noPaginationCollection,
                  model.raw,
                  model.name
                );
              }
            } else {
              data = mapper(resp.data || resp, model.name, model.raw);
            }
          } else {
            data = resp;
          }
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        })
        .finally(() => {
          if (loading) {
            // bus.emit('setLoading', false)
          }
        });
    });
  }

  function request(
    {
      name,
      method,
      path,
      params = null,
      loading = true,
      query = null,
      page = null,
      alert = true,
      commits = [],
      model = null,
    },
    payload = null
  ) {
    return generalRequest({
      name,
      method,
      path,
      params,
      payload,
      loading,
      alert,
      query,
      page,
      commits,
      model,
    });
  }

  return {
    provide: {
      repos: createRepository(request),
    },
  };
});
