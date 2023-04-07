import Vue from 'vue'
import Vuex from 'vuex'

import majors from './modules/majors'

Vue.use(Vuex)

export default new Vuex.Store({
	//存放菜单数据
	state: {
		menus: []

	},
	mutations: {
		SET_MENUS(state,payLoad){
			state.menus=payLoad
		}
	},


	modules: {
		majors
	}
})
