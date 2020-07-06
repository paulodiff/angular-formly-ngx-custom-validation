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
}