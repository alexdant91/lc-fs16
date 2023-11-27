const getNewRating = (prev_rating_obj, added_rating) => {
  //newRating = ((ratingCount * rating) + addedRating) / (ratingCount + 1)
  const { rating, rating_count } = prev_rating_obj;
  return {
    rating: Number(
      ((rating_count * rating + added_rating) / (rating_count + 1)).toFixed(2)
    ),
    rating_count: rating_count + 1,
  };
};

module.exports = { getNewRating };
