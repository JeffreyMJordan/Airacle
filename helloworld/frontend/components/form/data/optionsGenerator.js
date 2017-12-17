import AirportCodeToID from './AirportcodeToAirportID';
import AirlineCodeToID from './AirlinecodeToAirlineID';
import CityToAirportCode from './CityToAirportCode';

export default () => {
  let masterObj = {};

  //Airports
  // let airportCodeToIDArr = [];
  // Object.keys(AirportCodeToID).forEach((code) => {
  //   airportCodeToIDArr.push({label: code, value: AirportCodeToID[code]});
  // });
  // masterObj["AirportCodeOptions"] = airportCodeToIDArr;
  
  //Airports
  let airportNameToIDArr = [];
  Object.keys(CityToAirportCode).forEach((city) => {
    let codeArr = CityToAirportCode[city];
    codeArr.forEach((code) => {
      if(AirportCodeToID[code]!=undefined){
        airportNameToIDArr.push({label: `${city} (${code})`, value: AirportCodeToID[code]});
      }
    });
  });
  masterObj["AirportCodeOptions"] = airportNameToIDArr;

  //Airlines
  let airlineCodeToIDArr = [];
  Object.keys(AirlineCodeToID).forEach((code) => {
    airlineCodeToIDArr.push({label: code, value: AirlineCodeToID[code]});
  });
  masterObj["AirlineCodeOptions"] = airlineCodeToIDArr;

  let monthsOptionsArr = [];
  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].forEach((month, idx) => {
    monthsOptionsArr.push({label: month, value: (idx+1)})
  });

  masterObj["MonthOptions"] = monthsOptionsArr;

  return masterObj;
};

