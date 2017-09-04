
/*顶部轮播图*/
var header_banner = (function () {
    var imgBox = document.getElementById('imgBox'),
        imgList =null,
        focusList=null,
        rightNavBox = document.getElementById('rightNavBox'),
        bannerData = null,
        step = 0,
        autoTimer=null;

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
             bannerStr+=`<li><a ><img style="background-color: ${cur.background}" data-src="${cur.img}"></a></li>`;
            bannerNavStr+=`<li><span class="navTitle">${cur.navTitle}</span><span class="navDesc">${cur.navDesc}</span></li>`;
        }
        imgBox.innerHTML=bannerStr;
        rightNavBox.innerHTML=bannerNavStr;

        imgList=imgBox.getElementsByTagName('img');
        focusList=rightNavBox.getElementsByTagName('li');
    }
    function windOnload() {
        lazyImg(imgList[0]);
        imgList[0].style.opacity=1;
        step=1;
        focusList[0].classList.add('hover')

    }
    function lazyImg(curImg) {
        if(curImg.isLoad)return;

        var tempImg=new Image;
        tempImg.onload=function () {
            curImg.src=this.src;

            tempImg=null;
        }
        tempImg.src=curImg.getAttribute('data-src');
        curImg.isLoad=true;


    }
    function change(oImg) {
        var opaStep=0.06,
            total=0;
        lazyImg(oImg);
       window.clearInterval(oImg.timer);
         oImg.timer = setInterval(function () {
             if (oImg.style.opacity >= 1) {
                clearInterval(oImg.timer);
                return;
            }
            total += opaStep;
             oImg.style.opacity=total;
        }, 17)
        for (var i = 0; i < focusList.length; i++) {
            var cur = focusList[i],obj=imgList[i];
            i===step?(function(){cur.classList.add('hover');obj.style.zIndex=1;})():(function () {obj.style.zIndex=0;obj.style.opacity=0;cur.classList.remove('hover');})()
        }

    }

    function auto() {
        console.log(step);
        window.clearInterval(autoTimer);
        autoTimer = window.setInterval(function () {
            if(step>imgList.length-1){
                 step=0;
            };
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
              cur.imgIndex=i;
            cur.onmouseenter=function () {
                window.clearInterval(autoTimer);
               step=this.imgIndex;;
                change(imgList[step]);
                step++;
            }
            console.dir(cur);
            cur.onmouseleave=function () {
               auto();
            }
        }

    }

    return {
        banner: function () {
            getData();
            bindData();
            windOnload();
             auto();
            bindMousrEvent();
            bindFocusList();
        }
    }
})();
header_banner.banner();