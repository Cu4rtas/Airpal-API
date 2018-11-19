const initMap = (destination) => {
    let destinationMarker = new google.maps.Marker({
       position: destination,
       title: "House"
    });
    let map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 15
    });
    destinationMarker.setMap(map);
};

$(function(){
    $(document).ready(() => {
        location.lat = parseFloat(document.getElementById("LATITUDE").innerText);
        location.lng = parseFloat(document.getElementById("LONGITUDE").innerText);
        initMap(location);
    });
});