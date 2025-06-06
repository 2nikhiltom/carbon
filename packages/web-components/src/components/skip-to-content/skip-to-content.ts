/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { ifDefined } from 'lit/directives/if-defined.js';
import FocusMixin from '../../globals/mixins/focus';
import styles from './skip-to-content.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Skip-to-content link.
 *
 * @element cds-skip-to-content
 */
@customElement(`${prefix}-skip-to-content`)
class CDSSkipToContent extends FocusMixin(LitElement) {
  /**
   * The assistive text for the link,
   */
  @property({ attribute: 'link-assistive-text' })
  linkAssisstiveText = 'Skip to main content';

  /**
   * The skip link href.
   */
  @property()
  href?: string;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'navigation');
    }
    super.connectedCallback();
  }

  render() {
    const { linkAssisstiveText } = this;
    return html`
      <a class="${prefix}--skip-to-content" href="${ifDefined(this.href)}"
        ><slot>${linkAssisstiveText}</slot></a
      >
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('linkAssisstiveText')) {
      const { linkAssisstiveText } = this;
      this.setAttribute('aria-label', linkAssisstiveText);
    }
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles;
}

export default CDSSkipToContent;
