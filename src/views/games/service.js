import * as request from '@/libs/ajax';
import env from "../../../build/env";

const domain = env === 'development'
    ? 'http://192.168.0.3:7001'
    : env === 'production'
        ? 'http://www.url.com'
        : 'http://192.168.0.3:7001';

export const uploadDomain = domain + '/api/v1/image';
// Paramter Manage
export const paramterList = function () {
    return request.get('/api/v1/parameters');
}

export const editParamter = function (id, data) {
    return request.put('/api/v1/parameters/' + id, data);
}

// 活动管理
export const arrActiveGame = [];
export const arrActiveModel = ['', '积分赛', '好友局'];
export const arrActionStatus = ['', '生效', '等待', '过期', '失效'];

export const addActivity = function (data) {
    return request.post('/api/v1/activities', data);
}

export const activityList = function (params) {
    let strParams = '';
    for (let key in params) {
        strParams += '&' + key + '=' + params[key];
    }
    return request.get('/api/v1/activities?size=10' + strParams);
}
// 活动条目上下移动
export const moveItemUpOrDown = function (currentId, udId) {
    return request.post('/api/v1/activities/swap/' + currentId + '/' + udId);
}
// 获取活动项目列表
export const getActivityItemByPage = function (page) {
    return request.get('/api/v1/activities?size=10&page=' + page);
}
// 删除活动
export const delActivityById = function (id) {
    return request.del('/api/v1/activities/' + id);
}
// 获取活动
export const getActivityById = function (id) {
    return request.get('/api/v1/activities/' + id);
}
// 更新活动
export const updateActivityById = function (id, params) {
    return request.put('/api/v1/activities/' + id, params);
}

/*
* 角标系列操作
* */
// 添加角标
export const addSubscript = function (params) {
    return request.post('/api/v1/subscripts', params);
}

// 获取角标列表
export const getSubscriptList = function (page = 1) {
    return request.get('/api/v1/subscripts?size=10&sort=updateAt&order=desc&' + 'page=' + page);
}

// 删除指定ID的角标
export const deleteSubscriptById = function (id) {
    return request.del('/api/v1/subscripts/' + id);
}

// 更新指定ID的角标
export const updateSubscriptById = function (id, params) {
    return request.put(' /api/v1/subscripts/' + id, params);
}

// 获取所有角标
export const getAllBadgeList = function () {
    return request.get('/api/v1/subscripts');
}

// 获取所有游戏List
export const getGamesList = function (params) {
    return request.get('/api/v1/games');
}

// 获取OSS图片
export const getImgFromOSS = function (origin) {
    return domain + '/api/v1/image?imgUrl=' + encodeURI(origin);
}

/*
* 消息管理
* */
// 新增消息
export const addMessage = function (params) {
    return request.post('/api/v1/messages', params);
}
export const getMessageList = function (page = 1) {
    return request.get('/api/v1/messages?size=10&sort=createdAt&order=desc&page=' + page);
}
