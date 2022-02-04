import { Injectable } from '@angular/core';
import { NgbDateNativeAdapter } from './ngb-date-native-adapter';
import * as i0 from "@angular/core";
/**
 * Same as [`NgbDateNativeAdapter`](#/components/datepicker/api#NgbDateNativeAdapter), but with UTC dates.
 *
 * @since 3.2.0
 */
export class NgbDateNativeUTCAdapter extends NgbDateNativeAdapter {
    _fromNativeDate(date) {
        return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
    }
    _toNativeDate(date) {
        const jsDate = new Date(Date.UTC(date.year, date.month - 1, date.day));
        // avoid 30 -> 1930 conversion
        jsDate.setUTCFullYear(date.year);
        return jsDate;
    }
}
NgbDateNativeUTCAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDateNativeUTCAdapter, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
NgbDateNativeUTCAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDateNativeUTCAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDateNativeUTCAdapter, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWRhdGUtbmF0aXZlLXV0Yy1hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2RhdGVwaWNrZXIvYWRhcHRlcnMvbmdiLWRhdGUtbmF0aXZlLXV0Yy1hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7O0FBRS9EOzs7O0dBSUc7QUFFSCxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsb0JBQW9CO0lBQ3JELGVBQWUsQ0FBQyxJQUFVO1FBQ2xDLE9BQU8sRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUMsQ0FBQztJQUM5RixDQUFDO0lBRVMsYUFBYSxDQUFDLElBQW1CO1FBQ3pDLE1BQU0sTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2RSw4QkFBOEI7UUFDOUIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7b0hBVlUsdUJBQXVCO3dIQUF2Qix1QkFBdUI7MkZBQXZCLHVCQUF1QjtrQkFEbkMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi4vbmdiLWRhdGUtc3RydWN0JztcclxuaW1wb3J0IHtOZ2JEYXRlTmF0aXZlQWRhcHRlcn0gZnJvbSAnLi9uZ2ItZGF0ZS1uYXRpdmUtYWRhcHRlcic7XHJcblxyXG4vKipcclxuICogU2FtZSBhcyBbYE5nYkRhdGVOYXRpdmVBZGFwdGVyYF0oIy9jb21wb25lbnRzL2RhdGVwaWNrZXIvYXBpI05nYkRhdGVOYXRpdmVBZGFwdGVyKSwgYnV0IHdpdGggVVRDIGRhdGVzLlxyXG4gKlxyXG4gKiBAc2luY2UgMy4yLjBcclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5nYkRhdGVOYXRpdmVVVENBZGFwdGVyIGV4dGVuZHMgTmdiRGF0ZU5hdGl2ZUFkYXB0ZXIge1xyXG4gIHByb3RlY3RlZCBfZnJvbU5hdGl2ZURhdGUoZGF0ZTogRGF0ZSk6IE5nYkRhdGVTdHJ1Y3Qge1xyXG4gICAgcmV0dXJuIHt5ZWFyOiBkYXRlLmdldFVUQ0Z1bGxZZWFyKCksIG1vbnRoOiBkYXRlLmdldFVUQ01vbnRoKCkgKyAxLCBkYXk6IGRhdGUuZ2V0VVRDRGF0ZSgpfTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfdG9OYXRpdmVEYXRlKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBEYXRlIHtcclxuICAgIGNvbnN0IGpzRGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDKGRhdGUueWVhciwgZGF0ZS5tb250aCAtIDEsIGRhdGUuZGF5KSk7XHJcbiAgICAvLyBhdm9pZCAzMCAtPiAxOTMwIGNvbnZlcnNpb25cclxuICAgIGpzRGF0ZS5zZXRVVENGdWxsWWVhcihkYXRlLnllYXIpO1xyXG4gICAgcmV0dXJuIGpzRGF0ZTtcclxuICB9XHJcbn1cclxuIl19