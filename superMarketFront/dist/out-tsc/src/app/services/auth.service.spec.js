import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
describe('AuthService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [AuthService]
        });
    });
    it('should be created', inject([AuthService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=auth.service.spec.js.map