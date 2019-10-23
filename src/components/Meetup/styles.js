import styled from 'styled-components/native';
import TIcon from 'react-native-vector-icons/MaterialIcons';

import TButton from '~/components/Button';

export const Container = styled.View`
  background: #fff;
  border-radius: 4px;
  margin: 10px 0;
  opacity: ${props => (props.past ? '0.8' : '1')};
`;

export const Content = styled.View`
  margin: 20px 18px;
`;

export const Banner = styled.Image`
  height: 150px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;
export const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #333;
`;
export const Info = styled.View`
  color: #999;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 10px;
`;

export const InfoText = styled.Text`
  color: #999;
`;

export const Icon = styled(TIcon).attrs({
  size: 20,
  color: '#999',
})`
  margin-right: 5px;
`;
export const Button = styled(TButton)`
  margin-top: 20px;
`;

export const PastText = styled.Text`
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
  color: #999;
  font-size: 16px;
`;
