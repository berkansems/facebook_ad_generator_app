import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "./label";
/**
 * Allows to easily create Bootstrap-style checkbox buttons.
 *
 * Integrates with forms, so the value of a checked button is bound to the underlying form control
 * either in a reactive or template-driven way.
 */
export class NgbCheckBox {
    constructor(_label, _cd) {
        this._label = _label;
        this._cd = _cd;
        /**
         * If `true`, the checkbox button will be disabled
         */
        this.disabled = false;
        /**
         * The form control value when the checkbox is checked.
         */
        this.valueChecked = true;
        /**
         * The form control value when the checkbox is unchecked.
         */
        this.valueUnChecked = false;
        this.onChange = (_) => { };
        this.onTouched = () => { };
    }
    set focused(isFocused) {
        this._label.focused = isFocused;
        if (!isFocused) {
            this.onTouched();
        }
    }
    onInputChange($event) {
        const modelToPropagate = $event.target.checked ? this.valueChecked : this.valueUnChecked;
        this.onChange(modelToPropagate);
        this.onTouched();
        this.writeValue(modelToPropagate);
    }
    registerOnChange(fn) { this.onChange = fn; }
    registerOnTouched(fn) { this.onTouched = fn; }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this._label.disabled = isDisabled;
    }
    writeValue(value) {
        this.checked = value === this.valueChecked;
        this._label.active = this.checked;
        // label won't be updated, if it is inside the OnPush component when [ngModel] changes
        this._cd.markForCheck();
    }
}
NgbCheckBox.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbCheckBox, deps: [{ token: i1.NgbButtonLabel }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbCheckBox.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NgbCheckBox, selector: "[ngbButton][type=checkbox]", inputs: { disabled: "disabled", valueChecked: "valueChecked", valueUnChecked: "valueUnChecked" }, host: { listeners: { "change": "onInputChange($event)", "focus": "focused = true", "blur": "focused = false" }, properties: { "checked": "checked", "disabled": "disabled" } }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbCheckBox), multi: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbCheckBox, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbButton][type=checkbox]',
                    host: {
                        '[checked]': 'checked',
                        '[disabled]': 'disabled',
                        '(change)': 'onInputChange($event)',
                        '(focus)': 'focused = true',
                        '(blur)': 'focused = false'
                    },
                    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbCheckBox), multi: true }]
                }]
        }], ctorParameters: function () { return [{ type: i1.NgbButtonLabel }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { disabled: [{
                type: Input
            }], valueChecked: [{
                type: Input
            }], valueUnChecked: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYnV0dG9ucy9jaGVja2JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQW9CLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBSXZFOzs7OztHQUtHO0FBWUgsTUFBTSxPQUFPLFdBQVc7SUE4QnRCLFlBQW9CLE1BQXNCLEVBQVUsR0FBc0I7UUFBdEQsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQXpCMUU7O1dBRUc7UUFDTSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRTFCOztXQUVHO1FBQ00saUJBQVksR0FBRyxJQUFJLENBQUM7UUFFN0I7O1dBRUc7UUFDTSxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUVoQyxhQUFRLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUMxQixjQUFTLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBU3dELENBQUM7SUFQOUUsSUFBSSxPQUFPLENBQUMsU0FBa0I7UUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDZCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDbEI7SUFDSCxDQUFDO0lBSUQsYUFBYSxDQUFDLE1BQU07UUFDbEIsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUN6RixJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsRUFBdUIsSUFBVSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFdkUsaUJBQWlCLENBQUMsRUFBYSxJQUFVLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUUvRCxnQkFBZ0IsQ0FBQyxVQUFtQjtRQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDcEMsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFLO1FBQ2QsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQztRQUMzQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBRWxDLHNGQUFzRjtRQUN0RixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7O3dHQXREVSxXQUFXOzRGQUFYLFdBQVcsdVVBRlgsQ0FBQyxFQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQzsyRkFFdkYsV0FBVztrQkFYdkIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsNEJBQTRCO29CQUN0QyxJQUFJLEVBQUU7d0JBQ0osV0FBVyxFQUFFLFNBQVM7d0JBQ3RCLFlBQVksRUFBRSxVQUFVO3dCQUN4QixVQUFVLEVBQUUsdUJBQXVCO3dCQUNuQyxTQUFTLEVBQUUsZ0JBQWdCO3dCQUMzQixRQUFRLEVBQUUsaUJBQWlCO3FCQUM1QjtvQkFDRCxTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUM7aUJBQ25HO3FJQVNVLFFBQVE7c0JBQWhCLEtBQUs7Z0JBS0csWUFBWTtzQkFBcEIsS0FBSztnQkFLRyxjQUFjO3NCQUF0QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBmb3J3YXJkUmVmLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQge05nYkJ1dHRvbkxhYmVsfSBmcm9tICcuL2xhYmVsJztcclxuXHJcbi8qKlxyXG4gKiBBbGxvd3MgdG8gZWFzaWx5IGNyZWF0ZSBCb290c3RyYXAtc3R5bGUgY2hlY2tib3ggYnV0dG9ucy5cclxuICpcclxuICogSW50ZWdyYXRlcyB3aXRoIGZvcm1zLCBzbyB0aGUgdmFsdWUgb2YgYSBjaGVja2VkIGJ1dHRvbiBpcyBib3VuZCB0byB0aGUgdW5kZXJseWluZyBmb3JtIGNvbnRyb2xcclxuICogZWl0aGVyIGluIGEgcmVhY3RpdmUgb3IgdGVtcGxhdGUtZHJpdmVuIHdheS5cclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW25nYkJ1dHRvbl1bdHlwZT1jaGVja2JveF0nLFxyXG4gIGhvc3Q6IHtcclxuICAgICdbY2hlY2tlZF0nOiAnY2hlY2tlZCcsXHJcbiAgICAnW2Rpc2FibGVkXSc6ICdkaXNhYmxlZCcsXHJcbiAgICAnKGNoYW5nZSknOiAnb25JbnB1dENoYW5nZSgkZXZlbnQpJyxcclxuICAgICcoZm9jdXMpJzogJ2ZvY3VzZWQgPSB0cnVlJyxcclxuICAgICcoYmx1ciknOiAnZm9jdXNlZCA9IGZhbHNlJ1xyXG4gIH0sXHJcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JDaGVja0JveCksIG11bHRpOiB0cnVlfV1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYkNoZWNrQm94IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogYm9vbGVhbiB8ICcnO1xyXG5cclxuICBjaGVja2VkO1xyXG5cclxuICAvKipcclxuICAgKiBJZiBgdHJ1ZWAsIHRoZSBjaGVja2JveCBidXR0b24gd2lsbCBiZSBkaXNhYmxlZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBmb3JtIGNvbnRyb2wgdmFsdWUgd2hlbiB0aGUgY2hlY2tib3ggaXMgY2hlY2tlZC5cclxuICAgKi9cclxuICBASW5wdXQoKSB2YWx1ZUNoZWNrZWQgPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZm9ybSBjb250cm9sIHZhbHVlIHdoZW4gdGhlIGNoZWNrYm94IGlzIHVuY2hlY2tlZC5cclxuICAgKi9cclxuICBASW5wdXQoKSB2YWx1ZVVuQ2hlY2tlZCA9IGZhbHNlO1xyXG5cclxuICBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xyXG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xyXG5cclxuICBzZXQgZm9jdXNlZChpc0ZvY3VzZWQ6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2xhYmVsLmZvY3VzZWQgPSBpc0ZvY3VzZWQ7XHJcbiAgICBpZiAoIWlzRm9jdXNlZCkge1xyXG4gICAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbGFiZWw6IE5nYkJ1dHRvbkxhYmVsLCBwcml2YXRlIF9jZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XHJcblxyXG4gIG9uSW5wdXRDaGFuZ2UoJGV2ZW50KSB7XHJcbiAgICBjb25zdCBtb2RlbFRvUHJvcGFnYXRlID0gJGV2ZW50LnRhcmdldC5jaGVja2VkID8gdGhpcy52YWx1ZUNoZWNrZWQgOiB0aGlzLnZhbHVlVW5DaGVja2VkO1xyXG4gICAgdGhpcy5vbkNoYW5nZShtb2RlbFRvUHJvcGFnYXRlKTtcclxuICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcbiAgICB0aGlzLndyaXRlVmFsdWUobW9kZWxUb1Byb3BhZ2F0ZSk7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KTogdm9pZCB7IHRoaXMub25DaGFuZ2UgPSBmbjsgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gYW55KTogdm9pZCB7IHRoaXMub25Ub3VjaGVkID0gZm47IH1cclxuXHJcbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICAgIHRoaXMuX2xhYmVsLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWUpIHtcclxuICAgIHRoaXMuY2hlY2tlZCA9IHZhbHVlID09PSB0aGlzLnZhbHVlQ2hlY2tlZDtcclxuICAgIHRoaXMuX2xhYmVsLmFjdGl2ZSA9IHRoaXMuY2hlY2tlZDtcclxuXHJcbiAgICAvLyBsYWJlbCB3b24ndCBiZSB1cGRhdGVkLCBpZiBpdCBpcyBpbnNpZGUgdGhlIE9uUHVzaCBjb21wb25lbnQgd2hlbiBbbmdNb2RlbF0gY2hhbmdlc1xyXG4gICAgdGhpcy5fY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==