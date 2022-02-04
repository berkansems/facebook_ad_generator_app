import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, HostBinding } from '@angular/core';
import { getValueInRange, isNumber } from '../util/util';
import * as i0 from "@angular/core";
import * as i1 from "./progressbar-config";
import * as i2 from "@angular/common";
/**
 * A directive that provides feedback on the progress of a workflow or an action.
 */
export class NgbProgressbar {
    constructor(config) {
        /**
         * The current value for the progress bar.
         *
         * Should be in the `[0, max]` range.
         */
        this.value = 0;
        this.max = config.max;
        this.animated = config.animated;
        this.striped = config.striped;
        this.textType = config.textType;
        this.type = config.type;
        this.showValue = config.showValue;
        this.height = config.height;
    }
    /**
     * The maximal value to be displayed in the progress bar.
     *
     * Should be a positive number. Will default to 100 otherwise.
     */
    set max(max) {
        this._max = !isNumber(max) || max <= 0 ? 100 : max;
    }
    get max() { return this._max; }
    getValue() { return getValueInRange(this.value, this.max); }
    getPercentValue() { return 100 * this.getValue() / this.max; }
}
NgbProgressbar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbProgressbar, deps: [{ token: i1.NgbProgressbarConfig }], target: i0.ɵɵFactoryTarget.Component });
NgbProgressbar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: NgbProgressbar, selector: "ngb-progressbar", inputs: { max: "max", animated: "animated", striped: "striped", showValue: "showValue", textType: "textType", type: "type", value: "value", height: "height" }, host: { properties: { "style.height": "this.height" }, classAttribute: "progress" }, ngImport: i0, template: `
    <div class="progress-bar{{type ? ' bg-' + type : ''}}{{textType ? ' text-' + textType : ''}}
    {{animated ? ' progress-bar-animated' : ''}}{{striped ? ' progress-bar-striped' : ''}}"
    role="progressbar" [style.width.%]="getPercentValue()"
    [attr.aria-valuenow]="getValue()" aria-valuemin="0" [attr.aria-valuemax]="max">
      <span *ngIf="showValue" i18n="@@ngb.progressbar.value">{{getValue() / max | percent}}</span><ng-content></ng-content>
    </div>
  `, isInline: true, directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "percent": i2.PercentPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbProgressbar, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-progressbar',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: { class: 'progress' },
                    template: `
    <div class="progress-bar{{type ? ' bg-' + type : ''}}{{textType ? ' text-' + textType : ''}}
    {{animated ? ' progress-bar-animated' : ''}}{{striped ? ' progress-bar-striped' : ''}}"
    role="progressbar" [style.width.%]="getPercentValue()"
    [attr.aria-valuenow]="getValue()" aria-valuemin="0" [attr.aria-valuemax]="max">
      <span *ngIf="showValue" i18n="@@ngb.progressbar.value">{{getValue() / max | percent}}</span><ng-content></ng-content>
    </div>
  `
                }]
        }], ctorParameters: function () { return [{ type: i1.NgbProgressbarConfig }]; }, propDecorators: { max: [{
                type: Input
            }], animated: [{
                type: Input
            }], striped: [{
                type: Input
            }], showValue: [{
                type: Input
            }], textType: [{
                type: Input
            }], type: [{
                type: Input
            }], value: [{
                type: Input
            }], height: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['style.height']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NiYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcHJvZ3Jlc3NiYXIvcHJvZ3Jlc3NiYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hHLE9BQU8sRUFBQyxlQUFlLEVBQUUsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDOzs7O0FBR3ZEOztHQUVHO0FBZUgsTUFBTSxPQUFPLGNBQWM7SUFnRXpCLFlBQVksTUFBNEI7UUFkeEM7Ozs7V0FJRztRQUNNLFVBQUssR0FBRyxDQUFDLENBQUM7UUFVakIsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQzlCLENBQUM7SUFyRUQ7Ozs7T0FJRztJQUNILElBQ0ksR0FBRyxDQUFDLEdBQVc7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUNyRCxDQUFDO0lBRUQsSUFBSSxHQUFHLEtBQWEsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQTZEdkMsUUFBUSxLQUFLLE9BQU8sZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUU1RCxlQUFlLEtBQUssT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOzsyR0E1RW5ELGNBQWM7K0ZBQWQsY0FBYyw0U0FUZjs7Ozs7OztHQU9UOzJGQUVVLGNBQWM7a0JBZDFCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxJQUFJLEVBQUUsRUFBQyxLQUFLLEVBQUUsVUFBVSxFQUFDO29CQUN6QixRQUFRLEVBQUU7Ozs7Ozs7R0FPVDtpQkFDRjsyR0FVSyxHQUFHO3NCQUROLEtBQUs7Z0JBWUcsUUFBUTtzQkFBaEIsS0FBSztnQkFLRyxPQUFPO3NCQUFmLEtBQUs7Z0JBS0csU0FBUztzQkFBakIsS0FBSztnQkFVRyxRQUFRO3NCQUFoQixLQUFLO2dCQVFHLElBQUk7c0JBQVosS0FBSztnQkFPRyxLQUFLO3NCQUFiLEtBQUs7Z0JBT2dDLE1BQU07c0JBQTNDLEtBQUs7O3NCQUFJLFdBQVc7dUJBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBIb3N0QmluZGluZ30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Z2V0VmFsdWVJblJhbmdlLCBpc051bWJlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcclxuaW1wb3J0IHtOZ2JQcm9ncmVzc2JhckNvbmZpZ30gZnJvbSAnLi9wcm9ncmVzc2Jhci1jb25maWcnO1xyXG5cclxuLyoqXHJcbiAqIEEgZGlyZWN0aXZlIHRoYXQgcHJvdmlkZXMgZmVlZGJhY2sgb24gdGhlIHByb2dyZXNzIG9mIGEgd29ya2Zsb3cgb3IgYW4gYWN0aW9uLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ2ItcHJvZ3Jlc3NiYXInLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgaG9zdDoge2NsYXNzOiAncHJvZ3Jlc3MnfSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cInByb2dyZXNzLWJhcnt7dHlwZSA/ICcgYmctJyArIHR5cGUgOiAnJ319e3t0ZXh0VHlwZSA/ICcgdGV4dC0nICsgdGV4dFR5cGUgOiAnJ319XHJcbiAgICB7e2FuaW1hdGVkID8gJyBwcm9ncmVzcy1iYXItYW5pbWF0ZWQnIDogJyd9fXt7c3RyaXBlZCA/ICcgcHJvZ3Jlc3MtYmFyLXN0cmlwZWQnIDogJyd9fVwiXHJcbiAgICByb2xlPVwicHJvZ3Jlc3NiYXJcIiBbc3R5bGUud2lkdGguJV09XCJnZXRQZXJjZW50VmFsdWUoKVwiXHJcbiAgICBbYXR0ci5hcmlhLXZhbHVlbm93XT1cImdldFZhbHVlKClcIiBhcmlhLXZhbHVlbWluPVwiMFwiIFthdHRyLmFyaWEtdmFsdWVtYXhdPVwibWF4XCI+XHJcbiAgICAgIDxzcGFuICpuZ0lmPVwic2hvd1ZhbHVlXCIgaTE4bj1cIkBAbmdiLnByb2dyZXNzYmFyLnZhbHVlXCI+e3tnZXRWYWx1ZSgpIC8gbWF4IHwgcGVyY2VudH19PC9zcGFuPjxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgIDwvZGl2PlxyXG4gIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYlByb2dyZXNzYmFyIHtcclxuICBwcml2YXRlIF9tYXg6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG1heGltYWwgdmFsdWUgdG8gYmUgZGlzcGxheWVkIGluIHRoZSBwcm9ncmVzcyBiYXIuXHJcbiAgICpcclxuICAgKiBTaG91bGQgYmUgYSBwb3NpdGl2ZSBudW1iZXIuIFdpbGwgZGVmYXVsdCB0byAxMDAgb3RoZXJ3aXNlLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IG1heChtYXg6IG51bWJlcikge1xyXG4gICAgdGhpcy5fbWF4ID0gIWlzTnVtYmVyKG1heCkgfHwgbWF4IDw9IDAgPyAxMDAgOiBtYXg7XHJcbiAgfVxyXG5cclxuICBnZXQgbWF4KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9tYXg7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogSWYgYHRydWVgLCB0aGUgc3RyaXBlcyBvbiB0aGUgcHJvZ3Jlc3MgYmFyIGFyZSBhbmltYXRlZC5cclxuICAgKlxyXG4gICAqIFRha2VzIGVmZmVjdCBvbmx5IGZvciBicm93c2VycyBzdXBwb3J0aW5nIENTUzMgYW5pbWF0aW9ucywgYW5kIGlmIGBzdHJpcGVkYCBpcyBgdHJ1ZWAuXHJcbiAgICovXHJcbiAgQElucHV0KCkgYW5pbWF0ZWQ6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIGB0cnVlYCwgdGhlIHByb2dyZXNzIGJhcnMgd2lsbCBiZSBkaXNwbGF5ZWQgYXMgc3RyaXBlZC5cclxuICAgKi9cclxuICBASW5wdXQoKSBzdHJpcGVkOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBJZiBgdHJ1ZWAsIHRoZSBjdXJyZW50IHBlcmNlbnRhZ2Ugd2lsbCBiZSBzaG93biBpbiB0aGUgYHh4JWAgZm9ybWF0LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNob3dWYWx1ZTogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogT3B0aW9uYWwgdGV4dCB2YXJpYW50IHR5cGUgb2YgdGhlIHByb2dyZXNzIGJhci5cclxuICAgKlxyXG4gICAqIFN1cHBvcnRzIHR5cGVzIGJhc2VkIG9uIEJvb3RzdHJhcCBiYWNrZ3JvdW5kIGNvbG9yIHZhcmlhbnRzLCBsaWtlOlxyXG4gICAqICBgXCJzdWNjZXNzXCJgLCBgXCJpbmZvXCJgLCBgXCJ3YXJuaW5nXCJgLCBgXCJkYW5nZXJcImAsIGBcInByaW1hcnlcImAsIGBcInNlY29uZGFyeVwiYCwgYFwiZGFya1wiYCBhbmQgc28gb24uXHJcbiAgICpcclxuICAgKiBAc2luY2UgNS4yLjBcclxuICAgKi9cclxuICBASW5wdXQoKSB0ZXh0VHlwZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgdHlwZSBvZiB0aGUgcHJvZ3Jlc3MgYmFyLlxyXG4gICAqXHJcbiAgICogU3VwcG9ydHMgdHlwZXMgYmFzZWQgb24gQm9vdHN0cmFwIGJhY2tncm91bmQgY29sb3IgdmFyaWFudHMsIGxpa2U6XHJcbiAgICogIGBcInN1Y2Nlc3NcImAsIGBcImluZm9cImAsIGBcIndhcm5pbmdcImAsIGBcImRhbmdlclwiYCwgYFwicHJpbWFyeVwiYCwgYFwic2Vjb25kYXJ5XCJgLCBgXCJkYXJrXCJgIGFuZCBzbyBvbi5cclxuICAgKi9cclxuICBASW5wdXQoKSB0eXBlOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjdXJyZW50IHZhbHVlIGZvciB0aGUgcHJvZ3Jlc3MgYmFyLlxyXG4gICAqXHJcbiAgICogU2hvdWxkIGJlIGluIHRoZSBgWzAsIG1heF1gIHJhbmdlLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHZhbHVlID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGhlaWdodCBvZiB0aGUgcHJvZ3Jlc3MgYmFyLlxyXG4gICAqXHJcbiAgICogQWNjZXB0cyBhbnkgdmFsaWQgQ1NTIGhlaWdodCB2YWx1ZXMsIGV4LiBgXCIycmVtXCJgXHJcbiAgICovXHJcbiAgQElucHV0KCkgQEhvc3RCaW5kaW5nKCdzdHlsZS5oZWlnaHQnKSBoZWlnaHQ6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoY29uZmlnOiBOZ2JQcm9ncmVzc2JhckNvbmZpZykge1xyXG4gICAgdGhpcy5tYXggPSBjb25maWcubWF4O1xyXG4gICAgdGhpcy5hbmltYXRlZCA9IGNvbmZpZy5hbmltYXRlZDtcclxuICAgIHRoaXMuc3RyaXBlZCA9IGNvbmZpZy5zdHJpcGVkO1xyXG4gICAgdGhpcy50ZXh0VHlwZSA9IGNvbmZpZy50ZXh0VHlwZTtcclxuICAgIHRoaXMudHlwZSA9IGNvbmZpZy50eXBlO1xyXG4gICAgdGhpcy5zaG93VmFsdWUgPSBjb25maWcuc2hvd1ZhbHVlO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBjb25maWcuaGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgZ2V0VmFsdWUoKSB7IHJldHVybiBnZXRWYWx1ZUluUmFuZ2UodGhpcy52YWx1ZSwgdGhpcy5tYXgpOyB9XHJcblxyXG4gIGdldFBlcmNlbnRWYWx1ZSgpIHsgcmV0dXJuIDEwMCAqIHRoaXMuZ2V0VmFsdWUoKSAvIHRoaXMubWF4OyB9XHJcbn1cclxuIl19