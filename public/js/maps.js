const initMap = (destination) => {
    //Get the location
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(res => {
            let location = {};
            location.lat = res.coords.latitude;
            location.lng = res.coords.longitude;
            //Now we'll mark it
            let map = new google.maps.Map(document.getElementById('map'), {
                center: location,
                zoom: 15
            });
            let yourMarker = new google.maps.Marker({
               position: location,
               title: "Your ubication"
            });
            let destinationMarker = new google.maps.Marker({
               position: destination,
               title: "House"
            });
            destinationMarker.setMap(map);
        });
    }
};

$(function(){
    $(document).ready(() => {
        location.lat = parseFloat(document.getElementById("LATITUDE").innerText);
        location.lng = parseFloat(document.getElementById("ALTITUDE").innerText);
        initMap(location);
    });
});