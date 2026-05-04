import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from './notification-service';
import { TestBed } from '@angular/core/testing';

describe('GIVEN: Notification Service', () => {
  let service: NotificationService;
  let snackBarMock: jest.Mocked<MatSnackBar>;

  beforeEach(() => {
    snackBarMock = {
      open: jest.fn(),
    } as unknown as jest.Mocked<MatSnackBar>;

    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        { provide: MatSnackBar, useValue: snackBarMock },
      ],
    });

    service = TestBed.inject(NotificationService);
  });

  describe('WHEN: show notification', () => {
    it('THEN: should open snackbar', () => {
      const mockMessage = 'deleiton success';
      const mockAction = 'OK';
      const mockDuration = 3000;

      service.show(mockMessage, mockAction, mockDuration);

      expect(snackBarMock.open).toHaveBeenCalledWith(mockMessage, mockAction, {
        duration: mockDuration,
      });
    });
  });
});
