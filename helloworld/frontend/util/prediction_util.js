export const fetchPrediction = (paramsArr) => (
  $.ajax({
    url: "getprediction/",
    method: "POST",
    key: paramsArr
  })
);