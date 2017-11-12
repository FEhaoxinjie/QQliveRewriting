/*
* context 是当前需要实现hoverVideo特效的盒子
* data 是一个数据对象 填写需要填充的数据格式为：
* {
        videoDefaultImg: 'img/defaultVideo.png', 视频默认显示图片
        videoSrc: 'http://223.111.251.83/vhot2.qqvideo.tc.qq.com/Alydvw0JWqp-xKYm7-Xc_FsZbJNRh3IAJCI7Q6pe9Vgw/r1516ng7qoi.mp4?vkey=12FF96B7BE9FAF2EC7DABD9C5F01B7F6D36583AF485EE995063B7C1797BE62BE295348A0E4935E17937ACA575FD5A556506CF1894E025DE05FE0A8DE76B48D43FE3605697D2F03945A3A625874F0E4046C225FC15EF56BA1&sdtfrom=v1095&guid=2a447f527f6a5cd0f735f3d65f328ef7',
        短时频地址
        videoTitle: {
            title: '李雷和李梅梅',  视频名字
            keywords: ['2017', '爱情', '喜剧']   类别标签
        },
        mediaSign: 'DB',  微博热议（WB）/豆瓣高分 （DB）
        performerList: ['xxx', 'yyy', 'zzz', 'aa', 'bb'],  演员列表
        review_txt: '6月10日跟男朋友电影院看的，看完后本来挺好的，但一个星期最后不知怎么我们就分手了，但我觉得这个电影很好看',
         评论
    }
* */
function hoverVideo(context, data) {
    data = data || {
        videoDefaultImg: 'img/defaultVideo.png',
        videoSrc: '',
        videoTitle: {
            title: '',
            keywords: []
        },
        mediaSign: '',
        performerList: [],
        review_txt: '',
    };
    let hoverVideo = document.createElement('div'),
        hoverVideoBox = document.createElement('div'),
        hoverVideoPlay = document.createElement('video'),
        hoverVideoContent = document.createElement('div'),
        videoVolume = document.createElement('span'),
        videoTitle = document.createElement('div'),
        videoTitleA = document.createElement('a'),
        mediaSign = document.createElement('div'),
        mediaSignDiv = document.createElement('div'),
        mediaSignI = document.createElement('i'),
        mediaSignSpan = document.createElement('span'),
        video_Tags = document.createElement('div'),
        tag_tit = document.createElement('span'),
        video_review = document.createElement('div'),
        review_name = document.createElement('div'),
        video_btn = document.createElement('div'),
        video_btn_follow = document.createElement('span'),
        video_btn_followA = document.createElement('a'),
        video_btn_followI = document.createElement('i'),
        video_btn_down = document.createElement('span'),
        video_btn_downA = document.createElement('a'),
        video_btn_downI = document.createElement('i'),
        line = document.createElement('span');
    console.log(data.performerList);
    if(data.performerList.length){
        tag_tit.innerText = '主演：';
    }
    if(data.review_txt!==''){
        review_name.innerText = '点评：';
    }
    hoverVideo.classList.add('hoverVideo');
    hoverVideoBox.classList.add('hoverVideoBox');
    hoverVideoContent.classList.add('hoverVideoContent');
    videoVolume.classList.add('videoVolume');
    videoTitle.classList.add('videoTitle');
    mediaSign.classList.add('mediaSign');
    video_Tags.classList.add('video_Tags');
    tag_tit.classList.add('tag_tit');
    video_review.classList.add('video_review');
    review_name.classList.add('review_name');
    video_btn.classList.add('video_btn');
    video_btn_follow.classList.add('video_btn_follow');
    video_btn_down.classList.add('video_btn_down');
    line.classList.add('line');

    hoverVideo.appendChild(hoverVideoBox);
    hoverVideo.appendChild(hoverVideoContent);
    hoverVideoBox.appendChild(hoverVideoPlay);
    hoverVideoBox.appendChild(videoVolume);
    hoverVideoContent.appendChild(videoTitle);
    hoverVideoContent.appendChild(mediaSign);
    hoverVideoContent.appendChild(video_Tags);
    hoverVideoContent.appendChild(video_review);
    hoverVideoContent.appendChild(video_btn);
    videoTitleA.href = 'javascript:;';
    videoTitle.appendChild(videoTitleA);
    mediaSign.appendChild(mediaSignDiv);
    mediaSignDiv.appendChild(mediaSignI);
    mediaSignDiv.appendChild(mediaSignSpan);
    video_Tags.appendChild(tag_tit);
    video_review.appendChild(review_name);
    video_btn_followA.appendChild(video_btn_followI)
    video_btn_follow.appendChild(video_btn_followA);
    video_btn_downA.appendChild(video_btn_downI);
    video_btn_downA.href = '//node.video.qq.com/x/api/download_pc';
    video_btn_down.appendChild(video_btn_downA);
    video_btn.appendChild(video_btn_follow, line, video_btn_down);
    video_btn.appendChild(line);
    video_btn.appendChild(video_btn_down);
    console.log(hoverVideo);
    context.appendChild(hoverVideo);


    function bindData() {
        hoverVideoBox.style.background = 'url(' + data.videoDefaultImg + ') 0 0 no-repeat;';
        hoverVideoPlay.src = data.videoSrc;
        hoverVideoPlay.loop = 'loop';
        videoVolume.addEventListener('click', function () {
            if (videoVolume.style.background === '') {
                videoVolume.style.background = 'url(img/voice.png) 0 0 no-repeat';
                videoVolume.style.backgroundSize = '100%';
                hoverVideoPlay.volume = 0;
            } else {
                videoVolume.style.background = '';
                hoverVideoPlay.volume = 1;
            }
        }, false);
        if(data.review_txt===''){
            video_review.style.height='0';
        }
        videoTitleA.innerText = data.videoTitle.title;
        videoTitle.title = data.videoTitle.title + ' ' + data.videoTitle.keywords.join(' ');
        for (let i = 0; i < data.videoTitle.keywords.length; i++) {
            let keyword = data.videoTitle.keywords[i];
            let keyWordSpan = document.createElement('span');
            keyWordSpan.innerText = keyword;
            videoTitle.appendChild(keyWordSpan);
        }
        if (data.mediaSign === 'WB') {
            mediaSignI.className = 'weiboLogo';
            mediaSignSpan.className = 'weiboText';
            mediaSignSpan.innerText = '微博热议'
        } else if(data.mediaSign === 'DB') {
            mediaSignI.className = 'doubanLogo';
            mediaSignSpan.className = 'dopubanText';
            mediaSignSpan.innerText = '豆瓣高分'
        }

        for (let i = 0; i < data.performerList.length; i++) {

            let performer = data.performerList[i];
            if (i !== data.performerList.length - 1) {
                performer = performer + '/';
            }
            let performerSpan = document.createElement('span');
            performerSpan.innerText = performer;
            video_Tags.appendChild(performerSpan);
        }
        let review_txt = document.createElement('span');
        review_txt.innerText = data.review_txt;
        review_txt.title = data.review_txt;
        video_review.appendChild(review_txt);
    }

    bindData();
    hoverVideo.addEventListener('mouseenter', function () {
        hoverVideoPlay.play();
        hoverVideo.style.opacity = 1;
    });
    hoverVideo.addEventListener('mouseleave', function () {
        hoverVideoPlay.pause();
        hoverVideo.style.boxShadow = '0 2px 18px rgba(0,0,0,.35)';
        hoverVideo.style.opacity = '';
    })
}