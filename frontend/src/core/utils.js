import ProfileImage from '../assets/Profile.png';

function log() {
  for (let i = 0; i < arguments.length; i++) {
    let arg = arguments[i];

    if (typeof arg === 'object') {
      arg = JSON.stringify(arg, null, 2);
    }

    console.log(arg);
  }
}

function thumbnail(url) {
  if (!url) {
    return ProfileImage;
  }

  return {
    uri: 'http://192.168.43.248:8000' + url,
  };
}

function formatTime(date) {
  if (date === null) {
    return '-';
  }

  const now = new Date();
  const s = Math.abs(now - new Date(date)) / 1000;

  // Seconds
  if (s < 60) {
    return 'now';
  }
  // Minutes
  if (s < 60 * 60) {
    const m = Math.floor(s / 60);
    return `${m}m ago`;
  }
  // Hours
  if (s < 60 * 60 * 24) {
    const h = Math.floor(s / (60 * 60));
    return `${h}h ago`;
  }
  // Days
  if (s < 60 * 60 * 24 * 7) {
    const d = Math.floor(s / (60 * 60 * 24));
    return `${d}d ago`;
  }
  // Weeks
  if (s < 60 * 60 * 24 * 7 * 4) {
    const w = Math.floor(s / (60 * 60 * 24 * 7));
    return `${w}w ago`;
  }
  // Years
  const y = Math.floor(s / (60 * 60 * 24 * 365));
  return `${y}y ago`;
}

function convertTime(time) {
  const date = new Date(time);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const period = hours >= 12 ? 'p.m.' : 'a.m.';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  return formattedHours + ':' + formattedMinutes + ' ' + period;
}

export default {log, thumbnail, formatTime, convertTime};
