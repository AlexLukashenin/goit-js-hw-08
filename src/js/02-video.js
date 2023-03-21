import Player from '@vimeo/player';
import  throttle  from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

// Відстежування події timeupdate
player.on(
  'timeupdate',
  throttle(event => {
    // збереження часу відтворення у локальне сховище.
    localStorage.setItem('videoplayer-current-time', event.seconds);
  }, 1000))
player.setCurrentTime(localStorage.getItem('videoplayer-current-time') || 0);

console.log(localStorage)