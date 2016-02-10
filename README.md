# forecastweatherapp_bootstrap
Responsive web application displaying hourly, daily and weekly weather forecasts. Uses Google Geocoding and Forecast.io API to fetch the weather data. 
It uses Bootstrap CSS to obtain the responsive nature and also includes an integrated maps feature using Open Weather Maps and the ability to share posts on Facebook using Facebook Connect API. 

APIs used:

1.	Google Geocode API : Based on the user entered address, a PHP script is used fetch the latitude and longitude using the Google Geocode API(XML output).

     http://maps.google.com/maps/api/geocode/xml?address=street address,city,state

2.	Forecast.io API: These co-ordinates are then used to fetch weather data by calling the Forecast.io API.   https://api.forecast.io/forecast/YOUR_APIKEY/LATITUDE,LONGITUDE?units=units_value&exclude=flags

 The response from a query of the Forecast.io web service is a JSON-formatted object.
When constructing the Forecast.io web service API call, you should provide five parameters:

    •	 The first parameter is your Forecast.io API key (a.k.a. the Dark Sky API key). see instructions below.
    
    •	 The second and the third parameter are the latitude and longitude values which are extracted from the XML-formatted data returned by the Google Geocode API.
    
    •	 The name of fourth parameter is units. The value of this parameter is either “us” or “si”. If the temperature is in degree Celsius, units=si and if the temperature is in degree Fahrenheit, units=us.
    
    •	 The name of the fifth parameter is exclude. The value of this parameter is “flags”.

How to get the Forecast.io API key:

Go to https://developer.forecast.io/. Click on “Register”. You should fill out the form as shown in Figure 9. The API Key (Dark Sky API key) is displayed as shown in Figure 10. Copy this key as you will use it in the Forecast.io web service API call.

Open Weather Maps:

OpenWeatherMap map is a service supplies libraries which can provide the current cloud map over a region. I have used the OpenWeatherMap direct tile server functionality to add the weather map layers to form the cloud map. Also, used the OpenLayers.js library which is required to be included to create the cloud map. The layers added to the basic Open Street Map are:
    1. Clouds
    2. Precipitation
    
Facebook Connect API:

Using the Facebook Connect API, the app allows logged in users to share weather details with friends via posts to their Facebook wall.

Summary:

•	Based on the input data in the search form, construct a web service URL to retrieve the XML-formatted output from the Google GeoCode API.

•	Parse the returned XML (SimpleXML) and extract the latitude and longitude values.

•	 Call the Forecast.io API (latitude and longitude are parameters in the web service URL) and retrieve the JSON-formatted output.

•	Parse the returned JSON-formatted output(json_decode) and extract the weather information.

•	Display the formatted weather information.

•	Integrate with Maps and facebook functionality (as described above).
