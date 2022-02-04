import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../ngb-config";
/**
 * A configuration service for the [`NgbNav`](#/components/nav/api#NgbNav) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the navs used in the application.
 *
 * @since 5.2.0
 */
export class NgbNavConfig {
    constructor(_ngbConfig) {
        this._ngbConfig = _ngbConfig;
        this.destroyOnHide = true;
        this.orientation = 'horizontal';
        this.roles = 'tablist';
        this.keyboard = false;
    }
    get animation() { return (this._animation === undefined) ? this._ngbConfig.animation : this._animation; }
    set animation(animation) { this._animation = animation; }
}
NgbNavConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbNavConfig, deps: [{ token: i1.NgbConfig }], target: i0.ɵɵFactoryTarget.Injectable });
NgbNavConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbNavConfig, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbNavConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.NgbConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9uYXYvbmF2LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7QUFHekM7Ozs7Ozs7R0FPRztBQUVILE1BQU0sT0FBTyxZQUFZO0lBUXZCLFlBQW9CLFVBQXFCO1FBQXJCLGVBQVUsR0FBVixVQUFVLENBQVc7UUFQekMsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsZ0JBQVcsR0FBOEIsWUFBWSxDQUFDO1FBQ3RELFVBQUssR0FBc0IsU0FBUyxDQUFDO1FBQ3JDLGFBQVEsR0FBaUMsS0FBSyxDQUFDO0lBSUgsQ0FBQztJQUU3QyxJQUFJLFNBQVMsS0FBYyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ2xILElBQUksU0FBUyxDQUFDLFNBQWtCLElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDOzt5R0FYdkQsWUFBWTs2R0FBWixZQUFZLGNBREEsTUFBTTsyRkFDbEIsWUFBWTtrQkFEeEIsVUFBVTttQkFBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge05nYkNvbmZpZ30gZnJvbSAnLi4vbmdiLWNvbmZpZyc7XHJcblxyXG4vKipcclxuICogQSBjb25maWd1cmF0aW9uIHNlcnZpY2UgZm9yIHRoZSBbYE5nYk5hdmBdKCMvY29tcG9uZW50cy9uYXYvYXBpI05nYk5hdikgY29tcG9uZW50LlxyXG4gKlxyXG4gKiBZb3UgY2FuIGluamVjdCB0aGlzIHNlcnZpY2UsIHR5cGljYWxseSBpbiB5b3VyIHJvb3QgY29tcG9uZW50LCBhbmQgY3VzdG9taXplIHRoZSB2YWx1ZXMgb2YgaXRzIHByb3BlcnRpZXMgaW5cclxuICogb3JkZXIgdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgYWxsIHRoZSBuYXZzIHVzZWQgaW4gdGhlIGFwcGxpY2F0aW9uLlxyXG4gKlxyXG4gKiBAc2luY2UgNS4yLjBcclxuICovXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxyXG5leHBvcnQgY2xhc3MgTmdiTmF2Q29uZmlnIHtcclxuICBkZXN0cm95T25IaWRlID0gdHJ1ZTtcclxuICBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICdob3Jpem9udGFsJztcclxuICByb2xlczogJ3RhYmxpc3QnIHwgZmFsc2UgPSAndGFibGlzdCc7XHJcbiAga2V5Ym9hcmQ6IGJvb2xlYW4gfCAnY2hhbmdlV2l0aEFycm93cycgPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSBfYW5pbWF0aW9uOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9uZ2JDb25maWc6IE5nYkNvbmZpZykge31cclxuXHJcbiAgZ2V0IGFuaW1hdGlvbigpOiBib29sZWFuIHsgcmV0dXJuICh0aGlzLl9hbmltYXRpb24gPT09IHVuZGVmaW5lZCkgPyB0aGlzLl9uZ2JDb25maWcuYW5pbWF0aW9uIDogdGhpcy5fYW5pbWF0aW9uOyB9XHJcbiAgc2V0IGFuaW1hdGlvbihhbmltYXRpb246IGJvb2xlYW4pIHsgdGhpcy5fYW5pbWF0aW9uID0gYW5pbWF0aW9uOyB9XHJcbn1cclxuIl19