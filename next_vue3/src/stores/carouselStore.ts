import { defineStore } from 'pinia'

export const useCarouselStore = defineStore('carousel', {
	// 全局状态：存储轮播图显示状态，默认显示
	state: () => ({
		isCarouselShow
			: true,
		userInfo: {
			nickname: '银蛊',
			username: 'admin',
			password: '123456'
		},
		isLogin: false
	}),
	// 可选：封装修改状态的方法（也可以直接在组件中修改状态）
	actions
		: {
			toggleCarouselShow() {
				this.isCarouselShow = !this.
					isCarouselShow
			},
			
			login(username : string, password : string) {
				if (
					username === this.userInfo.username &&
					password === this.userInfo.password
				) {
					this.isLogin = true
					return true
				} else {
					return false
				}
			},
			//修改账号信息
			updateUserInfo(nickname : string, username : string, password : string) {
				this.userInfo.nickname = nickname
				this.userInfo.username = username
				this.userInfo.password = password
				}
			}
		})