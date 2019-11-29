import CinemaBody from "../views/cinemaAll.art";
import CinemaHeader from "../views/cinemaHeader.art";
import CinemaMain from "../views/cinemaMain.art";
import CinemaView from "../models/cinema-dataGet";
import FilterData from "../models/filter-dataGet"
import AllcityView from "../views/CInema-filter-City.art"
import AllcityItemView from "../views/Cinema-filter-City-item.art"
import synthesizeView from "../views/filtrate-synthesize-list.art"
import specialView from "../views/filtrateFeature.art"
const BScroll = require('better-scroll')

class Cinema {
    constructor() {
        // this.render()
        this.cinemaList = []
        this.cinemaNo = 0;
        this.bScroll
    }

    renderer(cinemaList) {
        let cinemaMainHTML = CinemaMain({
            cinemaList
        })
        $('main ul').html(cinemaMainHTML)
        $('footer').css('display', 'block')

        $('main ul li').on('tap', function () {
            let id = $(this).attr('data-id')
            console.log(id);
            location.hash = `Cinemadetail/${id}`
            $('footer').css('display', 'none')

        })
        let $mianHeight = $('main').height()
        if ($('main ul').height() < $('main').height()) {
            $('main ul').height($mianHeight)

        }
        else {
            $('main ul').height(100 + '%')
        }

    }


