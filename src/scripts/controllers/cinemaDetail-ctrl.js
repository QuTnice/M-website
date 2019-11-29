import cinemaDetailHea from "../views/cinemaDetailHeader.art";
import cinemaDetailcon from "../views/cinemaDetailCon.art";
import cinemaDetailDataGet from "../models/cinemaDetail-dageGet.js";
import cinemaDetailConDate from "../views/cinemaDetailCon-one.art";
import cinemaDetailConList from "../views/cinemaDetailCon-two.art";

class cinemaDetail {
    constructor() {

    }

    // bindClick(){
    //     location.hash = $(this).attr('data-to')
    //   }


    async render() {
        let hash = location.hash.substr(1)
        console.log(hash);
        let reg = new RegExp('^(\\w+)(\\/)(\\w+)', 'g')
        // console.log(reg);
        let path = reg.exec(hash)[3]

        let cinemaDetailResult = await cinemaDetailDataGet.get(
            { path })
        // console.log(cinemaDetailResult);
        console.log(cinemaDetailResult);

        let imgS = cinemaDetailResult.showData.movies
        // console.log(imgS);
        $('footer').css('display','none')

        let headerHtml = cinemaDetailHea({
            cinemaDetailResult
        })
        let $header = $('header')
        $header.html(headerHtml)

        $('.detailHea .icon').on('tap',function(){
            // location.hash = '#cinema'
            window.history.go(-1)
        })

        $('.detailHea .title').html(cinemaDetailResult.cinemaData.nm)

        let detail = cinemaDetailcon({ cinemaDetailResult })
        let $main = $('main')
        $main.html(detail)


        // console.log(cinemaDetailResult.showData.movies[0].shows[0].dateShow);


        // $('movie-data').html(cinemaDetailConDate({}))

        let title = $('.cinema-info .title').html(cinemaDetailResult.cinemaData.nm)
        let desc = $('.cinema-info .location').html(cinemaDetailResult.cinemaData.addr)

        $('.movie-info .title').html(cinemaDetailResult.showData.movies[0].nm)
        $('.movie-info .timovie-desctle').html(cinemaDetailResult.showData.movies[0].desc)
        $('.movie-info .sc').html(cinemaDetailResult.showData.movies[0].sc + '分')


        //渲染初始的电影场次
        let sessionL = cinemaDetailResult.showData.movies[0].shows[0].plist

            let sessioneList = cinemaDetailConList({
                sessionL
            })
            let $movieList = $('.movie-List')
            $movieList.html(sessioneList)
            // $('.sessionList .session .price').html('￥38')

        // console.log(sessionL);
        //渲染初始日期 
        let dateList = imgS[0]
        console.log(dateList);

        let date = cinemaDetailConDate({ dateList })

        let $movieDate = $('.movie-date')
        $movieDate.html(date)
        
        $('.C-movie-Date .swiper-slide').eq(0).addClass('timeActive')

        var swiper = new Swiper('.swiper-container', {
            // loop: true,
            slidesPerView: 'auto',
            // loopedSlides: 5,
            spaceBetween: 0,
            centeredSlides: true,
            slideToClickedSlide: true,
            on: {
                slideChangeTransitionEnd: function () {
                    let index = this.activeIndex
                    console.log(index);
                    window.listindex=index;
                    // window.Index = index


                    //当前电影的信息
                    let dateList = imgS[index]
                    console.log(dateList);

                    let date = cinemaDetailConDate({ dateList })
                    let $movieDate = $('.movie-date')
                    $movieDate.html(date)

                    //渲染电影场次
                    let sessionL = cinemaDetailResult.showData.movies[index].shows[0].plist
                    let sessioneList = cinemaDetailConList({
                        sessionL
                    })
                    let $movieList = $('.movie-List')
                    $movieList.html(sessioneList)
                    console.log(sessionL);


                    $('.movie-info .title').html(cinemaDetailResult.showData.movies[this.activeIndex].nm)
                    if ((cinemaDetailResult.showData.movies[this.activeIndex].sc) > 0) {

                        $('.movie-info .sc').html(cinemaDetailResult.showData.movies[this.activeIndex].sc + '分')
                    } else {
                        $('.movie-info .sc').html(cinemaDetailResult.showData.movies[this.activeIndex].wish + '人想看')
                    }
                    $('.movie-info .movie-desc').html(cinemaDetailResult.showData.movies[this.activeIndex].desc)
                    console.log($('.C-movie-Date .swiper-slide'));

                    //设置日期点击样式和数据获取
                    $('.C-movie-Date .swiper-slide').on('tap', function () {
                        let index1 = $(this).index()
                        // console.log(index);

                        $('.C-movie-Date .swiper-slide').removeClass('timeActive')
                        $(this).addClass('timeActive')

                        let sessionL = cinemaDetailResult.showData.movies[window.listindex].shows[index1].plist
                        let sessioneList = cinemaDetailConList({
                            sessionL
                        })
                        let $movieList = $('.movie-List')
                        $movieList.html(sessioneList)

                    })
                    $('.C-movie-Date .swiper-slide').eq(0).addClass('timeActive')

                },
            },
        });

        $('header').css('display','flex')

        // $('.swiper-page').on('tap',function(){
        //     $(this).addClass('.active').siblings().removeClass('.active')
        // })

        var swiper = new Swiper('.swiper-container1', {
            slidesPerView: 3,

          
        });
        $('.C-movie-Date .swiper-slide').on('tap', function () {
            let index1 = $(this).index()
            // console.log(index);

            $('.C-movie-Date .swiper-slide').removeClass('timeActive')
            $(this).addClass('timeActive')

            let sessionL = cinemaDetailResult.showData.movies[0].shows[index1].plist
            let sessioneList = cinemaDetailConList({
                sessionL
            })
            let $movieList = $('.movie-List')
            $movieList.html(sessioneList)

        })

    }

}
export default new cinemaDetail()