import axios from 'axios'
import qs from 'qs'
// 默认超时设置
axios.defaults.timeout = 60000
// 相对路径设置
// 生产环境
// axios.defaults.baseURL ='http://139.224.61.12:8083/api';
//开发环境
// axios.defaults.baseURL = '/mock';
//后端
// axios.defaults.baseURL = '/api';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8;'
//http request 拦截器
axios.interceptors.request.use(
  config => {
    /**
     // 获取token
    const token = localStorage.getItem('cc_token');
    // 设置参数格式
    if(!config.headers['Content-Type']){
      config.headers = {
        'Content-Type':'application/json',
      };
    }
    // 添加token到headers
    if(token){
      config.headers.token = token
    }
    // 鉴权参数设置
    if(config.method === 'get'){
       //get请求下 参数在params中，其他请求在data中
      config.params = config.params || {};
      let json = JSON.parse(JSON.stringify(config.params));
      //一些参数处理
    }else{
      config.data = config.data || {};
      //一些参数处理
    }
     */
    if (config.method === 'post') {
      if(config.headers['Content-Type'] === "multipart/form-data"){
        console.log(config)
        console.log('form data')
      } else {
        config.data = qs.stringify(config.data);
      }
      
      
    }
    
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
//http response 拦截器
axios.interceptors.response.use(
  response => {
    let {status, data} = response
    if (status !== 200 && status !== 201 && status !== 204) {
      console.log('网络异常，请刷新或者重试!')
      return Promise.reject('网络异常!')
    }
    if (data.code === 401) {
        // store.commit('login/SET_SHOW_LOGIN', true)
        // store.dispatch('login/logout')
        // return Promise.resolve({
        //   code: -1,
        //   msg: data.msg
        // })
        console.log("data.code is 401")
      } else {
        return Promise.resolve(data)
      }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
);

/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        if (response.status=== 200) {
          //返回成功处理  这里传的啥 后续调用的时候 res就是啥
          resolve(response); 
        } else {
          //错误处理
          console.log("get 请求错误")
        }
      })
      .catch(err => {
        reject(err);
        let message = '请求失败！请检查网络';
        //错误返回
        if (err.response) message = err.response.data.message;
        console.log(message)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data,config = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data,config)
      .then(response => {
        console.log("post==>",response)
        if(response.status === 200){
          resolve(response);
        }else{
          resolve("error")
        }
      }, err => {
        reject(err);
        let message = '请求失败！请检查网络';
        if (err.response) message = err.response.data.message;
        console.log(message)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        if (response.data.code === 200) {
          resolve(response.data.data);
        } else {
          console.log(response.data.msg)
        }
      }, err => {
        reject(err);
        let message = '请求失败！请检查网络';
        if (err.response) message = err.response.data.message;
        console.log(message)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        if (response.data.code === 200) {
          resolve(response.data.data);
        } else {
          console.log(response.data.msg)
        }
      }, err => {
        reject(err);
        let message = '请求失败！请检查网络';
        if (err.response) message = err.response.data.message;
        console.log(message)
      })
  })
}

export function del(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, data)
      .then(response => {
        if (response.data.code === 200) {
          resolve(response.data.data);
        } else {
          console.log(response.data.msg)
        }
      }, err => {
        reject(err);
        let message = '请求失败！请检查网络';
        if (err.response) message = err.response.data.message;
        console.log(message)
      })
  })
}