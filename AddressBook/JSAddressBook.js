/**
 * Created by Manuel on 11/6/2016.
 */

function contact(name, phoneNum, email, open){
    this.name = name;
    this.phoneNum = phoneNum;
    this.email = email;
    this.open = open;
}

var contactAry = [
                new contact("Bob Laskowski", "262-309-4205", "laskowsr@augsburg.edu"),
                new contact("Hunter Winner", "555-555-5555", "hunter@winnder.com"),
                new contact("Manny Xinico", "555-555-5555", "manny@xinico.com")
                ];

function openContact(evt, contactNum) {
    document.getElementById("welcome").style.display = "none";
    document.getElementById("name").innerHTML = contactAry[contactNum].name;
    document.getElementById("phoneNum").innerHTML = contactAry[contactNum].phoneNum;
    document.getElementById("email").innerHTML = contactAry[contactNum].email;
    document.getElementById("contact").style.display = "block";

    // tablinks = document.getElementsByClassName("tablink");
    // for (i = 0; i < x.length; i++) {
    //     tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
    // }
    // evt.currentTarget.className += " w3-red";
}

function welcome(){
    document.getElementById("welcome").style.display = "block";
    document.getElementById("contact").style.display = "none";
}