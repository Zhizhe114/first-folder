import { ref } from 'vue'
import { defineStore } from 'pinia'

//创建仓库user
export const useUserStore = defineStore('user', () => {
	const account = ref('admin')//存储账号密码
	const password = ref('123456')
	const isLogin = ref(localStorage.getItem('isLogin') === 'true')//登录状态
	
	
//登录逻辑 输入框值等于仓库值
	const login = (user:string,pwd:string) => {
		if(user === account.value && pwd === password.value){
			isLogin.value = true//修改登录状态
			localStorage.setItem('isLogin','true')//本地存储中修改登录状态
			return true //返回true,给登录页面的登录判断用
		}
		return false
	}
	
	
	
	return {account,password,isLogin,login}
})
