import { Injectable } from '@angular/core';
import { TranslationWidth } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * A configuration service for the [`NgbDatepicker`](#/components/datepicker/api#NgbDatepicker) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the datepickers used in the application.
 */
export class NgbDatepickerConfig {
    constructor() {
        this.displayMonths = 1;
        this.firstDayOfWeek = 1;
        this.navigation = 'select';
        this.outsideDays = 'visible';
        this.showWeekNumbers = false;
        this.weekdays = TranslationWidth.Short;
    }
}
NgbDatepickerConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDatepickerConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NgbDatepickerConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDatepickerConfig, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDatepickerConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGF0ZXBpY2tlci9kYXRlcGlja2VyLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFjLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDOztBQUlqRDs7Ozs7R0FLRztBQUVILE1BQU0sT0FBTyxtQkFBbUI7SUFEaEM7UUFLRSxrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixtQkFBYyxHQUFHLENBQUMsQ0FBQztRQUluQixlQUFVLEdBQWlDLFFBQVEsQ0FBQztRQUNwRCxnQkFBVyxHQUF1QyxTQUFTLENBQUM7UUFDNUQsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFFeEIsYUFBUSxHQUErQixnQkFBZ0IsQ0FBQyxLQUFLLENBQUM7S0FDL0Q7O2dIQWRZLG1CQUFtQjtvSEFBbkIsbUJBQW1CLGNBRFAsTUFBTTsyRkFDbEIsbUJBQW1CO2tCQUQvQixVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgVGVtcGxhdGVSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1RyYW5zbGF0aW9uV2lkdGh9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7RGF5VGVtcGxhdGVDb250ZXh0fSBmcm9tICcuL2RhdGVwaWNrZXItZGF5LXRlbXBsYXRlLWNvbnRleHQnO1xyXG5pbXBvcnQge05nYkRhdGVTdHJ1Y3R9IGZyb20gJy4vbmdiLWRhdGUtc3RydWN0JztcclxuXHJcbi8qKlxyXG4gKiBBIGNvbmZpZ3VyYXRpb24gc2VydmljZSBmb3IgdGhlIFtgTmdiRGF0ZXBpY2tlcmBdKCMvY29tcG9uZW50cy9kYXRlcGlja2VyL2FwaSNOZ2JEYXRlcGlja2VyKSBjb21wb25lbnQuXHJcbiAqXHJcbiAqIFlvdSBjYW4gaW5qZWN0IHRoaXMgc2VydmljZSwgdHlwaWNhbGx5IGluIHlvdXIgcm9vdCBjb21wb25lbnQsIGFuZCBjdXN0b21pemUgdGhlIHZhbHVlcyBvZiBpdHMgcHJvcGVydGllcyBpblxyXG4gKiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgdGhlIGRhdGVwaWNrZXJzIHVzZWQgaW4gdGhlIGFwcGxpY2F0aW9uLlxyXG4gKi9cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyQ29uZmlnIHtcclxuICBkYXlUZW1wbGF0ZTogVGVtcGxhdGVSZWY8RGF5VGVtcGxhdGVDb250ZXh0PjtcclxuICBkYXlUZW1wbGF0ZURhdGE6IChkYXRlOiBOZ2JEYXRlU3RydWN0LCBjdXJyZW50Pzoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn0pID0+IGFueTtcclxuICBmb290ZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICBkaXNwbGF5TW9udGhzID0gMTtcclxuICBmaXJzdERheU9mV2VlayA9IDE7XHJcbiAgbWFya0Rpc2FibGVkOiAoZGF0ZTogTmdiRGF0ZVN0cnVjdCwgY3VycmVudD86IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXJ9KSA9PiBib29sZWFuO1xyXG4gIG1pbkRhdGU6IE5nYkRhdGVTdHJ1Y3Q7XHJcbiAgbWF4RGF0ZTogTmdiRGF0ZVN0cnVjdDtcclxuICBuYXZpZ2F0aW9uOiAnc2VsZWN0JyB8ICdhcnJvd3MnIHwgJ25vbmUnID0gJ3NlbGVjdCc7XHJcbiAgb3V0c2lkZURheXM6ICd2aXNpYmxlJyB8ICdjb2xsYXBzZWQnIHwgJ2hpZGRlbicgPSAndmlzaWJsZSc7XHJcbiAgc2hvd1dlZWtOdW1iZXJzID0gZmFsc2U7XHJcbiAgc3RhcnREYXRlOiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyfTtcclxuICB3ZWVrZGF5czogVHJhbnNsYXRpb25XaWR0aCB8IGJvb2xlYW4gPSBUcmFuc2xhdGlvbldpZHRoLlNob3J0O1xyXG59XHJcbiJdfQ==