import { TestBed, inject } from '@angular/core/testing';
import { RegisterGuard } from './register.guard';
describe('RegisterGuard', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [RegisterGuard]
        });
    });
    it('should ...', inject([RegisterGuard], function (guard) {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=register.guard.spec.js.map