    async render() {

        let that = this
        // this.bScroll.scrollTo(0, -40)

        let hash = location.hash.substr(1)
        console.log(hash);

        let reg = new RegExp('^(\\w+)(\\/)(\\w+)', 'g')

        //获取选择城市的id从localStroage
        let CityN = localStorage.getItem('name')
        let CityID = localStorage.getItem('Cid')
        // console.log(CityID);
        if (CityN) {

        } else {

            CityN = '北京'
            CityID = 1

        }


        let cinemaResult = await CinemaView.get({
            cinemaNo: 0,

            CityID
        });

        let cinemapositionHtml = CinemaBody({
        })
        let $main = $('main')
        $main.html(cinemapositionHtml)

        //筛选数据
        let filterResult = await FilterData.get({
            CityID
        })
        console.log(CityID);

        // console.log(filterResult);


        let $header = $('header')
        let cinemaHeaderHtml = CinemaHeader({})
        $header.html(cinemaHeaderHtml)
        let cinemaList = this.cinemaList = cinemaResult.cinemas
        this.renderer(cinemaList)
        let $imgHead = $('.head img')
        let $imgFoot = $('.foot img')

        $('.activeCity').on('tap', function () {
            location.hash = $(this).attr('data-to')
        })
        $('.activeCity .localCity').html(CityN)

        $('.search').on('tap', function () {
            location.hash = 'CinemaSearch'
        })
        $('header').css('display', 'flex')




        // bScroll 是BetterScroll实例，将来可以用来调用API
        let bScroll = new BScroll.default($main.get(0), {

        })
        this.bScroll = bScroll
        // console.log(this.bScroll);
        that.bScroll.enable()
        $('.tab-content .items').on('tap', function () {
            $(this).addClass('active').siblings().removeClass('active')
            // console.log($(this).index());
        })

        $('.allCityFont').on('tap', function () {
            that.bScroll.enable()
            that.bScroll.scrollTo(0, -40)

            // console.log(1);
            if ($('.filtrate-allCity').css('display') == 'block') {
                $('.filtrate-allCity').css('display', 'none')
                that.bScroll.enable()

            } else {
                $('.filtrate-allCity').css('display', 'block')
                $('.filtrate-synthesize').css('display', 'none')
                $('.filtrate-feature').css('display', 'none')
                // that.bScroll.scrollTo(0, -40)
                that.bScroll.disable()
                $('.tab-content .items').on('tap', function () {
                    $(this).addClass('active').siblings().removeClass('active')
                    // console.log($(this).index());
                })
                //初始渲染全城的数据
                let filterRes = filterResult.district.subItems
                let allcity = AllcityView({
                    filterRes
                })
                let allCityDad = $('.filtrate-allCity .region-list .region-sidenav')
                allCityDad.html(allcity)
                $('.district-li').eq(0).addClass('chosen')
                $('.district-li').on('tap', function () {
                    $(this).addClass('chosen').siblings().removeClass('chosen')
                    window.districtId = $(this).attr('data-id')
                    console.log(window.districtId);

                    let index = $(this).index()
                    let filterRes = filterResult.district.subItems[index]

                    let allcityItem = AllcityItemView({
                        filterRes
                    })

                    let allCityDad = $('.filtrate-allCity .region-list-item')
                    allCityDad.html(allcityItem)



                    $('.listqqq').eq(0).addClass('chosen')

                    $('.listqqq').on('tap', async function () {
                        // console.log($(this).index());
                        window.lineId = $(this).attr('data-id')
                        // console.log(window.lineId)
                        $(this).addClass('chosen').siblings().removeClass('chosen')
                        let districtId = window.districtId
                        // console.log(districtId);
                        let lineId = window.lineId
                        // console.log(lineId);
                        console.log(lineId);

                        let cinemaResult = await CinemaView.get({
                            cinemaNo: 0,
                            districtId,
                            lineId,
                            CityID
                        });
                        console.log(cinemaResult);
                        let cinemaList = cinemaResult.cinemas;
                        // let cinemapositionHtml = CinemaBody({
                        //     cinemaResult
                        // })
                        // let $main = $('main')
                        that.renderer(cinemaList)
                        // $main.html(cinemapositionHtml)
                        that.bScroll.enable()

                    })
                })

                //单击全城渲染相应数据
                $('.tab-content .items').eq(0).on('tap', function () {
                    let filterRes = filterResult.district.subItems
                    let allcity = AllcityView({
                        filterRes
                    })
                    let allCityDad = $('.filtrate-allCity .region-list .region-sidenav')
                    allCityDad.html(allcity)
                    $('.district-li').eq(0).addClass('chosen')
                    $('.district-li').on('tap', function () {
                        $(this).addClass('chosen').siblings().removeClass('chosen')
                        window.districtId = $(this).attr('data-id')
                        console.log(window.districtId);

                        let index = $(this).index()
                        let filterRes = filterResult.district.subItems[index]

                        let allcityItem = AllcityItemView({
                            filterRes
                        })

                        let allCityDad = $('.filtrate-allCity .region-list-item')
                        allCityDad.html(allcityItem)



                        $('.listqqq').eq(0).addClass('chosen')

                        $('.listqqq').on('tap', async function () {
                            // console.log($(this).index());
                            window.lineId = $(this).attr('data-id')
                            // console.log(window.lineId)
                            $(this).addClass('chosen').siblings().removeClass('chosen')
                            let districtId = window.districtId
                            // console.log(districtId);
                            let lineId = window.lineId
                            // console.log(lineId);
                            console.log(lineId);

                            let cinemaResult = await CinemaView.get({
                                cinemaNo: 0,
                                districtId,
                                lineId,
                                CityID
                            });
                            console.log(cinemaResult);
                            let cinemaList = cinemaResult.cinemas;
                            // let cinemapositionHtml = CinemaBody({
                            //     cinemaResult
                            // })
                            // let $main = $('main')
                            that.renderer(cinemaList)
                            // $main.html(cinemapositionHtml)
                            that.bScroll.enable()

                        })
                    })

                })
                //单击地铁渲染相应数据
                $('.tab-content .items').eq(1).on('tap', function () {

                    let filterRes = filterResult.subway.subItems
                    console.log(filterRes);

                    let allcity = AllcityView({
                        filterRes
                    })
                    let allCityDad = $('.filtrate-allCity .region-list .region-sidenav')
                    allCityDad.html(allcity)
                    $('.district-li').eq(0).addClass('chosen')
                    $('.district-li').on('tap', function () {
                        $(this).addClass('chosen').siblings().removeClass('chosen')
                        window.districtId = $(this).attr('data-id')
                        console.log(window.districtId);

                        let index = $(this).index()
                        let filterRes = filterResult.district.subItems[index]

                        let allcityItem = AllcityItemView({
                            filterRes
                        })

                        let allCityDad = $('.filtrate-allCity .region-list-item')
                        allCityDad.html(allcityItem)



                        $('.listqqq').eq(0).addClass('chosen')

                        $('.listqqq').on('tap', async function () {
                            // console.log($(this).index());
                            window.lineId = $(this).attr('data-id')
                            // console.log(window.lineId)
                            $(this).addClass('chosen').siblings().removeClass('chosen')
                            let districtId = window.districtId
                            // console.log(districtId);
                            let lineId = window.lineId
                            // console.log(lineId);
                            console.log(lineId);

                            let cinemaResult = await CinemaView.get({
                                cinemaNo: 0,
                                districtId,
                                lineId,
                                CityID,
                            });
                            console.log(cinemaResult);
                            let cinemaList = cinemaResult.cinemas;
                            // let cinemapositionHtml = CinemaBody({
                            //     cinemaResult
                            // })
                            // let $main = $('main')
                            that.renderer(cinemaList)
                            // $main.html(cinemapositionHtml)
                            that.bScroll.enable()

                        })
                    })



                })
            }
        })
        $('.comprehensive').on('tap', function () {
            that.bScroll.scrollTo(0, -40)

            // console.log(1);
            if ($('.filtrate-synthesize').css('display') == 'block') {
                $('.filtrate-synthesize').css('display', 'none')
                that.bScroll.enable()


            } else {
                $('.filtrate-synthesize').css('display', 'block')
                that.bScroll.disable()

                let filterRes = filterResult.brand.subItems
                console.log(filterRes);
                let synthesize = synthesizeView({
                    filterRes
                })
                let brandList = $('.filtrate-synthesize')
                brandList.html(synthesize)
                $('.synthesize-list').on('tap', async function () {
                    window.brandId = $(this).attr('data-id')
                    let brandId = window.brandId
                    //    console.log( window.brandId);
                    let cinemaResult = await CinemaView.get({
                        cinemaNo: 0,
                        brandId,
                        CityID
                    });
                    console.log(cinemaResult);
                    let cinemaList = cinemaResult.cinemas;
                    that.renderer(cinemaList)
                    that.bScroll.enable()


                })

            }
            $('.filtrate-allCity').css('display', 'none')
            $('.filtrate-feature').css('display', 'none')
        })
        $('.characteristic').on('tap', function () {
            that.bScroll.scrollTo(0, -40)

            if ($('.filtrate-feature').css('display') == 'block') {
                $('.filtrate-feature').css('display', 'none')
                that.bScroll.enable()

            } else {
                $('.filtrate-feature').css('display', 'block')
                that.bScroll.disable()

                let $characteristic = $('.special-content')
                console.log($characteristic);



                let filterRes = filterResult.service.subItems
                let filterResu = filterResult.hallType.subItems
                console.log(filterRes);
                console.log(filterResu);
                let special = specialView({
                    filterResult
                })
                let filtrateFeature = $('.filtrate-feature')
                filtrateFeature.html(special)
                $('.item-list .specialHall').eq(0).addClass('borColr')
                $('.item-list .item').eq(0).addClass('borColr')
                $('.item-list .item').on('tap', function () {
                    $(this).addClass('borColr').siblings().removeClass('borColr')
                    window.ChoseId = $(this).attr('data-id')
                })
                console.log(window.ChoseId);
                $('.item-list .serviceBtn').on('tap', function () {
                    window.serviceId = $(this).attr('data-id')
                    // console.log(window.serviceId);
                })
                $('.item-list .specialHall').on('tap', function () {
                    window.hallType = $(this).attr('data-id')

                })
                $('.affirmBtn').on('tap', async function () {
                    // console.log(window.hallType, window.serviceId);
                    let hallType = window.hallType
                    let serviceId = window.serviceId
                    // console.log();
                    let districtId = window.districtId
                    let cinemaResult = await CinemaView.get({
                        cinemaNo: 0,
                        CityID,
                        hallType,
                        serviceId
                    });
                    // console.log(cinemaResult);
                    let cinemaList = cinemaResult.cinemas;
                    that.renderer(cinemaList)
                    that.bScroll.enable()


                })
                // console.log($('.item-list .item').length);

                //设置特色服务选中后重新渲染页面后上次被选中的依然可以显示被选中
                for (let i = 0; i < $('.item-list .specialHall').length; i++) {
                    if ($('.item-list .specialHall').eq(i).attr('data-id') == window.hallType) {
                        $('.item-list .specialHall').eq(i).addClass('borColr').siblings().removeClass('borColr')

                    }
                }
                for (let i = 0; i < $('.item-list .serviceBtn').length; i++) {
                    if ($('.item-list .serviceBtn').eq(i).attr('data-id') == window.serviceId) {
                        $('.item-list .serviceBtn').eq(i).addClass('borColr').siblings().removeClass('borColr')

                    }
                }


            }
            $('.filtrate-allCity').css('display', 'none')
            $('.filtrate-synthesize').css('display', 'none')
        })



        // 开始要隐藏下拉刷新的div
        bScroll.scrollBy(0, -40)

        bScroll.on('scrollEnd', async function () {
            if (this.y >= 0) {

                // let serviceId = window.serviceId
                // let hallType = window.hallType
                let lineId = window.lineId

                let serviceId = window.serviceId
                let hallType = window.hallType
                let brandId = window.brandId
                let districtId = window.districtId
                console.log(districtId);


                $imgHead.attr('src', '/assets/images/ajax-loader.gif')
                let cinemaResult = await CinemaView.get({
                    cinemaNo: 0,
                    CityID,
                    serviceId,
                    hallType,
                    brandId,
                    districtId,
                    lineId,
                })

                console.log(cinemaResult);

                let cinemaList = cinemaResult.cinemas;
                // that.cinemaList = [...that.cinemaList, ...cinemaList]
                that.renderer(cinemaList)
                bScroll.scrollBy(0, -40)
                $imgHead.attr('src', '/assets/images/arrow.png')
                $imgHead.removeClass('up')

            }

            if (this.maxScrollY >= this.y) {
                {
                    that.cinemaNo += 20;
                    $imgFoot.attr('src', '/assets/images/ajax-loader.gif')
                    //console.log(b);
                    let serviceId = window.serviceId
                    let hallType = window.hallType
                    let brandId = window.brandId
                    let districtId = window.districtId
                    let lineId = window.lineId

                    console.log(brandId, districtId, serviceId, hallType);

                    let cinemaResult = await CinemaView.get({
                        cinemaNo: that.cinemaNo,
                        CityID,
                        serviceId,
                        hallType,
                        brandId,
                        districtId,
                        lineId,
                    })


                    //  console.log(cinemaResult);
                    // console.log(cinemaResult.cinemas[1].id);
                    let cinemaList = cinemaResult.cinemas;
                    that.cinemaList = [...that.cinemaList, ...cinemaList]
                    that.renderer(that.cinemaList)
                    bScroll.scrollBy(0, 40)
                    $imgFoot.attr('src', '/assets/images/arrow.png')
                    $imgFoot.removeClass('down')
                }
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
export default new Cinema()

