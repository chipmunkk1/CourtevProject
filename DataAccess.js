// Data Access Tier - logic related to the data access tier

// Save reservation info to localStorage
function processInfo(
  id,
  fname,
  lname,
  email,
  pnumber,
  address,
  courtCity,
  selectedItem,
  date,
  timeFrom,
  timeTo,
  notice
) {
  //  Added email to the parameters
  var dbString = stringify(
    id,
    fname,
    lname,
    email,
    pnumber,
    address,
    courtCity,
    selectedItem,
    date,
    timeFrom,
    timeTo,
    notice
  );
  localStorage.setItem(id, dbString);
}

// Convert reservation info into a string format for storage
function stringify(
  id,
  fname,
  lname,
  email,
  pnumber,
  address,
  courtCity,
  selectedItem,
  date,
  timeFrom,
  timeTo,
  notice
) {
  var nameStr = "name: " + fname;
  var lastNameStr = "lastName: " + lname;

  //  Saving Email
  var emailStr = "email: " + email;

  var pnumber = "phone-number: " + pnumber;
  var addrStr = "address: " + address;
  var courtCity = "court-address: " + courtCity;
  var court = "court: " + selectedItem;
  var date = "date: " + date;
  var timeFrom = "from: " + timeFrom;
  var timeTo = "to: " + timeTo;
  var notice = "notice: " + notice;

  // Combine all fields into a single string (Inserted Email between Last Name and Phone)
  var dbStr =
    "{" +
    nameStr +
    "," +
    lastNameStr +
    "," +
    emailStr +
    "," +
    pnumber +
    "," +
    addrStr +
    "," +
    courtCity +
    "," +
    court +
    "," +
    date +
    "," +
    timeFrom +
    "," +
    timeTo +
    "," +
    notice +
    "}";
  return dbStr;
}

// Retrieve all clients from localStorage
function getBookersDb() {
  var clients = []; // rows = number of clients, cols = info fields
  for (i = 0; i < localStorage.length; i++) {
    var clientId = localStorage.key(i); // get the key
    var clientInfo = localStorage.getItem(clientId); // get stored string
    var tmpClient = [];
    tmpClient[0] = clientId; // client ID
    tmpClient[1] = getName(clientInfo); // first name
    tmpClient[2] = getLastName(clientInfo); // last name
    tmpClient[3] = getPnumber(clientInfo); // phone number
    tmpClient[4] = getAddr(clientInfo); // address
    tmpClient[5] = getAddrCourt(clientInfo); // court reservation address
    tmpClient[6] = getCourt(clientInfo); // court
    tmpClient[7] = getDate(clientInfo); // reservation date
    tmpClient[8] = getTimeFrom(clientInfo); // start time
    tmpClient[9] = getTimeTo(clientInfo); // end time
    tmpClient[10] = getNotice(clientInfo); // notice

    //  Get Email
    tmpClient[11] = getEmail(clientInfo);

    clients[i] = tmpClient;
  }
  return clients;
}

// Extract first name from stored string
function getName(clientInfo) {
  var nameIndex = clientInfo.indexOf("name") + 6;
  var endNameIndex = clientInfo.indexOf("lastName") - 1;
  return clientInfo.substring(nameIndex, endNameIndex);
}

// Extract last name (Updated end index)
function getLastName(clientInfo) {
  var lastNameIndex = clientInfo.indexOf("lastName") + 10;
  // Ends at email now
  var endLastNameIndex = clientInfo.indexOf(",email:");
  return clientInfo.substring(lastNameIndex, endLastNameIndex);
}

//  Extract Email (New Function)
function getEmail(clientInfo) {
  var emailIndex = clientInfo.indexOf("email:") + 7;
  var endEmailIndex = clientInfo.indexOf(",phone-number:");
  return clientInfo.substring(emailIndex, endEmailIndex);
}

// Extract phone number (Updated start index logic)
function getPnumber(clientInfo) {
  var PNumberIndex = clientInfo.indexOf("phone-number") + 14;
  var endPNumberIndex = clientInfo.indexOf("address") - 1;
  return clientInfo.substring(PNumberIndex, endPNumberIndex);
}

// Extract address
function getAddr(clientInfo) {
  var addrIndex = clientInfo.indexOf("address") + 9;
  var endAddrIndex = clientInfo.indexOf(",court-address:");
  return clientInfo.substring(addrIndex, endAddrIndex);
}

// Extract address Court
function getAddrCourt(clientInfo) {
  var addrCourtIndex = clientInfo.indexOf("court-address:") + 15;
  var endaddrCourtIndex = clientInfo.indexOf(",court:");
  return clientInfo.substring(addrCourtIndex, endaddrCourtIndex);
}

// Extract court
function getCourt(clientInfo) {
  var courtIndex = clientInfo.indexOf("court:") + 7;
  var endCourtIndex = clientInfo.indexOf(",date:");
  return clientInfo.substring(courtIndex, endCourtIndex);
}

// Extract date
function getDate(clientInfo) {
  var dateIndex = clientInfo.indexOf("date") + 6;
  var endDateIndex = clientInfo.indexOf("from") - 1;
  return clientInfo.substring(dateIndex, endDateIndex);
}

// Extract start time
function getTimeFrom(clientInfo) {
  var tFromIndex = clientInfo.indexOf("from") + 6;
  var endTFromIndex = clientInfo.indexOf("to") - 1;
  return clientInfo.substring(tFromIndex, endTFromIndex);
}

// Extract end time
function getTimeTo(clientInfo) {
  var tToIndex = clientInfo.indexOf("to") + 4;
  var endTTOIndex = clientInfo.indexOf("notice") - 1;
  return clientInfo.substring(tToIndex, endTTOIndex);
}

// Extract notice
function getNotice(clientInfo) {
  var noticeIndex = clientInfo.indexOf("notice") + 8;
  var endNoticeIndex = clientInfo.indexOf("}");
  return clientInfo.substring(noticeIndex, endNoticeIndex);
}

// remove a client from localStorage
function removeIdFromDb(id) {
  var iformation = localStorage.getItem(id);
  if (iformation !== null) {
    var templateParams = {
      fname: getName(iformation),
      lname: getLastName(iformation),
      PNumber: getPnumber(iformation),
      Id: id,
      Address: getAddr(iformation),
      sport: getCourt(iformation),
      city: getAddrCourt(iformation),
      dateSched: getDate(iformation),
      t1: getTimeFrom(iformation),
      t2: getTimeTo(iformation),
      totalPrice: "15" + "₪",
      notice: getNotice(iformation),
      user_email: getEmail(iformation), // Sending user's email to admin
    };

    // 1. Send Email (Fire and Forget - no waiting)
    emailjs.send("service_mp452qp", "template_52n6cq8", templateParams);

    // 2. Remove from DB immediately
    localStorage.removeItem(id);

    // 3. Print Success Message immediately
    showSuccessMessage(
      "Success! Your reservation has been cancelled. A cancellation email was sent to you."
    );
    getAllReservations();
  } else {
    showMessage("No reservation found for this ID !!");
  }
}
