module.exports = {
    get({key}) {
     return $.ajax({
       url: `api/ajax/moreComingList?ci=1&token=&limit=10&movieIds=${key}`,
     })
   }
  }