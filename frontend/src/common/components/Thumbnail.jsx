import React from 'react';

import utils from '../../core/utils';
import {Image} from 'react-native';

export default function Thumbnail({url, size}) {
  return (
    <Image
      source={utils.thumbnail(url)}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: '#e0e0e0',
      }}
    />
  );
}
