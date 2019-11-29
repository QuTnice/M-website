module.exports = {
    get({keyWord="大地",CityID = 1}) {
     return $.ajax({
       url: `api/ajax/search?kw=${keyWord}&cityId=${CityID}&stype=2`,
     })
   }
  }