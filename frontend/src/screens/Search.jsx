import React, {useEffect, useState} from 'react';

import {SafeAreaView, View, TextInput, FlatList} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {Empty} from 'common/index';
import {useGlobal} from 'core/_index';
import {SearchRow} from './search/index';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const searchList = useGlobal(state => state.searchList);
  const searchUsers = useGlobal(state => state.searchUsers);

  useEffect(() => {
    searchUsers(query);
  }, [query]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{padding: 16, borderBottomWidth: 1, borderColor: '#f0f0f0'}}>
        <View>
          <TextInput
            style={{
              backgroundColor: '#e1e2e4',
              height: 52,
              borderRadius: 26,
              padding: 16,
              fontSize: 16,
              paddingLeft: 50,
            }}
            value={query}
            onChangeText={setQuery}
            placeholder="Search"
            placeholderTextColor="#b0b0b0"
          />
          <FontAwesomeIcon
            icon="magnifying-glass"
            size={20}
            color="#505050"
            style={{position: 'absolute', left: 18, top: 17}}
          />
        </View>
      </View>
      {searchList === null ? (
        <Empty
          icon="magnifying-glass"
          message="Search for friends"
          centerd={false}
        />
      ) : searchList.length === 0 ? (
        <Empty
          icon="triangle-exclamation"
          message={'No users found for ' + query + ''}
          centerd={false}
        />
      ) : (
        <FlatList
          data={searchList}
          renderItem={({item}) => <SearchRow user={item} />}
          keyExtractor={item => item.username}
        />
      )}
    </SafeAreaView>
  );
}
