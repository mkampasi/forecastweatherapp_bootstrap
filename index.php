<?php
error_reporting(E_ERROR | E_PARSE);
$address = $_GET['address'].",".$_GET['city'].",".$_GET['state'];
$degree=$_GET['degree'];
//$address = "738 West".","."LA".","."CA";
//$degree="us";
$address = urlencode($address);
$geocode_url ="https://maps.google.com/maps/api/geocode/xml?address=".$address."&key=AIzaSyD6UwLgMwobJrofqlg0kWJ9eM3JhFfpvI8"; 
$geocode_response_xmlstring = file_get_contents($geocode_url);
$geocode_response_xmlobject = simplexml_load_string($geocode_response_xmlstring);
$geocode_status = $geocode_response_xmlobject->status;
if ($geocode_status=='OK') {
$geocode_lat = $geocode_response_xmlobject->result[0]->geometry->location->lat;
$geocode_lng = $geocode_response_xmlobject->result[0]->geometry->location->lng;
   
$forecast_url= "https://api.forecast.io/forecast/3278aafd679ef6fb8249b7a65acfa7a0/".$geocode_lat.",".$geocode_lng."?units=".$degree."&exclude=flags";
$forecast_jsonstring = file_get_contents($forecast_url);
    
$forecast_json = json_decode($forecast_jsonstring);
echo json_encode($forecast_json);
}
?>
