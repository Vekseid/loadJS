/**
 * https://github.com/Vekseid/loadJS - MIT License
 * 
 * Usage: loadJS(['file1', 'file2', 'file3'], '/path/to/files/');
 *
 * The first parameter is an array of filenames (minus .js), or
 * a string. The second (optional) parameter is a path to load
 * the files from. Files will be loaded sequentially.
 * 
 * If a file points to an external source (// most likely) the
 * second parameter is ignored for that file.
 *
 */
function loadJS(a, r) {
  r = r || '';
  var f = false, o, s, i;

  function e(x, r) {
    if ((x.substr(0, 2) === '//') ||
        x.substr(0, 7) === 'http://' ||
        x.substr(0, 8) === 'https://') {
      return x;
    }
    else {
      return r + x;
    }
  }

  if (typeof a === 'string') {
    a = [a];
  }

  // Pull the first file that we haven't already loaded, stick in f
  if (a.length) {
    if (typeof loadJS.loaded === 'undefined') {
      f = e(a[0], r);
      loadJS.loaded = [f];
      if (a.length > 1) { a.shift(); }
      else {
        a = false;
      }
    }
    else {
      for (i = 0; i < loadJS.loaded.length && a.length > 0; i += 1) {
        if (loadJS.loaded[i] === e(a[0], r)) {
          a.shift();
          i = -1;
        }
      }
      if (a.length) {
        f = e(a[0], r);
        loadJS.loaded.push(f);
        if (a.length > 1) { a.shift(); }
        else {
          a = false;
        }
      }
    }
  }

  if (f) {
    s = document.createElement('script');
    s.src = f + '.js';
    s.async = true;
    if (a) {
      // Conditional comments are required for IE 5.5-7
      if ((typeof document.documentMode === 'number') && (document.documentMode < 9)) { o = true; }
      /*@cc_on @*/
      /*@if (@_jscript_version < 9)
       o = true;
       @else @*/
      else { s.onload = function () { loadJS(a, r); }; }
      /*@end @*/

      if (o) {
        s.onreadystatechange = function () {
          if (s.readyState === 'loaded' || s.readyState === 'complete') {
            loadJS(a, r);
            s.onreadystatechange = null;
          }
        };
      }
    }
    document.getElementsByTagName('head')[0].appendChild(s);
  }
}
