/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { MessageEventData } from '../message.model';

export interface ConfirmationMessageData extends MessageEventData {
  confirm?: boolean;
}
