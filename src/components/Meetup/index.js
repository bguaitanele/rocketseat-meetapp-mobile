import React, { useMemo } from 'react';
import { Image, Text } from 'react-native';
import { parseISO, formatRelative } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import {
  Container,
  Banner,
  Title,
  Info,
  InfoText,
  Icon,
  Button,
  Content,
  PastText,
} from './styles';

export default function Meetup({
  data,
  inscrito = false,
  onCancel,
  onSubscription,
}) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), {
      locale: ptBr,
      addSuffix: true,
    });
  }, [data.date]);
  return (
    <Container past={data.past}>
      <Banner
        source={{
          uri: data.banner
            ? data.banner.url
            : `https://api.adorable.io/avatar/50/${data.provider.name}.png`,
        }}
      />
      <Content>
        <Title>{data.title}</Title>
        <Info>
          <Icon name="event" />
          <InfoText>{dateParsed}</InfoText>
        </Info>
        <Info>
          <Icon name="place" />
          <InfoText>{data.address}</InfoText>
        </Info>
        <Info>
          <Icon name="person" />
          <InfoText>Organizador: {data.user.name}</InfoText>
        </Info>
        {data.past ? (
          <PastText>Evento passado</PastText>
        ) : inscrito ? (
          <Button onPress={onCancel}>Cancelar Inscrição</Button>
        ) : (
          <Button disabled={true} onPress={onSubscription}>
            Realizar Inscrição
          </Button>
        )}
      </Content>

      {/* <Left>
        <Avatar
          source={{
            uri: data.provider.avatar
              ? data.provider.avatar.url
              : `https://api.adorable.io/avatar/50/${data.provider.name}.png`,
          }}
        />
        <Info>
          <Name>{data.provider.name}</Name>
          <Time>{dateParsed}</Time>
        </Info>
      </Left>s

      {data.cancelable && !data.canceled_at && (
        <TouchableOpacity onPress={onCancel}>
          <Icon name="event-busy" size={20} color="#f64c75" />
        </TouchableOpacity>
      )} */}
    </Container>
  );
}
