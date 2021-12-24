// import (_DEVICEKeys) as someMap from './MapChest.js';

function mergeAndParse() {
  // Maps have been modularized into MapChest.JS.  Not neccesary to export (or possible) with GAS
  let app = SpreadsheetApp;  // Gets Google Sheets Applicaion 
  let currentSpreadsheetFile = app.getActiveSpreadsheet();  // Gets Active Spreadssheet - not technicall neccesary
  // if running script within spreadsheet otherwise would reference spreadsheet uri directly 

  let numberOfSheets = currentSpreadsheetFile.getNumSheets();  // gets total of numbers of sheets in spreadsheets
  let sheets = currentSpreadsheetFile.getSheets();  // gets an array with the index referencencing the respective sheets
  let assetListSheet = currentSpreadsheetFile.getSheets()[0]; // sets the first of assetlist to assetList sheet letiable 
  let assetRows = assetListSheet.getLastRow();
  console.log(assetRows);
  
  // assetListSheet.clear();  // using mostly for testing - removed when doing progressively runnig scripts 

  let sheetNames = [];  // stores names of sheets, more for debugging 

  for (let i = 0 ; i < numberOfSheets ; i++){  // pushes sheet names
       sheetNames.push(sheets[i].getName());  
  }
 
  Logger.log("Sheet Names: " + sheetNames);  // outputs arrays of sheet name 

  Logger.log("Before sheet loop");

  for (let i = 1; i < numberOfSheets ; i ++){  // starts at one otherwise starts at 'master list sheet which
    // is usuaully ones, otherwise first sheet is '0' as expected 

    // Activates Data Related Sheets
    let tempActiveSheet = currentSpreadsheetFile.getSheetByName(sheetNames[i]);  // stores sheet from position in loop
    tempActiveSheet.activate();  // not techicall neccesary but activate the current sheet in question (brings it into view on the user's screen)
    Logger.log(tempActiveSheet.getName());  // simply gets the currently worked on sheets names 

    // Gets tab color for GREEN which indicates the tab is ready to pasrse through it 
    if(tempActiveSheet.getTabColor() == "#00ff00"){
    rowsInSheet = tempActiveSheet.getLastRow();
    Logger.log("Current # Values in AssetList: " + rowsInSheet);  // Outputs total rows in sheet that contain data, bear in mind will
      // look for data until are columns and rows are empty 


      // Status Area
      Logger.log("Processing Sheet #" + i);
      Logger.log("Sheet name" + tempActiveSheet);
    
    for (let row = rowsInSheet ; row > 0 ; row --)
    {   

      // merges column 2 and 3 together to form key value for MCOR map
      let t_Device = getValasStringTrim(tempActiveSheet, row, 2);
      let t_Device2 = getValasStringTrim(tempActiveSheet, row, 3);
      let t_concatDevice = t_Device + ":" + t_Device2;  

      if(_DEVICEKeys.has(t_concatDevice))
      {

      let t_Address = getValasStringTrim(tempActiveSheet, row, 1);
      let t_Description = getValasStringTrim(tempActiveSheet, row, 4);
      let t_Location = getValasStringTrim(tempActiveSheet, row, 5);
      let t_Property = getValasStringTrim(tempActiveSheet, row, 6);
      
      // Holds FACP with Description value 
      let t_Address_wDescription = "";
      t_Address_wDescription = t_Address + " " + _DEVICEKeys.get(t_concatDevice);
 
      // Defines array to push onto main list 
      let addedRange = [getRndInteger(1000000000, 9999999999), t_Address_wDescription, t_Description, 28230, "MAIN CAMPUS", t_Property, t_Location, "LIFE SAFETY", "FIRE DETECTION-ALARM"];

      // Appends defined added range 
      Logger.log(row + "/" + rowsInSheet + " KeyPair Found: Row Processed: " + t_concatDevice);
      assetListSheet.appendRow(addedRange);

      // Deletes currently referenced row 
      tempActiveSheet.deleteRow(row);
      } else{
        Logger.log(row + "/" + rowsInSheet + " KeyPair NaN: Row Omitted. Urecognized KeyPair: " + t_Device + ":" + t_Device2);
      }
    }
    // Sets tab color to RED to indicate it's been parsed through, however unidentified values will remain
    tempActiveSheet.setTabColor("#ff0000"); 
    }
    else{
      if(!tempActiveSheet.getTabColor() == "#ff0000"){  // checks to make sure tab is not red, red indicate it was completed on another run
        tempActiveSheet.setTabColor("#ffff00"); // Sets color to yellow to indicate it was ignored during a script run
      }
    }
  }
}