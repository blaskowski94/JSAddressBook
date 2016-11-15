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

// T/F value to load variables on first page load
var alreadyLoaded = false;
// Global variables for commonly used IDs
var addTabID, homeID, editID, nameID, phoneNumID, emailID, contactID, editnameID, editphoneID, editemailID;

//Loads contact information when contact is selected
function openContact(evt, contactNum) {
    for (var i = 0; i < contactAry.length; i++) {
        contactAry[i].open = false;
    }
    homeID.style.display = "none";
    editID.style.display = "none";
    nameID.innerHTML = contactAry[contactNum].name;
    phoneNumID.innerHTML = contactAry[contactNum].phoneNum;
    emailID.innerHTML = contactAry[contactNum].email;
    contactID.style.display = "block";
    contactAry[contactNum].open = true;

    if (evt !== null) {
        var tabs = document.getElementsByClassName("tab");
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].className = tabs[i].className.replace(" activeTab", "");
        }
        evt.currentTarget.className += " activeTab";
    }
    addTabID.className = "";
}

//Takes user back to home prompt to choose new contact
function home() {
    homeID.style.display = "block";
    editID.style.display = "none";
    contactID.style.display = "none";
    for (var i = 0; i < contactAry.length; i++) {
        contactAry[i].open = false;
    }
    var tabs = document.getElementsByClassName("tab");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(" activeTab", "");
    }
    addTabID.className = "";
}

//Allows the contact data to edit the selected value
function edit() {
    var contactNum = 0;
    for (var i = 0; i < contactAry.length; i++) {
        if (contactAry[i].open)
            contactNum = i;
    }
    contactID.style.display = "none";
    editnameID.value = contactAry[contactNum].name;
    editphoneID.value = contactAry[contactNum].phoneNum;
    editemailID.value = contactAry[contactNum].email;
    editID.style.display = "block";
}

//Saves contact edits made by  user
function save() {
    var newName = editnameID.value;
    var newNumber = editphoneID.value;
    var newEmail = editemailID.value;
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
    editID.style.display = "none";
    openContact(null, contactNum);
    pageLoad();
    addTabID.className = "";
}

function cancel() {
    var contactNum = 0;
    for (var i = 0; i < contactAry.length; i++) {
        if (contactAry[i].open)
            contactNum = i;
    }
    editID.style.display = "none";
    openContact(null, contactNum);
    pageLoad();
    addTabID.className = "";
}

//Loads names to HTML when page loads
function pageLoad() {
    document.getElementById("contact0").innerHTML = contactAry[0].name;
    document.getElementById("contact1").innerHTML = contactAry[1].name;
    document.getElementById("contact2").innerHTML = contactAry[2].name;


    if(!alreadyLoaded){
        addTabID = document.getElementById("addTab")
        homeID = document.getElementById("home");
        nameID = document.getElementById("name");
        phoneNumID = document.getElementById("phoneNum");
        emailID = document.getElementById("email");
        contactID = document.getElementById("contact");
        editID = document.getElementById("edit");
        editnameID = document.getElementById("editname");
        editphoneID = document.getElementById("editphone");
        editemailID = document.getElementById("editemail")

        alreadyLoaded = true;
    }
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
    addTabID.className = "activeTab";
    for (var i = 0; i < contactAry.length; i++) {
        contactAry[i].open = false;
    }
    var tabs = document.getElementsByClassName("tab");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(" activeTab", "");
    }
    contactID.style.display = "none";
    homeID.style.display = "none";
    editID.style.display = "block";
    editnameID.value = "";
    editphoneID.value = "";
    editemailID.value = "";
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
