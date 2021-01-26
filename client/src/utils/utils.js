//author medium.com/@kartikag01
//func= function to debounce, wait=delay time
// This function takes a function as the first argument and time in milliseconds as second argument and returns a function 
// that runs the original function (argument 1) a maximum of once in a period of time supplied as (argument 2). 

export function debounce(func, wait) {
    let timeout;
    return function(...args) {
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  }