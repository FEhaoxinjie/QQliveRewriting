console.log();
let QQVideo = (function () {

    /*utils开始*/
    {
        function ajax(opt) {
            opt = opt || {};
            opt.method = opt.method.toUpperCase() || 'POST';
            opt.url = opt.url || '';
            opt.async = opt.async || true;
            opt.data = opt.data || null;
            opt.success = opt.success || function () {
            };
            let xmlHttp = null,
                response = null;
            if (XMLHttpRequest) {
                xmlHttp = new XMLHttpRequest();
            }
            else {
                xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
            }
            let params = [];
            for (let key in opt.data) {
                params.push(key + '=' + opt.data[key]);
            }
            let postData = params.join('&');
            if (opt.method.toUpperCase() === 'POST') {
                xmlHttp.open(opt.method, opt.url, opt.async);
                xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                xmlHttp.send(postData);
            }
            else if (opt.method.toUpperCase() === 'GET') {
                xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
                xmlHttp.send(null);
            }
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                    response = JSON.parse(xmlHttp.responseText)
                    opt.success(response);
                }
            };
        }
    }
    /*utils结束*/
    /*用户登录开始*/
    {
        let header = document.getElementsByClassName('header')[0],
            header_top = header.getElementsByClassName('header-top')[0],
            userBox = header_top.getElementsByClassName('userBox')[0],
            infoBottom = userBox.getElementsByClassName('infoBottom')[0],
            userboxLogin = infoBottom.getElementsByTagName('a')[4],
            loginIn = document.getElementsByClassName('loginIn')[0],
            loginChoose = document.getElementsByClassName('loginChoose')[0],
            loginTitle = document.getElementsByClassName('loginTitle')[0],
            loginTitleClose = loginTitle.getElementsByTagName('a')[0],
            loginType_QQ = document.getElementsByClassName('loginType_QQ')[0],
            loginType_VX = document.getElementsByClassName('loginType_VX')[0],
            loginPanel = document.getElementsByClassName('loginPanel')[0],
            loginTypeChoose = loginPanel.getElementsByClassName('loginTypeChoose')[0],
            loginTypeChooseA = loginTypeChoose.getElementsByTagName('a'),
            loginQuickCont = document.getElementsByClassName('loginQuickCont')[0],
            loginPanelContent_QQ = document.getElementsByClassName('loginPanelContent_QQ')[0],
            loginPanelContent_VX = document.getElementsByClassName('loginPanelContent_VX')[0],
            loginPanelFooter = document.getElementsByClassName('loginPanelFooter')[0],
            loginPanelFooterDiv = loginPanelFooter.getElementsByTagName('div')[1],
            loginPanelFooterDivA = loginPanelFooterDiv.getElementsByTagName('a')[0],
            autoLoginBtn = document.getElementById('autoLoginBtn'),
            autoLoginChoose = document.getElementById('autoLoginChoose'),
            loginNormalCont = document.getElementsByClassName('loginNormalCont')[0],
            loginInputUser = loginNormalCont.getElementsByClassName('loginInputUser')[0],
            loginInputUserLabel = loginInputUser.getElementsByTagName('label')[0],
            loginInputUserInput = loginInputUser.getElementsByTagName('input')[0],
            loginInputUserClear = loginInputUser.getElementsByTagName('a')[0],
            loginInputPassword = loginNormalCont.getElementsByClassName('loginInputPassword')[0],
            loginInputPasswordLabel = loginInputPassword.getElementsByTagName('label')[0],
            loginInputPasswordInput = loginInputPassword.getElementsByTagName('input')[0],
            loginNormalContDiv = loginNormalCont.getElementsByTagName('div')[1],
            loginNormalContDivA = loginNormalContDiv.getElementsByTagName('a')[0],
            loginSubmit = document.getElementsByClassName('loginSubmit')[0],
            userBoxUserHeader = userBox.getElementsByTagName('a')[0],
            useBoxInfo = userBox.getElementsByClassName('useBoxInfo')[0],
            userBoxInfoTop = useBoxInfo.getElementsByClassName('infoTop')[0],
            userBoxInfoTopOpen = userBoxInfoTop.getElementsByTagName('a')[0],
            userLogin = document.getElementById('userLogin'),
            autoChooseSign = 1,
            loginError = document.getElementsByClassName('loginError')[0],
            loginErrorText = document.getElementsByClassName('loginError')[0].getElementsByTagName('span')[0],
            errorMsg = '';

        function loginMenuShow(e) {
            e.stopPropagation();
            loginIn.style.display = 'block';
        }

        function clearAllCookie() {
            let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
            if (keys) {
                for (let i = keys.length; i--;)
                    document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
            }
        }

        loginTitleClose.addEventListener('click', function (e) {
            loginIn.style.display = '';
        }, false);
        loginTypeChooseA[2].addEventListener('click', function () {
            loginIn.style.display = '';
        }, false);
        loginType_QQ.addEventListener('click', function (e) {
            e.stopPropagation();
            loginChoose.style.display = 'none';
            loginPanel.style.display = 'block';
            loginTypeChooseA[1].classList.remove('select');
            loginTypeChooseA[0].classList.add('select');
            loginPanelFooter.style.display = '';
            loginPanelContent_VX.style.display = '';
            loginPanelContent_QQ.style.display = 'block';
        }, false)
        loginType_VX.addEventListener('click', function (e) {
            e.stopPropagation();
            loginChoose.style.display = 'none';
            loginPanel.style.display = 'block ';
            loginTypeChooseA[0].classList.remove('select');
            loginTypeChooseA[1].classList.add('select');
            loginPanelContent_QQ.style.display = '';
            loginPanelContent_VX.style.display = 'block';
            loginPanelFooter.style.display = 'none';
        }, false)
        loginTypeChooseA[0].addEventListener('click', function (e) {
            e.stopPropagation();
            loginTypeChooseA[1].classList.remove('select');
            loginTypeChooseA[0].classList.add('select');
            loginPanelFooter.style.display = '';
            loginPanelContent_VX.style.display = '';
            loginPanelContent_QQ.style.display = 'block';
        }, false)
        loginTypeChooseA[1].addEventListener('click', function (e) {
            e.stopPropagation();
            loginTypeChooseA[0].classList.remove('select');
            loginTypeChooseA[1].classList.add('select');
            loginPanelContent_QQ.style.display = '';
            loginPanelContent_VX.style.display = 'block';
            loginPanelFooter.style.display = 'none';
        }, false)
        loginPanelFooterDivA.addEventListener('click', function (e) {
            e.stopPropagation();
            loginQuickCont.style.display = 'none';
            loginNormalCont.style.display = 'block';
        }, false);
        loginNormalContDivA.addEventListener('click', function (e) {
            e.stopPropagation();
            loginQuickCont.style.display = '';
            loginNormalCont.style.display = '';
        }, false);
        autoLoginBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (autoChooseSign === 1) {
                autoLoginChoose.style.backgroundPosition = '-74px -163px';
            } else {
                autoLoginChoose.style.backgroundPosition = '';
            }
            autoChooseSign *= -1;
            console.log(autoChooseSign);
        }, false)
        loginInputUserInput.addEventListener('focus', function (e) {
            e.stopPropagation();
            loginInputUserLabel.style.color = '#ddd';
            loginInputUser.style.backgroundPosition = '-1px -45px';
            loginInputUserClear.style.display = '';
        }, false);
        loginInputUserInput.addEventListener('input', function (e) {
            e.stopPropagation();
            if (loginInputUserInput.value !== '') {
                loginInputUserLabel.style.display = 'none';
                loginInputUserClear.style.display = 'block';
            } else {
                loginInputUserLabel.style.display = '';
            }

        }, false);
        loginInputUserClear.addEventListener('click', function (e) {
            e.stopPropagation();
            loginInputUserInput.value = '';
            loginInputUserClear.style.display = '';
            loginInputUserLabel.style.display = '';
        }, false);
        loginInputPasswordInput.addEventListener('focus', function (e) {
            e.stopPropagation();
            loginInputPasswordLabel.style.color = '#ddd';
            loginInputPassword.style.backgroundPosition = '-1px -45px';
        }, false);
        loginInputPasswordInput.addEventListener('input', function (e) {
            e.stopPropagation();
            if (loginInputPasswordInput.value !== '') {
                loginInputPasswordLabel.style.display = 'none';
            } else {
                loginInputPasswordLabel.style.display = '';
            }

        }, false);
        userBoxUserHeader.addEventListener('click', loginMenuShow, false)
        userboxLogin.addEventListener('click', loginMenuShow, false)
        userBoxInfoTopOpen.addEventListener('click', loginMenuShow, false)
        if (autoChooseSign === 1) {
            if (document.cookie) {
                ajax({
                    method: 'POST',
                    url: 'http://47.94.165.170:8080/txvideo/login',
                    async: true,
                    data: {
                        userName: /userName=(\d+);/.exec(document.cookie)[1],
                        passWord: /password=(\d+);?/g.exec(document.cookie)[1]
                    },
                    success: function (data) {
                        try {
                            if (data.code === '1' && data.message === '登录成功') {
                                let userBoxInfoStr = ` <span>QQ帐号: ${data.data[0].nickName}${parseFloat(data.data[0].isVip) > -1 ? `<i class="userVip"><i class="userVipNum${data.data[0].isVip}"></i></i>` : ``}</span>
                        <div class="loginUserMenu">
                            <a href="javascript:;">切换</a>
                            <a href="javascript:;" id="userExit">退出</a>
                        </div>${data.data[0].isVip > -1 ? `<span>vip于${data.data[0].vipOutTime}到期</span>` : ``}
                        <a href="" class="tvPrivilege">开通电视特权</a>
                        <a href="" class="vipRenew">续费</a>`;
                                let userBoxHeader = `${data.data[0].accountType === '0' ? `<i class="QQ"></i>` : `<i class="VX"></i>`}${parseFloat(data.data[0].isVip) > -1 ? `<i class="userVip"><i class="userVipNum${data.data[0].isVip}"></i></i>` : ``}<img src="${data.data[0].userPic}" alt=""><span></span>`
                                userBoxInfoTop.innerHTML = userBoxInfoStr;
                                userBoxUserHeader.innerHTML = userBoxHeader;
                                userboxLogin.style.display = 'none';
                                loginIn.style.display = 'none';
                                userBoxUserHeader.removeEventListener('click', loginMenuShow)
                                userboxLogin.removeEventListener('click', loginMenuShow)
                                userBoxInfoTopOpen.removeEventListener('click', loginMenuShow)
                            }
                            let userExit = document.getElementById('userExit');
                            userExit.addEventListener('click', function (e) {
                                clearAllCookie();
                                userBoxUserHeader.addEventListener('click', loginMenuShow, false)
                                userboxLogin.addEventListener('click', loginMenuShow, false)
                                userBoxInfoTopOpen.addEventListener('click', loginMenuShow, false)
                                window.location.reload();
                            }, false)
                        } catch (e) {
                        }
                    }

                });
            }
        }
        loginSubmit.addEventListener('click', function (e) {
            e.stopPropagation();
            let username = loginInputUserInput.value,
                password = loginInputPasswordInput.value;
            if (username === '') {
                errorMsg = '帐号或密码不能为空！';
            } else if (!/^(\d+)$/.test(username)) {
                errorMsg = '请输入正确的帐号！';
            } else if (password === '') {
                errorMsg = '帐号或密码不能为空！';
            }
            else {
                ajax({
                    method: 'POST',
                    url: 'http://47.94.165.170:8080/txvideo/login',
                    async: false,
                    data: {
                        userName: username,
                        passWord: password
                    },
                    success: function (data) {
                        console.log(data);
                        if (data.code === '0' && data.message === '该账户不存在') {
                            errorMsg = '帐号或密码不正确！请重新输入。';
                            loginInputPasswordInput.value='';
                            loginInputPasswordInput.focus();
                            loginErrorText.innerText = errorMsg;
                            loginError.style.display = 'block';
                            loginError.tipsTimer = window.setTimeout(function () {
                                loginError.style.display = '';
                                window.clearTimeout(loginError.tipsTimer);
                            }, 5000)
                        } else {
                            loginError.style.display = 'none';
                            document.cookie = 'userName=' + username;
                            document.cookie = 'password=' + password;
                            document.cookie = 'userLogin=' + true;
                            window.location.reload();

                        }
                    }
                })
            }
            if(errorMsg!==''){
                loginErrorText.innerText = errorMsg;
                loginError.style.display = 'block';
                loginError.tipsTimer = window.setTimeout(function () {
                    loginError.style.display = '';
                    window.clearTimeout(loginError.tipsTimer);
                }, 5000)
            }

        }, false)

    }
    /*用户登录结束*/
    /*追剧目录开始*/
    {
        ajax({
                url: 'json/top_followData/top_followData.json',
                method: "get",
                data: null,
                async: true,
                success: function (response) {
                    bindWatchingData(response);
                }
            }
        );
        let binWatching = document.getElementById('binWatching'),
            binWatchingInfo = document.getElementById('binWatchingInfo'),
            binWatchingMask = document.getElementsByClassName('binWatchingMask')[0],
            loginArrowTop = document.getElementById('loginArrowTop'),
            loginArrowLeft = document.getElementById('loginArrowLeft'),
            loginArrowRight = document.getElementById('loginArrowRight'),
            binWatchingInfoBox = document.getElementById('binWatchingInfoBox'),
            binWatchingInfoDiv = binWatchingInfoBox.getElementsByTagName('div'),
            loginIn = document.getElementsByClassName('loginIn')[0];


        function bindWatchingData() {
            let watchingData = ``;
            let oldNode = null;
            for (let i = 0; i < arguments[0].length; i++) {
                let curWatchingData = arguments[0][i];
                if (i === 0) {
                    watchingData += `<div class="loginQuickChooseBox">
                <span class="loginQuickChoose">
                    <i></i>
                    <span>登录查看你感兴趣的内容</span>
                    <a href="javascript:;" class="dialogLogin-btn">登录</a>
                </span>
                <a href="javascript:;">
                <span>
                    <img class="watchingImgs" src="${arguments[0][arguments[0].length - 1].jsonData.new_pic_vt}" alt="">
                </span>
                </a>
            </div>`;
                }
                watchingData += `<div><a href="${curWatchingData.jsonData.url}" target="_blank"><span><img class="watchingImgs"  src="${curWatchingData.jsonData.new_pic_vt}" alt=""><span><img src="${JSON.parse(curWatchingData.jsonData.web20_imgtag).tag_2.param}" alt=""></span><span>${function () {
                    try {
                        return /(\d+)(.{1}\d?)/g.exec(curWatchingData.jsonData.score.score)[1];
                    } catch (e) {
                        return ``
                    }
                }()}<span>${function () {
                    try {
                        return /(\d+)(.{1}\d?)/g.exec(curWatchingData.jsonData.score.score)[2];
                    } catch (e) {
                        return ``
                    }
                }()}</span></span></span><span>${curWatchingData.jsonData.title}</span><span>${curWatchingData.jsonData.episode_updated || curWatchingData.jsonData.second_title || ''}</span></a></div> `
            }
            ;
            binWatchingInfoBox.innerHTML = watchingData;
            document.getElementsByClassName('dialogLogin-btn')[0].addEventListener('click', function () {
                loginIn.style.display = 'block';
            }, false)
            oldNode = binWatchingInfoBox.childNodes[0].cloneNode(true);
            if (document.cookie && /userLogin=(\w+)/g.exec(document.cookie)[1] === 'true') {
                binWatchingInfoBox.removeChild(binWatchingInfoBox.childNodes[0]);
            } else {
                if (binWatchingInfoBox.childElementCount > 11) {
                } else {
                    binWatchingInfoBox.insertBefore(oldNode, binWatchingInfoBox.childNodes[0]);
                }

            }
            bindWatchingEvent();
        }

        function bindWatchingEvent() {
            function addHeight() {
                binWatchingInfo.style.height = '100%'
            }

            function micsHeight() {
                binWatchingInfo.style.height = '97%'
            }

            function arrowRightShow() {
                loginArrowRight.style.opacity = '1';
                loginArrowRight.addEventListener('click', function (e) {
                    e.stopPropagation();
                    loginArrowLeft.style.opacity = '1';
                    for (let i = 0; i < 3; i++) {
                        let curDiv = binWatchingInfoDiv[i];
                        curDiv.style.display = 'none'
                    }
                    loginArrowRight.style.opacity = '0';
                    binWatchingInfo.removeEventListener('mouseenter', arrowRightShow);
                    binWatchingInfo.removeEventListener('mouseleave', arrowRightBlank);
                    binWatchingInfo.addEventListener('mouseenter', arrowLeftShow, false);
                    binWatchingInfo.addEventListener('mouseleave', arrowLeftBlank, false);
                })
            }

            function arrowRightBlank() {
                loginArrowRight.style.opacity = '0';
            }

            function arrowLeftShow() {
                loginArrowLeft.style.opacity = '1';
                loginArrowLeft.addEventListener('click', function (e) {
                    e.stopPropagation();
                    loginArrowRight.style.opacity = '1';
                    for (let i = 0; i < 3; i++) {
                        let curDiv = binWatchingInfoDiv[i];
                        curDiv.style.display = '';
                    }
                    loginArrowLeft.style.opacity = '0';
                    binWatchingInfo.removeEventListener('mouseenter', arrowLeftShow);
                    binWatchingInfo.removeEventListener('mouseleave', arrowLeftShow);
                    binWatchingInfo.addEventListener('mouseenter', arrowRightShow, false);
                    binWatchingInfo.addEventListener('mouseleave', arrowRightBlank, false);
                })
            }

            function arrowLeftBlank() {
                loginArrowLeft.style.opacity = '0';
            }


            function binWatchingChange() {

                binWatching.style.marginTop = 0;
                binWatchingMask.style.display = 'none';
                loginArrowTop.style.display = 'block';
                binWatchingInfo.removeEventListener('mouseenter', addHeight);
                binWatchingInfo.removeEventListener('mouseleave', micsHeight);
                for (let i = 0; i < binWatchingInfoDiv.length; i++) {
                    let curDiv = binWatchingInfoDiv[i],
                        curDivImage = curDiv.getElementsByClassName('watchingImgs')[0];
                    curDivImage.onmouseenter = function () {
                        curDivImage.style.height = '105%';
                        curDivImage.hTimer = setTimeout(function () {
                            curDivImage.style.height = '100%';
                            window.clearTimeout(curDivImage.hTimer);
                        }, 80)
                    }
                    curDiv.style.transition = 'all 0s';
                    curDiv.style.top = '0px';
                }
                binWatchingInfo.addEventListener('mouseenter', arrowRightShow, false);
                binWatchingInfo.addEventListener('mouseleave', arrowRightBlank, false);
            }

            binWatchingMask.addEventListener('click', binWatchingChange, false)
            binWatchingInfo.addEventListener('mouseenter', addHeight, false);
            binWatchingInfo.addEventListener('mouseleave', micsHeight, false);
            loginArrowTop.addEventListener('click', function () {
                addHeight();
                binWatching.style.marginTop = '-332px';
                binWatchingMask.style.display = 'block';
                binWatchingMask.style.height = '0%';
                loginArrowTop.style.display = 'none';
                binWatchingInfo.removeEventListener('mouseleave', micsHeight);
                binWatchingMask.hTimer = setInterval(function () {
                    binWatchingMask.style.height = parseFloat(binWatchingMask.style.height) + 4 + '%';
                    if (parseFloat(binWatchingMask.style.height) >= 100) {
                        binWatchingMask.style.height = '100%';
                        for (let i = 0; i < binWatchingInfoDiv.length; i++) {
                            let curDiv = binWatchingInfoDiv[i];
                            curDiv.style.transition = null;
                            curDiv.style.top = '93px';
                        }
                        micsHeight();
                        window.clearInterval(binWatchingMask.hTimer)
                        if (parseFloat(binWatchingInfo.style.height) === 97) {
                            setTimeout(function () {
                                for (let i = 0; i < binWatchingInfoDiv.length; i++) {
                                    let curDiv = binWatchingInfoDiv[i];
                                    curDiv.style.top = null;
                                }
                                binWatchingInfo.addEventListener('mouseenter', addHeight, false);
                                binWatchingInfo.addEventListener('mouseleave', micsHeight, false);
                            }, 0)
                        }
                    }
                }, 30)
                for (let i = 0; i < binWatchingInfoDiv.length; i++) {
                    let curDiv = binWatchingInfoDiv[i],
                        curDivImage = curDiv.getElementsByClassName('watchingImgs')[0];
                    curDivImage.onmouseenter = null;
                    curDiv.style.transition = 'all 0s';
                    curDiv.style.top = '213px';
                }
                binWatchingInfo.addEventListener('mouseenter', arrowRightShow, false);
                binWatchingInfo.addEventListener('mouseleave', arrowRightBlank, false);
            },);

        }


    }
    /*追剧目录结束*/
      /*顶部热搜榜单开始*/
    {
        let hotSelectInfo=document.getElementsByClassName('hotInfo')[0],
            hotInfoStr=``;
        ajax({
            url: 'json/top_hotSearchData/top_hotSearchData.json',
            method: "get",
            data: null,
            async: true,
            success: function (response) {
                for (let i = 0; i <10; i++) {
                    let curInfo = response[i];
                    hotInfoStr+=`<li><span>${curInfo.c_pos}</span><span>${curInfo.c_title}</span></li>`;
                }
                hotSelectInfo.innerHTML=hotInfoStr;
            }
        })
    }
      /*顶部热搜榜单结束*/
    /*顶部轮播图开始*/
    {
        let imgBox = document.getElementById('imgBox'),
            imgList = null,
            focusList = null,
            rightNavBox = document.getElementById('rightNavBox'),
            step = 0,
            autoTimer = null;

        function bannerBindData() {
            let bannerStr = ``,
                bannerNavStr = ``;
            for (let i = 0; i < arguments[0].length; i++) {
                let cur = arguments[0][i];
                console.log(cur);
                bannerStr += `<li style="background-color: ${cur['data-bgcolor']}"><a  target="${cur['target']}" href="${cur['href']}"><img  data-src="${cur['data-bgimage']}"></a></li>`;
                bannerNavStr += `<li><a  target="${cur['target']}" href="${cur['href']}"><span title="${cur.bannerTitle}" class="navTitle">${cur.bannerTitle}</span><span title="${cur.bannerDesc}" class="navDesc">${cur.bannerDesc}</span></a></li>`;
            }
            imgBox.innerHTML = bannerStr;
            rightNavBox.innerHTML = bannerNavStr;

            imgList = imgBox.getElementsByTagName('img');
            liList = imgBox.getElementsByTagName('li');
            focusList = rightNavBox.getElementsByTagName('li');
            winOnLoad();
            auto();
            bannerBindFocusList();
        }

        function winOnLoad() {
            liList[step].style.zIndex = 0;
            change(imgList[step]);
            focusList[step].classList.add('hover')
            step = 1;


        }

        function lazyImg(curImg) {
            if (curImg.isLoad) return;

            let tempImg = new Image;
            tempImg.onload = function () {
                curImg.src = this.src;

                tempImg = null;
            }
            tempImg.src = curImg.getAttribute('data-src');
            curImg.isLoad = true;


        }

        function change(oImg) {
            let opaStep = 0.1,
                total = 0;
            lazyImg(oImg);
            for (let i = 0; i < focusList.length; i++) {
                let cur = focusList[i], obj = imgList[i], item = liList[i];
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


        function bannerBindFocusList() {
            for (let i = 0; i < focusList.length; i++) {
                let cur = focusList[i];
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


    /*header二级菜单开始*/
    {
        function checkHeight(element) {
            let eleTop = getRect(element).top,
                _Bottom = getRect(element).bottom,
                windowHeight = document.documentElement.clientHeight || document.body.clientHeight,
                eleBottom = windowHeight - _Bottom,
                eleInfoBox = element.getElementsByTagName('div')[0],
                targetHeight = eleInfoBox.offsetHeight + 5;
            if (element.dataset.lines === '1') {
                return {
                    result: eleTop >= targetHeight,
                    nav_type: '1'
                }
            } else if (element.dataset.lines === '2') {
                return {
                    result: eleBottom >= targetHeight,
                    nav_type: '2'
                }
            }
        }

        function hoverMenu() {
            sizeListener.call(this, null);
            let eleInfoBox = this.getElementsByTagName('div')[0],
                check = checkHeight(this);
            if (check.result && check.nav_type === '1') {
                eleInfoBox.style.borderTopColor = null;
                eleInfoBox.style.top = null;
                eleInfoBox.classList.remove('arrowTop');
                eleInfoBox.classList.add('arrowBottom');
                eleInfoBox.style.borderBottomColor = '#ff6824';
                eleInfoBox.style.bottom = '32px';
            } else if (check.nav_type === '1') {
                eleInfoBox.style.bottom = null;
                eleInfoBox.style.borderBottomColor = null;
                eleInfoBox.classList.remove('arrowBottom');
                eleInfoBox.classList.add('arrowTop');
                eleInfoBox.style.borderTopColor = '#ff6824';
                eleInfoBox.style.top = '32px';
            } else if (check.result && check.nav_type === '2') {
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
            let _this = this;
            window.onscroll = window.onresize = checkHeight.bind(_this, null);
        }

        function leaveMenu() {
            let eleInfoBox = this.getElementsByTagName('div')[0];
            eleInfoBox.classList.remove('arrowBottom');
            eleInfoBox.classList.remove('arrowTop');
        }

        function getRect(element) {
            let rect = element.getBoundingClientRect();
            let top = document.documentElement.clientTop;
            let left = document.documentElement.clientLeft;
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
                if (menu_A.dataset.hasOwnProperty('lines')) {
                    menu_A.addEventListener('mouseenter', hoverMenu, false);
                    menu_A.addEventListener('mouseleave', leaveMenu, false);
                }
            }
        }
    }
    /*header二级菜单结束*/

    return {
        header_banner: function () {
            ajax({
                url: 'json/top_BannerData/top_BannerData.json',
                method: "get",
                data: null,
                async: true,
                success: function (response) {
                    bannerBindData(response);
                }
            });

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
        let curFn = fnAry[j];
        curFn();
    }
}


/*原型*/
// function QQVideo() {
// }
// QQVideo.prototype = (function () {
//     /*顶部轮播图开始*/
//     {
//         let imgBox = document.getElementById('imgBox'),
//             imgList = null,
//             focusList = null,
//             rightNavBox = document.getElementById('rightNavBox'),
//             bannerData = null,
//             step = 0,
//             autoTimer = null;
//
//         function getData() {
//             let xhr = new XMLHttpRequest;
//             xhr.open('GET', 'json/top_banner.json', false);
//             xhr.onreadystatechange = function () {
//                 if (xhr.readyState === 4 && xhr.status === 200) {
//                     bannerData = JSON.parse(xhr.responseText);
//                 }
//             }
//             xhr.send();
//         }
//
//         function bindData() {
//
//             let bannerStr = ``,
//                 bannerNavStr = ``;
//             for (let i = 0; i < bannerData.length; i++) {
//                 let cur = bannerData[i];
//                 bannerStr += `<li style="background-color: ${cur.background}"><a href="javascript:;"><img  data-src="${cur.banner_Img}"></a></li>`;
//                 bannerNavStr += `<li><span class="navTitle">${cur.navTitle}</span><span class="navDesc">${cur.navDesc}</span></li>`;
//             }
//             imgBox.innerHTML = bannerStr;
//             rightNavBox.innerHTML = bannerNavStr;
//
//             imgList = imgBox.getElementsByTagName('img');
//             liList = imgBox.getElementsByTagName('li');
//             focusList = rightNavBox.getElementsByTagName('li');
//         }
//
//         function windOnload() {
//             liList[step].style.zIndex = 0;
//             change(imgList[step]);
//             focusList[step].classList.add('hover')
//             step = 1;
//
//
//         }
//
//         function lazyImg(curImg) {
//             if (curImg.isLoad)return;
//
//             let tempImg = new Image;
//             tempImg.onload = function () {
//                 curImg.src = this.src;
//
//                 tempImg = null;
//             }
//             tempImg.src = curImg.getAttribute('data-src');
//             curImg.isLoad = true;
//
//
//         }
//
//         function change(oImg) {
//             let opaStep = 0.1,
//                 total = 0;
//             lazyImg(oImg);
//             for (let i = 0; i < focusList.length; i++) {
//                 let cur = focusList[i], obj = imgList[i], item = liList[i];
//                 i === step ? (function () {
//                     cur.classList.add('hover');
//                     item.style.zIndex = 0;
//                 })() : (function () {
//                     window.clearInterval(obj.timer);
//                     item.style.zIndex = -1;
//                     obj.style.opacity = 0;
//                     cur.classList.remove('hover');
//                 })()
//             }
//             window.clearInterval(oImg.timer);
//             oImg.timer = setInterval(function () {
//                 if (oImg.style.opacity >= 1) {
//                     clearInterval(oImg.timer);
//                     return;
//                 }
//                 total += opaStep;
//                 oImg.style.opacity = total;
//             }, 17)
//
//
//         }
//
//         function auto() {
//             window.clearInterval(autoTimer);
//             autoTimer = window.setInterval(function () {
//                 if (step > imgList.length - 1) {
//                     step = 0;
//                 }
//                 ;
//                 change(imgList[step]);
//                 step++;
//             }, 3000)
//
//         }
//
//         function bindMousrEvent() {
//             imgBox.onmouseenter = function () {
//                 clearInterval(autoTimer);
//             }
//             imgBox.onmouseleave = function () {
//                 auto();
//
//             }
//         }
//
//         function bindFocusList() {
//             for (let i = 0; i < focusList.length; i++) {
//                 let cur = focusList[i];
//                 cur.imgIndex = i;
//                 cur.onmouseenter = function () {
//                     window.clearInterval(autoTimer);
//                     step = this.imgIndex;
//                     change(imgList[step]);
//                     step++;
//                 }
//                 cur.onmouseleave = function () {
//                     window.clearInterval(autoTimer);
//                     auto();
//                 }
//             }
//
//         }
//     }
//     /*顶部轮播图结束*/
//     /*清除a标签的默认行为开始*/
//     {
//         let allAList = document.getElementsByTagName('a');
//
//         function clear_defaultA() {
//             for (let i = 0; i < allAList.length; i++) {
//                 let curA = allAList[i];
//                 if (curA.href) {
//                     curA.href = "javascript:;";
//                 }
//             }
//         }
//     }
//     /*清除a标签的默认行为结束*/
//
//     /*header二级菜单开始*/
//     {
//         function checkHeight(element) {
//             let eleTop = getRect(element).top,
//                 _Bottom = getRect(element).bottom,
//                 windowHeight = document.documentElement.clientHeight || document.body.clientHeight,
//                 eleBottom = windowHeight - _Bottom,
//                 eleInfoBox = element.getElementsByTagName('div')[0],
//                 targetHeight = eleInfoBox.offsetHeight + 5;
//             if (element.dataset.lines === '1') {
//                 return {
//                     result: eleTop >= targetHeight,
//                     nav_type: '1'
//                 }
//             } else if (element.dataset.lines === '2') {
//                 return {
//                     result: eleBottom >= targetHeight,
//                     nav_type: '2'
//                 }
//             }
//         }
//
//
//         function hoverMenu() {
//             sizeListener.call(this, null);
//             let eleInfoBox = this.getElementsByTagName('div')[0],
//                 check = checkHeight(this);
//             if (check.result && check.nav_type === '1') {
//                 eleInfoBox.style.borderTopColor = null;
//                 eleInfoBox.style.top = null;
//                 eleInfoBox.classList.remove('arrowTop');
//                 eleInfoBox.classList.add('arrowBottom');
//                 eleInfoBox.style.borderBottomColor = '#ff6824';
//                 eleInfoBox.style.bottom = '32px';
//             } else if (check.nav_type === '1') {
//                 eleInfoBox.style.bottom = null;
//                 eleInfoBox.style.borderBottomColor = null;
//                 eleInfoBox.classList.remove('arrowBottom');
//                 eleInfoBox.classList.add('arrowTop');
//                 eleInfoBox.style.borderTopColor = '#ff6824';
//                 eleInfoBox.style.top = '32px';
//             } else if (check.result && check.nav_type === '2') {
//                 eleInfoBox.classList.remove('arrowBottom');
//                 eleInfoBox.classList.add('arrowTop');
//                 eleInfoBox.style.borderBottomColor = null;
//                 eleInfoBox.style.borderTopColor = '#ff6824';
//                 eleInfoBox.style.bottom = null;
//                 eleInfoBox.style.top = '32px';
//             } else {
//                 eleInfoBox.classList.remove('arrowTop');
//                 eleInfoBox.classList.add('arrowBottom');
//                 eleInfoBox.style.borderTopColor = null;
//                 eleInfoBox.style.borderBottomColor = '#ff6824';
//                 eleInfoBox.style.top = null;
//                 eleInfoBox.style.bottom = '32px';
//             }
//             window.onscroll = window.onresize = null;
//
//         }
//
//         function sizeListener() {
//             let _this = this;
//             window.onscroll = window.onresize = checkHeight.bind(_this, null);
//         }
//
//         function leaveMenu() {
//             let eleInfoBox = this.getElementsByTagName('div')[0];
//             eleInfoBox.classList.remove('arrowBottom');
//             eleInfoBox.classList.remove('arrowTop');
//         }
//                                          
//         function getRect(element) {
//             let rect = element.getBoundingClientRect();
//             let top = document.documentElement.clientTop;
//             let left = document.documentElement.clientLeft;
//             return {
//                 top: rect.top - top,
//                 bottom: rect.bottom - top,
//                 left: rect.left - left,
//                 right: rect.right - left
//             }
//         }
//
//         function bind() {
//             let nav = document.getElementById('nav'),
//                 allAList = nav.getElementsByTagName('a');
//             for (let i = 0; i < allAList.length; i++) {
//                 let curA = allAList[i];
//                 bindA(curA);
//             }
//             function bindA(menu_A) {
//                 if (menu_A.dataset.hasOwnProperty('lines')) {
//                     menu_A.addEventListener('mouseenter', hoverMenu, false);
//                     menu_A.addEventListener('mouseleave', leaveMenu, false);
//                 }
//             }
//         }
//     }
//
//     /*header二级菜单结束*/
//     return {
//         clear_defaultA: function () {
//             clear_defaultA();
//         },
//         header_banner: function () {
//             getData();
//             bindData();
//             windOnload();
//             auto();
//             bindMousrEvent();
//             bindFocusList();
//         },
//         nav_secondMenu: function () {
//             bind();
//         }
//     }
// })();
// let video=new QQVideo;
// video.clear_defaultA();
// video.header_banner();
// video.nav_secondMenu()
