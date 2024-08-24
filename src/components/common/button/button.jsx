// Button.js
import React from 'react';
import PropTypes from 'prop-types';
import "./button.css"
const Button = ({
  children,
  type,
  size,
  onClick,
  className,
  primary,
  secondary,
  animated,
  animationType,
  ...props
}) => {
  let buttonClass = 'button';

  if (primary) {
    buttonClass += ' button-primary';
  } else if (secondary) {
    buttonClass += ' button-secondary';
  }

  if (size) {
    buttonClass += ` button-${size}`;
  }

  if (className) {
    buttonClass += ` ${className}`;
  }


  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClass}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  animated: PropTypes.bool,
  animationType: PropTypes.string,
};

// Button.defaultProps = {
//   type: 'button',
//   size: '',
//   onClick: null,
//   className: '',
//   primary: false,
//   secondary: false,
//   animated: false,
//   animationType: 'pulse',
// };

export default Button;