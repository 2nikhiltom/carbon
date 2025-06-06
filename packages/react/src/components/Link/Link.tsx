/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  AnchorHTMLAttributes,
  AriaAttributes,
  ComponentType,
  ElementType,
  HTMLAttributeAnchorTarget,
} from 'react';
import { PolymorphicComponentPropWithRef } from '../../internal/PolymorphicProps';
import { usePrefix } from '../../internal/usePrefix';

export interface LinkBaseProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * @description Indicates the element that represents the
   *   current item within a container or set of related
   *   elements.
   */
  'aria-current'?: AriaAttributes['aria-current'];

  /**
   * @description Provide a custom className to be applied to
   *   the containing `<a>` node.
   */
  className?: string;

  /**
   * @description Specify if the control should be disabled, or not.
   */
  disabled?: boolean;

  /**
   * @description Provide the `href` attribute for the `<a>` node.
   */
  href?: string;

  /**
   * @description Specify whether you want the inline version of this control.
   */
  inline?: boolean;

  /**
   * A component used to render an icon.
   */
  renderIcon?: ComponentType;

  /**
   * Specify the size of the Link. Currently supports either `sm`, `md` (default) or `lg` as an option.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * @description Specify the target attribute for the `<a>` node.
   */
  target?: HTMLAttributeAnchorTarget;

  /**
   * Specify whether you want the link to receive visited styles after the link has been clicked
   */
  visited?: boolean;
}

export type LinkProps<T extends React.ElementType> =
  PolymorphicComponentPropWithRef<T, LinkBaseProps>;

type LinkComponent = <T extends React.ElementType = 'a'>(
  props: LinkProps<T>
) => React.ReactElement | any;

// First create the component with basic types
const LinkBase = React.forwardRef<
  any,
  LinkBaseProps & {
    as?: ElementType;
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>
>(
  (
    {
      as: BaseComponent,
      children,
      className: customClassName,
      href,
      disabled = false,
      inline = false,
      visited = false,
      renderIcon: Icon,
      size,
      target,
      ...rest
    },
    ref
  ) => {
    const prefix = usePrefix();
    const className = cx(`${prefix}--link`, customClassName, {
      [`${prefix}--link--disabled`]: disabled,
      [`${prefix}--link--inline`]: inline,
      [`${prefix}--link--visited`]: visited,
      [`${prefix}--link--${size}`]: size,
    });
    const rel = target === '_blank' ? 'noopener' : undefined;
    const linkProps: AnchorHTMLAttributes<HTMLAnchorElement> = {
      className,
      rel,
      target,
    };

    // Reference for disabled links:
    // https://www.scottohara.me/blog/2021/05/28/disabled-links.html
    if (!disabled) {
      linkProps.href = href;
    } else {
      linkProps.role = 'link';
      linkProps['aria-disabled'] = true;
    }

    const BaseComponentAsAny = (BaseComponent ?? 'a') as any;

    return (
      <BaseComponentAsAny ref={ref} {...linkProps} {...rest}>
        {children}
        {!inline && Icon && (
          <div className={`${prefix}--link__icon`}>
            <Icon />
          </div>
        )}
      </BaseComponentAsAny>
    );
  }
);
const Link = LinkBase as LinkComponent;

(Link as React.FC).displayName = 'Link';
(Link as React.FC).propTypes = {
  /**
   * Provide a custom element or component to render the top-level node for the
   * component.
   */
  as: PropTypes.elementType,

  /**
   * Provide the content for the Link
   */
  children: PropTypes.node,

  /**
   * Provide a custom className to be applied to the containing `<a>` node
   */
  className: PropTypes.string,

  /**
   * Specify if the control should be disabled, or not
   */
  disabled: PropTypes.bool,

  /**
   * Provide the `href` attribute for the `<a>` node
   */
  href: PropTypes.string,

  /**
   * Specify whether you want the inline version of this control
   */
  inline: PropTypes.bool,

  /**
   * A component used to render an icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Specify the size of the Link. Currently supports either `sm`, `md` (default) or `lg` as an option.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * Specify whether you want the link to receive visited styles after the link has been clicked
   */
  visited: PropTypes.bool,
};

export default Link;
