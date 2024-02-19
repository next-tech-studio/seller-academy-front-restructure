import APIHandler from "~/services/APIHandler";
import HttpRequest from "~/services/HttpRequest";
import createRepository from "~/repositories/Repository";
import { mapper } from "~/mappers";
import { useGlobalStore } from "~/core/stores/global";
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
    headers={}
  }) {
    const APIHandlerInstance = new APIHandler();
    const HttpRequestInstance = new HttpRequest(nuxtApp);
    const api = APIHandlerInstance.getApi(method, path, params, query, page);
    return new Promise((resolve, reject) => {
      console.log("request", name);
      if (loading) {
        useGlobalStore().pendingRequest = true;
        useGlobalStore().skeletonLoading = true;
        useGlobalStore().activeRequests[name] = true;
      }
      HttpRequestInstance[api.method](api.path, payload, alert,headers)
        .then((resp) => {
          let data;
          if (model) {
            if (model.collection) {
              if (model.pagination) {
                data = mapper(resp, collection(resp, model.name), model.raw);
              } else {
                data = mapper(
                  resp,
                  noPaginationCollection(resp, model.name, model.raw),
                  model.raw
                );
              }
            } else {
              if (model.dataPath)
                data = mapper(resp[model.dataPath], model.name, model.raw);
              else data = mapper(resp, model.name, model.raw);
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
            useGlobalStore().activeRequests[name] = false;
            if (!useGlobalStore().activeRequestsExists) {
              useGlobalStore().skeletonLoading = false;
              useGlobalStore().skeleton = "";
            }
            useGlobalStore().pendingRequest = false;
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
      headers={}
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
      headers

    });
  }

  return {
    provide: {
      repos: createRepository(request),
    },
  };
});
