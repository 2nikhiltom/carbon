/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './form-item.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Presentational element for form items
 *
 * @element cds-form-item
 */
@customElement(`${prefix}-form-item`)
class CDSFormItem extends LitElement {
  render() {
    return html` <slot></slot> `;
  }

  static styles = styles;
}

export default CDSFormItem;
