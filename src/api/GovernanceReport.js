import request from '@/utils/request'
export const getReportByName = (name) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/tttt',
            method: 'get',
        }).then(res => {
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })
}