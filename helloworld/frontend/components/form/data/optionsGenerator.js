import AirportCodeToID from './AirportcodeToAirportID';
import AirlineCodeToID from './AirlinecodeToAirlineID';

export default () => {
  let masterObj = {};

  let airportCodeToIDArr = [];
  Object.keys(AirportCodeToID).forEach((code) => {
    airportCodeToIDArr.push({label: code, value: AirportCodeToID[code]});
  });
  masterObj["AirportCodeOptions"] = airportCodeToIDArr;

  let airlineCodeToIDArr = [];
  Object.keys(AirlineCodeToID).forEach((code) => {
    airlineCodeToIDArr.push({label: code, value: AirlineCodeToID[code]});
  });
  masterObj["AirlineCodeOptions"] = airlineCodeToIDArr;

  return masterObj;
};

