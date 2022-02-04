import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../ngb-config";
/**
 * A configuration service for the [NgbAccordion](#/components/accordion/api#NgbAccordion) component.
 *
 * You can inject this service, typically in your root component, and customize its properties
 * to provide default values for all accordions used in the application.
 */
export class NgbAccordionConfig {
    constructor(_ngbConfig) {
        this._ngbConfig = _ngbConfig;
        this.closeOthers = false;
    }
    get animation() { return (this._animation === undefined) ? this._ngbConfig.animation : this._animation; }
    set animation(animation) { this._animation = animation; }
}
NgbAccordionConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbAccordionConfig, deps: [{ token: i1.NgbConfig }], target: i0.ɵɵFactoryTarget.Injectable });
NgbAccordionConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbAccordionConfig, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbAccordionConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.NgbConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hY2NvcmRpb24vYWNjb3JkaW9uLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7QUFHekM7Ozs7O0dBS0c7QUFFSCxNQUFNLE9BQU8sa0JBQWtCO0lBTTdCLFlBQW9CLFVBQXFCO1FBQXJCLGVBQVUsR0FBVixVQUFVLENBQVc7UUFMekMsZ0JBQVcsR0FBRyxLQUFLLENBQUM7SUFLd0IsQ0FBQztJQUU3QyxJQUFJLFNBQVMsS0FBYyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ2xILElBQUksU0FBUyxDQUFDLFNBQWtCLElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDOzsrR0FUdkQsa0JBQWtCO21IQUFsQixrQkFBa0IsY0FETixNQUFNOzJGQUNsQixrQkFBa0I7a0JBRDlCLFVBQVU7bUJBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ2JDb25maWd9IGZyb20gJy4uL25nYi1jb25maWcnO1xyXG5cclxuLyoqXHJcbiAqIEEgY29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgW05nYkFjY29yZGlvbl0oIy9jb21wb25lbnRzL2FjY29yZGlvbi9hcGkjTmdiQWNjb3JkaW9uKSBjb21wb25lbnQuXHJcbiAqXHJcbiAqIFlvdSBjYW4gaW5qZWN0IHRoaXMgc2VydmljZSwgdHlwaWNhbGx5IGluIHlvdXIgcm9vdCBjb21wb25lbnQsIGFuZCBjdXN0b21pemUgaXRzIHByb3BlcnRpZXNcclxuICogdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgYWxsIGFjY29yZGlvbnMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcclxuZXhwb3J0IGNsYXNzIE5nYkFjY29yZGlvbkNvbmZpZyB7XHJcbiAgY2xvc2VPdGhlcnMgPSBmYWxzZTtcclxuICB0eXBlOiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgX2FuaW1hdGlvbjogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbmdiQ29uZmlnOiBOZ2JDb25maWcpIHt9XHJcblxyXG4gIGdldCBhbmltYXRpb24oKTogYm9vbGVhbiB7IHJldHVybiAodGhpcy5fYW5pbWF0aW9uID09PSB1bmRlZmluZWQpID8gdGhpcy5fbmdiQ29uZmlnLmFuaW1hdGlvbiA6IHRoaXMuX2FuaW1hdGlvbjsgfVxyXG4gIHNldCBhbmltYXRpb24oYW5pbWF0aW9uOiBib29sZWFuKSB7IHRoaXMuX2FuaW1hdGlvbiA9IGFuaW1hdGlvbjsgfVxyXG59XHJcbiJdfQ==