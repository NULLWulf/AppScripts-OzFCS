function pullMiddleDescription() {  // contains only everything between 13 and 53 string positions 
  var app = SpreadsheetApp;  // Gets Google Sheets App
  var thisSpreadSheet = app.getActiveSpreadsheet();  // Gets Active Spreadssheet 

  var main = thisSpreadSheet.getSheets()[1];  // gets an array with the index referencencing the respective sheets

  rowTotal = main.getLastRow();
  Logger.log(rowTotal);

  for(let i = 2; i < rowTotal; i++){
        let cellPreParseValue = main.getRange(i, 1).getValue();
        let parsedDescription = cellPreParseValue.substring(13,53).trim();
        Logger.log(parsedDescription);
        main.getRange(i, 5).setValue(parsedDescription);

  }

  return 0;
}

function pullLastPart() {  // Omits everything before 54 position in cell string
  var app = SpreadsheetApp;  // Gets Google Sheets App
  var thisSpreadSheet = app.getActiveSpreadsheet();  // Gets Active Spreadssheet 

  var main = thisSpreadSheet.getSheets()[1];  // gets an array with the index referencencing the respective sheets

  rowTotal = main.getLastRow();
  Logger.log(rowTotal);

  for(let i = 2; i < rowTotal; i++){
        let cellPreParseValue = main.getRange(i, 1).getValue();
        let parsedDescription = cellPreParseValue.substring(54).trim();
        Logger.log(parsedDescription);
        main.getRange(i, 6).setValue(parsedDescription);

  }

  return 0;
}


function convertFACPRegexToColumn() {  // simplies copies value from one to call another (uses to copy cell values that used a formula inside excel)
  var app = SpreadsheetApp;  // Gets Google Sheets App
  var thisSpreadSheet = app.getActiveSpreadsheet();  // Gets Active Spreadssheet 

  var main = thisSpreadSheet.getSheets()[1];  // gets an array with the index referencencing the respective sheets

  rowTotal = main.getLastRow();
  Logger.log(rowTotal);

  for(let i = 2; i < rowTotal; i++){
        let cellPreParseValue = main.getRange(i, 4).getValue();
        // let parsedDescription = cellPreParseValue.substring(54).trim();
        Logger.log(cellPreParseValue);
        main.getRange(i, 3).setValue(cellPreParseValue);

  }

  return 0;
}

function regexMacorSplit(){
  var app = SpreadsheetApp;  // Gets Google Sheets App
  var thisSpreadSheet = app.getActiveSpreadsheet();  // Gets Active Spreadssheet 

  var main = thisSpreadSheet.getSheets()[1];  // gets an array with the index referencencing the respective sheets

  rowTotal = main.getLastRow();
  Logger.log(rowTotal);

  for(let i = 0; i < rowTotal; i++){
    Logger.log("Test");
  }

  return 0;
}
