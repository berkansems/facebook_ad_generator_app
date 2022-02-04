import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../ngb-config";
/**
 * A configuration service for the [NgbCarousel](#/components/carousel/api#NgbCarousel) component.
 *
 * You can inject this service, typically in your root component, and customize its properties
 * to provide default values for all carousels used in the application.
 */
export class NgbCarouselConfig {
    constructor(_ngbConfig) {
        this._ngbConfig = _ngbConfig;
        this.interval = 5000;
        this.wrap = true;
        this.keyboard = true;
        this.pauseOnHover = true;
        this.pauseOnFocus = true;
        this.showNavigationArrows = true;
        this.showNavigationIndicators = true;
    }
    get animation() { return (this._animation === undefined) ? this._ngbConfig.animation : this._animation; }
    set animation(animation) { this._animation = animation; }
}
NgbCarouselConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbCarouselConfig, deps: [{ token: i1.NgbConfig }], target: i0.ɵɵFactoryTarget.Injectable });
NgbCarouselConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbCarouselConfig, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbCarouselConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.NgbConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Nhcm91c2VsL2Nhcm91c2VsLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7QUFHekM7Ozs7O0dBS0c7QUFFSCxNQUFNLE9BQU8saUJBQWlCO0lBVzVCLFlBQW9CLFVBQXFCO1FBQXJCLGVBQVUsR0FBVixVQUFVLENBQVc7UUFWekMsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQix5QkFBb0IsR0FBRyxJQUFJLENBQUM7UUFDNUIsNkJBQXdCLEdBQUcsSUFBSSxDQUFDO0lBSVksQ0FBQztJQUU3QyxJQUFJLFNBQVMsS0FBYyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ2xILElBQUksU0FBUyxDQUFDLFNBQWtCLElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDOzs4R0FkdkQsaUJBQWlCO2tIQUFqQixpQkFBaUIsY0FETCxNQUFNOzJGQUNsQixpQkFBaUI7a0JBRDdCLFVBQVU7bUJBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ2JDb25maWd9IGZyb20gJy4uL25nYi1jb25maWcnO1xyXG5cclxuLyoqXHJcbiAqIEEgY29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgW05nYkNhcm91c2VsXSgjL2NvbXBvbmVudHMvY2Fyb3VzZWwvYXBpI05nYkNhcm91c2VsKSBjb21wb25lbnQuXHJcbiAqXHJcbiAqIFlvdSBjYW4gaW5qZWN0IHRoaXMgc2VydmljZSwgdHlwaWNhbGx5IGluIHlvdXIgcm9vdCBjb21wb25lbnQsIGFuZCBjdXN0b21pemUgaXRzIHByb3BlcnRpZXNcclxuICogdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgYWxsIGNhcm91c2VscyB1c2VkIGluIHRoZSBhcHBsaWNhdGlvbi5cclxuICovXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxyXG5leHBvcnQgY2xhc3MgTmdiQ2Fyb3VzZWxDb25maWcge1xyXG4gIGludGVydmFsID0gNTAwMDtcclxuICB3cmFwID0gdHJ1ZTtcclxuICBrZXlib2FyZCA9IHRydWU7XHJcbiAgcGF1c2VPbkhvdmVyID0gdHJ1ZTtcclxuICBwYXVzZU9uRm9jdXMgPSB0cnVlO1xyXG4gIHNob3dOYXZpZ2F0aW9uQXJyb3dzID0gdHJ1ZTtcclxuICBzaG93TmF2aWdhdGlvbkluZGljYXRvcnMgPSB0cnVlO1xyXG5cclxuICBwcml2YXRlIF9hbmltYXRpb246IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX25nYkNvbmZpZzogTmdiQ29uZmlnKSB7fVxyXG5cclxuICBnZXQgYW5pbWF0aW9uKCk6IGJvb2xlYW4geyByZXR1cm4gKHRoaXMuX2FuaW1hdGlvbiA9PT0gdW5kZWZpbmVkKSA/IHRoaXMuX25nYkNvbmZpZy5hbmltYXRpb24gOiB0aGlzLl9hbmltYXRpb247IH1cclxuICBzZXQgYW5pbWF0aW9uKGFuaW1hdGlvbjogYm9vbGVhbikgeyB0aGlzLl9hbmltYXRpb24gPSBhbmltYXRpb247IH1cclxufVxyXG4iXX0=