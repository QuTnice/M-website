module.exports = {
    get() {
     return $.ajax({
       url: `api/ajax/comingList?ci=1&token=&limit=10`,
     })
   }
  }