(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.mtGoogleMaps = {
    attach: function (context, settings) {
      var mapSelectorClass = "google-map-canvas";
      var mapSelector = "." + mapSelectorClass;
      function initialize() {
        $(context).find(mapSelector).once('mtGoogleMapsInit').each(function(index, item) {
          var lat = $(this).attr('data-attribute-mt-latitude');
          var lon = $(this).attr('data-attribute-mt-longitude');
          var zoom = parseInt($(this).attr('data-attribute-mt-map-zoom'));
          var latlng = new google.maps.LatLng(lat, lon);
          var mapOptions = {
            zoom: zoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: latlng,
            scrollwheel: false
          };
          var map = new google.maps.Map(this,mapOptions);
          var marker = new google.maps.Marker({
            map:map,
            draggable:true,
            position: latlng
          });
          google.maps.event.addDomListener(window, "resize", function() {
            map.setCenter(latlng);
          });
        });
      }
      google.maps.event.addDomListener(window, "load", initialize);
    }
  };
})(jQuery, Drupal, drupalSettings);
