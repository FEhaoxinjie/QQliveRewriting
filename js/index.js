var QQVideo = (function () {
    /*顶部轮播图开始*/
    {
        let imgBox = document.getElementById('imgBox'),
            imgList = null,
            focusList = null,
            rightNavBox = document.getElementById('rightNavBox'),
            bannerData = null,
            step = 0,
            autoTimer = null;

        function getData() {
            var xhr = new XMLHttpRequest;
            xhr.open('GET', 'json/top_banner.json', false);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    bannerData = JSON.parse(xhr.responseText);
                }
            }
            xhr.send();
        }

        function bindData() {

            var bannerStr = ``,
                bannerNavStr = ``;
            for (var i = 0; i < bannerData.length; i++) {
                var cur = bannerData[i];
                bannerStr += `<li style="background-color: ${cur.background}"><a href="javascript:;"><img  data-src="${cur.banner_Img}"></a></li>`;
                bannerNavStr += `<li><span class="navTitle">${cur.navTitle}</span><span class="navDesc">${cur.navDesc}</span></li>`;
            }
            imgBox.innerHTML = bannerStr;
            rightNavBox.innerHTML = bannerNavStr;

            imgList = imgBox.getElementsByTagName('img');
            liList = imgBox.getElementsByTagName('li');
            focusList = rightNavBox.getElementsByTagName('li');
        }

        function windOnload() {
            liList[step].style.zIndex = 0;
            change(imgList[step]);
            focusList[step].classList.add('hover')
            step = 1;


        }

        function lazyImg(curImg) {
            if (curImg.isLoad)return;

            var tempImg = new Image;
            tempImg.onload = function () {
                curImg.src = this.src;

                tempImg = null;
            }
            tempImg.src = curImg.getAttribute('data-src');
            curImg.isLoad = true;


        }

        function change(oImg) {
            var opaStep = 0.1,
                total = 0;
            lazyImg(oImg);
            for (var i = 0; i < focusList.length; i++) {
                var cur = focusList[i], obj = imgList[i], item = liList[i];
                i === step ? (function () {
                    cur.classList.add('hover');
                    item.style.zIndex = 0;
                })() : (function () {
                    window.clearInterval(obj.timer);
                    item.style.zIndex = -1;
                    obj.style.opacity = 0;
                    cur.classList.remove('hover');
                })()
            }
            window.clearInterval(oImg.timer);
            oImg.timer = setInterval(function () {
                if (oImg.style.opacity >= 1) {
                    clearInterval(oImg.timer);
                    return;
                }
                total += opaStep;
                oImg.style.opacity = total;
            }, 17)


        }

        function auto() {
            window.clearInterval(autoTimer);
            autoTimer = window.setInterval(function () {
                if (step > imgList.length - 1) {
                    step = 0;
                }
                ;
                change(imgList[step]);
                step++;
            }, 3000)

        }

        function bindMousrEvent() {
            imgBox.onmouseenter = function () {
                clearInterval(autoTimer);
            }
            imgBox.onmouseleave = function () {
                auto();

            }
        }

        function bindFocusList() {
            for (var i = 0; i < focusList.length; i++) {
                var cur = focusList[i];
                cur.imgIndex = i;
                cur.onmouseenter = function () {
                    window.clearInterval(autoTimer);
                    step = this.imgIndex;
                    change(imgList[step]);
                    step++;
                }
                cur.onmouseleave = function () {
                    window.clearInterval(autoTimer);
                    auto();
                }
            }

        }
    }
    /*顶部轮播图结束*/
    /*清除a标签的默认行为开始*/
    {
        let allAList = document.getElementsByTagName('a');

        function clear_defaultA() {


            for (var i = 0; i < allAList.length; i++) {
                var curA = allAList[i];
                if (curA.href) {
                    curA.href = "javascript:;";
                }
            }
        }
    }
    /*清除a标签的默认行为结束*/

    /*header二级菜单开始*/
    {
        function firstCheckHeight(element) {
            var eleTop = getRect(element).top,
                eleInfoBox = element.getElementsByTagName('div')[0],
                targetHeight = eleInfoBox.offsetHeight + 5;
            return eleTop >= targetHeight;
        }

        function secondCheckHeight(element) {
            var _Bottom = getRect(element).bottom,
                windowHeight = document.documentElement.clientHeight || document.body.clientHeight,
                eleBottom = windowHeight - _Bottom,
                eleInfoBox = element.getElementsByTagName('div')[0],
                targetHeight = eleInfoBox.offsetHeight + 5;
            return eleBottom >= targetHeight;
        }

        function firstHoverMenu() {
            sizeListener.call(this, null);
            var eleInfoBox = this.getElementsByTagName('div')[0],
                check = firstCheckHeight(this);
            if (check) {
                eleInfoBox.classList.remove('arrowTop');
                eleInfoBox.classList.add('arrowBottom');
                eleInfoBox.style.borderTopColor = null;
                eleInfoBox.style.borderBottomColor = '#ff6824';
                eleInfoBox.style.top = null;
                eleInfoBox.style.bottom = '32px';
            } else {
                eleInfoBox.classList.remove('arrowBottom');
                eleInfoBox.classList.add('arrowTop');
                eleInfoBox.style.borderBottomColor = null;
                eleInfoBox.style.borderTopColor = '#ff6824';
                eleInfoBox.style.bottom = null;
                eleInfoBox.style.top = '32px';
            }
            window.onscroll = window.onresize = null;

        }

        function secondHoverMenu() {
            sizeListener.call(this, null);
            var eleInfoBox = this.getElementsByTagName('div')[0],
                check = secondCheckHeight(this);
            if (check) {


                eleInfoBox.classList.remove('arrowBottom');
                eleInfoBox.classList.add('arrowTop');
                eleInfoBox.style.borderBottomColor = null;
                eleInfoBox.style.borderTopColor = '#ff6824';
                eleInfoBox.style.bottom = null;
                eleInfoBox.style.top = '32px';
            } else {
                eleInfoBox.classList.remove('arrowTop');
                eleInfoBox.classList.add('arrowBottom');
                eleInfoBox.style.borderTopColor = null;
                eleInfoBox.style.borderBottomColor = '#ff6824';
                eleInfoBox.style.top = null;
                eleInfoBox.style.bottom = '32px';
            }
            window.onscroll = window.onresize = null;

        }


        function sizeListener() {
            var _this = this;
            window.onscroll = window.onresize = firstCheckHeight.bind(_this, null);
            window.onscroll = window.onresize = secondCheckHeight.bind(_this, null);
        }

        function leaveMenu() {
            var eleInfoBox = this.getElementsByTagName('div')[0];
            eleInfoBox.classList.remove('arrowBottom');
            eleInfoBox.classList.remove('arrowTop');
        }

        function getRect(element) {
            var rect = element.getBoundingClientRect();
            var top = document.documentElement.clientTop;
            var left = document.documentElement.clientLeft;
            return {
                top: rect.top - top,
                bottom: rect.bottom - top,
                left: rect.left - left,
                right: rect.right - left
            }
        }

        function bind() {
            let nav = document.getElementById('nav'),
                allAList = nav.getElementsByTagName('a');
            for (let i = 0; i < allAList.length; i++) {
                let curA = allAList[i];
                bindA(curA);
            }
            function bindA(menu_A) {
                if (menu_A.dataset.lines === '1') {
                    menu_A.addEventListener('mouseenter', firstHoverMenu, false);
                    menu_A.addEventListener('mouseleave', leaveMenu, false);
                } else if (menu_A.dataset.lines === '2') {
                    menu_A.addEventListener('mouseenter', secondHoverMenu, false);
                    menu_A.addEventListener('mouseleave', leaveMenu, false);
                }

            }
        }

    }
    /*header二级菜单结束*/
    return {
        clear_defaultA: function () {
            clear_defaultA();
        },
        header_banner: function () {
            getData();
            bindData();
            windOnload();
            auto();
            bindMousrEvent();
            bindFocusList();
        },
        nav_secondMenu: function () {
            bind();
        }

    }
})();
{
    let fnAry = [];
    for (let key in QQVideo) {
        if (QQVideo.hasOwnProperty(key)) {
            fnAry.push(QQVideo[key]);
        }
    }

    for (let j = 0; j < fnAry.length; j++) {
        var curFn = fnAry[j];
        curFn();
    }
}
