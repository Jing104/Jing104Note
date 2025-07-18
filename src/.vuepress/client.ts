import { defineClientConfig } from '@vuepress/client'

export default defineClientConfig({
    enhance() {
        if (typeof window !== 'undefined') {
            const script = document.createElement('script')
            script.src = 'https://unpkg.com/live2d-widget@3.1.4/lib/L2Dwidget.min.js'
            script.async = true
            script.onload = () => {
                import('./live2d-setup.js').then((mod) => {
                    mod.default()
                })
            }
            document.body.appendChild(script)
        }
    }
})
