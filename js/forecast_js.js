var map;
function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}
function reset_form() {
    
    //Clear the form fields
    document.getElementById("address").value = "";
    document.getElementById("city").value = "";
    document.getElementById("state").selectedIndex = 0;
    document.getElementById("degree_us").checked = 1;
    document.getElementById("degree_si").checked = 0;
    if (document.getElementById("address-error")) {
        document.getElementById("address-error").style.display = "none";
    }

    if (document.getElementById("state-error")) {
        document.getElementById("state-error").style.display = "none";
    }

    if (document.getElementById("city-error")) {
        document.getElementById("city-error").style.display = "none";
    }
    
//Clear the result space
//Tab 1 - Left side
document.getElementById("result_container").style.display = "none";
document.getElementById("icon").innerHTML = "";
document.getElementById("summary_display").innerHTML = "";
document.getElementById("temperature").innerHTML = "";
document.getElementById("mintemp").innerHTML = "";
document.getElementById("maxtemp").innerHTML = "";
document.getElementById("displayfacebook").innerHTML = "";
//Tab 1 - Map
//document.getElementById("basicMap").innerHTML = "";
    //Tab 2
    document.getElementById("results_table2").innerHTML = "";
    //Tab 3
    document.getElementById("day1").innerHTML = "";
    document.getElementById("day2").innerHTML = "";
    document.getElementById("day3").innerHTML = "";
    document.getElementById("day4").innerHTML = "";
    document.getElementById("day5").innerHTML = "";
    document.getElementById("day6").innerHTML = "";
    document.getElementById("day7").innerHTML = "";
    document.getElementById("myModal1").innerHTML = "";
    document.getElementById("myModal2").innerHTML = "";
    document.getElementById("myModal3").innerHTML = "";
    document.getElementById("myModal4").innerHTML = "";
    document.getElementById("myModal5").innerHTML = "";
    document.getElementById("myModal6").innerHTML = "";
    document.getElementById("myModal7").innerHTML = "";
    document.getElementById("error").style.display="none"
}
function convert_image(icon_value)
    {
       var image_value;
       switch(icon_value) {
        case "clear-day": image_value = "clear";
              break;
        case "clear-night": image_value = "clear_night";
              break;
        case "partly-cloudy-day": image_value = "cloud_day";
              break;
        case "partly-cloudy-night": image_value = "cloud_night";
              break;
        default: image_value = icon_value;
             
       }
        return image_value.toLowerCase() + ".png";       
    }

function get_date(unix_timestamp,timezone)
{

var date = moment.unix(unix_timestamp);
var formatteddate = date.tz(timezone).format('hh:mm A');
return formatteddate;
}
      
function facebookfunction()
			{
var name = document.getElementById("name").value;
var description = document.getElementById("description").value;
var post_image =  document.getElementById("icon").src;
				FB.ui(
				{
					method: 'feed',
					name: name,
					link: 'http://forecast.io',
					description: description,
					caption:"WEATHER INFORMATION FROM FORECAST.IO",
                    picture:post_image,
                    link:"http://forecast.io",
					message:"It works!"
				},  
				 // callback
				function(response) 
				{
					if (response && !response.error_message) 
					{
						alert('Posted successfully.');
					} 
					else 
					{
						alert('Not Posted.');
					}
				});
			
			}

function get_correct_unit(value, property,degree)
{
    if (value==undefined) {
        ret_str = "N.A"; 
        return ret_str;
    }
    if (property == "temperature")
        {
            ret_str = degree=="si" ? value + " &deg C" : value + " &deg F";
            return ret_str;
        }
    if (property == "windSpeed")
        {
            ret_str = degree=="si" ? roundToTwo(value).toFixed(2) + " m/s" : roundToTwo(value).toFixed(2) + " mph";
            return ret_str;
        }
    if (property == "dewPoint")
        {
            ret_str = degree=="si" ? roundToTwo(value).toFixed(2) + " &deg C" : roundToTwo(value).toFixed(2) + " &deg F";
            return ret_str;
        }
    if (property == "visibility")
        {
            ret_str = degree=="si" ? roundToTwo(value).toFixed(2) + " km" : roundToTwo(value).toFixed(2) + " mi";
            return ret_str;
        }
    if (property == "pressure")
        {
            ret_str = degree=="si" ? value + " hPa" : value + " mb";
            return ret_str;
        }
}

function get_open_streetmap(lat,lon)
{
    
if(map!=null)
									
{
		map.destroy();
}
 
var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
var position       = new OpenLayers.LonLat(lon,lat).transform( fromProjection, toProjection);
        
    map = new OpenLayers.Map("basicMap");
    // Create OSM overlays
    var mapnik = new OpenLayers.Layer.OSM();

	    var layer_precipitation = new OpenLayers.Layer.XYZ(
        "precipitation",
        "http://${s}.tile.openweathermap.org/map/precipitation/${z}/${x}/${y}.png",
        {
            isBaseLayer: false,
            opacity: 0.5,
            sphericalMercator: true
        }
    );
	
	 var layer_cloud = new OpenLayers.Layer.XYZ(
        "clouds",
        "http://${s}.tile.openweathermap.org/map/clouds/${z}/${x}/${y}.png",
        {
            isBaseLayer: false,
            opacity: 0.5,
            sphericalMercator: true
        }
    );
	
	
map.addLayers([mapnik,layer_precipitation,layer_cloud]);
map.setCenter(position,9);
return map;	
        

}

