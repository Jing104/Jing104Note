import { defineClientConfig } from "vuepress/client";

export default defineClientConfig({
    enhance() {
        if (typeof window === "undefined") return;
        if (window.__LIVE2D_LOADED__) return;
        window.__LIVE2D_LOADED__ = true;

        // 模型列表（更多可爱角色）
        const models = [
            "https://cdn.jsdelivr.net/npm/live2d-widget-model-tsumiki@1.0.5/assets/tsumiki.model.json",
            "https://cdn.jsdelivr.net/npm/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json",
            "https://cdn.jsdelivr.net/npm/live2d-widget-model-haru@1.0.5/01/assets/haru01.model.json",
            "https://cdn.jsdelivr.net/npm/live2d-widget-model-haru@1.0.5/02/assets/haru02.model.json",
            "https://cdn.jsdelivr.net/npm/live2d-widget-model-wanko@1.0.5/assets/wanko.model.json",
            "https://cdn.jsdelivr.net/npm/live2d-widget-model-z16@1.0.5/assets/z16.model.json",
            "https://cdn.jsdelivr.net/npm/live2d-widget-model-hibiki@1.0.5/assets/hibiki.model.json",
            "https://cdn.jsdelivr.net/npm/live2d-widget-model-tororo@1.0.5/assets/tororo.model.json",
            "https://cdn.jsdelivr.net/npm/live2d-widget-model-koharu@1.0.5/assets/koharu.model.json",
            "https://cdn.jsdelivr.net/npm/live2d-widget-model-hijiki@1.0.5/assets/hijiki.model.json",
            "https://cdn.jsdelivr.net/npm/live2d-widget-model-ni-j@1.0.5/assets/ni-j.model.json",
            "https://cdn.jsdelivr.net/npm/live2d-widget-model-unitychan@1.0.5/assets/unitychan.model.json",
            "https://cdn.jsdelivr.net/npm/live2d-widget-model-chitose@1.0.5/assets/chitose.model.json",
            "https://cdn.jsdelivr.net/npm/live2d-widget-model-miku@1.0.5/assets/miku.model.json",

        ];

        let currentIndex = 0;
        let live2dReady = false;

        const loadModel = (index: number) => {
            const oldCanvas = document.getElementById("live2dcanvas");
            if (oldCanvas) oldCanvas.remove();

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
                                position: "right",         // 放在右下角不挡菜单
                                width: 130,                // 更大一点
                                height: 260,
                                hOffset: 20,
                                vOffset: -10,
                            },
                            mobile: { show: true },
                            react: { opacityDefault: 0.75, opacityOnHover: 1 }
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
            btn.innerText = "🎭";
            Object.assign(btn.style, {
                position: "fixed",
                zIndex: "99999",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#ffd6e8",
                color: "#a30041",
                fontWeight: "bold",
                fontSize: "18px",
                border: "2px solid #ff8ec3",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                cursor: "pointer",
                display: "none",
                transition: "opacity 0.3s ease",
            });

            document.body.appendChild(btn);

            const setButtonPositionNearCanvas = () => {
                const canvas = document.getElementById("live2dcanvas") as HTMLCanvasElement;
                if (!canvas) return;

                const rect = canvas.getBoundingClientRect();

                // 放在模型右上角附近（你可换成左下角等）
                const offsetX = 10;
                const offsetY = 10;
                btn.style.left = `${rect.right - btn.offsetWidth - offsetX}px`;
                btn.style.top = `${rect.top + offsetY}px`;
            };

            const bindHoverToCanvas = () => {
                const canvas = document.getElementById("live2dcanvas") as HTMLCanvasElement;
                if (!canvas) return;

                canvas.addEventListener("mouseenter", () => {
                    setButtonPositionNearCanvas();
                    btn.style.display = "block";
                });

                canvas.addEventListener("mouseleave", () => {
                    btn.style.display = "none";
                });

                btn.addEventListener("mouseenter", () => {
                    btn.style.display = "block"; // 防止快速移出消失
                });

                btn.addEventListener("mouseleave", () => {
                    btn.style.display = "none";
                });
            };

            btn.onclick = () => {
                currentIndex = (currentIndex + 1) % models.length;
                loadModel(currentIndex);
                // 稍后重新定位按钮
                setTimeout(() => {
                    setButtonPositionNearCanvas();
                    bindHoverToCanvas();
                }, 600);
            };

            // 初次模型加载后绑定
            setTimeout(() => {
                setButtonPositionNearCanvas();
                bindHoverToCanvas();
            }, 1000);
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

        // 启动加载
        setTimeout(() => {
            loadModel(currentIndex);
            injectButton();
            // setupAutoSwitch();
            setupAutoTalk();
        }, 500);
    }
});
