import React, {Component} from 'react';
import {Animated, View, Button} from 'react-native';
import {sizing} from '../../shared/styling';

export default class MovingAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translateX: new Animated.Value(0),
      counter: 0,
    };
  }

  componentDidMount() {
    this.runAnimation();
  }

  runAnimation = () => {
    Animated.timing(this.state.translateX, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(this.state.translateX, {
        toValue: -200,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        if (this.state.counter < 3) {
          this.runAnimation();

          this.setState(prevState => ({
            counter: prevState.counter + 1,
          }));
        } else {
          Animated.timing(this.state.translateX).stop();
        }
      });
    });
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'blue'}}>
        <Animated.View
          style={{
            backgroundColor: 'red',
            width: '100%',
            height: sizing.getDimensionHeight(1),
            transform: [{translateY: this.state.translateX}],
          }}
        />
      </View>
    );
  }
}
