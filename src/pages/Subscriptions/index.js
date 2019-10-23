import React, { useEffect, useState, useMemo } from 'react';

import { Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import Background from '~/components/Background';
import Meetup from '~/components/Meetup';

import { Container, List, SemInscricaoText } from './styles';

import api from '~/services/api';
import Header from '~/components/Header';

function Subscriptions({ isFocused }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadSubscriptions() {
    setLoading(true);

    const subscriptions = await api.get('subscriptions');
    setSubscriptions(subscriptions.data);
    setLoading(false);
  }

  useEffect(() => {
    if (isFocused) {
      loadSubscriptions();
    }
  }, [isFocused]);

  async function handleCancel(id) {
    try {
      await api.delete(`meetups/${id}/subscription`);
      Alert.alert('Inscrição', 'A inscrição foi removida com sucesso!');
      setSubscriptions(subscriptions.filter(s => s.meetup.id !== id));
    } catch (e) {
      Alert.alert('Erro', e.response.data.error);
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : subscriptions.length ? (
          <List
            data={subscriptions}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup
                data={item.meetup}
                inscrito={true}
                onCancel={() => handleCancel(item.meetup.id)}
                onSubscription={() => handleSubscription(item.id)}></Meetup>
            )}
          />
        ) : (
          <SemInscricaoText>
            Você ainda não se inscreveu em nenhum evento :({' '}
          </SemInscricaoText>
        )}
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Subscriptions);
