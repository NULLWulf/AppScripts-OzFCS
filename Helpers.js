function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
  
  function getValasStringTrim(Sheet, row, col){
    return Sheet.getRange(row, col).getValue().toString().trim();
  }

  function getMapKeyFromRegexLeft(){

    var regex1 = new RegExp('M1-\d{1,3}-1');
    var regex2 = new RegExp('M1-\d{1,3}-2');
    var regex3 = new RegExp('M1-\d{1,3}-3');
    var regex4 = new RegExp('M1-\d{1,3}-4');
    var regex5 = new RegExp('M1-\d{1,3}-5');

    
  }

  
  function getMapKeyFromRegexRight(){

    var regex1 = new RegExp('M1-\d{1,3}-1');
    var regex2 = new RegExp('M1-\d{1,3}-2');
    var regex3 = new RegExp('M1-\d{1,3}-3');
    var regex4 = new RegExp('M1-\d{1,3}-4');
    var regex5 = new RegExp('M1-\d{1,3}-5');


  }