/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { B2BUser, EntitiesModel, PaginationModel } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrganizationTableType } from '../../../shared/organization.model';
import { UserApproverListService } from '../user-approver-list.service';

@Injectable({
  providedIn: 'root',
})
export class UserAssignedApproverListService extends UserApproverListService {
  protected tableType = OrganizationTableType.USER_ASSIGNED_APPROVERS;

  protected load(
    pagination: PaginationModel,
    code: string
  ): Observable<EntitiesModel<B2BUser> | undefined> {
    return super
      .load(pagination, code)
      .pipe(map((users) => this.filterSelected(users)));
  }
}
