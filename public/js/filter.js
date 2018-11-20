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

function filterByID(str){
    houses.forEach(house => {
       if(!house.ID.toString().includes(str)){
          $("#" + house.ID).hide();
       } else {
           $("#" + house.ID).show();
       }
    });
}

function filterByEmail(str){
    houses.forEach(house => {
        if(!house.EMAIL.toString().includes(str)){
            $("#" + house.ID).hide();
        } else {
            $("#" + house.ID).show();
        }
    });
}
function filterByName(str){
    houses.forEach(house => {
        if(!house.NAME.toString().includes(str) || !house.LASTNAME.toString().includes(str)){
            $("#" + house.ID).hide();
        } else {
            $("#" + house.ID).show();
        }
    });
}

function filter(){
    let strFilter = $("#txtFilter").val();
    filterByID(strFilter);
    filterByEmail(strFilter);
    filterByName(strFilter);
}