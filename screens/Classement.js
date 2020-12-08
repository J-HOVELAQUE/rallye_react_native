import React from 'react';
import { Container, Header, Button, Icon, Segment, Content, Text } from 'native-base';

export default function Classement(props) {

  return (
    <Container>
      <Header>
        <Button onPress={() => props.navigation.openDrawer()}>
          <Icon name='menu' style={{ color: 'white' }} />
        </Button>
      </Header>

      <Segment>
        <Button first>
          <Text>Plateau 1</Text>
        </Button>
        <Button>
          <Text>Plateau 2</Text>
        </Button>
        <Button last active>
          <Text>Plateau 3</Text>
        </Button>
      </Segment>
      <Content padder>
        <Text>Awesome segment</Text>
      </Content>
    </Container>
  );
}
