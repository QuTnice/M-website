// //显示layout
import indexController from '../controllers/'
import movieController from '../controllers/positions'
import cinemaController from '../controllers/cinema-ctrl'
import mineController from '../controllers/mineAll'
import detailController from '../controllers/movieDetail-ctrl'
import CinemadetailController from '../controllers/cinemaDetail-ctrl'
import CinemaSearchController from '../controllers/search'
import CityListController from '../controllers/cityListControllers'
import movieParticularsController from '../controllers/particulars-ctrl'



class Router{
    constructor() {
        this.render()
      }
    
      render() {
        window.addEventListener('load', this.handlePageload.bind(this))
        // console.log(localStorage.getItem('posIndex'))
        // let tabItem = $('.item-biaoti .tab-item')
        // console.log( $('.item-biaoti .tab-item'));
        
        // console.log(tabItem.length);
        
        window.addEventListener('hashchange', this.handleHashchange.bind(this))
      }
    
      setActiveClass(hash) {
        $(`footer li[data-to=${hash}]`).addClass('active').siblings().removeClass('active')
      }
    
      renderDOM(hash) {
        let pageControllers = {
          movieController,
          cinemaController,
          mineController,
          detailController,
          CinemadetailController,
          CinemaSearchController,
          CityListController,
          movieParticularsController,

        }
    
        pageControllers[hash + 'Controller'].render()
      }
    
      handlePageload() {
        let hash = location.hash.substr(1) || 'movie';
        // let hash = location.hash.substr(1) || 'movie';
        indexController.render()

        // movieParticularsController.render()
        
        location.hash = hash
        let reg = new RegExp('^(\\w+)','g')
        let path = reg.exec(hash)

        // 初始化的时候也需要渲染DOM和设置高亮
        this.renderDOM(path[1])
        // // console.log(path[2]);
        
        
        this.setActiveClass(path[1])
      }
    
      handleHashchange(e) {

        let hash = location.hash.substr(1)
        let reg = new RegExp('^(\\w+)','g')
        let path = reg.exec(hash)
        // console.log(path);
        
        // 渲染DOM
        this.renderDOM(path[1])
        // 设置高亮
        this.setActiveClass(path[1])
      }
    
}

new Router()
