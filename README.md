## node version 18.17.1

## 主要适配了PC端大屏（innerWidth > 1537px） 、PC端小屏(innerWidth < 1537px)、移动端

## loading页面通过本地引入的方式，计算用户引入图片、视频、字体等文件的时间，等待加载静态文件完成后再显示主页面（目前在移动端和safari浏览器都不支持计算引入字体，在AppContent中主动引入 import ('./fonts.css')）

## App作为主页面，分为移动端和PC端，通过Scroller和MobileScroller来区分；
#### 移动端竖屏滚动，使用原生css scrollSnap来控制滚动，方便用户快滚动
#### PC端横屏滚动 使用GSAP的滚动来计算滚动距离
#### 移动端和PC端都在scroller组件计算滚动到第几页来控制每一页的动画开始和结束

## 移动端为了适配iphone safari浏览器也做了单独的样式区分


## Section2为了实现横向滚动移动中心图片，把当前组件跟随浏览器滚动距离也向右移动，其中page2.1主要是用来写视频播放控制条的

## 目前基础样式功能已经完善，待完善的link都已经在代码中标注出来 可以通过console.log进行全局搜索，修改后可删除

### 待完成的link有
#### whitepaper
#### launch app
#### WalletPopover里面的next button

## 使用vite打包 运行 npm run build 可进行打包
## 启动本地项目 运行 npm run dev
