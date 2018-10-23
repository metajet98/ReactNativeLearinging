
let rootURL = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=';

export default function(code){
    let url = `${rootURL}${code}&apikey=B1QX9UNSJNH0S1QN`;
    return fetch(url).then(function(response){
        return response.text();
    }).then(function(text){
        let rawJSONString = text.replace("//", "");
        let json = JSON.parse(rawJSONString);
        if (json.hasOwnProperty('Information')) {
          return {
            stockIndex: "Too many request!!!!",
            stockChangeRaw: "Null",
            stockChangePercent: "Null"
            };
        }
        let data = json["Global Quote"];
        return {
            stockIndex: data["01. symbol"],
            stockChangeRaw: data["02. open"],
            stockChangePercent: data["10. change percent"]
        };
    });
}