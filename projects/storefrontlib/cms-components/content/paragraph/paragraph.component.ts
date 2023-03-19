/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { CmsParagraphComponent } from '@spartacus/core';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';

@Component({
  selector: 'cx-paragraph',
  templateUrl: './paragraph.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParagraphComponent {
  @HostListener('click', ['$event'])
  public handleClick(event: Event): void {
    if (event.target instanceof HTMLAnchorElement) {
      const element = event.target as HTMLAnchorElement;
      const href = element?.getAttribute('href');

      const documentHost =
        element.ownerDocument.URL.split('://')[1].split('/')[0];

      // Use router for internal link navigation
      if (href && documentHost === element.host) {
        event.preventDefault();
        this.router.navigateByUrl(href);
      }
    }
  }

  constructor(
    public component: CmsComponentData<CmsParagraphComponent>,
    protected router: Router
  ) {}
}
