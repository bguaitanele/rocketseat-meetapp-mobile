import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;
export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const List = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30, paddingTop: 0 },
})``;

export const DateSelect = styled.View`
  margin: 30px 0;
  justify-content: center;
  flex-direction: row;
`;
export const DateView = styled.Text`
  color: #fff;
  font-size: 20px;
  padding: 0 10px;
`;
export const ControlDateButton = styled.TouchableOpacity``;
export const ControlDateIcon = styled(Icon).attrs({
  size: 30,
  color: '#fff',
})``;

export const SemRegistroText = styled.Text`
  font-size: 16px;
  color: #fff;
  align-self: center;
  margin: 30px;
  font-weight: bold;
`;
