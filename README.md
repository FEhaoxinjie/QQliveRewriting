##### 2017/10/31 基本完成了头部的样式及初步的账户登录功能

##### 2017/11/12 基本完成了登录功能和两个公共的特效方法，修改了爬虫方法，重新设计了数据爬取的格式便于后期使用；


##### 201711/16 完成了页面滚动时顶部菜单的显示功能；完善了登录之后界面的细节变化，完成了历史记录及删除和历史记录数组的去重，排序等处理。腾讯视频头部工作基本完成

#### 如何使用
> npm clone https://github.com/FEhaoxinjie/QQliveRewriting.git

#### 功能模块
> - 数据爬取模块
   + node的http模块和cheerio模块（因为腾讯视频服务器除了视频资源帐号资源等比较重要的做了深度加密以外其他的都很简单所以直接用http发出请求即可）
   + 因为本次数据量过多，数据接口决定不再即使获取而是自动寻找本地json文件夹再下面自动创建新的文件夹把每一块数据分类存入
   
  - JS特效模块
    + 这里用了前面单例模式 来写，后来发现es6 let的块级作用域 也能起到类似的作用所以有些逻辑就放到了一个个的块级作用域中
    + 写了一个cookie的通用处理函数 可以实现批量增加、删除、修改cookie操作；
    ![](https://github.com/FEhaoxinjie/QQliveRewriting/blob/master/showImages/TIM%E6%88%AA%E5%9B%BE20171127193254.png)
    + 写了两个公有的函数处理之后同学需要大量使用的特效 只要传入参数自定义实现效果
    ![](https://github.com/FEhaoxinjie/QQliveRewriting/blob/master/showImages/TIM%E6%88%AA%E5%9B%BE20171127193405.png)
    ![](https://github.com/FEhaoxinjie/QQliveRewriting/blob/master/showImages/TIM%E6%88%AA%E5%9B%BE20171127193414.png)
     

####展示

> 数据爬取代码
![](https://github.com/FEhaoxinjie/QQliveRewriting/blob/master/showImages/TIM%E6%88%AA%E5%9B%BE20171127192339.png)
![](https://github.com/FEhaoxinjie/QQliveRewriting/blob/master/showImages/TIM%E6%88%AA%E5%9B%BE20171127192348.png)
> 界面展示
![](https://github.com/FEhaoxinjie/QQliveRewriting/blob/master/showImages/TIM%E6%88%AA%E5%9B%BE20171127202704.png)
![](https://github.com/FEhaoxinjie/QQliveRewriting/blob/master/showImages/TIM%E6%88%AA%E5%9B%BE20171127203203.png)
![](https://github.com/FEhaoxinjie/QQliveRewriting/blob/master/showImages/TIM%E6%88%AA%E5%9B%BE20171127203213.png)
![](https://github.com/FEhaoxinjie/QQliveRewriting/blob/master/showImages/TIM%E6%88%AA%E5%9B%BE20171127203222.png)
![](https://github.com/FEhaoxinjie/QQliveRewriting/blob/master/showImages/TIM%E6%88%AA%E5%9B%BE20171127203234.png)
![](https://github.com/FEhaoxinjie/QQliveRewriting/blob/master/showImages/TIM%E6%88%AA%E5%9B%BE20171127203312.png)
![](https://github.com/FEhaoxinjie/QQliveRewriting/blob/master/showImages/TIM%E6%88%AA%E5%9B%BE20171127203324.png)
![](https://github.com/FEhaoxinjie/QQliveRewriting/blob/master/showImages/TIM%E6%88%AA%E5%9B%BE20171127203337.png)
![](https://github.com/FEhaoxinjie/QQliveRewriting/blob/master/showImages/TIM%E6%88%AA%E5%9B%BE20171127203514.png)
![](https://github.com/FEhaoxinjie/QQliveRewriting/blob/master/showImages/TIM%E6%88%AA%E5%9B%BE20171127203552.png)
![](https://github.com/FEhaoxinjie/QQliveRewriting/blob/master/showImages/TIM%E6%88%AA%E5%9B%BE20171127203643.png)
![]()

