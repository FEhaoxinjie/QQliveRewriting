function getTencentData() {
    const fs = require('fs');
    const http = require('https');
    const cheerio = require('cheerio');

    function contentDataStart() {
        let url = 'https://v.qq.com',
            contentColumnDataAry = [];


        http.get(url, (res) => {
            let html = ''
            res.setEncoding('utf-8')
            res.on('data', (data) => {
                html += data
            })
            res.on('end', (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let $ = cheerio.load(html),
                        getDataIdAry = ['#populartoday', '#new_vs_activity', '#original', '#custommovie', '#timetable', '#channel-series', '#new_vs_hot_tv1', '#channel-variety', '#channel-movie', '#new_vs_hot_movie1', '#channel-hot-vip', '#channel-cartoon', '#new_vs_hot_child', '#channel-unitedstates', '#channel-karea', '#channel-doco', '#rec_short_con', '#new_vs_hot_ent', '#new_vs3_ych', '#new_vs3_nba', '#new_vs3_games'];
                    for (let i = 0; i < getDataIdAry.length; i++) {
                        let curColumn = getDataIdAry[i];
                        contentColumnDataAry.push($(curColumn).find('.figure_list').find('li').map(function (index, item) {
                            return {
                                ColumnCategoru: curColumn.replace('#', ''),
                                id: index,
                                imgSrc: $(this).find('img.figure_pic').attr('src'),
                                lz_next: $(this).find('img.figure_pic').attr('lz_src') || '',
                                playDuration: $(this).find('.figure_count').text().replace(/\s+/g, '') || '',
                                descTitle: $(this).find('img.figure_pic').attr('alt') || '',
                                avatar: {
                                    pic: $(this).find('a.avatar_pic').find('img').attr('src'),
                                    title: $(this).find('a').find('img').attr('alt')
                                } || '',
                                videoMask: $(this).find('.mark_v').find('img').attr('alt') || '',
                                score: {
                                    Int: $(this).find('.figure_score').find('em.score_l').text(),
                                    Float: $(this).find('.figure_score').find('em.score_s').text()
                                } || '',
                                expectationNum: $(this).find('span.thermometer_info').find('span').slice(1, 2).text(),
                                detailDesc: $(this).find('.figure_desc').text().replace(/\s+/g, '') || '',
                                figureImgSrc: '//puui.qpic.cn/video_caps/0/' + $(this).children('a').attr('data-float') + '.q4.jpg/0' || '',
                            }
                        }).toArray());
                    }
                    fs.exists('../json/contentColumnData', function (exists) {
                        if (exists) {
                            fs.writeFile('../json/contentColumnData/contentColumnData.json', JSON.stringify(contentColumnDataAry), function (err) {
                                try {
                                    console.log('中部栏目数据存储成功');
                                }catch (err){
                                    console.log('代理异常，自动开始下一次！')
                                    return null;
                                }
                            })
                        } else {
                            fs.mkdir('../json/contentColumnData', function (err) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('contentColumnData目录创建完成');
                                    fs.writeFile('../json/contentColumnData/contentColumnData.json', JSON.stringify(contentColumnDataAry), function (err) {
                                        try {
                                            console.log('中部栏目数据存储成功');
                                        }catch (err){
                                            console.log('代理异常，自动开始下一次！')
                                            return null;
                                        }

                                    })
                                }
                            })
                        }
                    })

                }
            })
        })
    };

    function topFollowDataStart() {
        let url = 'https://node.video.qq.com/x/api/followSeries?callback=followSeriesCb&_t=0.6561237973902576';
        let reg = /"data":(\[{.*}\])/g;

        http.get(url, (res) => {
            let html = ''
            res.setEncoding('utf-8')
            res.on('data', (data) => {
                html += data
            })

            res.on('end', (err) => {
                if (err) {
                } else {
                    html = reg.exec(html)[1];
                    fs.exists('../json/top_followData', function (exists) {
                        if (exists) {
                            fs.writeFile('../json/top_followData/top_followData.json', html, function (err) {
                                try {
                                    console.log('顶部追剧栏数据存储成功');
                                }catch (err){
                                   return null;
                                }

                            })
                        } else {
                            fs.mkdir('../json/top_followData', function (err) {
                                if (err) {
                                    console.error(err);
                                } else {
                                    console.log('top_followData目录创建完成');
                                    fs.writeFile('../json/top_followData/top_followData.json', html, function (err) {
                                        try {
                                            console.log('顶部追剧栏数据存储成功');
                                        }catch (err){
                                             console.log('代理异常，自动开始下一次！')
                                            return null;
                                        }

                                    })
                                }
                            })
                        }
                    });

                }
            })
        });
    };

    function topHotSearchDataStart() {
        let url = 'https://data.video.qq.com/fcgi-bin/dataout?callback=jQuery191015520951263936333_1510118867338&auto_id=938&otype=json&_=1510118867343';
        let reg = /"words":(\[{.*}\])/g;

        http.get(url, (res) => {
            let html = ''
            res.setEncoding('utf-8')
            res.on('data', (data) => {
                html += data
            })

            res.on('end', (err) => {
                if (err) {
                } else {
                    html = reg.exec(html)[1];
                    console.log(html);
                    fs.exists('../json/top_hotSearchData', function (exists) {
                        if (exists) {
                            fs.writeFile('../json/top_hotSearchData/top_hotSearchData.json', html, function (err) {
                                try {
                                    console.log('顶部热搜榜数据存储成功');
                                }catch (err){
                                    return null;
                                }

                            })
                        } else {
                            fs.mkdir('../json/top_hotSearchData', function (err) {
                                if (err) {
                                    console.error(err);
                                } else {
                                    console.log('top_hotSearchData目录创建完成');
                                    fs.writeFile('../json/top_hotSearchData/top_hotSearchData.json', html, function (err) {
                                        try {
                                            console.log('顶部热搜榜数据存储成功');
                                        }catch (err){
                                            console.log('代理异常，自动开始下一次！')
                                            return null;
                                        }

                                    })
                                }
                            })
                        }
                    });

                }
            })
        });
    };

    function topBannerDataStart() {
        let url = 'https://v.qq.com';


        http.get(url, (res) => {
            let html = '';
            res.setEncoding('utf-8');
            res.on('data', (data) => {
                html += data
            });

            res.on('end', (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let $ = cheerio.load(html);
                    let bannerAry = $('.slider_nav').find('a').toArray(),
                        bannerData = '';
                    for (let i = 0; i < bannerAry.length; i++) {
                        let curBanner = bannerAry[i];

                        if (i === 0) {
                            bannerData += '[' + JSON.stringify(Object.assign(curBanner.attribs, {
                                bannerTitle: $(curBanner).find('div.tit').text(),
                                bannerDesc: $(curBanner).find('div.txt').text()
                            })) + ',';
                        } else if (i < bannerAry.length - 1) {
                            bannerData += JSON.stringify(Object.assign(curBanner.attribs, {
                                bannerTitle: $(curBanner).find('div.tit').text(),
                                bannerDesc: $(curBanner).find('div.txt').text()
                            })) + ',';
                        } else {
                            bannerData += JSON.stringify(Object.assign(curBanner.attribs, {
                                bannerTitle: $(curBanner).find('div.tit').text(),
                                bannerDesc: $(curBanner).find('div.txt').text()
                            })) + ']';
                        }
                    }
                    fs.exists('../json/top_BannerData', function (exists) {
                        if (exists) {
                            fs.writeFile('../json/top_bannerData/top_bannerData.json', bannerData, function (err) {
                                try {
                                    console.log('顶部轮播数据存储成功');
                                }catch (err){
                                    console.log('代理异常，自动开始下一次！')
                                    return null;
                                }

                            })
                        } else {
                            fs.mkdir('../json/top_BannerData', function (err) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('top_BannerData目录创建完成');
                                    fs.writeFile('../json/top_bannerData/top_bannerData.json', bannerData, function (err) {
                                        try {
                                            console.log('顶部轮播数据存储成功');
                                        }catch (err){
                                            console.log('代理异常，自动开始下一次！')
                                            return null;
                                        }

                                    })
                                }
                            })
                        }
                    })

                }
            })
        })
    };

    topBannerDataStart();
    topFollowDataStart();
    topHotSearchDataStart();
    contentDataStart();
}
// let timer1=global.setInterval(getTencentData,10000);
getTencentData();




