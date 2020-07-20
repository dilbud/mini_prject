import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default Msg = ({ message, side, time }) => {
  const isLeftSide = side === 'left';

  const containerStyles = isLeftSide
    ? styles.container
    : flattenedStyles.container;
  const textContainerStyles = isLeftSide
    ? styles.textContainer
    : flattenedStyles.textContainer;

  return (
    <View style={containerStyles}>
      <View style={textContainerStyles}>
        <Text
          style={{
            fontSize: 14,
            textAlign: 'left',
          }}
        >
          {message}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    maxWidth: 160,
    width: 'auto',
    backgroundColor: '#a0a0ff',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginLeft: 10,
  },
  rightContainer: {
    justifyContent: 'flex-end',
  },
  rightTextContainer: {
    backgroundColor: '#caffc9',
    marginRight: 10,
  },
});

const flattenedStyles = {
  container: StyleSheet.flatten([styles.container, styles.rightContainer]),
  textContainer: StyleSheet.flatten([
    styles.textContainer,
    styles.rightTextContainer,
  ]),
};
