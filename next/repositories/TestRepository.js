export default (request) => ({
    all(payload) {
        return request({
            name: 'all',
            method: 'get',
            path: '/',
            params: null,
            loading: true,
            query: null,
            page: null,
            alert: false,
            commits: []
        }, payload)
    },

    show(id) {
        // return $axios.get(`${resource}/${id}`)
    },

    create(payload) {
        // return $axios.post(`${resource}`, payload)
    },

    update(id, payload) {
        // return $axios.post(`${resource}/${id}`, payload)
    },

    delete(id) {
        // return $axios.delete(`${resource}/${id}`)
    }
})