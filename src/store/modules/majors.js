//在js里无法直接使用this.$api,所以需要引入api
import api from '@/api'

export default {
    //模块化必须要加命名空间
    namespaced: true,
    state: {
        //专业数据的初始值
        majors: [],
        total:0
    },
    mutations: {
        //将数据保存到state
        SET_MAJORS(state, payLoad) {
            state.majors = payLoad.rows
            state.total=payLoad.total
        }
    },
    actions: {
        //获取专业数据
        async getMajorsAsync(context,payLoad) {
            const res = await api.majors.get(payLoad)
            if (res.code) {
                //调用mutations方法,将返回的数据传给mutations
                context.commit("SET_MAJORS", res.data)
            }
        }
    }
}