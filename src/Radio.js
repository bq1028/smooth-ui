import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { css } from './styled-engine'
import { th, mixin } from './utils/system'
import {
  dimensions,
  space,
  flexboxes,
  basics,
  backgrounds,
  positions,
  borders,
} from './utils/styles'
import composeStyles from './utils/composeStyles'
import SwitchState from './SwitchState'
import createComponent from './utils/createComponent'

const containerSystem = composeStyles(
  basics,
  dimensions,
  space,
  flexboxes,
  positions,
)

const contentSystem = composeStyles(dimensions, backgrounds, borders)

const ModalHeader = createComponent(() => ({
  name: 'radio',
  system: composeStyles(containerSystem, contentSystem),
  applySystem: null,
  render: ({ Component, ref, className, size, ...props }) => (
    <SwitchState {...props}>
      {({ checked, focused, disabled, input }) => (
        <Component
          className={classNames(className, {
            'sui-radio-disabled': disabled,
            [`sui-radio-${size}`]: size,
          })}
        >
          <input ref={ref} type="radio" {...input} />
          <div
            className={classNames('sui-radio-content', {
              checked,
              focused,
              disabled,
            })}
          >
            <div className="sui-radio-circle" />
          </div>
        </Component>
      )}
    </SwitchState>
  ),
  style: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    position: relative;

    .sui-radio-content {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background-color: ${th('inputBgColor')};
      border-width: ${th('inputBorderWidth')};
      border-style: solid;
      border-color: ${th('inputBorderColor')};
      transition: ${th('transitionBase')};

      &.checked {
        border-color: ${th('primary')};

        .sui-radio-circle {
          transform: scale(1);
        }
      }

      &.focused {
        ${mixin('controlFocus')};
      }

      &.disabled {
        background-color: ${th('inputDisabledBgColor')};
      }
    }

    .sui-radio-circle {
      width: 10px;
      height: 10px;
      transition: ${th('transitionBase')};
      border-radius: 50%;
      background-color: ${th('primary')};
      transform: scale(0);
    }

    &.sui-radio-sm {
      .sui-radio-content {
        width: 0.875rem;
        height: 0.875rem;
      }

      .sui-radio-circle {
        width: 8px;
        height: 8px;
      }
    }

    &.sui-radio-lg {
      .sui-radio-content {
        width: 1.25rem;
        height: 1.25rem;
      }

      .sui-radio-circle {
        width: 14px;
        height: 14px;
      }
    }

    &&& {
      ${containerSystem};

      .sui-radio-content {
        ${contentSystem};
      }
    }
  `,
  propTypes: {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    size: PropTypes.oneOf(['sm', 'lg']),
    value: PropTypes.string,
  },
}))

export default ModalHeader
