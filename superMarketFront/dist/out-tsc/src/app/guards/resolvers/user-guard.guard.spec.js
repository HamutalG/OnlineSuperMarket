import { TestBed, inject } from '@angular/core/testing';
import { UserGuardGuard } from './user-guard.guard';
describe('UserGuardGuard', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [UserGuardGuard]
        });
    });
    it('should ...', inject([UserGuardGuard], function (guard) {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=user-guard.guard.spec.js.map