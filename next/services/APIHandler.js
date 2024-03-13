import LocalStorage from "./LocalStorage";
import { useLocaleStore } from "~/stores/locale";

class APIHandler {
    getRoute(path, params) {
        let route
        let match = path.match(/:[a-zA-Z]{1,}/g);
        if (match != null) {
            match = match.map(param => param.replace(':', ''))
            match.forEach(m => {
                if (Object.prototype.hasOwnProperty.call(params, m)) {
                    route = path.replace(`:${m}`, params[m]);
                } else {
                    console.error('ERROR, requiredParamNotFount')
                }
            })
        }
        return route;
    }

    getApi(method, path, params, query, page) {
        const locale = useLocaleStore().locale
        let route = this.getRoute(path, params);
        return {
            method,
            path:  useRuntimeConfig().public.apiBase + `/${locale}/api` + path + this.prepareQueryPagination(query, page)
        }
    }

    prepareQueryPagination(query, page) {
        let fragment = '';

        if (query == null || query == '') {
            if (page != null) fragment += '?page=' + page;
        } else {
            fragment += query;
            if (page != null) fragment += '&page=' + page;
        }
        return fragment;
    }

    getDeepData(iteratorData, dataPath = '') {
        let keys = dataPath.split('.');
        if (Object.prototype.hasOwnProperty.call(iteratorData, keys[0])) iteratorData = iteratorData[keys[0]];
        return (keys.length == 1) ? iteratorData : keys.shift() && this.getDeepData(iteratorData, keys.join('.'));
    }

    getCommitData(commitObject, resp, state) {
        if (Object.prototype.hasOwnProperty.call(commitObject, 'data')) {
            return commitObject.data;
        } else if (Object.prototype.hasOwnProperty.call(commitObject, 'dataPath')) {
            return this.getDeepData(resp, commitObject.dataPath)
        } else if (Object.prototype.hasOwnProperty.call(commitObject, 'dataClosure')) {
            return commitObject.dataClosure(resp, state);
        }
    }

    performCommits(state, commit, commits, resp) {
        if (commits.length) {
            commits.forEach((commitObject) => {
                commit(commitObject.name, {
                    key: commitObject.key,
                    data: this.getCommitData(commitObject, resp, state),
                    LSPersist: commitObject.localStoragePersist
                });
            })
        }
    }

    setInLocalStorage(payload) {
        if (payload.LSPersist) {
            LocalStorage.set(payload.key, payload.data);
        }
    }
}

export default APIHandler;