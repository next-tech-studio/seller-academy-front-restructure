import user from "~/mappers/models/schema/user";

export default (request) => ({
    checkUserExists(payload) {
        return request({
            name: 'checkUserExists',
            method: 'post',
            path: '/exists',
            alert: false,
            loading: true
        }, payload)
    },
    login(payload) {
        return request({
            name: 'login',
            method: 'post',
            path: '/login',
            loading: true,
            alert: false,
            model: {name: user}

        }, payload)
    },
    sendRegistrationCode(payload) {
        return request({
            name: 'sendRegistrationCode',
            method: 'post',
            path: '/register/generate',
            loading: true
        }, payload)
    },
    validateRegistrationCode(payload) {
        return request({
            name: 'validateRegistrationCode',
            method: 'post',
            path: '/register/validate',
            loading: true
        }, payload)
    },
    register(payload) {
        return request({
            name: 'register',
            method: 'post',
            path: '/register',
            loading: true
        }, payload)
    },
    sendResetPasswordCode(payload) {
        return request({
            name: 'sendResetPasswordCode',
            method: 'post',
            path: '/reset/generate',
            loading: true
        }, payload)
    },
    validateResetPasswordCode(payload) {
        return request({
            name: 'validateResetPasswordCode',
            method: 'post',
            path: '/reset/validate',
            loading: true
        }, payload)
    },
    changePassword(payload) {
        return request({
            name: 'changePassword',
            method: 'post',
            path: '/change_password',
            loading: true
        }, payload)
    },
    logout(payload) {
        return request({
            name: 'logout',
            method: 'post',
            path: '/logout',
            loading: true
        }, payload)
    },
})