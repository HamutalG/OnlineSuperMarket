import { TestBed, inject } from '@angular/core/testing';
import { StoreService } from './store.service';
describe('StoreService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [StoreService]
        });
    });
    it('should be created', inject([StoreService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=store.service.spec.js.map