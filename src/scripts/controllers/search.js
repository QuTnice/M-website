import searchHeader from "../views/searchheader.art";
import searchMain from "../views/searchCon.art";
import searchData from "../models/search-dateGet";
// const BScroll = require('better-scroll')

class search {
    constructor() {
        this.cinemaL = []
        this.cinemaName = []
        this.cinemaNo = 0;
        this.arr = []
        this.resultLL = []
    }
    empty(obj) {
        for (let key in obj) {
            return true;    //非空
        }
        return false;       //为空
    }

    async render() {
        let that = this
        let headerHtml = searchHeader({})
        let $header = $('header')
        $header.html(headerHtml)

        let search = searchMain({})
        let $main = $('main')
        $main.html(search)

        $('.quxiao-search').on('tap', function () {
            location.hash = 'cinema'
        })

        let cityN = localStorage.getItem('name')
        let CityID = localStorage.getItem('Cid')

        if (cityN) {

        } else {

            cityN = '北京'
            CityID = 1

        }
        let timer = null

        $('.input-search').on('input', function () {
            clearTimeout(timer)
            $('.searchResult').empty()
            timer = setTimeout(async function () {

                let inputVal = $('.input-search').val()
                console.log(inputVal);
                let searchResult = await searchData.get({
                    keyWord: inputVal,
                    CityID
                });
                console.log(searchResult);
                if (that.empty(searchResult)) {
                    console.log(1);

                    let arr = []
                    for (let i = 0; i < searchResult.cinemas.list.length; i++) {
                        arr.push(searchResult.cinemas.list[i])
                    }

                    for (let i in arr) {
                        // console.log(arr[i]);

                        $('.searchResult').append(
                            `<li class="C-list" data-id="` + arr[i].id + `" data-to="Cinemadetail">
                            <div class="info">
                                <p class="name-one">
                                    <span class="name">` + arr[i].nm + `</span>
                                    <span class="sell-Price">
                                        <span class="price">` + arr[i].sellPrice + `</span>元起
                                    </span>
                                </p>
                                <p class="address-one">` + arr[i].addr + `</p>
                                <p class="fear-tags">
                                    ${ arr[i].sell == 1 ? '<span class="sell">座</span>' : ''}
                                    ${ arr[i].allowRefund == 1 ? '<span class="allowRefund">改签</span>' : ''}
                                    ${ arr[i].snack == 1 ? '<span class="snack">小吃</span>' : ''}
                                    ${ arr[i].endorse == 1 ? '<span class="endorse">改签</span>' : ''}
                                </p>
                            </div>
                            <div class="distance">` + arr[i].distance + `</div>
                            </li>`
                        )
                    }
                    // console.log($('.searchResult .C-list'));

                    $('.searchResult .C-list').on('tap', function () {
                        let id = $(this).attr('data-id')
                        // console.log(id);
                        location.hash = `Cinemadetail/${id}`
                        // $('footer').css('display','none')


                    })
                } else {
                    $('.searchResult').html('没有您搜索的影院哦')

                }
            }, 500);

        })
        // let bScroll = new BScroll.default($main.get(0), {
        //     // probeType: 2
        // })





    }
}

export default new search()
