import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { FormStyle, getLocaleDayPeriods, TranslationWidth } from '@angular/common';
import * as i0 from "@angular/core";
export function NGB_TIMEPICKER_I18N_FACTORY(locale) {
    return new NgbTimepickerI18nDefault(locale);
}
/**
 * Type of the service supplying day periods (for example, 'AM' and 'PM') to NgbTimepicker component.
 * The default implementation of this service honors the Angular locale, and uses the registered locale data,
 * as explained in the Angular i18n guide.
 */
export class NgbTimepickerI18n {
}
NgbTimepickerI18n.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbTimepickerI18n, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NgbTimepickerI18n.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbTimepickerI18n, providedIn: 'root', useFactory: NGB_TIMEPICKER_I18N_FACTORY, deps: [{ token: LOCALE_ID }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbTimepickerI18n, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root', useFactory: NGB_TIMEPICKER_I18N_FACTORY, deps: [LOCALE_ID] }]
        }] });
export class NgbTimepickerI18nDefault extends NgbTimepickerI18n {
    constructor(locale) {
        super();
        this._periods = getLocaleDayPeriods(locale, FormStyle.Standalone, TranslationWidth.Narrow);
    }
    getMorningPeriod() { return this._periods[0]; }
    getAfternoonPeriod() { return this._periods[1]; }
}
NgbTimepickerI18nDefault.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbTimepickerI18nDefault, deps: [{ token: LOCALE_ID }], target: i0.ɵɵFactoryTarget.Injectable });
NgbTimepickerI18nDefault.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbTimepickerI18nDefault });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbTimepickerI18nDefault, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [LOCALE_ID]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci1pMThuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3RpbWVwaWNrZXIvdGltZXBpY2tlci1pMThuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQUMsU0FBUyxFQUFFLG1CQUFtQixFQUFFLGdCQUFnQixFQUFDLE1BQU0saUJBQWlCLENBQUM7O0FBRWpGLE1BQU0sVUFBVSwyQkFBMkIsQ0FBQyxNQUFNO0lBQ2hELE9BQU8sSUFBSSx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM5QyxDQUFDO0FBRUQ7Ozs7R0FJRztBQUVILE1BQU0sT0FBZ0IsaUJBQWlCOzs4R0FBakIsaUJBQWlCO2tIQUFqQixpQkFBaUIsY0FEZCxNQUFNLGNBQWMsMkJBQTJCLGtCQUFTLFNBQVM7MkZBQ3BFLGlCQUFpQjtrQkFEdEMsVUFBVTttQkFBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLDJCQUEyQixFQUFFLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFDOztBQWM1RixNQUFNLE9BQU8sd0JBQXlCLFNBQVEsaUJBQWlCO0lBRzdELFlBQStCLE1BQWM7UUFDM0MsS0FBSyxFQUFFLENBQUM7UUFFUixJQUFJLENBQUMsUUFBUSxHQUFHLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsVUFBVSxFQUFFLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdGLENBQUM7SUFFRCxnQkFBZ0IsS0FBYSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXZELGtCQUFrQixLQUFhLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O3FIQVg5Qyx3QkFBd0Isa0JBR2YsU0FBUzt5SEFIbEIsd0JBQXdCOzJGQUF4Qix3QkFBd0I7a0JBRHBDLFVBQVU7OzBCQUlJLE1BQU07MkJBQUMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBMT0NBTEVfSUR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0Zvcm1TdHlsZSwgZ2V0TG9jYWxlRGF5UGVyaW9kcywgVHJhbnNsYXRpb25XaWR0aH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBOR0JfVElNRVBJQ0tFUl9JMThOX0ZBQ1RPUlkobG9jYWxlKSB7XHJcbiAgcmV0dXJuIG5ldyBOZ2JUaW1lcGlja2VySTE4bkRlZmF1bHQobG9jYWxlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFR5cGUgb2YgdGhlIHNlcnZpY2Ugc3VwcGx5aW5nIGRheSBwZXJpb2RzIChmb3IgZXhhbXBsZSwgJ0FNJyBhbmQgJ1BNJykgdG8gTmdiVGltZXBpY2tlciBjb21wb25lbnQuXHJcbiAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIHRoaXMgc2VydmljZSBob25vcnMgdGhlIEFuZ3VsYXIgbG9jYWxlLCBhbmQgdXNlcyB0aGUgcmVnaXN0ZXJlZCBsb2NhbGUgZGF0YSxcclxuICogYXMgZXhwbGFpbmVkIGluIHRoZSBBbmd1bGFyIGkxOG4gZ3VpZGUuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnLCB1c2VGYWN0b3J5OiBOR0JfVElNRVBJQ0tFUl9JMThOX0ZBQ1RPUlksIGRlcHM6IFtMT0NBTEVfSURdfSlcclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE5nYlRpbWVwaWNrZXJJMThuIHtcclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBuYW1lIGZvciB0aGUgcGVyaW9kIGJlZm9yZSBtaWRkYXkuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZ2V0TW9ybmluZ1BlcmlvZCgpOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIG5hbWUgZm9yIHRoZSBwZXJpb2QgYWZ0ZXIgbWlkZGF5LlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGdldEFmdGVybm9vblBlcmlvZCgpOiBzdHJpbmc7XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5nYlRpbWVwaWNrZXJJMThuRGVmYXVsdCBleHRlbmRzIE5nYlRpbWVwaWNrZXJJMThuIHtcclxuICBwcml2YXRlIF9wZXJpb2RzOiBSZWFkb25seTxbc3RyaW5nLCBzdHJpbmddPjtcclxuXHJcbiAgY29uc3RydWN0b3IoQEluamVjdChMT0NBTEVfSUQpIGxvY2FsZTogc3RyaW5nKSB7XHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIHRoaXMuX3BlcmlvZHMgPSBnZXRMb2NhbGVEYXlQZXJpb2RzKGxvY2FsZSwgRm9ybVN0eWxlLlN0YW5kYWxvbmUsIFRyYW5zbGF0aW9uV2lkdGguTmFycm93KTtcclxuICB9XHJcblxyXG4gIGdldE1vcm5pbmdQZXJpb2QoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3BlcmlvZHNbMF07IH1cclxuXHJcbiAgZ2V0QWZ0ZXJub29uUGVyaW9kKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9wZXJpb2RzWzFdOyB9XHJcbn1cclxuIl19