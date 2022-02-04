import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./datepicker-i18n";
export class NgbDatepickerDayView {
    constructor(i18n) {
        this.i18n = i18n;
    }
    isMuted() { return !this.selected && (this.date.month !== this.currentMonth || this.disabled); }
}
NgbDatepickerDayView.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDatepickerDayView, deps: [{ token: i1.NgbDatepickerI18n }], target: i0.ɵɵFactoryTarget.Component });
NgbDatepickerDayView.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: NgbDatepickerDayView, selector: "[ngbDatepickerDayView]", inputs: { currentMonth: "currentMonth", date: "date", disabled: "disabled", focused: "focused", selected: "selected" }, host: { properties: { "class.bg-primary": "selected", "class.text-white": "selected", "class.text-muted": "isMuted()", "class.outside": "isMuted()", "class.active": "focused" }, classAttribute: "btn-light" }, ngImport: i0, template: `{{ i18n.getDayNumerals(date) }}`, isInline: true, styles: ["[ngbDatepickerDayView]{text-align:center;width:2rem;height:2rem;line-height:2rem;border-radius:.25rem;background:transparent}[ngbDatepickerDayView].outside{opacity:.5}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDatepickerDayView, decorators: [{
            type: Component,
            args: [{ selector: '[ngbDatepickerDayView]', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        'class': 'btn-light',
                        '[class.bg-primary]': 'selected',
                        '[class.text-white]': 'selected',
                        '[class.text-muted]': 'isMuted()',
                        '[class.outside]': 'isMuted()',
                        '[class.active]': 'focused'
                    }, template: `{{ i18n.getDayNumerals(date) }}`, styles: ["[ngbDatepickerDayView]{text-align:center;width:2rem;height:2rem;line-height:2rem;border-radius:.25rem;background:transparent}[ngbDatepickerDayView].outside{opacity:.5}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NgbDatepickerI18n }]; }, propDecorators: { currentMonth: [{
                type: Input
            }], date: [{
                type: Input
            }], disabled: [{
                type: Input
            }], focused: [{
                type: Input
            }], selected: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1kYXktdmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRlcGlja2VyL2RhdGVwaWNrZXItZGF5LXZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7OztBQW1CM0YsTUFBTSxPQUFPLG9CQUFvQjtJQU8vQixZQUFtQixJQUF1QjtRQUF2QixTQUFJLEdBQUosSUFBSSxDQUFtQjtJQUFHLENBQUM7SUFFOUMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDOztpSEFUckYsb0JBQW9CO3FHQUFwQixvQkFBb0IsdVlBRnJCLGlDQUFpQzsyRkFFaEMsb0JBQW9CO2tCQWZoQyxTQUFTOytCQUNFLHdCQUF3QixtQkFDakIsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSSxRQUUvQjt3QkFDSixPQUFPLEVBQUUsV0FBVzt3QkFDcEIsb0JBQW9CLEVBQUUsVUFBVTt3QkFDaEMsb0JBQW9CLEVBQUUsVUFBVTt3QkFDaEMsb0JBQW9CLEVBQUUsV0FBVzt3QkFDakMsaUJBQWlCLEVBQUUsV0FBVzt3QkFDOUIsZ0JBQWdCLEVBQUUsU0FBUztxQkFDNUIsWUFDUyxpQ0FBaUM7d0dBR2xDLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XHJcbmltcG9ydCB7TmdiRGF0ZXBpY2tlckkxOG59IGZyb20gJy4vZGF0ZXBpY2tlci1pMThuJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnW25nYkRhdGVwaWNrZXJEYXlWaWV3XScsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBzdHlsZVVybHM6IFsnLi9kYXRlcGlja2VyLWRheS12aWV3LnNjc3MnXSxcclxuICBob3N0OiB7XHJcbiAgICAnY2xhc3MnOiAnYnRuLWxpZ2h0JyxcclxuICAgICdbY2xhc3MuYmctcHJpbWFyeV0nOiAnc2VsZWN0ZWQnLFxyXG4gICAgJ1tjbGFzcy50ZXh0LXdoaXRlXSc6ICdzZWxlY3RlZCcsXHJcbiAgICAnW2NsYXNzLnRleHQtbXV0ZWRdJzogJ2lzTXV0ZWQoKScsXHJcbiAgICAnW2NsYXNzLm91dHNpZGVdJzogJ2lzTXV0ZWQoKScsXHJcbiAgICAnW2NsYXNzLmFjdGl2ZV0nOiAnZm9jdXNlZCdcclxuICB9LFxyXG4gIHRlbXBsYXRlOiBge3sgaTE4bi5nZXREYXlOdW1lcmFscyhkYXRlKSB9fWBcclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJEYXlWaWV3IHtcclxuICBASW5wdXQoKSBjdXJyZW50TW9udGg6IG51bWJlcjtcclxuICBASW5wdXQoKSBkYXRlOiBOZ2JEYXRlO1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGZvY3VzZWQ6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgc2VsZWN0ZWQ6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpMThuOiBOZ2JEYXRlcGlja2VySTE4bikge31cclxuXHJcbiAgaXNNdXRlZCgpIHsgcmV0dXJuICF0aGlzLnNlbGVjdGVkICYmICh0aGlzLmRhdGUubW9udGggIT09IHRoaXMuY3VycmVudE1vbnRoIHx8IHRoaXMuZGlzYWJsZWQpOyB9XHJcbn1cclxuIl19