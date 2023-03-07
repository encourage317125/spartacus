/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  OccEndpointsService,
  ConverterService,
  normalizeHttpError,
} from '@spartacus/core';

import {
  FutureStockAdapter,
  FUTURE_STOCK_NORMALIZER,
  FUTURE_STOCK_LIST_NORMALIZER,
  ProductFutureStock,
  ProductFutureStockList,
} from '@spartacus/product/future-stock/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccFutureStockAdapter implements FutureStockAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  getFutureStock(
    userId: string,
    productCode: string
  ): Observable<ProductFutureStock> {
    return this.http
      .get<ProductFutureStock>(this.getFutureStockEndpoint(userId, productCode))
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        this.converter.pipeable(FUTURE_STOCK_NORMALIZER)
      );
  }

  getFutureStocks(
    userId: string,
    productCodes: string
  ): Observable<ProductFutureStockList> {
    return this.http
      .get<ProductFutureStockList>(
        this.getFutureStocksEndpoint(userId, productCodes)
      )
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        this.converter.pipeable(FUTURE_STOCK_LIST_NORMALIZER)
      );
  }

  protected getFutureStockEndpoint(
    userId: string,
    productCode: string
  ): string {
    return this.occEndpoints.buildUrl('futureStock', {
      urlParams: { userId, productCode },
    });
  }

  protected getFutureStocksEndpoint(
    userId: string,
    productCodes: string
  ): string {
    const params = <any>{};
    params['productCodes'] = productCodes;

    return this.occEndpoints.buildUrl('futureStocks', {
      urlParams: { userId },
      queryParams: params,
    });
  }
}
