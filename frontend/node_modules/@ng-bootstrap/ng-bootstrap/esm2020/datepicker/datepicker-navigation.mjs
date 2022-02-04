import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { NavigationEvent } from './datepicker-view-model';
import * as i0 from "@angular/core";
import * as i1 from "./datepicker-i18n";
import * as i2 from "./datepicker-navigation-select";
import * as i3 from "@angular/common";
export class NgbDatepickerNavigation {
    constructor(i18n) {
        this.i18n = i18n;
        this.navigation = NavigationEvent;
        this.months = [];
        this.navigate = new EventEmitter();
        this.select = new EventEmitter();
    }
    onClickPrev(event) {
        event.currentTarget.focus();
        this.navigate.emit(this.navigation.PREV);
    }
    onClickNext(event) {
        event.currentTarget.focus();
        this.navigate.emit(this.navigation.NEXT);
    }
}
NgbDatepickerNavigation.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDatepickerNavigation, deps: [{ token: i1.NgbDatepickerI18n }], target: i0.ɵɵFactoryTarget.Component });
NgbDatepickerNavigation.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: NgbDatepickerNavigation, selector: "ngb-datepicker-navigation", inputs: { date: "date", disabled: "disabled", months: "months", showSelect: "showSelect", prevDisabled: "prevDisabled", nextDisabled: "nextDisabled", selectBoxes: "selectBoxes" }, outputs: { navigate: "navigate", select: "select" }, ngImport: i0, template: `
    <div class="ngb-dp-arrow">
      <button type="button" class="btn btn-link ngb-dp-arrow-btn" (click)="onClickPrev($event)" [disabled]="prevDisabled"
              i18n-aria-label="@@ngb.datepicker.previous-month" aria-label="Previous month"
              i18n-title="@@ngb.datepicker.previous-month" title="Previous month">
        <span class="ngb-dp-navigation-chevron"></span>
      </button>
    </div>
    <ngb-datepicker-navigation-select *ngIf="showSelect" class="ngb-dp-navigation-select"
      [date]="date"
      [disabled] = "disabled"
      [months]="selectBoxes.months"
      [years]="selectBoxes.years"
      (select)="select.emit($event)">
    </ngb-datepicker-navigation-select>

    <ng-template *ngIf="!showSelect" ngFor let-month [ngForOf]="months" let-i="index">
      <div class="ngb-dp-arrow" *ngIf="i > 0"></div>
      <div class="ngb-dp-month-name">
        {{ i18n.getMonthLabel(month.firstDate) }}
      </div>
      <div class="ngb-dp-arrow" *ngIf="i !== months.length - 1"></div>
    </ng-template>
    <div class="ngb-dp-arrow right">
      <button type="button" class="btn btn-link ngb-dp-arrow-btn" (click)="onClickNext($event)" [disabled]="nextDisabled"
              i18n-aria-label="@@ngb.datepicker.next-month" aria-label="Next month"
              i18n-title="@@ngb.datepicker.next-month" title="Next month">
        <span class="ngb-dp-navigation-chevron"></span>
      </button>
    </div>
    `, isInline: true, styles: ["ngb-datepicker-navigation{display:flex;align-items:center}.ngb-dp-navigation-chevron{border-style:solid;border-width:.2em .2em 0 0;display:inline-block;width:.75em;height:.75em;margin-left:.25em;margin-right:.15em;transform:rotate(-135deg)}.ngb-dp-arrow{display:flex;flex:1 1 auto;padding-right:0;padding-left:0;margin:0;width:2rem;height:2rem}.ngb-dp-arrow.right{justify-content:flex-end}.ngb-dp-arrow.right .ngb-dp-navigation-chevron{transform:rotate(45deg);margin-left:.15em;margin-right:.25em}.ngb-dp-arrow-btn{padding:0 .25rem;margin:0 .5rem;border:none;background-color:transparent;z-index:1}.ngb-dp-arrow-btn:focus{outline-width:1px;outline-style:auto}@media all and (-ms-high-contrast: none),(-ms-high-contrast: active){.ngb-dp-arrow-btn:focus{outline-style:solid}}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center}.ngb-dp-navigation-select{display:flex;flex:1 1 9rem}\n"], components: [{ type: i2.NgbDatepickerNavigationSelect, selector: "ngb-datepicker-navigation-select", inputs: ["date", "disabled", "months", "years"], outputs: ["select"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDatepickerNavigation, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-datepicker-navigation', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: `
    <div class="ngb-dp-arrow">
      <button type="button" class="btn btn-link ngb-dp-arrow-btn" (click)="onClickPrev($event)" [disabled]="prevDisabled"
              i18n-aria-label="@@ngb.datepicker.previous-month" aria-label="Previous month"
              i18n-title="@@ngb.datepicker.previous-month" title="Previous month">
        <span class="ngb-dp-navigation-chevron"></span>
      </button>
    </div>
    <ngb-datepicker-navigation-select *ngIf="showSelect" class="ngb-dp-navigation-select"
      [date]="date"
      [disabled] = "disabled"
      [months]="selectBoxes.months"
      [years]="selectBoxes.years"
      (select)="select.emit($event)">
    </ngb-datepicker-navigation-select>

    <ng-template *ngIf="!showSelect" ngFor let-month [ngForOf]="months" let-i="index">
      <div class="ngb-dp-arrow" *ngIf="i > 0"></div>
      <div class="ngb-dp-month-name">
        {{ i18n.getMonthLabel(month.firstDate) }}
      </div>
      <div class="ngb-dp-arrow" *ngIf="i !== months.length - 1"></div>
    </ng-template>
    <div class="ngb-dp-arrow right">
      <button type="button" class="btn btn-link ngb-dp-arrow-btn" (click)="onClickNext($event)" [disabled]="nextDisabled"
              i18n-aria-label="@@ngb.datepicker.next-month" aria-label="Next month"
              i18n-title="@@ngb.datepicker.next-month" title="Next month">
        <span class="ngb-dp-navigation-chevron"></span>
      </button>
    </div>
    `, styles: ["ngb-datepicker-navigation{display:flex;align-items:center}.ngb-dp-navigation-chevron{border-style:solid;border-width:.2em .2em 0 0;display:inline-block;width:.75em;height:.75em;margin-left:.25em;margin-right:.15em;transform:rotate(-135deg)}.ngb-dp-arrow{display:flex;flex:1 1 auto;padding-right:0;padding-left:0;margin:0;width:2rem;height:2rem}.ngb-dp-arrow.right{justify-content:flex-end}.ngb-dp-arrow.right .ngb-dp-navigation-chevron{transform:rotate(45deg);margin-left:.15em;margin-right:.25em}.ngb-dp-arrow-btn{padding:0 .25rem;margin:0 .5rem;border:none;background-color:transparent;z-index:1}.ngb-dp-arrow-btn:focus{outline-width:1px;outline-style:auto}@media all and (-ms-high-contrast: none),(-ms-high-contrast: active){.ngb-dp-arrow-btn:focus{outline-style:solid}}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center}.ngb-dp-navigation-select{display:flex;flex:1 1 9rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NgbDatepickerI18n }]; }, propDecorators: { date: [{
                type: Input
            }], disabled: [{
                type: Input
            }], months: [{
                type: Input
            }], showSelect: [{
                type: Input
            }], prevDisabled: [{
                type: Input
            }], nextDisabled: [{
                type: Input
            }], selectBoxes: [{
                type: Input
            }], navigate: [{
                type: Output
            }], select: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakgsT0FBTyxFQUFDLGVBQWUsRUFBaUIsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7QUF5Q3hFLE1BQU0sT0FBTyx1QkFBdUI7SUFjbEMsWUFBbUIsSUFBdUI7UUFBdkIsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFiMUMsZUFBVSxHQUFHLGVBQWUsQ0FBQztRQUlwQixXQUFNLEdBQXFCLEVBQUUsQ0FBQztRQU03QixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDL0MsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7SUFFRixDQUFDO0lBRTlDLFdBQVcsQ0FBQyxLQUFpQjtRQUMxQixLQUFLLENBQUMsYUFBNkIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBaUI7UUFDMUIsS0FBSyxDQUFDLGFBQTZCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDOztvSEF4QlUsdUJBQXVCO3dHQUF2Qix1QkFBdUIsMFNBaEN4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBOEJQOzJGQUVRLHVCQUF1QjtrQkFyQ25DLFNBQVM7K0JBQ0UsMkJBQTJCLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJLFlBRTNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0E4QlA7d0dBS00sSUFBSTtzQkFBWixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBRUksUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxNQUFNO3NCQUFmLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge05hdmlnYXRpb25FdmVudCwgTW9udGhWaWV3TW9kZWx9IGZyb20gJy4vZGF0ZXBpY2tlci12aWV3LW1vZGVsJztcclxuaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcclxuaW1wb3J0IHtOZ2JEYXRlcGlja2VySTE4bn0gZnJvbSAnLi9kYXRlcGlja2VyLWkxOG4nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ2ItZGF0ZXBpY2tlci1uYXZpZ2F0aW9uJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIHN0eWxlVXJsczogWycuL2RhdGVwaWNrZXItbmF2aWdhdGlvbi5zY3NzJ10sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJuZ2ItZHAtYXJyb3dcIj5cclxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWxpbmsgbmdiLWRwLWFycm93LWJ0blwiIChjbGljayk9XCJvbkNsaWNrUHJldigkZXZlbnQpXCIgW2Rpc2FibGVkXT1cInByZXZEaXNhYmxlZFwiXHJcbiAgICAgICAgICAgICAgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IuZGF0ZXBpY2tlci5wcmV2aW91cy1tb250aFwiIGFyaWEtbGFiZWw9XCJQcmV2aW91cyBtb250aFwiXHJcbiAgICAgICAgICAgICAgaTE4bi10aXRsZT1cIkBAbmdiLmRhdGVwaWNrZXIucHJldmlvdXMtbW9udGhcIiB0aXRsZT1cIlByZXZpb3VzIG1vbnRoXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJuZ2ItZHAtbmF2aWdhdGlvbi1jaGV2cm9uXCI+PC9zcGFuPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gICAgPG5nYi1kYXRlcGlja2VyLW5hdmlnYXRpb24tc2VsZWN0ICpuZ0lmPVwic2hvd1NlbGVjdFwiIGNsYXNzPVwibmdiLWRwLW5hdmlnYXRpb24tc2VsZWN0XCJcclxuICAgICAgW2RhdGVdPVwiZGF0ZVwiXHJcbiAgICAgIFtkaXNhYmxlZF0gPSBcImRpc2FibGVkXCJcclxuICAgICAgW21vbnRoc109XCJzZWxlY3RCb3hlcy5tb250aHNcIlxyXG4gICAgICBbeWVhcnNdPVwic2VsZWN0Qm94ZXMueWVhcnNcIlxyXG4gICAgICAoc2VsZWN0KT1cInNlbGVjdC5lbWl0KCRldmVudClcIj5cclxuICAgIDwvbmdiLWRhdGVwaWNrZXItbmF2aWdhdGlvbi1zZWxlY3Q+XHJcblxyXG4gICAgPG5nLXRlbXBsYXRlICpuZ0lmPVwiIXNob3dTZWxlY3RcIiBuZ0ZvciBsZXQtbW9udGggW25nRm9yT2ZdPVwibW9udGhzXCIgbGV0LWk9XCJpbmRleFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmdiLWRwLWFycm93XCIgKm5nSWY9XCJpID4gMFwiPjwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmdiLWRwLW1vbnRoLW5hbWVcIj5cclxuICAgICAgICB7eyBpMThuLmdldE1vbnRoTGFiZWwobW9udGguZmlyc3REYXRlKSB9fVxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm5nYi1kcC1hcnJvd1wiICpuZ0lmPVwiaSAhPT0gbW9udGhzLmxlbmd0aCAtIDFcIj48L2Rpdj5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICA8ZGl2IGNsYXNzPVwibmdiLWRwLWFycm93IHJpZ2h0XCI+XHJcbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1saW5rIG5nYi1kcC1hcnJvdy1idG5cIiAoY2xpY2spPVwib25DbGlja05leHQoJGV2ZW50KVwiIFtkaXNhYmxlZF09XCJuZXh0RGlzYWJsZWRcIlxyXG4gICAgICAgICAgICAgIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLmRhdGVwaWNrZXIubmV4dC1tb250aFwiIGFyaWEtbGFiZWw9XCJOZXh0IG1vbnRoXCJcclxuICAgICAgICAgICAgICBpMThuLXRpdGxlPVwiQEBuZ2IuZGF0ZXBpY2tlci5uZXh0LW1vbnRoXCIgdGl0bGU9XCJOZXh0IG1vbnRoXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJuZ2ItZHAtbmF2aWdhdGlvbi1jaGV2cm9uXCI+PC9zcGFuPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gICAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlck5hdmlnYXRpb24ge1xyXG4gIG5hdmlnYXRpb24gPSBOYXZpZ2F0aW9uRXZlbnQ7XHJcblxyXG4gIEBJbnB1dCgpIGRhdGU6IE5nYkRhdGU7XHJcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgbW9udGhzOiBNb250aFZpZXdNb2RlbFtdID0gW107XHJcbiAgQElucHV0KCkgc2hvd1NlbGVjdDogYm9vbGVhbjtcclxuICBASW5wdXQoKSBwcmV2RGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgbmV4dERpc2FibGVkOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHNlbGVjdEJveGVzOiB7eWVhcnM6IG51bWJlcltdLCBtb250aHM6IG51bWJlcltdfTtcclxuXHJcbiAgQE91dHB1dCgpIG5hdmlnYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxOYXZpZ2F0aW9uRXZlbnQ+KCk7XHJcbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiRGF0ZT4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGkxOG46IE5nYkRhdGVwaWNrZXJJMThuKSB7fVxyXG5cclxuICBvbkNsaWNrUHJldihldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgKGV2ZW50LmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQpLmZvY3VzKCk7XHJcbiAgICB0aGlzLm5hdmlnYXRlLmVtaXQodGhpcy5uYXZpZ2F0aW9uLlBSRVYpO1xyXG4gIH1cclxuXHJcbiAgb25DbGlja05leHQoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIChldmVudC5jdXJyZW50VGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5mb2N1cygpO1xyXG4gICAgdGhpcy5uYXZpZ2F0ZS5lbWl0KHRoaXMubmF2aWdhdGlvbi5ORVhUKTtcclxuICB9XHJcbn1cclxuIl19