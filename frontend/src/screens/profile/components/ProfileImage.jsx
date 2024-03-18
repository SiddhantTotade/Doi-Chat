import {TouchableOpacity, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {useGlobal} from 'core/_index';
import {Thumbnail} from 'common/index';

export default function ProfileImage() {
  const uploadThumbnail = useGlobal(state => state.uploadThumbnail);
  const user = useGlobal(state => state.user);

  return (
    <TouchableOpacity
      onPress={() =>
        launchImageLibrary({includeBase64: true}, response => {
          if (response.didCancel) return;
          const file = response.assets[0];
          uploadThumbnail(file);
        })
      }>
      <Thumbnail url={user.thumbnail} size={200} />
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          backgroundColor: '#202020',
          width: 40,
          height: 40,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 3,
          borderColor: '#fff',
        }}>
        <FontAwesomeIcon icon="pencil" size={15} color="#d0d0d0" />
      </View>
    </TouchableOpacity>
  );
}
