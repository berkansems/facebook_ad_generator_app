import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "./label";
let nextId = 0;
/**
 * Allows to easily create Bootstrap-style radio buttons.
 *
 * Integrates with forms, so the value of a checked button is bound to the underlying form control
 * either in a reactive or template-driven way.
 */
export class NgbRadioGroup {
    constructor() {
        this._radios = new Set();
        this._value = null;
        /**
         * Name of the radio group applied to radio input elements.
         *
         * Will be applied to all radio input elements inside the group,
         * unless [`NgbRadio`](#/components/buttons/api#NgbRadio)'s specify names themselves.
         *
         * If not provided, will be generated in the `ngb-radio-xx` format.
         */
        this.name = `ngb-radio-${nextId++}`;
        this.onChange = (_) => { };
        this.onTouched = () => { };
    }
    get disabled() { return this._disabled; }
    set disabled(isDisabled) { this.setDisabledState(isDisabled); }
    onRadioChange(radio) {
        this.writeValue(radio.value);
        this.onChange(radio.value);
    }
    onRadioValueUpdate() { this._updateRadiosValue(); }
    register(radio) { this._radios.add(radio); }
    registerOnChange(fn) { this.onChange = fn; }
    registerOnTouched(fn) { this.onTouched = fn; }
    setDisabledState(isDisabled) {
        this._disabled = isDisabled;
        this._updateRadiosDisabled();
    }
    unregister(radio) { this._radios.delete(radio); }
    writeValue(value) {
        this._value = value;
        this._updateRadiosValue();
    }
    _updateRadiosValue() { this._radios.forEach((radio) => radio.updateValue(this._value)); }
    _updateRadiosDisabled() { this._radios.forEach((radio) => radio.updateDisabled()); }
}
NgbRadioGroup.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbRadioGroup, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NgbRadioGroup.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NgbRadioGroup, selector: "[ngbRadioGroup]", inputs: { name: "name" }, host: { attributes: { "role": "radiogroup" } }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbRadioGroup), multi: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbRadioGroup, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbRadioGroup]',
                    host: { 'role': 'radiogroup' },
                    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbRadioGroup), multi: true }]
                }]
        }], propDecorators: { name: [{
                type: Input
            }] } });
/**
 * A directive that marks an input of type "radio" as a part of the
 * [`NgbRadioGroup`](#/components/buttons/api#NgbRadioGroup).
 */
