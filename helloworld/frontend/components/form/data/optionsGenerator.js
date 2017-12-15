import AirportCodeToID from './AirportcodeToAirportID';
import AirlineCodeToID from './AirlinecodeToAirlineID';

export default () => {
  let masterObj = {};
  let airportCodeToIDArr = []
  Object.keys(AirportCodeToID).forEach((code) => {
    airportCodeToIDArr.push({label: code, value: AirportCodeToID[code]})
  });
  masterObj["AirportCodeOptions"] = airportCodeToIDArr;
  return masterObj;
};

