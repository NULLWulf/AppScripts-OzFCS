function reverseSimplexList() {
  let app = SpreadsheetApp; // Gets Google Sheets Applicaion
  let currentSpreadsheetFile = app.getActiveSpreadsheet(); // Gets acivate spreadsheet

  let numberOfSheets = currentSpreadsheetFile.getNumSheets(); // gets total of numbers of sheets in spreadsheets
  let sheets = currentSpreadsheetFile.getSheets(); // gets an array with the index referencencing the respective sheets
  let assetListSheet = currentSpreadsheetFile.getSheets()[0]; // holds a reference to Main asset list sheet
  let assetRows = assetListSheet.getLastRow();
  Logger.log(assetRows);

  let sheetNames = []; // stores names of sheets, more for debugging
  for (let i = 0; i < numberOfSheets; i++) {
    // pushes sheet names
    sheetNames.push(sheets[i].getName());
  }
  Logger.log("Sheet Names: " + sheetNames); // outputs arrays of sheet name

  let sheetLookUp = new Map(); // holds reference map to map keys to their proper sheet

  for (let i = 1; i < numberOfSheets; i++) {
    // starts at one otherwise starts at 'master list sheet which
    let tempActiveSheet = currentSpreadsheetFile.getSheetByName(sheetNames[i]); // stores sheet from position in loop
    sheetLookUp.set(getValasStringTrim(tempActiveSheet, 3, 6), tempActiveSheet.getName()); // sets building number name to correspond with key value pair 
  }

  for (let [key, value] of sheetLookUp) {
    Logger.log(key + " = " + value);
  }

  const regex = /M[0-9]-\d{1,3}-[1-9]\d*/; // holds regex to test if MACP does not end in 0

  assetListSheet.activate();  // set asset list to activate 
  assetListSheet.sort(6);  // presorts column 

  for (let row = 1; row <= assetRows; row++){  // loops through rows in assetlist sheet

    if(regex.test(getValasStringTrim(assetListSheet, row, 2))){  // of row matches regex (basically does not end -0)

      let t_Description = getValasStringTrim(assetListSheet, row, 2);  // gets description as variable 

      let d_AssetRowVals = {  // object to hold data we want from AssetList sheet
        macp: t_Description.match(regex)[0],  // gets macp and pulls out number based on regex
        verboseDescription: t_Description,
        originalDescription: getValasStringTrim(assetListSheet, row, 3),
        buildingNumber: getValasStringTrim(assetListSheet, row, 6),  // pulls building #
        roomNumber: getValasStringTrim(assetListSheet, row, 7), // pulls room #
      };

      // Logger.log(d_AssetRowVals);
      let reappendedSheet = currentSpreadsheetFile.getSheetByName(sheetLookUp.get(d_AssetRowVals.buildingNumber));  // stores sheet from position in loop

      Logger.log(d_AssetRowVals);
      Logger.log(reappendedSheet.getName());

      let addedRange = [d_AssetRowVals.macp, "","", d_AssetRowVals.originalDescription, d_AssetRowVals.roomNumber, d_AssetRowVals.buildingNumber, d_AssetRowVals.verboseDescription];
      reappendedSheet.appendRow(addedRange);
      assetListSheet.deleteRow(row);

    }
    else{
      Logger.log("No regex match, assumed M code ends in 0, omitted");
    }

  }

  assetListSheet.sort(6); // reinforces sheet integrity in the event of reruns 
}
