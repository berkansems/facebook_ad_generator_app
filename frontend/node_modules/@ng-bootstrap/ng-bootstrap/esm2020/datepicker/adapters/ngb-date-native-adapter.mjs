import { Injectable } from '@angular/core';
import { NgbDateAdapter } from './ngb-date-adapter';
import { isInteger } from '../../util/util';
import * as i0 from "@angular/core";
/**
 * [`NgbDateAdapter`](#/components/datepicker/api#NgbDateAdapter) implementation that uses
 * native javascript dates as a user date model.
 */
export class NgbDateNativeAdapter extends NgbDateAdapter {
    /**
     * Converts a native `Date` to a `NgbDateStruct`.
     */
    fromModel(date) {
        return (date instanceof Date && !isNaN(date.getTime())) ? this._fromNativeDate(date) : null;
    }
    /**
     * Converts a `NgbDateStruct` to a native `Date`.
     */
    toModel(date) {
        return date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day) ? this._toNativeDate(date) :
            null;
    }
    _fromNativeDate(date) {
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    }
    _toNativeDate(date) {
        const jsDate = new Date(date.year, date.month - 1, date.day, 12);
        // avoid 30 -> 1930 conversion
        jsDate.setFullYear(date.year);
        return jsDate;
    }
}
NgbDateNativeAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDateNativeAdapter, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
NgbDateNativeAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDateNativeAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDateNativeAdapter, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWRhdGUtbmF0aXZlLWFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvZGF0ZXBpY2tlci9hZGFwdGVycy9uZ2ItZGF0ZS1uYXRpdmUtYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUVsRCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0saUJBQWlCLENBQUM7O0FBRTFDOzs7R0FHRztBQUVILE1BQU0sT0FBTyxvQkFBcUIsU0FBUSxjQUFvQjtJQUM1RDs7T0FFRztJQUNILFNBQVMsQ0FBQyxJQUFpQjtRQUN6QixPQUFPLENBQUMsSUFBSSxZQUFZLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDOUYsQ0FBQztJQUVEOztPQUVHO0lBQ0gsT0FBTyxDQUFDLElBQTBCO1FBQ2hDLE9BQU8sSUFBSSxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDO0lBQzdGLENBQUM7SUFFUyxlQUFlLENBQUMsSUFBVTtRQUNsQyxPQUFPLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFDLENBQUM7SUFDckYsQ0FBQztJQUVTLGFBQWEsQ0FBQyxJQUFtQjtRQUN6QyxNQUFNLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakUsOEJBQThCO1FBQzlCLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7O2lIQXpCVSxvQkFBb0I7cUhBQXBCLG9CQUFvQjsyRkFBcEIsb0JBQW9CO2tCQURoQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ2JEYXRlQWRhcHRlcn0gZnJvbSAnLi9uZ2ItZGF0ZS1hZGFwdGVyJztcclxuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xyXG5pbXBvcnQge2lzSW50ZWdlcn0gZnJvbSAnLi4vLi4vdXRpbC91dGlsJztcclxuXHJcbi8qKlxyXG4gKiBbYE5nYkRhdGVBZGFwdGVyYF0oIy9jb21wb25lbnRzL2RhdGVwaWNrZXIvYXBpI05nYkRhdGVBZGFwdGVyKSBpbXBsZW1lbnRhdGlvbiB0aGF0IHVzZXNcclxuICogbmF0aXZlIGphdmFzY3JpcHQgZGF0ZXMgYXMgYSB1c2VyIGRhdGUgbW9kZWwuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlTmF0aXZlQWRhcHRlciBleHRlbmRzIE5nYkRhdGVBZGFwdGVyPERhdGU+IHtcclxuICAvKipcclxuICAgKiBDb252ZXJ0cyBhIG5hdGl2ZSBgRGF0ZWAgdG8gYSBgTmdiRGF0ZVN0cnVjdGAuXHJcbiAgICovXHJcbiAgZnJvbU1vZGVsKGRhdGU6IERhdGUgfCBudWxsKTogTmdiRGF0ZVN0cnVjdCB8IG51bGwge1xyXG4gICAgcmV0dXJuIChkYXRlIGluc3RhbmNlb2YgRGF0ZSAmJiAhaXNOYU4oZGF0ZS5nZXRUaW1lKCkpKSA/IHRoaXMuX2Zyb21OYXRpdmVEYXRlKGRhdGUpIDogbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnZlcnRzIGEgYE5nYkRhdGVTdHJ1Y3RgIHRvIGEgbmF0aXZlIGBEYXRlYC5cclxuICAgKi9cclxuICB0b01vZGVsKGRhdGU6IE5nYkRhdGVTdHJ1Y3QgfCBudWxsKTogRGF0ZSB8IG51bGwge1xyXG4gICAgcmV0dXJuIGRhdGUgJiYgaXNJbnRlZ2VyKGRhdGUueWVhcikgJiYgaXNJbnRlZ2VyKGRhdGUubW9udGgpICYmIGlzSW50ZWdlcihkYXRlLmRheSkgPyB0aGlzLl90b05hdGl2ZURhdGUoZGF0ZSkgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF9mcm9tTmF0aXZlRGF0ZShkYXRlOiBEYXRlKTogTmdiRGF0ZVN0cnVjdCB7XHJcbiAgICByZXR1cm4ge3llYXI6IGRhdGUuZ2V0RnVsbFllYXIoKSwgbW9udGg6IGRhdGUuZ2V0TW9udGgoKSArIDEsIGRheTogZGF0ZS5nZXREYXRlKCl9O1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF90b05hdGl2ZURhdGUoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IERhdGUge1xyXG4gICAgY29uc3QganNEYXRlID0gbmV3IERhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoIC0gMSwgZGF0ZS5kYXksIDEyKTtcclxuICAgIC8vIGF2b2lkIDMwIC0+IDE5MzAgY29udmVyc2lvblxyXG4gICAganNEYXRlLnNldEZ1bGxZZWFyKGRhdGUueWVhcik7XHJcbiAgICByZXR1cm4ganNEYXRlO1xyXG4gIH1cclxufVxyXG4iXX0=