function generate_results_tab1(data,degree,city,state,state_long,timezone)
{
    //Hide error details
    document.getElementById("error").style.display="none";
    var summary =  data.currently.summary; 
        var icon = convert_image(data.currently.icon);
        var temperature =  Math.round(data.currently.temperature); 
         if(degree=="si") 
              var temperature_unit="C"; 
          else 
              temperature_unit="F"; 
        var temperatureMax =  Math.round(data.daily.data[0].temperatureMax);  
        var temperatureMin =  Math.round(data.daily.data[0].temperatureMin);
        var city_state = city +","+ state;
        var precipIntensity =  data.currently.precipIntensity;
        var precipProbability =  data.currently.precipProbability;
        var windSpeed = data.currently.windSpeed;
        var dewPoint = data.currently.dewPoint;
        var humidity = data.currently.humidity;
        var visibility = data.currently.visibility;
        var sunriseTime = get_date(data.daily.data[0].sunriseTime,timezone);
        var sunsetTime = get_date(data.daily.data[0].sunsetTime,timezone);

//Process the precipIntensity variable
if(degree=="si") 
precipIntensity=precipIntensity / 25.4; 

switch(true) {

case (precipIntensity>=0 && precipIntensity<0.002): precipIntensity_display = "None";
        break;
case (precipIntensity>=0.002 && precipIntensity<0.017): precipIntensity_display = "Very Light";
        break;
case (precipIntensity>=0.017 && precipIntensity<0.1): precipIntensity_display = "Light";
        break;
case (precipIntensity>=0.1 && precipIntensity<0.4): precipIntensity_display = "Moderate";
        break;
case (precipIntensity>=0.4): precipIntensity_display = "Heavy";
        break;
default: precipIntensity_display = "unknown";
}

//Process the precipProbability variable
var precipProbability_display = Math.round(precipProbability*100) + " %";

//Process the windSpeed variable
var windSpeed_display = get_correct_unit(windSpeed,"windSpeed",degree);

//Process the dewPoint variable
var dewPoint_display = get_correct_unit(dewPoint,"dewPoint",degree);

//Process the humidity variable
var humidity_display = Math.round(humidity * 100) + " %";

//Process the visibility variable
visibility_display = get_correct_unit(visibility,"visibility",degree);

document.getElementById("result_container").style.display = '';
document.getElementById("icon").src = "/images/" + icon.toLowerCase() ;
          
document.getElementById("summary_display").innerHTML = summary + " in " + city + "," + state;
           
          document.getElementById("temperature").innerHTML =  temperature + "<sup class=temperature_unit id=temperature_ui>&deg;" + temperature_unit + "</sup>";
                                 
document.getElementById("mintemp").innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L: " + temperatureMin  + "&deg;"
document.getElementById("maxtemp").innerHTML = "H: " + temperatureMax  + "&deg;"

document.getElementById("preci").innerHTML = precipIntensity_display;
document.getElementById("rain").innerHTML = precipProbability_display;
document.getElementById("wind").innerHTML =  windSpeed_display;  
document.getElementById("dew").innerHTML =   dewPoint_display; 
document.getElementById("humid").innerHTML = humidity_display;
document.getElementById("visi").innerHTML = visibility_display;
document.getElementById("sunrise").innerHTML =  sunriseTime;
document.getElementById("sunset").innerHTML = sunsetTime;
document.getElementById("name").value = "Current Weather in " + city + ", " + state ;
document.getElementById("description").value = summary + ", " + temperature + "°" + temperature_unit ;
}

