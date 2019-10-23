import React, { useEffect, useState, useMemo } from 'react';

import { Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import Meetup from '~/components/Meetup';
import { format, addDays, subDays } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import { map } from 'lodash';

import {
  Container,
  List,
  DateSelect,
  ControlDateButton,
  DateView,
  ControlDateIcon,
  SemRegistroText,
} from './styles';

import api from '~/services/api';
import Header from '~/components/Header';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  async function loadMeetups() {
    const params = {
      date: format(date, 'yyyy-MM-dd', { locale: ptBr }),
      page,
    };

    const meetupsCall = api.get('meetups', { params });
    const subscriptionsCall = api.get('subscriptions', { params });
    const [responseMeetups, subscriptions] = await Promise.all([
      meetupsCall,
      subscriptionsCall,
    ]);

    const subscriptionsId = map(subscriptions.data, 'meetup.id');

    const meetupsWithNoSubscription = responseMeetups.data.filter(
      m => !subscriptionsId.includes(m.id),
    );

    if (page === 1) {
      setMeetups(meetupsWithNoSubscription);
    } else {
      setMeetups([...meetups, ...meetupsWithNoSubscription]);
    }

    setRefreshing(false);
    setLoading(false);
  }

  const dateParsed = useMemo(() => {
    return format(date, "dd 'de' MMMM", { locale: ptBr });
  }, [date]);

  useEffect(() => {
    loadMeetups();
  }, [date, page]);

  async function handleSubscription(id) {
    try {
      await api.post(`meetups/${id}/subscription`);
      Alert.alert('Inscrição', 'A inscrição foi realizada com sucesso!');
      setMeetups(meetups.filter(meetup => meetup.id !== id));
    } catch (e) {
      Alert.alert('Erro', e.response.data.error);
    }
  }

  function subtractDate() {
    setLoading(true);
    setPage(1);
    setDate(subDays(date, 1));
  }

  function addDate() {
    setLoading(true);
    setPage(1);
    setDate(addDays(date, 1));
  }

  function handleRefresh() {
    if (page !== 1) {
      setPage(1);
      setRefreshing(true);
    }
  }

  function loadMore() {
    setPage(page + 1);
  }

  return (
    <Background>
      <Header />
      <Container>
        <DateSelect>
          <ControlDateButton onPress={subtractDate}>
            <ControlDateIcon name="chevron-left" />
          </ControlDateButton>
          <DateView>{dateParsed}</DateView>
          <ControlDateButton onPress={addDate}>
            <ControlDateIcon name="chevron-right" />
          </ControlDateButton>
        </DateSelect>

        {loading ? (
          <ActivityIndicator size="large" />
        ) : meetups.length ? (
          <List
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup
                data={item}
                inscrito={false}
                onSubscription={() => handleSubscription(item.id)}></Meetup>
            )}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            onEndReached={loadMore}
            onEndThreshold={2}
          />
        ) : (
          <SemRegistroText>Sem eventos nesse dia</SemRegistroText>
        )}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
