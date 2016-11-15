INTRODUCTION
------------
The Web Address Book  is a web based application for tracking contact information input by a user. 
 
This program displays a list of names on the left side of the screen, the user is prompted to choose a name of a contact to view. Upon click the program displays the information that is stored corresponding to the contact that was selected by the user. 

The Web Address Book also allows for the contact information stored by program to be altered by the user and stores the edits back to the data structure that it pulls the contact data from. The data from the file is called into another class for manipulation by queue data structure. The queue keeps a list of the airplanes that have requested runway time for a flight to take off. The queue is then used to calculate and track the final order of the planes take off times, and is also displayed to the user. 

The program consists of 3 different portions of code: HTML which organizes the web page that displays the address book, CSS which formats the design of the web page for colors, fonts and formatting aspects not related to page placement, Javascript which handles the data manipulation the program manages with the array of contacts, and the corresponding displayed names on the main page, as well as the editing capability of the program which is set up by the HTML and CSS, but accessed by the Javascript logic of the program.  

For purposes of simplicity the program during this phase will be editing contacts in the array, and would ideally store the data back, but since normal web pages don't have access to local hard disks the data will be allowed to be edited but will not be stored back to the file at this time. 

Folder Contents
---------------
The following contents should be contained in this repository:  
README.md (This file.)  
address_book_SDD.odt  
.gitignore  
AddressBookUML.png  
AddressBookUML.xml  
AddressBook/AddressBook.html  
AddressBook/CSSAddressBook.css  
AddressBook/JSAddressBook.js  
AddressBook/Images/logo.png
AddressBook/Testing/Address_Book_Testing.odt

Running Web Address Book
------------------------
This code was developed, tested and interpreted with the WebStorm 2016.2.4 IDE. 

The contact data array has been hard coded to the file JSAddressBook.js, which an be edited from the javascript file and individual contacts can be edited with the edit option. 

To run this code load the HTML file in any web browser, or use an IDE that interprets HTML, Javascript and CSS, WebStorm 2016.2.4 is the IDE recommended for the Web Address Book. 