export default class Utils {
    static doSomething(val: string) { return val; }
    static doSomethingElse(val: string) { return val; }
    /* trsforma un valore di dimensione in bytes */ 
    static translateSize (str: string) {
      if(!str) return 0;
      if (str.search(/kb/i) === str.length - 2) {
          return parseFloat(
            parseFloat(str.substring(0, str.length - 2)) 
            * 1024);
      } else if (str.search(/mb/i) === str.length - 2) {
          return parseFloat(str.substring(0, str.length - 2) * 1048576);
      } else {
        return 0;
      }
    }

    /* controllo estensione*/

    static   isFileNameInPattern (fName, sPattern) {
    if(!fName) { return false; }
    if(!sPattern) { return false; }
    
    let patterns = sPattern.split(",");
    var bCheck = false;
  
    for (let j = 0; j < patterns.length; j++ ) {
  
      var cP1 = patterns[j].substring(1);
      var cP1l = cP1.length;
      var fNameExtension = fName.slice(-1 * cP1l);
      // console.log(fName, fNameExtension, cP1, cP1l);
      if(fNameExtension == cP1){
        bCheck = true;
      }
      
    }
    return bCheck;
}
}