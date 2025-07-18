import { defineClientConfig } from '@vuepress/client'

export default defineClientConfig({
    enhance({ app, router, siteData }) {
        if (typeof window !== 'undefined') {
            const script = document.createElement("script");
            script.src = "https://unpkg.com/live2d-widget@3.1.4/lib/L2Dwidget.min.js";
            script.async = true;

            script.onload = () => {
                const modelList = [
                    "/live2d-widget-models/packages/live2d-widget-model-haru/01/assets/haru01.model.json",
                    "/live2d-widget-models/packages/live2d-widget-model-haru/02/assets/haru02.model.json",
                    "/live2d-widget-models/packages/live2d-widget-model-haruto/assets/haruto.model.json",
                    "/live2d-widget-models/packages/live2d-widget-model-hibiki/assets/hibiki.model.json",
                    "/live2d-widget-models/packages/live2d-widget-model-hijiki/assets/hijiki.model.json",
                    "/live2d-widget-models/packages/live2d-widget-model-koharu/assets/koharu.model.json",
                    "/live2d-widget-models/packages/live2d-widget-model-shizuku/assets/shizuku.model.json",
                    "/live2d-widget-models/packages/live2d-widget-model-tororo/assets/tororo.model.json",
                    "/live2d-widget-models/packages/live2d-widget-model-wanko/assets/wanko.model.json",
                    "/live2d-widget-models/packages/live2d-widget-model-z16/assets/z16.model.json"
                ];


                let currentModelIndex = 0;

                // 创建外层容器
                const container = document.createElement('div');
                container.style.position = 'fixed';
                container.style.left = '30px';
                container.style.bottom = '0';
                container.style.width = '140px';
                container.style.height = '200px';
                container.style.zIndex = '99998';
                container.style.pointerEvents = 'none';
                document.body.appendChild(container);

                // 按钮容器
                const btnContainer = document.createElement('div');
                btnContainer.style.position = 'absolute';
                btnContainer.style.bottom = '0';
                btnContainer.style.left = '110px';
                btnContainer.style.zIndex = '99999';
                btnContainer.style.display = 'none';
                btnContainer.style.pointerEvents = 'auto';

                const cuteBtnStyle = `
          display: inline-block;
          padding: 6px 14px;
          margin-left: 6px;
          border-radius: 20px;
          border: 2px solid #ff8ec3;
          background: linear-gradient(145deg, #ffd6e8, #ffe5f5);
          color: #a30041;
          font-weight: bold;
          font-size: 14px;
          box-shadow: 2px 2px 6px rgba(0,0,0,0.15);
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease;
        `;
                const cuteBtnHover = `
          transform: scale(1.05);
          background: linear-gradient(145deg, #ffe5f5, #ffd6e8);
        `;

                function applyCanvasStyle(canvas: HTMLCanvasElement) {
                    canvas.removeAttribute('style');
                    canvas.style.pointerEvents = 'none';
                    canvas.style.transform = 'scale(1)';
                    canvas.style.opacity = '1';
                    canvas.style.imageRendering = 'auto';
                    canvas.style.width = '100px';
                    canvas.style.height = '200px';
                    canvas.style.outline = 'none';
                    canvas.style.border = 'none';
                    canvas.style.boxShadow = 'none';
                }

                function loadModel(index: number) {
                    const oldCanvas = document.getElementById("live2dcanvas");
                    if (oldCanvas) oldCanvas.remove();

                    // 先初始化 Live2D，但不立刻插入 canvas
                    // @ts-ignore
                    window.L2Dwidget.init({
                        model: {
                            jsonPath: modelList[index],
                        },
                        display: {
                            position: "left",
                            width: 100,
                            height: 200,
                            hOffset: 30,
                            vOffset: 0
                        },
                        mobile: {
                            show: true
                        },
                        react: {
                            opacityDefault: 0.8,
                            opacityOnHover: 1
                        }
                    });

                    // 使用 MutationObserver 等待 canvas 插入
                    const observer = new MutationObserver(() => {
                        const canvas = document.getElementById("live2dcanvas") as HTMLCanvasElement;
                        if (canvas) {
                            observer.disconnect();

                            // 隐藏 canvas 一小段时间，等模型完全加载再显示
                            canvas.style.display = 'none';
                            setTimeout(() => {
                                applyCanvasStyle(canvas);
                                canvas.style.display = 'block';
                                container.appendChild(canvas);
                                container.style.pointerEvents = 'auto';
                            }, 400); // 延迟显示，避免虚化、放大
                        }
                    });

                    observer.observe(document.body, { childList: true, subtree: true });
                }

                loadModel(currentModelIndex);

                // 按钮1：切换模型
                const btn1 = document.createElement('button');
                btn1.innerText = '换模型';
                btn1.setAttribute('style', cuteBtnStyle);
                btn1.addEventListener('mouseenter', () => btn1.setAttribute('style', cuteBtnStyle + cuteBtnHover));
                btn1.addEventListener('mouseleave', () => btn1.setAttribute('style', cuteBtnStyle));
                btn1.addEventListener('click', () => {
                    currentModelIndex = (currentModelIndex + 1) % modelList.length;
                    loadModel(currentModelIndex);
                });

                // 按钮2：说句话（预留）
                const btn2 = document.createElement('button');
                btn2.innerText = '说句话';
                btn2.setAttribute('style', cuteBtnStyle);
                btn2.addEventListener('mouseenter', () => btn2.setAttribute('style', cuteBtnStyle + cuteBtnHover));
                btn2.addEventListener('mouseleave', () => btn2.setAttribute('style', cuteBtnStyle));

                btnContainer.appendChild(btn1);
                btnContainer.appendChild(btn2);
                container.appendChild(btnContainer);

                // Hover 显示按钮
                container.addEventListener("mouseenter", () => {
                    btnContainer.style.display = "block";
                });
                container.addEventListener("mouseleave", () => {
                    btnContainer.style.display = "none";
                });
            };

            document.body.appendChild(script);
        }
    }
});
