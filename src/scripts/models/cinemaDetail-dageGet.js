module.exports = {
    get({path}) {
     return $.ajax({
       url: `api/ajax/cinemaDetail?cinemaId=${path}`,
     })
   }
  }