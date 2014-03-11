var socket = io.connect('//'),
  roomKey = $('#sounds').data('roomKey');

// retrieve saved volume from localstorage
var localVol = localStorage['volume'] || 1,
    slider = document.getElementById('fader');

if (localVol != 1) {
  slider.value = localVol;
}

var saveVolume = function() {
  console.log('save', slider.value);
  localStorage['volume'] = slider.value;
};

slider.addEventListener('change', saveVolume);

socket.on('newsound/' + roomKey, function (data) {
  console.log(data);
  if ($('#loading').length == 1) {
    $('#loading').remove();
  }

  // create the audio element and metadata children
  var audio = document.createElement('audio');
  audio.setAttribute('src', data.play.url);
  audio.setAttribute('controls', '');
  audio.setAttribute('autoplay', '');
  audio.volume = slider.value;

  var p = document.createElement('p');
  p.innerHTML = data.play.sound + ' &mdash; ';

  var time = document.createElement('time');
  time.innerHTML = data.play.timestamp;

  var li = document.createElement('li');
  li.className = 'list-group-item';

  // append everything to the dom
  li.appendChild(audio);
  p.appendChild(time);
  li.appendChild(p);

  var ul = document.getElementById('sounds');
  var first = ul.firstChild;
  ul.insertBefore(li, first);

  // gray out old sounds
  if (first != null) {
    first.className = 'grayed';
  }
});
