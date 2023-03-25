/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  normalizeHttpError,
  OccEndpointsService,
  PointOfService,
} from '@spartacus/core';
import { PickupLocationAdapter } from '@spartacus/pickup-in-store/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccPickupLocationAdapter implements PickupLocationAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService
  ) {
    // Intentional empty constructor
  }

  getStoreDetails(storeName: string): Observable<PointOfService> {
    return this.http
      .get<PointOfService>(
        this.occEndpointsService.buildUrl('storeDetails', {
          urlParams: { storeName },
          queryParams: { fields: 'FULL' },
        })
      )
      .pipe(catchError((error: any) => throwError(normalizeHttpError(error))));
  }
}
