import detailAll from "../views/movieDatailAll.art";
import detailHeader from "../views/detailHeader.art";
import DetailView from "../models/datail-dageGet";
import detailListView from "../views/detailList.art";

const BScroll = require('better-scroll')

class Detail {
    constructor() {
        this.cinemaList = []
        this.cinemaNo = 0;

    }
    renderer(cinemaList) {
        let detailMainHTML = detailListView({
            cinemaList
        })
        
        $('main ul').html(detailMainHTML)

        // $('main ul li').on('click',function(){
        //     console.log(1);
            
        //     let id = $(this).attr('data-id')
      
        //     console.log(id);
        //     // location.hash = `detail/${id}`
            
        //   })
      
    }

    async render() {
        // let that =this
        let that = this

        let hash = location.hash.substr(1)
        console.log(hash);
        
        let reg = new RegExp('^(\\w+)(\\/\\w+)','g')
        let path = reg.exec(hash)[2]
        let movieId = path.substr(1)
        console.log(movieId);

        let cinemaResult = await DetailView.get(movieId);
        console.log(cinemaResult.detailMovie);
        console.log($('detailHea title'));
        
        
        let detail = detailAll({cinemaResult})
        let $main = $('main')
        $main.html(detail)
        
        let headerHtml = detailHeader({})
        let $header = $('header')
        $header.html(headerHtml)
        $('.detailHea .title').html(cinemaResult.detailMovie.nm)
        $('.detailHea .icon').on('tap',function(){
            // location.hash = '#movie'
            window.history.go(-1)
        })

        let cinemaList = this.cinemaList = cinemaResult.cinemas
        this.renderer(cinemaList)
        let $imgHead = $('.head img')
        let $imgFoot = $('.foot img')

        $('.detailArrow').on('tap',function(){
            console.log(1);
            location.hash = `movieParticulars/${movieId}`
            
        })

        let bScroll = new BScroll.default($main.get(0), {

        })

        bScroll.scrollBy(0, -40)
        $('.cinemaList .swiper-slide').eq(0).addClass('MdetACtive')
        $('.cinemaList .swiper-slide').on('tap',function(){
            $('.cinemaList .swiper-slide').removeClass('MdetACtive')
            $(this).addClass('MdetACtive')

        })

        $('header').css('display','flex')


    }
}

export default new Detail()