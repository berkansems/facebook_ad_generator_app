import { Injectable } from '@angular/core';
import { isInteger } from '../../util/util';
import * as i0 from "@angular/core";
export function NGB_DATEPICKER_DATE_ADAPTER_FACTORY() {
    return new NgbDateStructAdapter();
}
/**
 * An abstract service that does the conversion between the internal datepicker `NgbDateStruct` model and
 * any provided user date model `D`, ex. a string, a native date, etc.
 *
 * The adapter is used **only** for conversion when binding datepicker to a form control,
 * ex. `[(ngModel)]="userDateModel"`. Here `userDateModel` can be of any type.
 *
 * The default datepicker implementation assumes we use `NgbDateStruct` as a user model.
 *
 * See the [date format overview](#/components/datepicker/overview#date-model) for more details
 * and the [custom adapter demo](#/components/datepicker/examples#adapter) for an example.
 */
export class NgbDateAdapter {
}
NgbDateAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDateAdapter, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NgbDateAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDateAdapter, providedIn: 'root', useFactory: NGB_DATEPICKER_DATE_ADAPTER_FACTORY });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDateAdapter, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_DATE_ADAPTER_FACTORY }]
        }] });
export class NgbDateStructAdapter extends NgbDateAdapter {
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     */
    fromModel(date) {
        return (date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day)) ?
            { year: date.year, month: date.month, day: date.day } :
            null;
    }
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     */
    toModel(date) {
        return (date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day)) ?
            { year: date.year, month: date.month, day: date.day } :
            null;
    }
}
NgbDateStructAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDateStructAdapter, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
NgbDateStructAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDateStructAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDateStructAdapter, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWRhdGUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9kYXRlcGlja2VyL2FkYXB0ZXJzL25nYi1kYXRlLWFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0saUJBQWlCLENBQUM7O0FBRTFDLE1BQU0sVUFBVSxtQ0FBbUM7SUFDakQsT0FBTyxJQUFJLG9CQUFvQixFQUFFLENBQUM7QUFDcEMsQ0FBQztBQUVEOzs7Ozs7Ozs7OztHQVdHO0FBRUgsTUFBTSxPQUFnQixjQUFjOzsyR0FBZCxjQUFjOytHQUFkLGNBQWMsY0FEWCxNQUFNLGNBQWMsbUNBQW1DOzJGQUMxRCxjQUFjO2tCQURuQyxVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsbUNBQW1DLEVBQUM7O0FBY2pGLE1BQU0sT0FBTyxvQkFBcUIsU0FBUSxjQUE2QjtJQUNyRTs7T0FFRztJQUNILFNBQVMsQ0FBQyxJQUEwQjtRQUNsQyxPQUFPLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRixFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUM7SUFDWCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxPQUFPLENBQUMsSUFBMEI7UUFDaEMsT0FBTyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkYsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBQyxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDO0lBQ1gsQ0FBQzs7aUhBakJVLG9CQUFvQjtxSEFBcEIsb0JBQW9COzJGQUFwQixvQkFBb0I7a0JBRGhDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge05nYkRhdGVTdHJ1Y3R9IGZyb20gJy4uL25nYi1kYXRlLXN0cnVjdCc7XHJcbmltcG9ydCB7aXNJbnRlZ2VyfSBmcm9tICcuLi8uLi91dGlsL3V0aWwnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE5HQl9EQVRFUElDS0VSX0RBVEVfQURBUFRFUl9GQUNUT1JZKCkge1xyXG4gIHJldHVybiBuZXcgTmdiRGF0ZVN0cnVjdEFkYXB0ZXIoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFuIGFic3RyYWN0IHNlcnZpY2UgdGhhdCBkb2VzIHRoZSBjb252ZXJzaW9uIGJldHdlZW4gdGhlIGludGVybmFsIGRhdGVwaWNrZXIgYE5nYkRhdGVTdHJ1Y3RgIG1vZGVsIGFuZFxyXG4gKiBhbnkgcHJvdmlkZWQgdXNlciBkYXRlIG1vZGVsIGBEYCwgZXguIGEgc3RyaW5nLCBhIG5hdGl2ZSBkYXRlLCBldGMuXHJcbiAqXHJcbiAqIFRoZSBhZGFwdGVyIGlzIHVzZWQgKipvbmx5KiogZm9yIGNvbnZlcnNpb24gd2hlbiBiaW5kaW5nIGRhdGVwaWNrZXIgdG8gYSBmb3JtIGNvbnRyb2wsXHJcbiAqIGV4LiBgWyhuZ01vZGVsKV09XCJ1c2VyRGF0ZU1vZGVsXCJgLiBIZXJlIGB1c2VyRGF0ZU1vZGVsYCBjYW4gYmUgb2YgYW55IHR5cGUuXHJcbiAqXHJcbiAqIFRoZSBkZWZhdWx0IGRhdGVwaWNrZXIgaW1wbGVtZW50YXRpb24gYXNzdW1lcyB3ZSB1c2UgYE5nYkRhdGVTdHJ1Y3RgIGFzIGEgdXNlciBtb2RlbC5cclxuICpcclxuICogU2VlIHRoZSBbZGF0ZSBmb3JtYXQgb3ZlcnZpZXddKCMvY29tcG9uZW50cy9kYXRlcGlja2VyL292ZXJ2aWV3I2RhdGUtbW9kZWwpIGZvciBtb3JlIGRldGFpbHNcclxuICogYW5kIHRoZSBbY3VzdG9tIGFkYXB0ZXIgZGVtb10oIy9jb21wb25lbnRzL2RhdGVwaWNrZXIvZXhhbXBsZXMjYWRhcHRlcikgZm9yIGFuIGV4YW1wbGUuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnLCB1c2VGYWN0b3J5OiBOR0JfREFURVBJQ0tFUl9EQVRFX0FEQVBURVJfRkFDVE9SWX0pXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOZ2JEYXRlQWRhcHRlcjxEPiB7XHJcbiAgLyoqXHJcbiAgICogQ29udmVydHMgYSB1c2VyLW1vZGVsIGRhdGUgb2YgdHlwZSBgRGAgdG8gYW4gYE5nYkRhdGVTdHJ1Y3RgIGZvciBpbnRlcm5hbCB1c2UuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZnJvbU1vZGVsKHZhbHVlOiBEIHwgbnVsbCk6IE5nYkRhdGVTdHJ1Y3QgfCBudWxsO1xyXG5cclxuICAvKipcclxuICAgKiBDb252ZXJ0cyBhbiBpbnRlcm5hbCBgTmdiRGF0ZVN0cnVjdGAgZGF0ZSB0byBhIHVzZXItbW9kZWwgZGF0ZSBvZiB0eXBlIGBEYC5cclxuICAgKi9cclxuICBhYnN0cmFjdCB0b01vZGVsKGRhdGU6IE5nYkRhdGVTdHJ1Y3QgfCBudWxsKTogRCB8IG51bGw7XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5nYkRhdGVTdHJ1Y3RBZGFwdGVyIGV4dGVuZHMgTmdiRGF0ZUFkYXB0ZXI8TmdiRGF0ZVN0cnVjdD4ge1xyXG4gIC8qKlxyXG4gICAqIENvbnZlcnRzIGEgTmdiRGF0ZVN0cnVjdCB2YWx1ZSBpbnRvIE5nYkRhdGVTdHJ1Y3QgdmFsdWVcclxuICAgKi9cclxuICBmcm9tTW9kZWwoZGF0ZTogTmdiRGF0ZVN0cnVjdCB8IG51bGwpOiBOZ2JEYXRlU3RydWN0IHwgbnVsbCB7XHJcbiAgICByZXR1cm4gKGRhdGUgJiYgaXNJbnRlZ2VyKGRhdGUueWVhcikgJiYgaXNJbnRlZ2VyKGRhdGUubW9udGgpICYmIGlzSW50ZWdlcihkYXRlLmRheSkpID9cclxuICAgICAgICB7eWVhcjogZGF0ZS55ZWFyLCBtb250aDogZGF0ZS5tb250aCwgZGF5OiBkYXRlLmRheX0gOlxyXG4gICAgICAgIG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb252ZXJ0cyBhIE5nYkRhdGVTdHJ1Y3QgdmFsdWUgaW50byBOZ2JEYXRlU3RydWN0IHZhbHVlXHJcbiAgICovXHJcbiAgdG9Nb2RlbChkYXRlOiBOZ2JEYXRlU3RydWN0IHwgbnVsbCk6IE5nYkRhdGVTdHJ1Y3QgfCBudWxsIHtcclxuICAgIHJldHVybiAoZGF0ZSAmJiBpc0ludGVnZXIoZGF0ZS55ZWFyKSAmJiBpc0ludGVnZXIoZGF0ZS5tb250aCkgJiYgaXNJbnRlZ2VyKGRhdGUuZGF5KSkgP1xyXG4gICAgICAgIHt5ZWFyOiBkYXRlLnllYXIsIG1vbnRoOiBkYXRlLm1vbnRoLCBkYXk6IGRhdGUuZGF5fSA6XHJcbiAgICAgICAgbnVsbDtcclxuICB9XHJcbn1cclxuIl19