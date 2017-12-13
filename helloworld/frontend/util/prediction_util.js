import $ from 'jquery';
export const fetchPrediction = (paramsArr) => {
  console.log(paramsArr);
  return $.ajax({
    url: "getprediction/",
    method: "POST",
    data: { "key": `${JSON.stringify(paramsArr)}` }
  });
};