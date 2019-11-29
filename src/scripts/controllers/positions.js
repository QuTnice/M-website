//const positionView = require('..iews/position.art')
const positionView = require('../views/movieAll.art')
const positionListView = require('../views/position-list.art')
const postionModel = require('../models/postion')
const postionMoreModel = require('../models/position-more')
const PositionHeader = require('../views/header-movie.art')
const upComing = require('../views/upcoming.art')
const upComingModel = require('../models/coming')
const comingInit = require('../models/comingInitial')


const BScroll = require('better-scroll')

class Position {
  constructor() {
    // this.render()
    this.list = []
    this.key = 1
    this.key1 = 1
    this.k = 0;
    this.l = 0;
  }


  renderer(list) {

    let positionListHtml = positionListView({
      list
    })

    $('main ul').html(positionListHtml)

    $('footer').css('display', 'block')
    //进入详情页
    $('main ul li').on('tap', function () {
      let id = $(this).attr('data-id')
      //
      location.hash = `detail/${id}`

      $('footer').css('display', 'none')
    })
  }
  renderer2(timeArr) {

    let comingList = upComing({
      timeArr
    })
    // console.log(comingMovie);

    $('main ul').html(comingList)

    $('footer').css('display', 'block')

    $('.m-item').on('tap', function () {
      let id = $(this).attr('data-id')
      console.log(id);

      location.hash = `#movieParticulars/${id}`

    })


  }

