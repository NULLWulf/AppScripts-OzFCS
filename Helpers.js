function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
  
  function getValasStringTrim(Sheet, row, col){
    return Sheet.getRange(row, col).getValue().toString().trim();
  }

  function objectToArray(Object, Array){

  }