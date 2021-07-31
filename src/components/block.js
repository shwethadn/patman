import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';

function Block({
  row,
  flex,
  center,
  middle,
  top,
  bottom,
  right,
  left,
  shadow,
  space,
  fluid,
  height,
  shadowColor,
  card,
  width,
  safe,
  children,
  style,
  whiteBG,
  paddingX,
  paddingY,
  paddingXSize,
  paddingYSize,
  ...rest
}) {
  const styleBlock = [
    styles.block,
    row && styles.row,
    flex && { flex: flex === true ? 1 : flex },
    center && styles.center,
    middle && styles.middle,
    top && styles.top,
    bottom && styles.bottom,
    right && styles.right,
    left && styles.left,
    space && { justifyContent: `space-${space}` },
    shadow && styles.shadow,
    fluid && styles.fluid,
    card && styles.card,
    height && { height },
    width && { width },
    shadowColor && { shadowColor },
    whiteBG && styles.whiteBG,
    paddingX && styles[`paddingX_${paddingXSize}`],
    paddingY && styles[`paddingY_${paddingYSize}`],
    style,
  ];

  if (safe) {
    return (
      <SafeAreaView style={styleBlock} {...rest}>
        {children}
      </SafeAreaView>
    );
  }

  return (
    <View style={styleBlock} {...rest}>
      {children}
    </View>
  );
}

Block.defaultProps = {
  row: false,
  flex: false,
  center: false,
  middle: false,
  top: false,
  bottom: false,
  right: false,
  left: false,
  card: false,
  shadow: false,
  space: null,
  fluid: false,
  height: null,
  width: null,
  shadowColor: null,
  safe: false,
  styles: {},
  whiteBG: true,
  paddingXSize: 'md',
  paddingYSize: 'md',
};

Block.propTypes = {
  row: PropTypes.bool,
  flex: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  center: PropTypes.bool,
  middle: PropTypes.bool,
  top: PropTypes.bool,
  bottom: PropTypes.bool,
  right: PropTypes.bool,
  card: PropTypes.bool,
  left: PropTypes.bool,
  shadow: PropTypes.bool,
  space: PropTypes.string,
  fluid: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.number,
  shadowColor: PropTypes.string,
  safe: PropTypes.bool,
  styles: PropTypes.any,
  theme: PropTypes.any,
};

const styles = StyleSheet.create({
  block: {
    flexDirection: 'column',
  },
  bottom: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  center: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  fluid: {
    width: 'auto',
  },
  left: {
    alignItems: 'flex-start',
  },
  middle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  paddingX_md: {
    paddingHorizontal: 22,
  },
  paddingY_md: {
    paddingVertical: 22,
  },
  right: {
    alignItems: 'flex-end',
  },
  row: {
    flexDirection: 'row',
  },
  top: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  whiteBG: {
    backgroundColor: '#fff',
  },
  // TODO Add Spacers for all sizes
});

export default Block;