  async render() {
    let that = this
    let result = await postionModel.get();//等待获取数据完成
    let comingResult = await comingInit.get({}) //获取即将上映的数据
    // console.log(comingResult);

    let CityN = localStorage.getItem('name')
    let CityID = localStorage.getItem('Cid')

    let arr = result.movieIds //获取60个电影的id值
    var a = [];
    var b = [];
    for (let i = 0, len = arr.length; i < len; i += 12) {
      a.push(arr.slice(i, i + 12));

    }
    for (let i = 0; i < a.length; i++) {
      b.push(a[i].join('%2C'))
    }
    //console.log(b);

    //对即将上映的数据进行切割
    let arr2 = comingResult.movieIds
    // console.log(arr2);
    var c = [];
    var d = [];
    for (let i = 0, len = arr2.length; i < len; i += 10) {
      c.push(arr2.slice(i, i + 10));

    }
    for (let i = 0; i < c.length; i++) {
      d.push(c[i].join('%2C'))
    }
    // console.log(d);


    // $('header').css('display','block')

    let timelist = this.timelist = comingResult.coming
    let Arra = []
    // console.log(timelist);
    for (let i = 0; i < timelist.length; i++) {
      if (!Arra[timelist[i].comingTitle]) {
        Arra[timelist[i].comingTitle] = [];
      }
      Arra[timelist[i].comingTitle].push(timelist[i])
    }
    let timeArr = Object.entries(Arra);
    // console.log(timeArr);




    // let html = positionView({
    //   list: result.movieList,//传参
    // })

    let headerHtml = PositionHeader({})
    let $header = $('header')
    $header.html(headerHtml)
    $('.city-name').on('tap', function () {
      location.hash = $(this).attr('data-to')
    })

    $('.city-name').html(CityN)


    let positionHtml = positionView({})
    let $main = $('main')
    $main.html(positionHtml) //加载main内容

    let comingMovie = this.comingMovie = comingResult.coming

    let list = this.list = result.movieList
    this.renderer(list)
    $('.tab-item').on('tap', function () {
      $(this).addClass('active').siblings().removeClass('active')
      // window.PosIndex = $(this).index()
      // localStorage.setItem('posIndex', window.PosIndex)
      // console.log(localStorage.getItem('posIndex', window.PosIndex));

      // if(localStorage.getItem('posIndex', window.PosIndex) == 0){
      //   this.renderer(list)
      // }
      // else{
      //       this.renderer(list)
      // }
    })
    // let indexx = localStorage.getItem('posIndex')
    // console.log(localStorage.getItem('posIndex'));
    // $('.tab-item').eq(indexx).addClass('active').siblings().removeClass('active')
    $('.tab-item').on('tap', function () {
      $('.tab-item').removeClass('active')
      $(this).addClass('active')
      //判断当前的是否被选中 实现页面切换
      if ($('.hot').hasClass('active')) {
        that.renderer(list)
        window.PosIndex = $(this).index()
        // localStorage.setItem('posIndex', window.PosIndex)
        // console.log(window.PosIndex);
        $(this).addClass('active').siblings().removeClass('active')
      }
      if ($('.coming').hasClass('active')) {
        that.renderer2(timeArr)
        $(this).addClass('active').siblings().removeClass('active')
        // window.PosIndex = $(this).index()
        localStorage.setItem('posIndex', window.PosIndex)
        // console.log(window.PosIndex);
      }

    })



    let $imgHead = $('.head img')
    let $imgFoot = $('.foot img')
    $('header').css('display', 'flex')


    // bScroll 是BetterScroll实例，将来可以用来调用API
    let bScroll = new BScroll.default($main.get(0), {
      probeType: 2
    })
    // bScroll.refresh()

    // 开始要隐藏下拉刷新的div
    bScroll.scrollBy(0, -40)//滚动条的初始位置（样式）
    //下拉重新加载
    bScroll.on('scrollEnd', async function () { //滚动条松手时的样式
      if (this.y >= 0) {

        $imgHead.attr('src', '/assets/images/ajax-loader.gif')

        if ($('.hot').hasClass('active')) {
          let result = await postionModel.get() //重新申请一次数据
          let list = result.movieList;

          that.renderer(list)

        }
        if ($('.coming').hasClass('active')) {

          let comingResult = await comingInit.get()
          let comingMovie = comingResult.coming

          let Arra = []
          // console.log(timelist);
          for (let i = 0; i < timelist.length; i++) {
            if (!Arra[timelist[i].comingTitle]) {
              Arra[timelist[i].comingTitle] = [];
            }
            Arra[timelist[i].comingTitle].push(timelist[i])
          }
          let timeArr = Object.entries(Arra);

          that.renderer2(timeArr)

        }

        // let result = await postionModel.get() //重新申请一次数据
        // let list = result.movieList;

        // that.renderer(list)
        //加载结束后 回归原位
        bScroll.scrollBy(0, -40)
        $imgHead.attr('src', '/assets/images/arrow.png')
        $imgHead.removeClass('up')

      }
      //上拉获取新数据
      if (this.maxScrollY >= this.y) { //回去的
        //下标每加载一次就加一 获取一次新的数据
        // console.log(that.k);

        $imgFoot.attr('src', '/assets/images/ajax-loader.gif')

        // console.log(that.k);
        // let comingResult = await upComingModel.get({
        //   key: d[that.k]
        // })


        if ($('.hot').hasClass('active')) {
          that.k++;
          // console.log(b[that.k]);

          let result = await postionMoreModel.get({
            key: b[that.k]

          })

          let list = result.coming;
          //console.log(list);

          that.list = [...that.list, ...list]
          that.renderer(that.list)

        }
        // console.log(d[that.l]);
        if ($('.coming').hasClass('active')) {
          that.l++;
          // console.log(d[that.l]);

          let comingResult = await upComingModel.get({
            key: d[that.l]

          })

          let comingMovie = comingResult.coming
          that.comingMovie = [...that.comingMovie, ...comingMovie]

          //  console.log(comingMovie);

          let Arra = []
          // console.log(that.comingMovie);
          for (let i = 0; i < that.comingMovie.length; i++) {
            if (!Arra[that.comingMovie[i].comingTitle]) {
              Arra[that.comingMovie[i].comingTitle] = [];
            }
            Arra[that.comingMovie[i].comingTitle].push(that.comingMovie[i])
          }
          let timeArr = Object.entries(Arra);


          that.renderer2(timeArr)

        }


        //重新申请一次数据
        //加载结束后 回归原位
        bScroll.scrollBy(0, 40)
        $imgHead.attr('src', '/assets/images/arrow.png')
        $imgHead.removeClass('down')

      }

    })

    bScroll.on('scroll', function () {
      if (this.y > 0) {
        $imgHead.addClass('up')
      }

      if (this.maxScrollY > this.y) {
        $imgFoot.addClass('down')
      }

    })
  }
}
export default new Position()
