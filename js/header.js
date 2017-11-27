let QQVideo = (function () {

    /*utils开始*/
    {
        let Days = null;

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
        };

        /*
        * 接受两个参数
        * cookie 如果是一个数组就判断第二个参数'del'删除cookie  'get'获取cookie
        * 格式为['key','key',....] 'get/del'  get 会返回一个对象{key:value}
        * 如果是个对象就写入cookie 格式{key:value}
        * */
        function handleCookie(cookie, type) {
            let exp = new Date(),
                arr = null,
                cookieObj = {},
                reg = null;
            type = type || null;
            cookie.days = cookie.days || 30;

            if (Object.prototype.toString.call(cookie) === '[object Array]') {
                if (type === 'get') {

                    for (let i = 0; i < cookie.length; i++) {
                        let item = cookie[i];
                        reg = new RegExp("(^| )" + item + "=([^;]*)(;|$)");
                        if (arr = document.cookie.match(reg)) {
                            cookieObj[item] = decodeURI(arr[2]);
                        } else {
                            continue;
                        }
                    }
                    return cookieObj;
                } else if (type === 'del') {
                    for (let i = 0; i < cookie.length; i++) {
                        let item = cookie[i];
                        exp.setTime(exp.getTime() - 1);
                        reg = new RegExp("(^| )" + item + "=([^;]*)(;|$)");
                        if (document.cookie.match(reg)) {
                            if (document.cookie.match(reg)[2] !== null) {
                                document.cookie = item + "=" + document.cookie.match(reg)[2] + ";expires=" + exp.toGMTString();
                            }
                        }


                    }
                }

            } else if (Object.prototype.toString.call(cookie) === '[object Object]') {

                for (let key in cookie) {
                    if (cookie.hasOwnProperty(key) && key !== 'days') {
                        let exp = new Date();
                        exp.setTime(exp.getTime() + cookie.days * 24 * 60 * 60 * 1000);
                        document.cookie = key + "=" + decodeURI(cookie[key]) + ";expires=" + exp.toGMTString();
                    }
                }
            }


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
            loginMore = document.getElementById('loginMore'),
            binWatchingMask = document.getElementsByClassName('binWatchingMask')[0],
            binWatchingMaskTips = binWatchingMask.getElementsByTagName('span')[0],
            binWatchingMaskIcon = binWatchingMask.getElementsByTagName('i')[1],
            errorMsg = '';

        function loginMenuShow(e) {
            e.stopPropagation();
            loginIn.style.display = 'block';
        }

        function bindLoginEventsHandle() {
            loginMore.addEventListener('click', loginMenuShow, false);
            loginTitleClose.addEventListener('click', function (e) {
                loginIn.style.display = '';
            }, false);
            loginTypeChooseA[2].addEventListener('click', function () {
                loginIn.style.display = '';
            }, false);
            if (handleCookie(['userLoginUse'], 'get')['userLoginUse'] === 'QQ') {
                loginChoose.style.display = 'none';
                loginPanel.style.display = 'block';
                loginTypeChooseA[1].classList.remove('select');
                loginTypeChooseA[0].classList.add('select');
                loginPanelFooter.style.display = '';
                loginPanelContent_VX.style.display = '';
                loginPanelContent_QQ.style.display = 'block';
            } else if (handleCookie(['userLoginUse'], 'get')['userLoginUse'] === 'VX') {
                loginChoose.style.display = 'none';
                loginPanel.style.display = 'block ';
                loginTypeChooseA[0].classList.remove('select');
                loginTypeChooseA[1].classList.add('select');
                loginPanelContent_QQ.style.display = '';
                loginPanelContent_VX.style.display = 'block';
                loginPanelFooter.style.display = 'none';
            }
            loginType_QQ.addEventListener('click', function (e) {
                e.stopPropagation();
                handleCookie({userLoginUse: 'QQ'})
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
                handleCookie({userLoginUse: 'VX'});
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
                    handleCookie({autoLogin: false});
                    handleCookie({selfLoginIn: true});
                } else {
                    autoLoginChoose.style.backgroundPosition = '';
                    handleCookie({autoLogin: true});
                    handleCookie({selfLoginIn: false});
                }
                autoChooseSign *= -1;
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
            userBoxInfoTopOpen.addEventListener('click', loginMenuShow, false);
            if (handleCookie(['autoLogin'], 'get')['autoLogin'] === 'false') {
                autoLoginChoose.style.backgroundPosition = '-74px -163px';
            } else {
                autoLoginChoose.style.backgroundPosition = '';
                handleCookie({autoLogin: true});
            }
            if (handleCookie(['autoLogin'], 'get')['autoLogin'] === 'true') {
                if (JSON.stringify(handleCookie(['userName', 'password'], 'get')) !== '{}') {

                    ajax({
                        method: 'POST',
                        url: 'http://47.94.165.170:8080/txvideo/login',
                        async: true,
                        data: {
                            userName: handleCookie(['userName'], 'get')['userName'],
                            passWord: handleCookie(['password'], 'get')['password']
                        },
                        success: function (data) {
                            try {
                                if (data.code === '1' && data.message === '登录成功') {

                                    let userBoxInfoStr = ` <span>QQ帐号: ${data.data[0].nickName}${parseFloat(data.data[0].isVip) > -1 ? `<i class="userVip"><i class="userVipNum${data.data[0].isVip}"></i></i>` : ``}</span>
                        <div class="loginUserMenu">
                            <a href="javascript:;" id="userChange">切换</a>
                            <a href="javascript:;" id="userExit">退出</a>
                        </div>${data.data[0].isVip > -1 ? `<span>vip于${data.data[0].vipOutTime}到期</span>` : ``}
                        <a href="javascript:;" class="tvPrivilege">开通电视特权</a>
                        <a href="javascript:;" class="vipRenew">续费</a>`;
                                    let userBoxHeader = `${data.data[0].accountType === '0' ? `<i class="QQ"></i>` : `<i class="VX"></i>`}${parseFloat(data.data[0].isVip) > -1 ? `<i class="userVip"><i class="userVipNum${data.data[0].isVip}"></i></i>` : ``}<img src="${data.data[0].userPic}" alt=""><span></span>`;

                                    userBoxInfoTop.innerHTML = userBoxInfoStr;
                                    userBoxUserHeader.innerHTML = userBoxHeader;
                                    loginMore.innerText = '查看更多';
                                    loginMore.removeEventListener('click', loginMenuShow);
                                    binWatchingMaskTips.innerText = '你观看的第18集的 猎场 更新啦';
                                    binWatchingMaskIcon.style.left = '55.8%';
                                    userboxLogin.style.display = 'none';
                                    loginIn.style.display = 'none';
                                    userBoxUserHeader.removeEventListener('click', loginMenuShow)
                                    userboxLogin.removeEventListener('click', loginMenuShow)
                                    userBoxInfoTopOpen.removeEventListener('click', loginMenuShow)
                                } else {
                                    alert('失败')
                                }
                                let userExit = document.getElementById('userExit');
                                let userChange = document.getElementById('userChange');
                                userExit.addEventListener('click', function (e) {
                                    handleCookie(['userName', 'password'], 'del');
                                    userBoxUserHeader.addEventListener('click', loginMenuShow, false)
                                    userboxLogin.addEventListener('click', loginMenuShow, false)
                                    userBoxInfoTopOpen.addEventListener('click', loginMenuShow, false);
                                    loginMore.innerText = '登录查看更多';
                                    loginMore.addEventListener('click', loginMenuShow, false);
                                    binWatchingMaskTips.innerText = '我的追剧节目单';
                                    binWatchingMaskIcon.style.left = '51%';

                                    window.location.reload();
                                }, false);
                                userChange.addEventListener('click', function (e) {
                                    loginMenuShow(e);
                                    if (handleCookie(['userLoginUse'], 'get')['userLoginUse'] === 'QQ') {

                                        loginChoose.style.display = 'none';
                                        loginPanel.style.display = 'block';
                                        loginTypeChooseA[1].classList.remove('select');
                                        loginTypeChooseA[0].classList.add('select');
                                        loginPanelFooter.style.display = '';
                                        loginPanelContent_VX.style.display = '';
                                        loginPanelContent_QQ.style.display = 'block';
                                    } else if (handleCookie(['userLoginUse'], 'get')['userLoginUse'] === 'VX') {
                                        loginChoose.style.display = 'none';
                                        loginPanel.style.display = 'block ';
                                        loginTypeChooseA[0].classList.remove('select');
                                        loginTypeChooseA[1].classList.add('select');
                                        loginPanelContent_QQ.style.display = '';
                                        loginPanelContent_VX.style.display = 'block';
                                        loginPanelFooter.style.display = 'none';
                                    }
                                }, false);
                            } catch (e) {
                            }
                        }

                    });
                }
            }
            if (handleCookie(['selfLoginIn'], 'get')['selfLoginIn'] === 'true') {
                if (JSON.stringify(handleCookie(['userName', 'password'], 'get')) !== '{}') {
                    ajax({
                        method: 'POST',
                        url: 'http://47.94.165.170:8080/txvideo/login',
                        async: true,
                        data: {
                            userName: handleCookie(['userName'], 'get')['userName'],
                            passWord: handleCookie(['password'], 'get')['password']
                        },
                        success: function (data) {
                            try {
                                if (data.code === '1' && data.message === '登录成功') {
                                    let userBoxInfoStr = ` <span>QQ帐号: ${data.data[0].nickName}${parseFloat(data.data[0].isVip) > -1 ? `<i class="userVip"><i class="userVipNum${data.data[0].isVip}"></i></i>` : ``}</span>
                        <div class="loginUserMenu">
                            <a href="javascript:;" id="userChange">切换</a>
                            <a href="javascript:;" id="userExit">退出</a>
                        </div>${data.data[0].isVip > -1 ? `<span>vip于${data.data[0].vipOutTime}到期</span>` : ``}
                        <a href="" class="tvPrivilege">开通电视特权</a>
                        <a href="" class="vipRenew">续费</a>`;
                                    let userBoxHeader = `${data.data[0].accountType === '0' ? `<i class="QQ"></i>` : `<i class="VX"></i>`}${parseFloat(data.data[0].isVip) > -1 ? `<i class="userVip"><i class="userVipNum${data.data[0].isVip}"></i></i>` : ``}<img src="${data.data[0].userPic}" alt=""><span></span>`
                                    userBoxInfoTop.innerHTML = userBoxInfoStr;
                                    userBoxUserHeader.innerHTML = userBoxHeader;
                                    loginMore.innerText = '查看更多';
                                    loginMore.removeEventListener('click', loginMenuShow);
                                    binWatchingMaskTips.innerText = '你观看的第18集的 猎场 更新啦';
                                    binWatchingMaskIcon.style.left = '55.8%';
                   topFollowingHandle();
                                    userboxLogin.style.display = 'none';
                                    loginIn.style.display = 'none';
                                    userBoxUserHeader.removeEventListener('click', loginMenuShow)
                                    userboxLogin.removeEventListener('click', loginMenuShow)
                                    userBoxInfoTopOpen.removeEventListener('click', loginMenuShow)
                                    handleCookie({selfLoginIn: false});
                                }
                                let userExit = document.getElementById('userExit');
                                let userChange = document.getElementById('userChange');
                                userExit.addEventListener('click', function (e) {
                                    e.stopPropagation();
                                    handleCookie(['userName', 'password'], 'del');
                                    userBoxUserHeader.addEventListener('click', loginMenuShow, false)
                                    userboxLogin.addEventListener('click', loginMenuShow, false)
                                    userBoxInfoTopOpen.addEventListener('click', loginMenuShow, false)
                                    loginMore.innerText = '登录查看更多';
                                    binWatchingMaskTips.innerText = '我的追剧节目单';
                                    binWatchingMaskIcon.style.left = '51%';
                                    topFollowingHandle();
                                    window.location.reload();
                                }, false);
                                userChange.addEventListener('click', function (e) {
                                    e.stopPropagation();
                                    loginMenuShow(e);
                                    if (handleCookie(['userLoginUse'], 'get')['userLoginUse'] === 'QQ') {
                                        loginChoose.style.display = 'none';
                                        loginPanel.style.display = 'block';
                                        loginTypeChooseA[1].classList.remove('select');
                                        loginTypeChooseA[0].classList.add('select');
                                        loginPanelFooter.style.display = '';
                                        loginPanelContent_VX.style.display = '';
                                        loginPanelContent_QQ.style.display = 'block';
                                    } else if (handleCookie(['userLoginUse'], 'get')['userLoginUse'] === 'VX') {
                                        loginChoose.style.display = 'none';
                                        loginPanel.style.display = 'block ';
                                        loginTypeChooseA[0].classList.remove('select');
                                        loginTypeChooseA[1].classList.add('select');
                                        loginPanelContent_QQ.style.display = '';
                                        loginPanelContent_VX.style.display = 'block';
                                        loginPanelFooter.style.display = 'none';
                                    }
                                }, false);
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
                            if (data.code === '0' && data.message === '该账户不存在') {
                                errorMsg = '帐号或密码不正确！请重新输入。';
                                loginInputPasswordInput.value = '';
                                loginInputPasswordInput.focus();
                                loginErrorText.innerText = errorMsg;
                                loginError.style.display = 'block';
                                loginError.tipsTimer = window.setTimeout(function () {
                                    loginError.style.display = '';
                                    window.clearTimeout(loginError.tipsTimer);
                                }, 5000)
                            } else {
                                loginError.style.display = 'none';
                                handleCookie({
                                    days: 3,
                                    userName: username,
                                    password: password,
                                    selfLoginIn: handleCookie(['autoLogin'], 'get')['autoLogin'] == 'true' ? false : true,
                                    userloginIn: true
                                })
                                window.location.reload();

                            }
                        }
                    })
                }
                if (errorMsg !== '') {
                    loginErrorText.innerText = errorMsg;
                    loginError.style.display = 'block';
                    loginError.tipsTimer = window.setTimeout(function () {
                        loginError.style.display = '';
                        window.clearTimeout(loginError.tipsTimer);
                    }, 5000)
                }

            }, false)
        }


    }
    /*用户登录结束*/
    /*追剧目录开始*/
    {

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
            console.log(handleCookie(['userLoginIn'], 'get')['userLoginIn']);
            if (handleCookie(['userLoginIn'], 'get')['userLoginIn']) {
                console.log(1);
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

        if (handleCookie(['topFollowClose'], 'get')['topFollowClose']) {
            binWatching.style.display = 'none';
        }

        function followClose() {
            let topFollowClose = document.getElementById('topFollowClose'),
                topFollowCloseTips = document.getElementById('topFollowCloseTips');

            topFollowClose.addEventListener('click', function (e) {
                e.stopPropagation();
                handleCookie({days: 3, topFollowClose: true})
                binWatching.style.display = 'none';
            }, false)
            topFollowClose.addEventListener('mouseenter', function (e) {
                e.stopPropagation();
                topFollowCloseTips.style.display = 'block';
            }, false)
            topFollowClose.addEventListener('mouseout', function (e) {
                e.stopPropagation();
                topFollowCloseTips.style.display = '';
            }, false)
        }

        function topFollowingHandle() {
            ajax({
                    url: 'json/top_followData/top_followData.json',
                    method: "get",
                    data: null,
                    async: true,
                    success: function (response) {
                        bindWatchingData(response);
                        followClose();
                    }
                }
            );
        }

    }
    /*追剧目录结束*/
    /*顶部热搜榜单开始*/
    {
        let hotSelectInfo = document.getElementsByClassName('hotInfo')[0],
            hotInfoStr = ``,
            oldEle = document.createElement('div'),
            oldSelectInfo = null,
            hisTags = document.getElementsByClassName('hisTags')[0],
            hisTagsAry = [],
            clearHistory = document.getElementById('clearHistory');

        function topHotHandle() {
            ajax({
                url: 'json/top_hotSearchData/top_hotSearchData.json',
                method: "get",
                data: null,
                async: true,
                success: function (response) {
                    for (let i = 0; i < 10; i++) {
                        let curInfo = response[i];
                        hotInfoStr += `<li><a href="javascript:;" target="_blank"><span>${curInfo.c_pos}</span><span>${curInfo.c_title}</span></a></li>`;
                    }
                    hotSelectInfo.innerHTML = hotInfoStr;
                    let selectInput = document.getElementsByClassName('selectInput')[0],
                        selectBox = document.getElementsByClassName('selectBox')[0],
                        selectBoxBtn = selectBox.getElementsByTagName('button')[0],
                        hotSelectInfoLi = hotSelectInfo.getElementsByTagName('li'),
                        secSelBox = document.getElementsByClassName('secSelBox')[0];
                    for (let i = 0; i < hotSelectInfoLi.length; i++) {
                        let li = hotSelectInfoLi[i];
                        li.onclick = function () {
                            selectInput.value = li.getElementsByTagName('span')[1].innerText;
                            sreachStart();
                        }
                    }
                    let selectVal = response[Math.round(Math.random() * 10)].c_title;
                    selectInput.value = selectVal;
                    selectInput.addEventListener('focus', function (e) {
                        if (selectInput.value === selectVal) {
                            selectInput.value = '';
                        }
                        secSelBox.style.display = 'block';
                        if (document.activeElement.id === 'selectInput') {
                            window.addEventListener('keydown', sreachKey, false)
                        } else {
                            window.removeEventListener('keydown', sreachKey)
                        }
                    }, false);
                    selectInput.addEventListener('click', function (e) {
                        e.stopPropagation();
                    }, false)

                    document.documentElement.addEventListener('click', function () {
                        if (selectInput.value === '') {
                            selectInput.value = selectVal;
                        }
                        secSelBox.style.display = '';
                    }, false);

                    function sreachKey(e) {
                        if (e.keyCode === 13) {
                            sreachStart();
                        }
                    }

                    if (handleCookie(['hisTags'], 'get')['hisTags']) {
                        let hisTagsStr = ``;
                        hisTagsAry = handleCookie(['hisTags'], 'get')['hisTags'].split(',');
                        for (let i = 0; i < hisTagsAry.length; i++) {
                            let hisTag = hisTagsAry[i];
                            if (hisTag !== '') {
                                hisTagsStr += `<li><a href="javascript:;" target="_blank">${hisTag}</a></li>`
                            }

                        }
                        hisTags.innerHTML = hisTagsStr;
                        let hisTagsInfoLi = hisTags.getElementsByTagName('li');
                        for (let i = 0; i < hisTagsInfoLi.length; i++) {
                            let li = hisTagsInfoLi[i];
                            li.onclick = function (e) {
                                e.stopPropagation();
                                selectInput.value = li.innerText;
                                sreachStart();
                            }
                        }
                        oldEle = hisTags.children[0];
                        oldSelectInfo = hisTags.children[0].innerText;
                    }

                    function sreachStart() {
                        let selectInfo = null;
                        selectInput.value === '' ? selectInfo = selectVal : selectInfo = selectInput.value;
                        if (hisTagsAry.length !== 0) {
                            let LENGTHS = hisTagsAry.length;
                            console.log(LENGTHS);
                            for (let i = 0; i < LENGTHS; i++) {
                                let current = hisTagsAry[i];
                                console.log(i);
                                console.log(current);
                                if (current !== selectInfo) {
                                    if (i !== LENGTHS - 1) {
                                        continue;
                                    }
                                } else {
                                    let oldVal = current;
                                    for (let j = i; j >= 0; j--) {
                                        hisTagsAry[j + 1] = hisTagsAry[j];
                                    }
                                    hisTagsAry[0] = current;
                                    hisTagsAry.pop();
                                    break;
                                }
                                hisTagsAry.unshift(selectInfo);
                            }
                        } else {
                            hisTagsAry.unshift(selectInfo);
                        }
                        console.log(hisTagsAry);
                        if (hisTagsAry.length) {
                            handleCookie({hisTags: hisTagsAry});
                        }

                        if (hisTags.children.length === 0) {
                            oldEle.style.display = 'none';
                            hisTags.appendChild(oldEle);
                        }
                        if (selectInfo !== '') {
                            window.open(`https://v.qq.com/x/search/?q=${selectInfo}&stag=101&smartbox_ab=`);
                            for (let i = 0; i < hisTags.children.length - 1; i++) {
                                let curChild = hisTags.children[i];
                                if (curChild.innerText === selectInfo) {
                                    hisTags.removeChild(curChild);
                                    hisTags.insertBefore(curChild, hisTags.children[0])
                                    return;
                                }
                            }
                            let hisTagLi = document.createElement('li'),
                                hisTagA = document.createElement('a');
                            hisTagA.target = '_blank';
                            hisTagA.innerText = selectInfo;
                            hisTagLi.appendChild(hisTagA);
                            hisTags.insertBefore(hisTagLi, oldEle);
                            oldEle = hisTagLi;
                            selectInput.value = selectInfo;
                            let hisTagsInfoLi = hisTags.getElementsByTagName('li');
                            for (let i = 0; i < hisTagsInfoLi.length; i++) {
                                let li = hisTagsInfoLi[i];
                                li.onclick = function (e) {
                                    e.stopPropagation();
                                    selectInput.value = li.innerText;
                                    sreachStart();
                                }
                            }
                        }
                    }

                    selectBoxBtn.addEventListener('click', sreachStart, false);
                    selectInput.addEventListener('input', function (e) {
                        e.stopPropagation();
                    }, false);
                    clearHistory.addEventListener('click', function (e) {
                        hisTagsAry = [];
                        hisTags.innerHTML = '';
                        handleCookie(['hisTags'], 'del')
                    }, false);
                }
            })
        }

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
    /*滚动头部菜单开始*/
    {
        let headerTop = document.getElementsByClassName('header-top')[0];
        let moreChannel = document.getElementsByClassName('moreChannel')[0];
        let extraChannel = document.getElementsByClassName('extraChannel')[0];
        let moreChannelNav = document.getElementsByClassName('moreChannelNav')[0];

        function scrollShow() {
            let bodyScrollH = null;
            window.onscroll = function () {
                bodyScrollH = document.documentElement.scrollTop;
                console.log(bodyScrollH);
                if (bodyScrollH <= 600) {
                    headerTop.style.opacity = '';
                    headerTop.style.position = '';
                    headerTop.style.top = '';
                    headerTop.style.backgroundColor = '';
                    extraChannel.style.display = '';
                } else if (bodyScrollH > 600 && bodyScrollH < 1200) {
                    if (headerTop.style.opacity === 0) {
                        return;
                    }
                    headerTop.style.opacity = 0;
                } else if (bodyScrollH >= 1200) {
                    if (extraChannel.style.display === 'block') return;
                    headerTop.style.opacity = 1;
                    headerTop.style.position = 'fixed';
                    headerTop.style.top = 0;
                    headerTop.style.backgroundColor = 'rgba(255,255,255,.95)';
                    extraChannel.style.display = 'block';
                }
            };

            function rotateShow() {
                moreChannel.style.transform = 'rotate(90deg) scale(.5)';
                window.setTimeout(function () {
                    moreChannel.style.transform = 'rotate(90deg) scale(1)';
                }, 500)
            }

            function rotateHide() {
                moreChannel.style.transform = 'rotate(90deg) scale(.5)';
                window.setTimeout(function () {
                    moreChannel.style.transform = '';
                }, 500)
            }

            moreChannel.addEventListener('mouseenter', rotateShow, false);
            moreChannel.addEventListener('mouseleave', rotateHide, false);
            moreChannel.addEventListener('click', function () {
                if (moreChannel.style.background) {
                    moreChannel.addEventListener('mouseenter', rotateShow, false);
                    moreChannel.addEventListener('mouseleave', rotateHide, false);
                    moreChannel.style.background = '';
                    moreChannelNav.style.display = '';
                    moreChannel.style.backgroundSize = '';

                } else {
                    moreChannel.style.background = 'url(./css/images/header/nav_top/moreChannelClose.png) center center no-repeat';
                    moreChannel.style.backgroundSize = '100%';
                    moreChannelNav.style.display = 'block';
                    moreChannel.removeEventListener('mouseenter', rotateShow);
                    moreChannel.removeEventListener('mouseleave', rotateHide);
                }

            }, false)
        }
    }
    /*滚动头部菜单结束*/
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
        },
        topHotHandle: topHotHandle,
        topFollowingHandle: topFollowingHandle,
        bindLoginEventsHandle: bindLoginEventsHandle,
        scrollShow: scrollShow
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


