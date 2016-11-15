//Creates the contact parameters
function contact(name, phoneNum, email, open) {
    this.name = name;
    this.phoneNum = phoneNum;
    this.email = email;
    this.open = open;
}
//Array to store the contact information
var contactAry = [
    new contact("Bob Laskowski", "262-309-4205", "laskowsr@augsburg.edu", false),
    new contact("Hunter Winner", "651-500-1930", "winnerh@augsburg.edu", false),
    new contact("Manny Xinico", "555-555-5555", "manny@xinico.com", false)
];
//Loads contact information when contact is selected
function openContact(evt, contactNum) {
    for (var i = 0; i < contactAry.length; i++) {
        contactAry[i].open = false;
    }
    document.getElementById("home").style.display = "none";
    document.getElementById("edit").style.display = "none";
    document.getElementById("name").innerHTML = contactAry[contactNum].name;
    document.getElementById("phoneNum").innerHTML = contactAry[contactNum].phoneNum;
    document.getElementById("email").innerHTML = contactAry[contactNum].email;
    document.getElementById("contact").style.display = "block";
    contactAry[contactNum].open = true;

    if (evt !== null) {
        var tabs = document.getElementsByClassName("tab");
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].className = tabs[i].className.replace(" activeTab", "");
        }
        evt.currentTarget.className += " activeTab";
    }
    document.getElementById("addTab").className = "";
}
//Takes user back to home prompt to choose new contact
function home() {
    document.getElementById("home").style.display = "block";
    document.getElementById("edit").style.display = "none";
    document.getElementById("contact").style.display = "none";
    for (var i = 0; i < contactAry.length; i++) {
        contactAry[i].open = false;
    }
    var tabs = document.getElementsByClassName("tab");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(" activeTab", "");
    }
    document.getElementById("addTab").className = "";
}
//Allows the contact data to edit the selected value
function edit() {
    var contactNum = 0;
    for (var i = 0; i < contactAry.length; i++) {
        if (contactAry[i].open)
            contactNum = i;
    }
    document.getElementById("contact").style.display = "none";
    document.getElementById("editname").value = contactAry[contactNum].name;
    document.getElementById("editphone").value = contactAry[contactNum].phoneNum;
    document.getElementById("editemail").value = contactAry[contactNum].email;
    document.getElementById("edit").style.display = "block";
}
//Saves contact edits made by  user
function save() {
    var newName = document.getElementById("editname").value;
    var newNumber = document.getElementById("editphone").value;
    var newEmail = document.getElementById("editemail").value;
    var contactNum = null;
    for (var i = 0; i < contactAry.length; i++) {
        if (contactAry[i].open)
            contactNum = i;
    }
    if (contactNum === null) {
        contactNum = contactAry.length;
        contactAry.push(new contact(newName, newNumber, newEmail, true));
        renderList();
        var tabList = document.getElementsByClassName("tab");
        tabList[contactNum].className += " activeTab";
    }
    else {
        contactAry[contactNum] = new contact(newName, newNumber, newEmail, true);
    }
    document.getElementById("edit").style.display = "none";
    openContact(null, contactNum);
    pageLoad();
    document.getElementById("addTab").className = "";
}

function cancel() {
    var contactNum = 0;
    for (var i = 0; i < contactAry.length; i++) {
        if (contactAry[i].open)
            contactNum = i;
    }
    document.getElementById("edit").style.display = "none";
    openContact(null, contactNum);
    pageLoad();
    document.getElementById("addTab").className = "";
}

//Loads names to HTML when page loads
function pageLoad() {
    document.getElementById("contact0").innerHTML = contactAry[0].name;
    document.getElementById("contact1").innerHTML = contactAry[1].name;
    document.getElementById("contact2").innerHTML = contactAry[2].name;
}

function del() {
    var x = confirm("Are you sure you want to delete?");
    if (x) {
        var contactNum = 0;
        for (var i = 0; i < contactAry.length; i++) {
            if (contactAry[i].open)
                contactNum = i;
        }
        contactAry.splice(contactNum, 1);
        renderList();
        home();
    }
}

function addContact() {
    document.getElementById("addTab").className = "activeTab";
    for (var i = 0; i < contactAry.length; i++) {
        contactAry[i].open = false;
    }
    var tabs = document.getElementsByClassName("tab");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(" activeTab", "");
    }
    document.getElementById("contact").style.display = "none";
    document.getElementById("home").style.display = "none";
    document.getElementById("edit").style.display = "block";
    document.getElementById("editname").value = "";
    document.getElementById("editphone").value = "";
    document.getElementById("editemail").value = "";
}

function renderList() {
    var list = document.getElementById("contactList");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    for (var i = 0; i < contactAry.length; i++) {
        var entry = document.createElement('li');
        entry.appendChild(document.createTextNode(contactAry[i].name));
        entry.setAttribute('onClick', 'openContact(event, ' + i + ')');
        entry.setAttribute('id', 'contact' + i);
        entry.setAttribute('class', 'tab');
        list.appendChild(entry);
    }
}
