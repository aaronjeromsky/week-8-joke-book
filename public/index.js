/** 
 * Feel free to use this file to test your endpoints.
 */
"use strict";

(function() {
  window.addEventListener("load", init);

  function init() {
    fetch('/')
      .then(checkStatus)
      .then(console.log);
  }

  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }
})();