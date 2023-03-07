/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { TranslationService } from '@spartacus/core';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorAttributeProductCardComponentOptions } from '../../product-card/configurator-attribute-product-card.component';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeSingleSelectionBaseComponent } from '../base/configurator-attribute-single-selection-base.component';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';

@Component({
  selector: 'cx-configurator-attribute-single-selection-bundle-dropdown',
  templateUrl:
    './configurator-attribute-single-selection-bundle-dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeSingleSelectionBundleDropdownComponent
  extends ConfiguratorAttributeSingleSelectionBaseComponent
  implements OnInit
{
  attributeDropDownForm = new UntypedFormControl('');
  selectionValue: Configurator.Value;
  group: string;

  constructor(
    protected quantityService: ConfiguratorAttributeQuantityService,
    protected translation: TranslationService,
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext,
    protected configuratorCommonsService: ConfiguratorCommonsService
  ) {
    super(
      quantityService,
      translation,
      attributeComponentContext,
      configuratorCommonsService
    );

    this.group = attributeComponentContext.group.id;
  }

  ngOnInit() {
    this.attributeDropDownForm.setValue(this.attribute.selectedSingleValue);

    const values = this.attribute.values;
    if (values && values.length > 0) {
      const selectedValue = values.find((value) => value.selected);
      if (selectedValue) {
        this.selectionValue = selectedValue;
      }
    }
  }

  /**
   * Extract corresponding product card parameters
   *
   * @return {ConfiguratorAttributeProductCardComponentOptions} - New product card options
   */
  extractProductCardParameters(): ConfiguratorAttributeProductCardComponentOptions {
    return {
      hideRemoveButton: true,
      productBoundValue: this.selectionValue,
      singleDropdown: true,
      withQuantity: false,
      loading$: this.loading$,
      attributeId: this.getAttributeCode(this.attribute),
      attributeName: this.attribute.name,
      itemCount: 0,
      itemIndex: 0,
    };
  }
}
