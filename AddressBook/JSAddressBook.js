//Defines a contact object
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
    // Sets the open property of all contacts to false
    for (var i = 0; i < contactAry.length; i++) {
        contactAry[i].open = false;
    }
    // hide the welcome screen in case opening contact from home screen
    homeID.style.display = "none";
    // hide the edit screen in case opening contact from edit menu
    editID.style.display = "none";
    // Deselect add contact tab
    addTabID.className = "";
    // Set the contact details for selected contact
    nameID.innerHTML = contactAry[contactNum].name;
    phoneNumID.innerHTML = contactAry[contactNum].phoneNum;
    emailID.innerHTML = contactAry[contactNum].email;
    // Display the contact page
    contactID.style.display = "block";
    // Set the open property for this contact to true
    contactAry[contactNum].open = true;

    renderList(contactNum);
}

// Takes user back to home prompt to choose new contact
function home() {
    // Display home screen
    homeID.style.display = "block";
    // Hide edit and contact screens
    editID.style.display = "none";
    contactID.style.display = "none";
    // Set the open property of all contacts to false
    for (var i = 0; i < contactAry.length; i++) {
        contactAry[i].open = false;
    }
    // Deselect all contact tabs
    var tabs = document.getElementsByClassName("tab");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(" activeTab", "");
    }
    // Deselect add contact tab
    addTabID.className = "";
}

// Allows the contact data to edit the selected value
function edit() {
    // Figure out which contact is open and to be edited
    var contactNum = 0;
    for (var i = 0; i < contactAry.length; i++) {
        if (contactAry[i].open)
            contactNum = i;
    }
    // Hide contact display
    contactID.style.display = "none";
    // Set edit text boxes to values already in contact
    editnameID.value = contactAry[contactNum].name;
    editphoneID.value = contactAry[contactNum].phoneNum;
    editemailID.value = contactAry[contactNum].email;
    // Display edit screen
    editID.style.display = "block";
}

//Saves contact edits made by  user
function save() {
    // Get the new values to be saved
    var newName = editnameID.value;
    var newNumber = editphoneID.value;
    var newEmail = editemailID.value;
    // If an existing contact, get the number
    var contactNum = null;
    for (var i = 0; i < contactAry.length; i++) {
        if (contactAry[i].open)
            contactNum = i;
    }
    // If it is a new contact being added, contactNum will be null
    if (contactNum === null) {
        // Set contact num to index new element will be
        contactNum = contactAry.length;
        // Add new element to end of array
        contactAry.push(new contact(newName, newNumber, newEmail, true));
        renderList(contactNum);
        // Select the new tab
        var tabList = document.getElementsByClassName("tab");
        tabList[contactNum].className += " activeTab";
    }
    else {
        // Update existing contact
        contactAry[contactNum] = new contact(newName, newNumber, newEmail, true);
    }
    // Hide edit screen
    editID.style.display = "none";
    // Display the contact
    openContact(null, contactNum);
    renderList(contactNum);
    // Deselect add tab
    addTabID.className = "";
}

// Functionality for the cancel button on edit screen, returns to the contact being displayed or home if no contact was selected
function cancel() {
    // Figure out which contact was selected, null if we were on welcome screen
    var contactNum = null;
    for (var i = 0; i < contactAry.length; i++) {
        if (contactAry[i].open)
            contactNum = i;
    }
    // If contact num is not null, open that contact back up
    if(contactNum !== null){
        openContact(null, contactNum);
    }
    // Otherwise go back to home screen
    else{
        home();
    }
    // Hide edit display, update contact list
    editID.style.display = "none";
    renderList(-1);
    // Deselect edit tab
    addTabID.className = "";
}

//Loads names to HTML when page loads
function pageLoad() {
    // Load tabs from contact array
    renderList(-1);

    // Initialize global variables
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
}

// Functionality of delete button, prompts to confirm you want to delete, removes the contact if yes, does nothing otherwise
function del() {
    // Assign T/F value to x based on answer to prompt
    var x = confirm("Are you sure you want to delete?");
    // If OK selected
    if (x) {
        // Determine which contact we are deleting
        var contactNum = 0;
        for (var i = 0; i < contactAry.length; i++) {
            if (contactAry[i].open)
                contactNum = i;
        }
        // Remove from contact array
        contactAry.splice(contactNum, 1);
        // Update contact tabs
        renderList(-1);
        // Go to home screen
        home();
    }
    // Otherwise do nothing
}

// Opens the edit display with blank values to add new contact
function addContact() {
    // Highlight add contact tab
    addTabID.className = "activeTab";
    // Set all the open values to false
    for (var i = 0; i < contactAry.length; i++) {
        contactAry[i].open = false;
    }
    // Deselect all of the active tabs
    var tabs = document.getElementsByClassName("tab");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(" activeTab", "");
    }
    // Hide home and contact displays
    contactID.style.display = "none";
    homeID.style.display = "none";
    // Show the edit display
    editID.style.display = "block";
    // Make text boxes blank
    editnameID.value = "";
    editphoneID.value = "";
    editemailID.value = "";
}

// Updates the tab list on the left hand side of the screen with current elements in array, argument is the tab that
// should be selected, if no tab should be selected the value should be < 0 for the parameter
function renderList(selectedTab) {
    // Remove all of the li from the ul
    var list = document.getElementById("contactList");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    // Re-add li for each contact currently in the array
    for (var i = 0; i < contactAry.length; i++) {
        var entry = document.createElement('li');
        entry.innerHTML = contactAry[i].name;
        entry.setAttribute('onClick', 'openContact(event, ' + i + ')');
        entry.setAttribute('id', 'contact' + i);
        entry.setAttribute('class', 'tab');
        // Highlight selected tab
        if(i == selectedTab){
            entry.className += " activeTab";
        }
        list.appendChild(entry);
    }

}
