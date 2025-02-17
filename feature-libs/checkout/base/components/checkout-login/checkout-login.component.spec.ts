import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { AuthRedirectService, I18nTestingModule, User } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { EMPTY, of } from 'rxjs';
import { CheckoutLoginComponent } from './checkout-login.component';
import createSpy = jasmine.createSpy;

class MockActiveCartService {
  addEmail = createSpy('MockCartService.addEmail');
  getAssignedUser = createSpy().and.returnValue(EMPTY);
  isGuestCart = createSpy().and.returnValue(false);
}
class MockRedirectAfterAuthService {
  redirect = createSpy('AuthRedirectService.redirect');
}

const testEmail = 'john@acme.com';

describe('CheckoutLoginComponent', () => {
  let component: CheckoutLoginComponent;
  let fixture: ComponentFixture<CheckoutLoginComponent>;
  let activeCartFacade: ActiveCartFacade;
  let authRedirectService: AuthRedirectService;
  let controls: { [key: string]: AbstractControl };
  let email: AbstractControl;
  let emailConfirmation: AbstractControl;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, I18nTestingModule, FormErrorsModule],
        declarations: [CheckoutLoginComponent],
        providers: [
          { provide: ActiveCartFacade, useClass: MockActiveCartService },
          {
            provide: AuthRedirectService,
            useClass: MockRedirectAfterAuthService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutLoginComponent);
    component = fixture.componentInstance;
    activeCartFacade = TestBed.inject(ActiveCartFacade);
    authRedirectService = TestBed.inject(AuthRedirectService);
  });

  beforeEach(() => {
    controls = component.checkoutLoginForm.controls;
    email = controls['email'];
    emailConfirmation = controls['emailConfirmation'];
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(email.value).toBe('');
    expect(emailConfirmation.value).toBe('');
  });

  describe('submitting form', () => {
    beforeEach(() => {
      activeCartFacade.getAssignedUser = createSpy().and.returnValue(
        of({ name: 'guest', uid: 'john@acme.com' } as User)
      );
      activeCartFacade.isGuestCart = createSpy().and.returnValue(of(true));
    });

    it('should work, when form is valid', () => {
      email.setValue(testEmail);
      emailConfirmation.setValue(testEmail);
      fixture.detectChanges();

      component.onSubmit();
      expect(activeCartFacade.addEmail).toHaveBeenCalledWith(testEmail);
      expect(authRedirectService.redirect).toHaveBeenCalled();
    });

    it('should not work, when form is not valid', () => {
      email.setValue(testEmail);
      fixture.detectChanges();

      component.onSubmit();
      expect(activeCartFacade.addEmail).not.toHaveBeenCalled();
      expect(authRedirectService.redirect).not.toHaveBeenCalled();
    });
  });
});
