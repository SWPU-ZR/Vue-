import axios from "axios";
import {MessageBox} from "element-ui"
import router from "@/router";

//给所有axios请求的前缀加上/api
axios.defaults.baseURL = '/api';
//请求响应时长超过5秒就停止并报错
axios.defaults.timeout = 5000;

//配置请求拦截器：当前端将请求发送给后端之前，被拦截
axios.interceptors.request.use((req) => {
    //将token添加到所有请求的请求头中
    req.headers.Authorization = localStorage.user_token
    return req;
})

//配置响应拦截器：当后端将请求结果返回到前端组件时，被拦截。
axios.interceptors.response.use(
    //响应成功被第一个函数拦截下来
    (res) => {
        return res.data;
    },
    //响应失败被第二个函数拦截下来
    (err) => {
        //401为身份认证失败
        if(err.response?.status==401){//?用于判断err是否有response
            MessageBox.alert('登录已过期，请重新登陆', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  router.replace("/login")
                }
              });
        }
        return Promise.reject(err.message)//抛出报错
    }
)

