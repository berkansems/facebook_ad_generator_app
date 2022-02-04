import { Injectable } from '@angular/core';
import { isInteger } from '../util/util';
import * as i0 from "@angular/core";
export function NGB_DATEPICKER_TIME_ADAPTER_FACTORY() {
    return new NgbTimeStructAdapter();
}
/**
 * An abstract service that does the conversion between the internal timepicker `NgbTimeStruct` model and
 * any provided user time model `T`, ex. a string, a native date, etc.
 *
 * The adapter is used **only** for conversion when binding timepicker to a form control,
 * ex. `[(ngModel)]="userTimeModel"`. Here `userTimeModel` can be of any type.
 *
 * The default timepicker implementation assumes we use `NgbTimeStruct` as a user model.
 *
 * See the [custom time adapter demo](#/components/timepicker/examples#adapter) for an example.
 *
 * @since 2.2.0
 */
export class NgbTimeAdapter {
}
NgbTimeAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbTimeAdapter, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NgbTimeAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbTimeAdapter, providedIn: 'root', useFactory: NGB_DATEPICKER_TIME_ADAPTER_FACTORY });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbTimeAdapter, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_TIME_ADAPTER_FACTORY }]
        }] });
export class NgbTimeStructAdapter extends NgbTimeAdapter {
    /**
     * Converts a NgbTimeStruct value into NgbTimeStruct value
     */
    fromModel(time) {
        return (time && isInteger(time.hour) && isInteger(time.minute)) ?
            { hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : null } :
            null;
    }
    /**
     * Converts a NgbTimeStruct value into NgbTimeStruct value
     */
    toModel(time) {
        return (time && isInteger(time.hour) && isInteger(time.minute)) ?
            { hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : null } :
            null;
    }
}
NgbTimeStructAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbTimeStructAdapter, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
NgbTimeStructAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbTimeStructAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbTimeStructAdapter, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLXRpbWUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90aW1lcGlja2VyL25nYi10aW1lLWFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFDOztBQUV2QyxNQUFNLFVBQVUsbUNBQW1DO0lBQ2pELE9BQU8sSUFBSSxvQkFBb0IsRUFBRSxDQUFDO0FBQ3BDLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7O0dBWUc7QUFFSCxNQUFNLE9BQWdCLGNBQWM7OzJHQUFkLGNBQWM7K0dBQWQsY0FBYyxjQURYLE1BQU0sY0FBYyxtQ0FBbUM7MkZBQzFELGNBQWM7a0JBRG5DLFVBQVU7bUJBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxtQ0FBbUMsRUFBQzs7QUFjakYsTUFBTSxPQUFPLG9CQUFxQixTQUFRLGNBQTZCO0lBQ3JFOztPQUVHO0lBQ0gsU0FBUyxDQUFDLElBQTBCO1FBQ2xDLE9BQU8sQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3RCxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBTSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1lBQ2xHLElBQUksQ0FBQztJQUNYLENBQUM7SUFFRDs7T0FFRztJQUNILE9BQU8sQ0FBQyxJQUEwQjtRQUNoQyxPQUFPLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0QsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQU0sSUFBSSxFQUFDLENBQUMsQ0FBQztZQUNsRyxJQUFJLENBQUM7SUFDWCxDQUFDOztpSEFqQlUsb0JBQW9CO3FIQUFwQixvQkFBb0I7MkZBQXBCLG9CQUFvQjtrQkFEaEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TmdiVGltZVN0cnVjdH0gZnJvbSAnLi9uZ2ItdGltZS1zdHJ1Y3QnO1xyXG5pbXBvcnQge2lzSW50ZWdlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBOR0JfREFURVBJQ0tFUl9USU1FX0FEQVBURVJfRkFDVE9SWSgpIHtcclxuICByZXR1cm4gbmV3IE5nYlRpbWVTdHJ1Y3RBZGFwdGVyKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBbiBhYnN0cmFjdCBzZXJ2aWNlIHRoYXQgZG9lcyB0aGUgY29udmVyc2lvbiBiZXR3ZWVuIHRoZSBpbnRlcm5hbCB0aW1lcGlja2VyIGBOZ2JUaW1lU3RydWN0YCBtb2RlbCBhbmRcclxuICogYW55IHByb3ZpZGVkIHVzZXIgdGltZSBtb2RlbCBgVGAsIGV4LiBhIHN0cmluZywgYSBuYXRpdmUgZGF0ZSwgZXRjLlxyXG4gKlxyXG4gKiBUaGUgYWRhcHRlciBpcyB1c2VkICoqb25seSoqIGZvciBjb252ZXJzaW9uIHdoZW4gYmluZGluZyB0aW1lcGlja2VyIHRvIGEgZm9ybSBjb250cm9sLFxyXG4gKiBleC4gYFsobmdNb2RlbCldPVwidXNlclRpbWVNb2RlbFwiYC4gSGVyZSBgdXNlclRpbWVNb2RlbGAgY2FuIGJlIG9mIGFueSB0eXBlLlxyXG4gKlxyXG4gKiBUaGUgZGVmYXVsdCB0aW1lcGlja2VyIGltcGxlbWVudGF0aW9uIGFzc3VtZXMgd2UgdXNlIGBOZ2JUaW1lU3RydWN0YCBhcyBhIHVzZXIgbW9kZWwuXHJcbiAqXHJcbiAqIFNlZSB0aGUgW2N1c3RvbSB0aW1lIGFkYXB0ZXIgZGVtb10oIy9jb21wb25lbnRzL3RpbWVwaWNrZXIvZXhhbXBsZXMjYWRhcHRlcikgZm9yIGFuIGV4YW1wbGUuXHJcbiAqXHJcbiAqIEBzaW5jZSAyLjIuMFxyXG4gKi9cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290JywgdXNlRmFjdG9yeTogTkdCX0RBVEVQSUNLRVJfVElNRV9BREFQVEVSX0ZBQ1RPUll9KVxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTmdiVGltZUFkYXB0ZXI8VD4ge1xyXG4gIC8qKlxyXG4gICAqIENvbnZlcnRzIGEgdXNlci1tb2RlbCB0aW1lIG9mIHR5cGUgYFRgIHRvIGFuIGBOZ2JUaW1lU3RydWN0YCBmb3IgaW50ZXJuYWwgdXNlLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGZyb21Nb2RlbCh2YWx1ZTogVCB8IG51bGwpOiBOZ2JUaW1lU3RydWN0IHwgbnVsbDtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29udmVydHMgYW4gaW50ZXJuYWwgYE5nYlRpbWVTdHJ1Y3RgIHRpbWUgdG8gYSB1c2VyLW1vZGVsIHRpbWUgb2YgdHlwZSBgVGAuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgdG9Nb2RlbCh0aW1lOiBOZ2JUaW1lU3RydWN0IHwgbnVsbCk6IFQgfCBudWxsO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOZ2JUaW1lU3RydWN0QWRhcHRlciBleHRlbmRzIE5nYlRpbWVBZGFwdGVyPE5nYlRpbWVTdHJ1Y3Q+IHtcclxuICAvKipcclxuICAgKiBDb252ZXJ0cyBhIE5nYlRpbWVTdHJ1Y3QgdmFsdWUgaW50byBOZ2JUaW1lU3RydWN0IHZhbHVlXHJcbiAgICovXHJcbiAgZnJvbU1vZGVsKHRpbWU6IE5nYlRpbWVTdHJ1Y3QgfCBudWxsKTogTmdiVGltZVN0cnVjdCB8IG51bGwge1xyXG4gICAgcmV0dXJuICh0aW1lICYmIGlzSW50ZWdlcih0aW1lLmhvdXIpICYmIGlzSW50ZWdlcih0aW1lLm1pbnV0ZSkpID9cclxuICAgICAgICB7aG91cjogdGltZS5ob3VyLCBtaW51dGU6IHRpbWUubWludXRlLCBzZWNvbmQ6IGlzSW50ZWdlcih0aW1lLnNlY29uZCkgPyB0aW1lLnNlY29uZCA6IDxhbnk+bnVsbH0gOlxyXG4gICAgICAgIG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb252ZXJ0cyBhIE5nYlRpbWVTdHJ1Y3QgdmFsdWUgaW50byBOZ2JUaW1lU3RydWN0IHZhbHVlXHJcbiAgICovXHJcbiAgdG9Nb2RlbCh0aW1lOiBOZ2JUaW1lU3RydWN0IHwgbnVsbCk6IE5nYlRpbWVTdHJ1Y3QgfCBudWxsIHtcclxuICAgIHJldHVybiAodGltZSAmJiBpc0ludGVnZXIodGltZS5ob3VyKSAmJiBpc0ludGVnZXIodGltZS5taW51dGUpKSA/XHJcbiAgICAgICAge2hvdXI6IHRpbWUuaG91ciwgbWludXRlOiB0aW1lLm1pbnV0ZSwgc2Vjb25kOiBpc0ludGVnZXIodGltZS5zZWNvbmQpID8gdGltZS5zZWNvbmQgOiA8YW55Pm51bGx9IDpcclxuICAgICAgICBudWxsO1xyXG4gIH1cclxufVxyXG4iXX0=