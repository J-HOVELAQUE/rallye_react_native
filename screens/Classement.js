import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Text } from 'native-base';

export default class SegmentOutsideHeaderExample extends Component {
  render() {
    return (
      <Container>
        
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
}