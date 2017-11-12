/*
* 需要实现鼠标划过动画的盒子必须是如下格式：
*  <div class="xxxx">
    <div class="figureImgBox" id="figureImgBox">
        <progress max="100"></progress>
    </div>
</div>
*
* context: 为最外层大盒子 ，应获取后传入 （class/id/tag都可以）
* imgUrlList 为图片地址对象 有两个属性：defaultUrl：默认显示图片地址 mouseEnterUrl：鼠标划入显示图片地址（九宫格图）
* defaultFrames 为九宫格图片的张数 可选属性， 默认为7张 ，如果图片是8张应传入8
* */

function figureAnimation(context, imgUrlList, defaultFrames) {
    let figureImgTest = document.createElement('img');
    figureImgTest.src = imgUrlList.mouseEnterUrl;
    figureImgTest.onload = function () {
        if (figureImgTest.width < 1080) {
            return null;
        } else {
            imgUrlList = imgUrlList || {defaultUrl: null, mouseEnterUrl: null};
            defaultFrames = defaultFrames || 7;
            let figureImgBox = context.getElementsByClassName('figureImgBox')[0],
                figureImgProgress = context.getElementsByTagName('progress')[0];
            figureImgBox.addEventListener('mouseenter', function () {
                figureImgBox.style.backgroundImage = 'url("' + imgUrlList.mouseEnterUrl + '")';
                figureImgProgress.style.display = 'block';
                figureImgBox.style.backgroundSize = 'auto';
            }, false)
            figureImgBox.addEventListener('mousemove', function (e) {
                let targetRatio = ((e.clientX - figureImgBox.offsetLeft) / figureImgBox.offsetWidth).toFixed(3) * 100;
                figureImgProgress.value = targetRatio;
                if (defaultFrames === 7) {
                    if (targetRatio <= 14.3) {
                        figureImgBox.style.backgroundPosition = '0px 0px';
                    }
                    else if (targetRatio > 14.3 && targetRatio <= 28.6) {
                        figureImgBox.style.backgroundPosition = '-360px 0px';
                    }
                    else if (targetRatio > 28.6 && targetRatio <= 42.9) {
                        figureImgBox.style.backgroundPosition = '-720px 0px';
                    }
                    else if (targetRatio > 42.9 && targetRatio <= 57.2) {
                        figureImgBox.style.backgroundPosition = '0px -210px';
                    }
                    else if (targetRatio > 57.2 && targetRatio <= 71.5) {
                        figureImgBox.style.backgroundPosition = '-360px -210px';
                    }
                    else if (targetRatio > 71.5 && targetRatio <= 85.8) {
                        figureImgBox.style.backgroundPosition = '-720px -210px';
                    }
                    else if (targetRatio > 85.8 && targetRatio <= 100.1) {
                        figureImgBox.style.backgroundPosition = '0px -420px';
                    }

                } else {
                    if (targetRatio <= 12.5) {
                        figureImgBox.style.backgroundPosition = '0px 0px';
                    }
                    else if (targetRatio > 12.5 && targetRatio <= 25) {
                        figureImgBox.style.backgroundPosition = '-360px 0px';
                    }
                    else if (targetRatio > 25 && targetRatio <= 37.5) {
                        figureImgBox.style.backgroundPosition = '-720px 0px';
                    }
                    else if (targetRatio > 37.5 && targetRatio <= 50) {
                        figureImgBox.style.backgroundPosition = '0px -210px';
                    }
                    else if (targetRatio > 50 && targetRatio <= 62.5) {
                        figureImgBox.style.backgroundPosition = '-360px -210px';
                    }
                    else if (targetRatio > 62.5 && targetRatio <= 75) {
                        figureImgBox.style.backgroundPosition = '-720px -210px';
                    }
                    else if (targetRatio > 75 && targetRatio <= 87.5) {
                        figureImgBox.style.backgroundPosition = '0px -420px';
                    }
                    else if (targetRatio > 87.5 && targetRatio <= 100) {
                        figureImgBox.style.backgroundPosition = '-360px -420px';
                    }
                }
            }, false)

            figureImgBox.addEventListener('mouseleave', function () {
                figureImgBox.style.backgroundImage = 'url("' + imgUrlList.defaultUrl + '")';
                figureImgBox.style.backgroundPosition = '0px 0px';
                figureImgProgress.style.display = 'none';
                figureImgBox.style.backgroundSize = 'cover';
            }, false)

        }
    }
}