import mineAll from "../views/mineAll.art";
import mineHeader from "../views/mingHeader.art";


// const BScroll = require('better-scroll')

class Mine{
    constructor(){

    }

    async render(){
        // let that =this
        let headerHtml = mineHeader({})
        let $header = $('header')
        $header.html(headerHtml)
    
        let mine = mineAll({})
        let $main = $('main')
        $main.html(mine)

    }
}

export default new Mine()