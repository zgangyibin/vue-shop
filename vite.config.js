import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{//本地服务器的配置
    proxy:{//配置请求代理
      "/dapi":{// 带有/dapi的地址都会把请求转发到target配置的地址
        target:"https://8i98.com",
        changeOrigin:true,   //请求头的origin属性target属性一致
      }
    }
  }
})
