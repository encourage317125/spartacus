/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CONFIGURATOR_ATTRIBUTE_NUMERIC_INPUT_FIELD_COMPONENT,
  CREATE_EVENT_FROM_INPUT,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

//feature-libs/product-configurator/rulebased/components/attribute/types/numeric-input-field/configurator-attribute-numeric-input-field.component.ts
export const CONFIGURATOR_ATTRIBUTE_NUMERIC_INPUT_FIELD_COMPONENT_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: CONFIGURATOR_ATTRIBUTE_NUMERIC_INPUT_FIELD_COMPONENT,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
      deprecatedNode: CREATE_EVENT_FROM_INPUT,
      comment: `// ${TODO_SPARTACUS} Method '${CREATE_EVENT_FROM_INPUT}' was removed from '${CONFIGURATOR_ATTRIBUTE_NUMERIC_INPUT_FIELD_COMPONENT}'. It is no longer used.`,
    },
  ];
