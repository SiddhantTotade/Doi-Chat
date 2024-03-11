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

export default {log, thumbnail};
