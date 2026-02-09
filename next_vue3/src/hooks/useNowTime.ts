// src/hooks/useNowTime.ts
import { ref, onMounted, onUnmounted } from 'vue'

// 封装成组合式函数，对外暴露时间变量
export const useNowTime = () => {
  const nowTime = ref('')
  let timer: NodeJS.Timeout | null = null

  const formatTime = (date: Date) => {
    const padZero = (num: number) => num.toString().padStart(2, '0')
    const weekArr = ['日', '一', '二', '三', '四', '五', '六']
    const year = date.getFullYear()
    const month = padZero(date.getMonth() + 1)
    const day = padZero(date.getDate())
    const week = weekArr[date.getDay()]
    const hours = padZero(date.getHours())
    const minutes = padZero(date.getMinutes())
    const seconds = padZero(date.getSeconds())
    return `${year}-${month}-${day} 星期${week} ${hours}:${minutes}:${seconds}`
  }

  const updateTime = () => {
    nowTime.value = formatTime(new Date())
  }

  onMounted(() => {
    updateTime()
    timer = setInterval(updateTime, 1000)
  })

  onUnmounted(() => {
    timer && clearInterval(timer)
  })

  // 暴露响应式时间变量
  return { nowTime }
}