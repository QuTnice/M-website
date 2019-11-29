module.exports = {
  get({cinemaNo,districtId=-1,hallType=-1,brandId=-1,serviceId=-1,lineId=-1,CityID}) {
   return $.ajax({
     url: `api/ajax/cinemaList?day=2019-10-09&offset=${cinemaNo}&limit=20&districtId=${districtId}&lineId=-1&hallType=${hallType}&brandId=${brandId}&serviceId=${serviceId}&areaId=${lineId}&stationId=-1&item=&updateShowDay=true&reqId=1570584614232&cityId=${CityID}`,
   })
 }
}