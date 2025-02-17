/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable, OperatorFunction, SchedulerLike } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';

export function bufferDebounceTime<T>(
  time: number = 0,
  scheduler?: SchedulerLike
): OperatorFunction<T, T[]> {
  return (source: Observable<T>) => {
    let bufferedValues: T[] = [];

    return source.pipe(
      tap((value) => bufferedValues.push(value)),
      debounceTime(time, scheduler),
      map(() => bufferedValues),
      tap(() => (bufferedValues = []))
    );
  };
}
