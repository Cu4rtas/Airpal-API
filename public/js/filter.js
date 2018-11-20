let houses = [];

$(document).ready(() => {
    fetch("/api/house")
        .then(res => {
            return res.json();
        })
        .then(json => {
           json.forEach(val => {
               houses.push(val);
           });
    });
});


function filter(){
    let str = $("#txtFilter").val().toLowerCase();
    houses.forEach(house => {
        $("#" + house.ID).hide();
        if(house.NAME.toString().toLowerCase().includes(str) ||
            house.LASTNAME.toString().toLowerCase().includes(str) ||
            house.ID.toString().includes(str) ||
            house.EMAIL.toString().toLowerCase().includes(str) ||
            house.ADDRESS.toString().toLowerCase().includes(str)){
            $("#" + house.ID).show();
        }
    });
}