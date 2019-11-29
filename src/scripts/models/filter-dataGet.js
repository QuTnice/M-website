
module.exports = {
    get({CityID}) {
      return $.ajax({
        url: `api/ajax/filterCinemas?ci=${CityID}`,
      })
    }
  }

