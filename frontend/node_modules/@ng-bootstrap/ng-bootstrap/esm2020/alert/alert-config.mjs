import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../ngb-config";
/**
 * A configuration service for the [NgbAlert](#/components/alert/api#NgbAlert) component.
 *
 * You can inject this service, typically in your root component, and customize its properties
 * to provide default values for all alerts used in the application.
 */
export class NgbAlertConfig {
    constructor(_ngbConfig) {
        this._ngbConfig = _ngbConfig;
        this.dismissible = true;
        this.type = 'warning';
    }
    get animation() { return (this._animation === undefined) ? this._ngbConfig.animation : this._animation; }
    set animation(animation) { this._animation = animation; }
}
NgbAlertConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbAlertConfig, deps: [{ token: i1.NgbConfig }], target: i0.ɵɵFactoryTarget.Injectable });
NgbAlertConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbAlertConfig, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbAlertConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.NgbConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FsZXJ0L2FsZXJ0LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7QUFHekM7Ozs7O0dBS0c7QUFFSCxNQUFNLE9BQU8sY0FBYztJQU16QixZQUFvQixVQUFxQjtRQUFyQixlQUFVLEdBQVYsVUFBVSxDQUFXO1FBTHpDLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLFNBQUksR0FBRyxTQUFTLENBQUM7SUFJMkIsQ0FBQztJQUU3QyxJQUFJLFNBQVMsS0FBYyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ2xILElBQUksU0FBUyxDQUFDLFNBQWtCLElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDOzsyR0FUdkQsY0FBYzsrR0FBZCxjQUFjLGNBREYsTUFBTTsyRkFDbEIsY0FBYztrQkFEMUIsVUFBVTttQkFBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge05nYkNvbmZpZ30gZnJvbSAnLi4vbmdiLWNvbmZpZyc7XHJcblxyXG4vKipcclxuICogQSBjb25maWd1cmF0aW9uIHNlcnZpY2UgZm9yIHRoZSBbTmdiQWxlcnRdKCMvY29tcG9uZW50cy9hbGVydC9hcGkjTmdiQWxlcnQpIGNvbXBvbmVudC5cclxuICpcclxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSBpdHMgcHJvcGVydGllc1xyXG4gKiB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgYWxlcnRzIHVzZWQgaW4gdGhlIGFwcGxpY2F0aW9uLlxyXG4gKi9cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JBbGVydENvbmZpZyB7XHJcbiAgZGlzbWlzc2libGUgPSB0cnVlO1xyXG4gIHR5cGUgPSAnd2FybmluZyc7XHJcblxyXG4gIHByaXZhdGUgX2FuaW1hdGlvbjogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbmdiQ29uZmlnOiBOZ2JDb25maWcpIHt9XHJcblxyXG4gIGdldCBhbmltYXRpb24oKTogYm9vbGVhbiB7IHJldHVybiAodGhpcy5fYW5pbWF0aW9uID09PSB1bmRlZmluZWQpID8gdGhpcy5fbmdiQ29uZmlnLmFuaW1hdGlvbiA6IHRoaXMuX2FuaW1hdGlvbjsgfVxyXG4gIHNldCBhbmltYXRpb24oYW5pbWF0aW9uOiBib29sZWFuKSB7IHRoaXMuX2FuaW1hdGlvbiA9IGFuaW1hdGlvbjsgfVxyXG59XHJcbiJdfQ==