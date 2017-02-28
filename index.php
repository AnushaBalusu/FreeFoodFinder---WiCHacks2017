<html>
  <head>
    <title>FreeFoodRIT</title>
    <meta name="viewport" content="initial-scale=1.0">
    <meta charset="utf-8">
    
    <link rel="stylesheet" type="text/css" href="myStyle.css">
    <script type="text/javascript" src='http://code.jquery.com/jquery-1.11.0.min.js'></script>
    <script type="text/javascript" src="displayMap.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCcNueNlLzR_p1eyT6I53KD-iiXIXGOwuA&callback=initMap"
    async defer></script>
  </head>
  
  <body>
   <div id="mapData"><?php include 'fetchEvents.php';?></div>
   <div id="map">
   </div>
  </body>

</html>
