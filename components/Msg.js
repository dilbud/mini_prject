import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Msg extends PureComponent {
  constructor(props) {
    super(props);
  }

  styles = StyleSheet.create({
    container: {
      width: '100%',
      paddingVertical: 3,
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#dfe2e5',
    },
    textContainer: {
      maxWidth: 200,
      width: 'auto',
      backgroundColor: '#a0a0ff',
      borderRadius: 15,
      paddingHorizontal: 15,
      paddingVertical: 12,
      marginLeft: 10,
    },
    textTime: {
      fontSize: 12,
      paddingHorizontal: 10,
    },
    rightContainer: {
      justifyContent: 'flex-end',
    },
    rightTextContainer: {
      backgroundColor: '#caffc9',
      marginRight: 10,
    },
    rightTextTime: {
      alignSelf: 'flex-end',
    },
  });

  flattenedStyles = {
    container: StyleSheet.flatten([
      this.styles.container,
      this.styles.rightContainer,
    ]),
    textContainer: StyleSheet.flatten([
      this.styles.textContainer,
      this.styles.rightTextContainer,
    ]),
    textTime: StyleSheet.flatten([
      this.styles.textTime,
      this.styles.rightTextTime,
    ]),
  };

  isLeftSide = this.props.side === 'left';

  containerStyles = this.isLeftSide
    ? this.styles.container
    : this.flattenedStyles.container;
  textContainerStyles = this.isLeftSide
    ? this.styles.textContainer
    : this.flattenedStyles.textContainer;
  textTimeStyles = this.isLeftSide
    ? this.styles.textTime
    : this.flattenedStyles.textTime;

  render() {
    return (
      <View style={this.containerStyles}>
        <View>
          <View style={this.textContainerStyles}>
            <Text
              style={{
                color: '#3f3f3f',
                fontWeight: 'bold',
                fontSize: 15,
                textAlign: 'left',
              }}
            >
              {this.props.message}
            </Text>
          </View>
          <Text style={this.textTimeStyles}>
            {`${new Date(this.props.time).getFullYear() % 100}/${
              new Date(this.props.time).getMonth() + 1
            }/${new Date(this.props.time).getDate()} ${
              new Date(this.props.time).getHours().toString().length === 1
                ? '0' + new Date(this.props.time).getHours().toString()
                : new Date(this.props.time).getHours().toString()
            }:${
              new Date(this.props.time).getMinutes().toString().length === 1
                ? '0' + new Date(this.props.time).getMinutes().toString()
                : new Date(this.props.time).getMinutes().toString()
            }`}
          </Text>
        </View>
      </View>
    );
  }
}
