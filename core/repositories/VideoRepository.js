export default (request) => ({
    sectionList(payload) {
        return request({
            name: 'sectionList',
            method: 'get',
            path: '/videos/section/list',
            loading: true,
            alert: false,
            page: payload.page,
        }, payload)
    },

    sectionCommon(payload) {
        return request({
            name: 'sectionCommon',
            method: 'get',
            path: '/videos/section/common',
            loading: true,
            alert: false
        }, payload)
    },

    archiveList(payload) {
        return request({
            name: 'archiveList',
            method: 'get',
            path: '/videos/archive/list',
            loading: true,
            alert: false,
            page: payload.page
        }, payload)
    },

    archiveCommon(payload) {
        return request({
            name: 'archiveCommon',
            method: 'get',
            path: '/videos/archive/common',
            loading: true,
            alert: false
        }, payload)
    },

    show(payload) {
        return request({
            name: 'show',
            method: 'get',
            path: `/video/${payload.slug}`,
            loading: true,
            alert: false
        })
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