function generate_results_tab2(data,degree,timezone)
{
 
    
var temp_unit = get_correct_unit("","temperature",degree);            
var results_table = "<table id=\"tb_pane2\" class=\"table \"><thead><tr><th>Time</th> <th>Summary</th><th>Cloud Cover</th> <th>Temp (" + temp_unit + ") </th> <th>View Details</th></tr>   </thead><tr><td colspan=5></td></tr>";
        
    var dat = data.hourly.data;
    i=1;
    while(i<25) { 
    var time =  get_date(dat[i].time,timezone); 
    var summary2 =  convert_image(dat[i].icon); 
    var cloudCover =   Math.round(dat[i].cloudCover * 100) + "%";
    var temp =  dat[i].temperature.toFixed(2);
    var windSpeed = get_correct_unit(dat[i].windSpeed, "windSpeed",degree);
    var humidity = Math.round(dat[i].humidity*100) + "%";
    var visibility = get_correct_unit(dat[i].visibility,"visibility",degree);
    var pressure = get_correct_unit(dat[i].pressure,"pressure",degree);  
    
        

results_table=results_table + "<tr><td>" + time+ "</td><td><img  src=\"/images/" + summary2 + "\"></td><td>" + cloudCover + "</td><td>" + temp + "</td><td><a class=\"glyphicon glyphicon-plus\" data-toggle=\"collapse\" data-target=\"#tb_"+ i+"\" ></td></tr>";
        
        
        
        
results_table = results_table + "<tr class='collapse out active' id=tb_"+i+">";
results_table = results_table + "<td colspan=5 class='hiddenRow'> <div id=scroll-container>";
results_table = results_table + "<table id=tb_subpane2 class='table table-striped' style='overflow-x:scroll'><thead >";										
results_table = results_table + "<tr ><th class='col-md-2' >Wind</th>";
results_table = results_table + "<th class='col-md-2' >Humidity</th>";
results_table = results_table + "<th class='col-md-2' >Visiblity</th>";
results_table = results_table + "<th class='col-md-2' >Pressure</th></tr></thead>";		results_table = results_table + "<tbody><td style='white-space: nowrap;'>" + windSpeed + "</td><td style='white-space: nowrap;'>"+humidity+ "</td><td style='white-space: nowrap;'>" + visibility +  "</td><td style='white-space: nowrap;'>" + pressure + "</td></tbody>";
results_table = results_table + "</table></div></td></tr>";
    
    i++;
    }
   results_table=results_table + "</table>";  
document.getElementById("results_table2").innerHTML=results_table;
}

function generate_results_tab3(data,degree,city,timezone)
{
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var weekday = [ "Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thursday", "Friday" , "Saturday"];

    var dat = data.daily.data;
    i=1;
    while(i<8) {
       var dat_time_unix = dat[i].time;
       var dat_time = new Date(dat_time_unix*1000);
       var day = weekday[dat_time.getDay()];
       var mdate = dat_time.getDate();
       var month =  monthNames[dat_time.getMonth()] ;
       var month_date = month + " " + mdate;
       var icon_image = convert_image(dat[i].icon);
       var min_temp =  Math.round(dat[i].temperatureMin) + "&deg";
       var max_temp =  Math.round(dat[i].temperatureMax) + "&deg";
       var windSpeed = get_correct_unit(dat[i].windSpeed,"windSpeed",degree);
         var humidity = Math.round(dat[i].humidity * 100) + " %";
       var visibility = get_correct_unit(dat[i].visibility,"visibility",degree);
       var pressure = get_correct_unit(dat[i].pressure,"pressure",degree);
       var summary = dat[i].summary;
       var sunriseTime =  get_date(dat[i].sunriseTime,timezone);
       var sunsetTime =  get_date(dat[i].sunsetTime,timezone);
    var title = "Weather in " + city + " on " + month_date;
        
var modal_str = " data-toggle=\"modal\" data-target=\"#myModal" +i + "\"";
        
var results_table = "<div class=bold pad" + modal_str + " >" + day + "</div>" + "<div class=bold pad " + modal_str + " >" + month_date + "</div>" + "<img  class='pad center-block' " + modal_str +  "src=\"/images/" + icon_image + "\"></img>" + "<div " + modal_str + " > Min Temp </div>" +"<div " + modal_str + " class=\"bold font-large pad\">" + min_temp + "</div><div class=pad" + modal_str + " > Max Temp </div>" + "<div " + modal_str + " class=\"bold font-large pad\">" + max_temp +  "</div>";
var modal_body="<div class=row><div class=\"col-md-12 text-center\"><img style=\"max-width:180px;\" src=\"/images/" + icon_image + " \" ></img></div></div><div class=row><div class='col-md-12 font-large' style='padding-top:3%;padding-bottom:3%;'>" + day + ": <span style=\"color:orange\" />" + summary +"</span></div></div><div class=row><div class=\"col-md-4 \"><p class=bold>Sunrise Time</p><p>" + sunriseTime + "</p></div><div class=\"col-md-4 \"><p class=bold>Sunset Time</p><p>" + sunsetTime + "</p></div><div class=\"col-md-4 \"><p class=bold>Humdity</p><p>" +humidity+ "</p></div></div><div class=row><div class=\"col-md-4 \"><p class=bold>Wind Speed</p><p>" + windSpeed+"</p></div><div class=\"col-md-4 \"> <p class=bold>Visibility</p><p>" + visibility + "</p></div><div class=\"col-md-4 \"><p class=bold>Pressure </p><p>" + pressure +"</p></div></div>";
        
results_modal = "<div class=modal-dialog> <div class=modal-content> <div class=modal-header> <button type=button class=close data-dismiss=\"modal\">&times;</button> <h4 class='modal-title text-left'>" + title +  "</h4>  </div> <div class=modal-body> <div >" + modal_body + "</div>      <div class=modal-footer> <button type=button class=\"btn btn-default\" data-dismiss=\"modal\">Close</button></div></div>";
  
id = "day" + i;
    modal_id = "myModal" + i;    
    document.getElementById(id).innerHTML=results_table;
    document.getElementById(modal_id).innerHTML=results_modal;    
        i++;

    }
}