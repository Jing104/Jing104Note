import { defineClientConfig } from "vuepress/client";

export default defineClientConfig({
    enhance() {
        if (typeof window !== "undefined") {
            const models = [
                "https://cdn.jsdelivr.net/npm/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json",
                "https://cdn.jsdelivr.net/npm/live2d-widget-model-haru@1.0.5/01/assets/haru01.model.json",
                "https://cdn.jsdelivr.net/npm/live2d-widget-model-wanko@1.0.5/assets/wanko.model.json",
                "https://cdn.jsdelivr.net/npm/live2d-widget-model-z16@1.0.5/assets/z16.model.json",
            ];

            let currentIndex = 0;
            let live2dReady = false;

            const loadModel = (index: number) => {
                const oldCanvas = document.getElementById("live2dcanvas");
                if (oldCanvas) oldCanvas.remove();

                // 删除旧脚本标签（如果存在）
                const oldScript = document.getElementById("live2d-widget-js");
                if (oldScript) oldScript.remove();

                // 添加新 script 强制重新加载 widget 脚本
                const script = document.createElement("script");
                script.id = "live2d-widget-js";
                script.src = "https://cdn.jsdelivr.net/npm/live2d-widget@3.1.4/lib/L2Dwidget.min.js";
                script.onload = () => {
                    setTimeout(() => {
                        window.L2Dwidget.init({
                            model: {
                                jsonPath: models[index],
                            },
                            display: {
                                position: "left",
                                width: 150,
                                height: 300,
                                hOffset: 0,
                                vOffset: -20,
                            },
                            mobile: { show: true },
                            react: { opacityDefault: 0.7, opacityOnHover: 1 }
                        });

                        console.log("✅ 成功切换到模型：", models[index]);
                    }, 200);
                };
                document.body.appendChild(script);
            };



            const injectLive2D = () => {
                const script = document.createElement("script");
                script.src = "https://cdn.jsdelivr.net/npm/live2d-widget@3.1.4/lib/L2Dwidget.min.js";
                script.onload = () => {
                    setTimeout(() => {
                        loadModel(currentIndex);
                        injectSwitchButton();     // 添加切换按钮
                        setupAutoSwitch();        // 设置定时切换
                        setupAutoTalk();          // 设置定时说话
                    }, 800);
                };
                document.head.appendChild(script);
            };

            const injectSwitchButton = () => {
                const btn = document.createElement("button");
                btn.innerText = "切换模型";
                Object.assign(btn.style, {
                    position: "fixed",
                    bottom: "20px",
                    left: "190px",
                    zIndex: "99999",
                    padding: "6px 12px",
                    background: "#ffd6e8",
                    color: "#a30041",
                    fontWeight: "bold",
                    borderRadius: "10px",
                    border: "2px solid #ff8ec3",
                    cursor: "pointer",
                });

                btn.onclick = () => {
                    currentIndex = (currentIndex + 1) % models.length;
                    document.getElementById("live2dcanvas")?.remove();
                    setTimeout(() => loadModel(currentIndex), 200);
                };

                document.body.appendChild(btn);
            };

            const setupAutoSwitch = () => {
                setInterval(() => {
                    currentIndex = (currentIndex + 1) % models.length;
                    document.getElementById("live2dcanvas")?.remove();
                    setTimeout(() => loadModel(currentIndex), 200);
                }, 1000 * 60); // 每 60 秒自动切换一次
            };

            const setupAutoTalk = () => {
                setInterval(() => {
                    if (!live2dReady) return;

                    const widget = window.L2Dwidget || {};
                    const core = widget._widget || widget;
                    if (core && typeof core.tap === "function") {
                        core.tap(); // 自动触发说话
                    }
                }, 30000); // 每 30 秒说一句
            };

            injectLive2D();
        }
    }
});