export class NgbRadio {
    constructor(_group, _label, _renderer, _element, _cd) {
        this._group = _group;
        this._label = _label;
        this._renderer = _renderer;
        this._element = _element;
        this._cd = _cd;
        this._value = null;
        this._group.register(this);
        this.updateDisabled();
    }
    /**
     * The form control value when current radio button is checked.
     */
    set value(value) {
        this._value = value;
        const stringValue = value ? value.toString() : '';
        this._renderer.setProperty(this._element.nativeElement, 'value', stringValue);
        this._group.onRadioValueUpdate();
    }
    /**
     * If `true`, current radio button will be disabled.
     */
    set disabled(isDisabled) {
        this._disabled = isDisabled !== false;
        this.updateDisabled();
    }
    set focused(isFocused) {
        if (this._label) {
            this._label.focused = isFocused;
        }
        if (!isFocused) {
            this._group.onTouched();
        }
    }
    get checked() { return this._checked; }
    get disabled() { return this._group.disabled || this._disabled; }
    get value() { return this._value; }
    get nameAttr() { return this.name || this._group.name; }
    ngOnDestroy() { this._group.unregister(this); }
    onChange() { this._group.onRadioChange(this); }
    updateValue(value) {
        // label won't be updated, if it is inside the OnPush component when [ngModel] changes
        if (this.value !== value) {
            this._cd.markForCheck();
        }
        this._checked = this.value === value;
        this._label.active = this._checked;
    }
    updateDisabled() { this._label.disabled = this.disabled; }
}
NgbRadio.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbRadio, deps: [{ token: NgbRadioGroup }, { token: i1.NgbButtonLabel }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbRadio.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NgbRadio, selector: "[ngbButton][type=radio]", inputs: { name: "name", value: "value", disabled: "disabled" }, host: { listeners: { "change": "onChange()", "focus": "focused = true", "blur": "focused = false" }, properties: { "checked": "checked", "disabled": "disabled", "name": "nameAttr" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbRadio, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbButton][type=radio]',
                    host: {
                        '[checked]': 'checked',
                        '[disabled]': 'disabled',
                        '[name]': 'nameAttr',
                        '(change)': 'onChange()',
                        '(focus)': 'focused = true',
                        '(blur)': 'focused = false'
                    }
                }]
        }], ctorParameters: function () { return [{ type: NgbRadioGroup }, { type: i1.NgbButtonLabel }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { name: [{
                type: Input
            }], value: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYnV0dG9ucy9yYWRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQW9CLFNBQVMsRUFBYyxVQUFVLEVBQUUsS0FBSyxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUNoSCxPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7OztBQUl2RSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFFZjs7Ozs7R0FLRztBQU1ILE1BQU0sT0FBTyxhQUFhO0lBTDFCO1FBTVUsWUFBTyxHQUFrQixJQUFJLEdBQUcsRUFBWSxDQUFDO1FBQzdDLFdBQU0sR0FBRyxJQUFJLENBQUM7UUFNdEI7Ozs7Ozs7V0FPRztRQUNNLFNBQUksR0FBRyxhQUFhLE1BQU0sRUFBRSxFQUFFLENBQUM7UUFFeEMsYUFBUSxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFDMUIsY0FBUyxHQUFHLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztLQTZCdEI7SUEzQ0MsSUFBSSxRQUFRLEtBQUssT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUN6QyxJQUFJLFFBQVEsQ0FBQyxVQUFtQixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFleEUsYUFBYSxDQUFDLEtBQWU7UUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELGtCQUFrQixLQUFLLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUVuRCxRQUFRLENBQUMsS0FBZSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUss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QztJQUVELGNBQWMsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7cUdBekUvQyxRQUFRLGtCQXFEQyxhQUFhO3lGQXJEdEIsUUFBUTsyRkFBUixRQUFRO2tCQVhwQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLElBQUksRUFBRTt3QkFDSixXQUFXLEVBQUUsU0FBUzt3QkFDdEIsWUFBWSxFQUFFLFVBQVU7d0JBQ3hCLFFBQVEsRUFBRSxVQUFVO3dCQUNwQixVQUFVLEVBQUUsWUFBWTt3QkFDeEIsU0FBUyxFQUFFLGdCQUFnQjt3QkFDM0IsUUFBUSxFQUFFLGlCQUFpQjtxQkFDNUI7aUJBQ0Y7MERBc0RxQixhQUFhLHdJQXhDeEIsSUFBSTtzQkFBWixLQUFLO2dCQU1GLEtBQUs7c0JBRFIsS0FBSztnQkFZRixRQUFRO3NCQURYLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIGZvcndhcmRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIFJlbmRlcmVyMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQge05nYkJ1dHRvbkxhYmVsfSBmcm9tICcuL2xhYmVsJztcclxuXHJcbmxldCBuZXh0SWQgPSAwO1xyXG5cclxuLyoqXHJcbiAqIEFsbG93cyB0byBlYXNpbHkgY3JlYXRlIEJvb3RzdHJhcC1zdHlsZSByYWRpbyBidXR0b25zLlxyXG4gKlxyXG4gKiBJbnRlZ3JhdGVzIHdpdGggZm9ybXMsIHNvIHRoZSB2YWx1ZSBvZiBhIGNoZWNrZWQgYnV0dG9uIGlzIGJvdW5kIHRvIHRoZSB1bmRlcmx5aW5nIGZvcm0gY29udHJvbFxyXG4gKiBlaXRoZXIgaW4gYSByZWFjdGl2ZSBvciB0ZW1wbGF0ZS1kcml2ZW4gd2F5LlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbmdiUmFkaW9Hcm91cF0nLFxyXG4gIGhvc3Q6IHsncm9sZSc6ICdyYWRpb2dyb3VwJ30sXHJcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JSYWRpb0dyb3VwKSwgbXVsdGk6IHRydWV9XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiUmFkaW9Hcm91cCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuICBwcml2YXRlIF9yYWRpb3M6IFNldDxOZ2JSYWRpbz4gPSBuZXcgU2V0PE5nYlJhZGlvPigpO1xyXG4gIHByaXZhdGUgX3ZhbHVlID0gbnVsbDtcclxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcclxuXHJcbiAgZ2V0IGRpc2FibGVkKCkgeyByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7IH1cclxuICBzZXQgZGlzYWJsZWQoaXNEaXNhYmxlZDogYm9vbGVhbikgeyB0aGlzLnNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZCk7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogTmFtZSBvZiB0aGUgcmFkaW8gZ3JvdXAgYXBwbGllZCB0byByYWRpbyBpbnB1dCBlbGVtZW50cy5cclxuICAgKlxyXG4gICAqIFdpbGwgYmUgYXBwbGllZCB0byBhbGwgcmFkaW8gaW5wdXQgZWxlbWVudHMgaW5zaWRlIHRoZSBncm91cCxcclxuICAgKiB1bmxlc3MgW2BOZ2JSYWRpb2BdKCMvY29tcG9uZW50cy9idXR0b25zL2FwaSNOZ2JSYWRpbykncyBzcGVjaWZ5IG5hbWVzIHRoZW1zZWx2ZXMuXHJcbiAgICpcclxuICAgKiBJZiBub3QgcHJvdmlkZWQsIHdpbGwgYmUgZ2VuZXJhdGVkIGluIHRoZSBgbmdiLXJhZGlvLXh4YCBmb3JtYXQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbmFtZSA9IGBuZ2ItcmFkaW8tJHtuZXh0SWQrK31gO1xyXG5cclxuICBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xyXG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xyXG5cclxuICBvblJhZGlvQ2hhbmdlKHJhZGlvOiBOZ2JSYWRpbykge1xyXG4gICAgdGhpcy53cml0ZVZhbHVlKHJhZGlvLnZhbHVlKTtcclxuICAgIHRoaXMub25DaGFuZ2UocmFkaW8udmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgb25SYWRpb1ZhbHVlVXBkYXRlKCkgeyB0aGlzLl91cGRhdGVSYWRpb3NWYWx1ZSgpOyB9XHJcblxyXG4gIHJlZ2lzdGVyKHJhZGlvOiBOZ2JSYWRpbykgeyB0aGlzLl9yYWRpb3MuYWRkKHJhZGlvKTsgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KTogdm9pZCB7IHRoaXMub25DaGFuZ2UgPSBmbjsgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gYW55KTogdm9pZCB7IHRoaXMub25Ub3VjaGVkID0gZm47IH1cclxuXHJcbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgICB0aGlzLl91cGRhdGVSYWRpb3NEaXNhYmxlZCgpO1xyXG4gIH1cclxuXHJcbiAgdW5yZWdpc3RlcihyYWRpbzogTmdiUmFkaW8pIHsgdGhpcy5fcmFkaW9zLmRlbGV0ZShyYWRpbyk7IH1cclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZSkge1xyXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgIHRoaXMuX3VwZGF0ZVJhZGlvc1ZhbHVlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF91cGRhdGVSYWRpb3NWYWx1ZSgpIHsgdGhpcy5fcmFkaW9zLmZvckVhY2goKHJhZGlvKSA9PiByYWRpby51cGRhdGVWYWx1ZSh0aGlzLl92YWx1ZSkpOyB9XHJcbiAgcHJpdmF0ZSBfdXBkYXRlUmFkaW9zRGlzYWJsZWQoKSB7IHRoaXMuX3JhZGlvcy5mb3JFYWNoKChyYWRpbykgPT4gcmFkaW8udXBkYXRlRGlzYWJsZWQoKSk7IH1cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IG1hcmtzIGFuIGlucHV0IG9mIHR5cGUgXCJyYWRpb1wiIGFzIGEgcGFydCBvZiB0aGVcclxuICogW2BOZ2JSYWRpb0dyb3VwYF0oIy9jb21wb25lbnRzL2J1dHRvbnMvYXBpI05nYlJhZGlvR3JvdXApLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbmdiQnV0dG9uXVt0eXBlPXJhZGlvXScsXHJcbiAgaG9zdDoge1xyXG4gICAgJ1tjaGVja2VkXSc6ICdjaGVja2VkJyxcclxuICAgICdbZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcclxuICAgICdbbmFtZV0nOiAnbmFtZUF0dHInLFxyXG4gICAgJyhjaGFuZ2UpJzogJ29uQ2hhbmdlKCknLFxyXG4gICAgJyhmb2N1cyknOiAnZm9jdXNlZCA9IHRydWUnLFxyXG4gICAgJyhibHVyKSc6ICdmb2N1c2VkID0gZmFsc2UnXHJcbiAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiUmFkaW8gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogYm9vbGVhbiB8ICcnO1xyXG5cclxuICBwcml2YXRlIF9jaGVja2VkOiBib29sZWFuO1xyXG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xyXG4gIHByaXZhdGUgX3ZhbHVlOiBhbnkgPSBudWxsO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgdmFsdWUgZm9yIHRoZSAnbmFtZScgcHJvcGVydHkgb2YgdGhlIGlucHV0IGVsZW1lbnQuXHJcbiAgICpcclxuICAgKiBBbGwgaW5wdXRzIG9mIHRoZSByYWRpbyBncm91cCBzaG91bGQgaGF2ZSB0aGUgc2FtZSBuYW1lLiBJZiBub3Qgc3BlY2lmaWVkLFxyXG4gICAqIHRoZSBuYW1lIG9mIHRoZSBlbmNsb3NpbmcgZ3JvdXAgaXMgdXNlZC5cclxuICAgKi9cclxuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBmb3JtIGNvbnRyb2wgdmFsdWUgd2hlbiBjdXJyZW50IHJhZGlvIGJ1dHRvbiBpcyBjaGVja2VkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICBjb25zdCBzdHJpbmdWYWx1ZSA9IHZhbHVlID8gdmFsdWUudG9TdHJpbmcoKSA6ICcnO1xyXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCBzdHJpbmdWYWx1ZSk7XHJcbiAgICB0aGlzLl9ncm91cC5vblJhZGlvVmFsdWVVcGRhdGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIGB0cnVlYCwgY3VycmVudCByYWRpbyBidXR0b24gd2lsbCBiZSBkaXNhYmxlZC5cclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBkaXNhYmxlZChpc0Rpc2FibGVkOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGlzRGlzYWJsZWQgIT09IGZhbHNlO1xyXG4gICAgdGhpcy51cGRhdGVEaXNhYmxlZCgpO1xyXG4gIH1cclxuXHJcbiAgc2V0IGZvY3VzZWQoaXNGb2N1c2VkOiBib29sZWFuKSB7XHJcbiAgICBpZiAodGhpcy5fbGFiZWwpIHtcclxuICAgICAgdGhpcy5fbGFiZWwuZm9jdXNlZCA9IGlzRm9jdXNlZDtcclxuICAgIH1cclxuICAgIGlmICghaXNGb2N1c2VkKSB7XHJcbiAgICAgIHRoaXMuX2dyb3VwLm9uVG91Y2hlZCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IGNoZWNrZWQoKSB7IHJldHVybiB0aGlzLl9jaGVja2VkOyB9XHJcblxyXG4gIGdldCBkaXNhYmxlZCgpIHsgcmV0dXJuIHRoaXMuX2dyb3VwLmRpc2FibGVkIHx8IHRoaXMuX2Rpc2FibGVkOyB9XHJcblxyXG4gIGdldCB2YWx1ZSgpIHsgcmV0dXJuIHRoaXMuX3ZhbHVlOyB9XHJcblxyXG4gIGdldCBuYW1lQXR0cigpIHsgcmV0dXJuIHRoaXMubmFtZSB8fCB0aGlzLl9ncm91cC5uYW1lOyB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIF9ncm91cDogTmdiUmFkaW9Hcm91cCwgcHJpdmF0ZSBfbGFiZWw6IE5nYkJ1dHRvbkxhYmVsLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgICBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+LCBwcml2YXRlIF9jZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcclxuICAgIHRoaXMuX2dyb3VwLnJlZ2lzdGVyKHRoaXMpO1xyXG4gICAgdGhpcy51cGRhdGVEaXNhYmxlZCgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7IHRoaXMuX2dyb3VwLnVucmVnaXN0ZXIodGhpcyk7IH1cclxuXHJcbiAgb25DaGFuZ2UoKSB7IHRoaXMuX2dyb3VwLm9uUmFkaW9DaGFuZ2UodGhpcyk7IH1cclxuXHJcbiAgdXBkYXRlVmFsdWUodmFsdWUpIHtcclxuICAgIC8vIGxhYmVsIHdvbid0IGJlIHVwZGF0ZWQsIGlmIGl0IGlzIGluc2lkZSB0aGUgT25QdXNoIGNvbXBvbmVudCB3aGVuIFtuZ01vZGVsXSBjaGFuZ2VzXHJcbiAgICBpZiAodGhpcy52YWx1ZSAhPT0gdmFsdWUpIHtcclxuICAgICAgdGhpcy5fY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fY2hlY2tlZCA9IHRoaXMudmFsdWUgPT09IHZhbHVlO1xyXG4gICAgdGhpcy5fbGFiZWwuYWN0aXZlID0gdGhpcy5fY2hlY2tlZDtcclxuICB9XHJcblxyXG4gIHVwZGF0ZURpc2FibGVkKCkgeyB0aGlzLl9sYWJlbC5kaXNhYmxlZCA9IHRoaXMuZGlzYWJsZWQ7IH1cclxufVxyXG4iXX0=