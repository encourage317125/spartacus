/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  SemanticPathService,
} from '@spartacus/core';
import { B2BUserService } from '../services';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    protected globalMessageService: GlobalMessageService,
    protected b2bUserService: B2BUserService,
    protected semanticPathService: SemanticPathService,
    protected router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    const isUpdatingUserAllowed = this.b2bUserService.isUpdatingUserAllowed();
    if (!isUpdatingUserAllowed) {
      this.globalMessageService.add(
        { key: 'organization.notification.notExist' },
        GlobalMessageType.MSG_TYPE_WARNING
      );
      return this.router.parseUrl(
        this.semanticPathService.get('organization') ?? ''
      );
    }
    return isUpdatingUserAllowed;
  }
}
