import { defineClientConfig } from "vuepress/client";

export default defineClientConfig({
    enhance() {
        if (typeof window !== "undefined") {
            // 所有逻辑都在这里包裹起来
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

                // 移除旧脚本
                const oldScript = document.getElementById("live2d-widget-js");
                if (oldScript) oldScript.remove();

                const script = document.createElement("script");
                script.id = "live2d-widget-js";
                script.src = "https://cdn.jsdelivr.net/npm/live2d-widget@3.1.4/lib/L2Dwidget.min.js";
                script.onload = () => {
                    setTimeout(() => {
                        if (typeof window.L2Dwidget !== "undefined") {
                            window.L2Dwidget.init({
                                model: { jsonPath: models[index] },
                                display: {
                                    position: "left",
                                    width: 150,
                                    height: 300,
                                    hOffset: 0,
                                    vOffset: -20,
                                },
                                mobile: { show: true },
                                react: { opacityDefault: 0.7, opacityOnHover: 1 },
                            });

                            console.log("✅ 成功切换到模型：", models[index]);
                            live2dReady = true;
                        }
                    }, 300);
                };
                document.body.appendChild(script);
            };

            const injectButton = () => {
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
                    loadModel(currentIndex);
                };

                document.body.appendChild(btn);
            };

            const setupAutoSwitch = () => {
                setInterval(() => {
                    currentIndex = (currentIndex + 1) % models.length;
                    loadModel(currentIndex);
                }, 60 * 1000);
            };

            const setupAutoTalk = () => {
                setInterval(() => {
                    if (!live2dReady) return;

                    const widget = window.L2Dwidget || {};
                    const core = widget._widget || widget;
                    if (core && typeof core.tap === "function") {
                        core.tap();
                    }
                }, 30000);
            };

            // 👇 初始化入口
            setTimeout(() => {
                loadModel(currentIndex);
                injectButton();
                setupAutoSwitch();
                setupAutoTalk();
            }, 500);
        }
    },
});
