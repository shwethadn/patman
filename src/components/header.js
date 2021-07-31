import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, View } from 'react-native';
import { colors } from '../utils/colors';

const Left = ({ style, children }) => {
  const leftStyle = [styles.leftStyle];

  if (style) {
    leftStyle.push(style);
  }

  return <View style={leftStyle}>{children}</View>;
};

Left.propTypes = {
  style: PropTypes.any,
  children: PropTypes.any,
};

const Right = ({ style, children }) => {
  const rightStyle = [style || null, styles.rightStyle];

  return <View style={rightStyle}>{children}</View>;
};

Right.propTypes = {
  style: PropTypes.any,
  children: PropTypes.any,
};

const Body = ({ title, style, children, inverse }) => {
  const bodyStyle = [styles.bodyStyle, style || null];
  const bodyTextStyle = [styles.bodyTextStyle];
  if (inverse) {
    bodyTextStyle.push(styles.inverseBodyTextStyle);
  }

  return (
    <View style={bodyStyle}>
      {title ? (
        <Text tag="h3" style={bodyTextStyle}>
          {title}
        </Text>
      ) : (
        children
      )}
    </View>
  );
};

Body.propTypes = {
  title: PropTypes.string,
  style: PropTypes.any,
  children: PropTypes.any,
  inverse: PropTypes.bool,
};

class Header extends Component {
  static Left = Left;
  static Right = Right;
  static Body = Body;

  render() {
    const { children, style, transparent, shadow, ...props } = this.props;
    const headerStyle = [styles.headerStyle, style || null];

    if (transparent) {
      headerStyle.push(styles.transparentHeaderStyle);
    }

    if (shadow) {
      headerStyle.push(styles.shadowHeaderStyle);
    }

    return (
      <View style={headerStyle} {...props}>
        {children}
      </View>
    );
  }
}

Header.propTypes = {
  style: PropTypes.any,
  children: PropTypes.any,
  transparent: PropTypes.bool,
  shadow: PropTypes.bool,
};

export default Header;

const styles = StyleSheet.create({
  bodyStyle: {
    alignItems: 'center',
    flex: 2,
    justifyContent: 'center',
  },
  bodyTextStyle: {
    color: '#233042',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: -2,
    marginTop: 4,
  },
  headerStyle: {
    // backgroundColor: colors.$white,
		// backgroundColor: colors.$secondary,
		backgroundColor: colors.$primary,
    borderBottomWidth: 1,
    borderColor: colors.$headerBorderColor,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  shadowHeaderStyle: {
    elevation: 8,
    shadowColor: '#00000026',
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.16,
    shadowRadius: 2.22,
  },
  inverseBodyTextStyle: {
    color: colors.$white,
  },
  leftStyle: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'center',
  },
  rightStyle: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',
  },
  transparentHeaderStyle: {
    backgroundColor: 'transparent',
  },
});
