import axios from 'axios';
import env from "../../build/env";

const ajaxUrl = env === 'development'
    ? 'https://192.168.28.128:7001'
    : env === 'production'
        ? 'https://www.url.com'
        : 'https://192.168.28.128:7001';

const request = axios.create({
    base: ajaxUrl,
    timeout: 30000
});

export const post = function (url, data) {
    data = data || null;
    return new Promise((resolve, reject) => {
        request.post(url, data).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error.response.data);
        });
    });
};

export const get = function (url, data) {
    data = data || null;
    return new Promise((resolve, reject) => {
        request.get(url, data).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error.response.data);
        });
    });
};

export const del = function (url) {
    return new Promise((resolve, reject) => {
        request.delete(url).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error.response.data);
        });
    });
}

export const put = function (url, data) {
    return new Promise((resolve, reject) => {
        request.put(url, data).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error.response.data);
        });
    });
}
