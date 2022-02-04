import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../ngb-config";
/**
 * A configuration service for the [NgbCollapse](#/components/collapse/api#NgbCollapse) component.
 *
 * You can inject this service, typically in your root component, and customize its properties
 * to provide default values for all collapses used in the application.
 */
export class NgbCollapseConfig {
    constructor(_ngbConfig) {
        this._ngbConfig = _ngbConfig;
    }
    get animation() { return (this._animation === undefined) ? this._ngbConfig.animation : this._animation; }
    set animation(animation) { this._animation = animation; }
}
NgbCollapseConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbCollapseConfig, deps: [{ token: i1.NgbConfig }], target: i0.ɵɵFactoryTarget.Injectable });
NgbCollapseConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbCollapseConfig, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbCollapseConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.NgbConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbGxhcHNlL2NvbGxhcHNlLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7QUFHekM7Ozs7O0dBS0c7QUFFSCxNQUFNLE9BQU8saUJBQWlCO0lBRzVCLFlBQW9CLFVBQXFCO1FBQXJCLGVBQVUsR0FBVixVQUFVLENBQVc7SUFBRyxDQUFDO0lBRTdDLElBQUksU0FBUyxLQUFjLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDbEgsSUFBSSxTQUFTLENBQUMsU0FBa0IsSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUM7OzhHQU52RCxpQkFBaUI7a0hBQWpCLGlCQUFpQixjQURMLE1BQU07MkZBQ2xCLGlCQUFpQjtrQkFEN0IsVUFBVTttQkFBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge05nYkNvbmZpZ30gZnJvbSAnLi4vbmdiLWNvbmZpZyc7XHJcblxyXG4vKipcclxuICogQSBjb25maWd1cmF0aW9uIHNlcnZpY2UgZm9yIHRoZSBbTmdiQ29sbGFwc2VdKCMvY29tcG9uZW50cy9jb2xsYXBzZS9hcGkjTmdiQ29sbGFwc2UpIGNvbXBvbmVudC5cclxuICpcclxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSBpdHMgcHJvcGVydGllc1xyXG4gKiB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgY29sbGFwc2VzIHVzZWQgaW4gdGhlIGFwcGxpY2F0aW9uLlxyXG4gKi9cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JDb2xsYXBzZUNvbmZpZyB7XHJcbiAgcHJpdmF0ZSBfYW5pbWF0aW9uOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9uZ2JDb25maWc6IE5nYkNvbmZpZykge31cclxuXHJcbiAgZ2V0IGFuaW1hdGlvbigpOiBib29sZWFuIHsgcmV0dXJuICh0aGlzLl9hbmltYXRpb24gPT09IHVuZGVmaW5lZCkgPyB0aGlzLl9uZ2JDb25maWcuYW5pbWF0aW9uIDogdGhpcy5fYW5pbWF0aW9uOyB9XHJcbiAgc2V0IGFuaW1hdGlvbihhbmltYXRpb246IGJvb2xlYW4pIHsgdGhpcy5fYW5pbWF0aW9uID0gYW5pbWF0aW9uOyB9XHJcbn1cclxuIl19