var outputEl = document.getElementById('output');

deleteAllCookies();

log( `Initializing...` )
document.cookie = ('testing1=' + new Date().getTime())
document.cookie = ('testing2=' + new Date().getTime())
document.cookie = ('testing3=' + new Date().getTime())

// Read + Flush Testing

CookieInterceptor.init();

log( `\nAdding read handlers...\n` )

CookieInterceptor.read.use(function (cookie) {
  log( `\t- read #1 ${ cookie }` );
  return cookie;
});

CookieInterceptor.read.use(function (cookie) {
  log( `\t- read #2 ${ cookie }` );
  return cookie;
});

printCookieStatus();

log( `\nFlushing read handlers...\n` )

CookieInterceptor.read.flush();

printCookieStatus();

log( `\nAdding new read handler...\n` )

CookieInterceptor.read.use(function (cookie) {
  log( `\t- read #3 ${ cookie }` );
  return cookie;
});

printCookieStatus();

log ( `\nFlushing all Handlers...\n` )

CookieInterceptor.flushHandlers()

// Write + Flush Testing

deleteAllCookies();

log( `\nAdding write handlers...\n` )

CookieInterceptor.write.use( function ( val ) {
  log( `\t- write #1 ${ val }` );
  return val;
});

CookieInterceptor.write.use( function ( val ) {
  log( `\t- write #2 ${ val }` );
  return val;
});

log( `\nWriting 3 cookies...\n` )

document.cookie = ('testing4=' + new Date().getTime())
document.cookie = ('testing5=' + new Date().getTime())
document.cookie = ('testing6=' + new Date().getTime())

log( `\nFlushing write handlers...\n` )

CookieInterceptor.write.flush();

document.cookie = ('testing7=' + new Date().getTime())

log( `\nAdding new write handler...\n` )

CookieInterceptor.write.use( function ( val ) {
  log( `\t- write #3 ${ val }` );
  return val;
});

document.cookie = ('testing8=' + new Date().getTime())

printCookieStatus();


/* document.cookie = ('time=' + new Date().getTime());
printCookieStatus();

CookieInterceptor.init();

CookieInterceptor.disableRead();
printCookieStatus();

CookieInterceptor.enableRead().disableWrite();
printCookieStatus();

document.cookie = ('time=' + new Date().getTime());
printCookieStatus();

CookieInterceptor.enableWrite();
printCookieStatus();

document.cookie = ('time=' + new Date().getTime());
printCookieStatus();

CookieInterceptor.read.use(function (cookie) {
  log('read ' + cookie);
  return 'fake cookies';
});

CookieInterceptor.read.use(function (cookie) {
  log('read ' + cookie);
  return 'fake cookies 2';
});

printCookieStatus();

CookieInterceptor.write.use(function (val) {
  log('write ' + val);
  return 'msg=fake-writing';
});

document.cookie = ('time=' + new Date().getTime());
printCookieStatus(); */

function printCookieStatus() {
  log( `/*------ BEGIN PRINT COOKIE STATUS ------*/\n - readable: ${ CookieInterceptor.read.enabled }\n - writable: ${ CookieInterceptor.write.enabled }\n - Messages:` );
  var temp = document.cookie
  log( `/*------ END PRINT COOKIE STATUS ------*/` );
}

// https://stackoverflow.com/questions/179355/clearing-all-cookies-with-javascript
function deleteAllCookies() {
  var cookies = document.cookie.split(';');

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf('=');
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

function log(msg) {
  outputEl.textContent += msg + '\n';
}