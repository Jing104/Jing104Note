export default function setupLive2D() {
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
        "/live2d-widget-models/packages/live2d-widget-model-z16/assets/z16.model.json",
    ];

    let currentModelIndex = 0;

    // 创建容器
    const container = document.createElement('div');
    Object.assign(container.style, {
        position: 'fixed',
        left: '30px',
        bottom: '0',
        width: '140px',
        height: '200px',
        zIndex: '99998',
        pointerEvents: 'auto'
    });
    document.body.appendChild(container);

    // 创建按钮容器
    const btnContainer = document.createElement('div');
    Object.assign(btnContainer.style, {
        position: 'absolute',
        bottom: '0',
        left: '110px',
        zIndex: '99999',
        display: 'none',
        pointerEvents: 'auto'
    });

    const btnBaseStyle = `
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
    const btnHoverStyle = `
    transform: scale(1.05);
    background: linear-gradient(145deg, #ffe5f5, #ffd6e8);
  `;

    function applyCanvasStyle(canvas: HTMLCanvasElement) {
        canvas.removeAttribute('style');
        canvas.style.pointerEvents = 'auto';
        canvas.style.transform = 'scale(1)';
        canvas.style.opacity = '1';
        canvas.style.imageRendering = 'auto';
        canvas.style.width = '100px';
        canvas.style.height = '200px';
        canvas.style.outline = 'none';
        canvas.style.border = 'none';
        canvas.style.boxShadow = 'none';
        canvas.style.transform = 'translateZ(0)';
        canvas.style.willChange = 'transform';
    }

    function loadModel(index: number) {
        const oldCanvas = document.getElementById('live2dcanvas');
        if (oldCanvas) oldCanvas.remove();

        // @ts-ignore
        window.L2Dwidget.init({
            model: {
                jsonPath: modelList[index],
            },
            display: {
                position: 'left',
                width: 100,
                height: 200,
                hOffset: 30,
                vOffset: 0,
            },
            mobile: { show: true },
            react: {
                opacityDefault: 0.8,
                opacityOnHover: 1
            }
        });

        const observer = new MutationObserver(() => {
            const canvas = document.getElementById('live2dcanvas') as HTMLCanvasElement;
            if (canvas) {
                observer.disconnect();
                canvas.style.display = 'none';
                setTimeout(() => {
                    applyCanvasStyle(canvas);
                    canvas.style.display = 'block';
                    container.appendChild(canvas);
                    container.style.pointerEvents = 'auto';
                }, 400);
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    loadModel(currentModelIndex);

    // 创建按钮
    const createButton = (text: string, onClick: () => void) => {
        const btn = document.createElement('button');
        btn.innerText = text;
        btn.setAttribute('style', btnBaseStyle);
        btn.addEventListener('mouseenter', () => btn.setAttribute('style', btnBaseStyle + btnHoverStyle));
        btn.addEventListener('mouseleave', () => btn.setAttribute('style', btnBaseStyle));
        btn.addEventListener('click', onClick);
        return btn;
    };

    const btn1 = createButton('换模型', () => {
        currentModelIndex = (currentModelIndex + 1) % modelList.length;
        loadModel(currentModelIndex);
    });

    const btn2 = createButton('说句话', () => {
        console.log('👋 功能待实现');
    });

    btnContainer.appendChild(btn1);
    btnContainer.appendChild(btn2);
    container.appendChild(btnContainer);

    // 显示/隐藏按钮
    container.addEventListener('mouseenter', () => btnContainer.style.display = 'block');
    container.addEventListener('mouseleave', () => btnContainer.style.display = 'none');
}
