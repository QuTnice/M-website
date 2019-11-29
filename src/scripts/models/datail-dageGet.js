module.exports = {
    get( id ) {
        return $.ajax({
            url: `api/ajax/detailmovie?movieId=${id}`,
        })
    }
}