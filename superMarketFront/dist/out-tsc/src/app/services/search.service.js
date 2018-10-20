var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
var SearchService = /** @class */ (function () {
    function SearchService(http) {
        this.http = http;
        this.hasSearchQueryEmitter = new EventEmitter();
        this.searchStateSource = new Subject();
        this.searchState$ = this.searchStateSource.asObservable();
        this.server = "/store/";
    }
    SearchService.prototype.setSearchBarState = function (state) {
        this.searchStateSource.next(state);
    };
    SearchService.prototype.handleHasSearchQueryEmitter = function (doesExist) {
        this.hasSearchQueryEmitter.emit(doesExist);
    };
    SearchService.prototype.searchQuery = function () {
        return this.http.get(this.server + ("search?query=" + this.searchTerm));
    };
    SearchService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], SearchService);
    return SearchService;
}());
export { SearchService };
//# sourceMappingURL=search.service.js.map