'use strict';

let getFeel = temp => {
  if(temp<5)
    {return "shivering cold";}
    else if(temp>=5 && temp<15)
      {return "pretty cold";}
    else if(temp>=15 && temp<25)
      {return "moderately cold";}
    else if(temp>=25 && temp<32)
      {return "quite warm";}
    else if(temp>=32 && temp<40)
      {return "Hot";}
    else {return "Super Hot";}
}

let currentWeather = (location,response) => {
    if(response != null ) {
      
      return `Right Now in ${location}. It is ${getFeel(Number(response))} at ${response} degrees.`
    } }
module.exports = {
  currentWeather
}
