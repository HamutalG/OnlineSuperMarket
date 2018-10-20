import { TestBed, inject } from '@angular/core/testing';
import { SearchService } from './search.service';
describe('SearchService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [SearchService]
        });
    });
    it('should be created', inject([SearchService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=search.service.spec.js.map