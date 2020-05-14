import api from '@/api'
import request from '@/utils/request'
import { Message } from 'element-ui';
export default {
  async getList(params) {
    try {
      const result = await request.post(api.search, params)
      console.log(result)
      if (!result.timed_out) {
        return result
      } else {
       Message({
          message: result.msg,
          type: 'warning'
        })
      }
    } catch (error) {
     Message({
        message: '网络错误，请联系管理员！',
        type: 'error'
      })
    }
  }
}
