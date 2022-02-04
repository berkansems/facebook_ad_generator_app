import { ChangeDetectionStrategy, Component, Directive, Input, ViewChildren, ViewEncapsulation } from '@angular/core';
import { distinctUntilChanged, skip, startWith, takeUntil } from 'rxjs/operators';
import { ngbNavFadeInTransition, ngbNavFadeOutTransition } from './nav-transition';
import { ngbRunTransition } from '../util/transition/ngbTransition';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class NgbNavPane {
    constructor(elRef) {
        this.elRef = elRef;
    }
}
NgbNavPane.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbNavPane, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbNavPane.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NgbNavPane, selector: "[ngbNavPane]", inputs: { item: "item", nav: "nav", role: "role" }, host: { properties: { "id": "item.panelDomId", "class.fade": "nav.animation", "attr.role": "role ? role : nav.roles ? \"tabpanel\" : undefined", "attr.aria-labelledby": "item.domId" }, classAttribute: "tab-pane" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbNavPane, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbNavPane]',
                    host: {
                        '[id]': 'item.panelDomId',
                        'class': 'tab-pane',
                        '[class.fade]': 'nav.animation',
                        '[attr.role]': 'role ? role : nav.roles ? "tabpanel" : undefined',
                        '[attr.aria-labelledby]': 'item.domId'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { item: [{
                type: Input
            }], nav: [{
                type: Input
            }], role: [{
                type: Input
            }] } });
/**
 * The outlet where currently active nav content will be displayed.
 *
 * @since 5.2.0
 */
export class NgbNavOutlet {
    constructor(_cd, _ngZone) {
        this._cd = _cd;
        this._ngZone = _ngZone;
        this._activePane = null;
    }
    isPanelTransitioning(item) { return this._activePane?.item === item; }
    ngAfterViewInit() {
        // initial display
        this._updateActivePane();
        // this will be emitted for all 3 types of nav changes: .select(), [activeId] or (click)
        this.nav.navItemChange$
            .pipe(takeUntil(this.nav.destroy$), startWith(this._activePane?.item || null), distinctUntilChanged(), skip(1))
            .subscribe(nextItem => {
            const options = { animation: this.nav.animation, runningTransition: 'stop' };
            // next panel we're switching to will only appear in DOM after the change detection is done
            // and `this._panes` will be updated
            this._cd.detectChanges();
            // fading out
            if (this._activePane) {
                ngbRunTransition(this._ngZone, this._activePane.elRef.nativeElement, ngbNavFadeOutTransition, options)
                    .subscribe(() => {
                    const activeItem = this._activePane?.item;
                    this._activePane = this._getPaneForItem(nextItem);
                    // mark for check when transition finishes as outlet or parent containers might be OnPush
                    // without this the panes that have "faded out" will stay in DOM
                    this._cd.markForCheck();
                    // fading in
                    if (this._activePane) {
                        // we have to add the '.active' class before running the transition,
                        // because it should be in place before `ngbRunTransition` does `reflow()`
                        this._activePane.elRef.nativeElement.classList.add('active');
                        ngbRunTransition(this._ngZone, this._activePane.elRef.nativeElement, ngbNavFadeInTransition, options)
                            .subscribe(() => {
                            if (nextItem) {
                                nextItem.shown.emit();
                                this.nav.shown.emit(nextItem.id);
                            }
                        });
                    }
                    if (activeItem) {
                        activeItem.hidden.emit();
                        this.nav.hidden.emit(activeItem.id);
                    }
                });
            }
            else {
                this._updateActivePane();
            }
        });
    }
    _updateActivePane() {
        this._activePane = this._getActivePane();
        this._activePane?.elRef.nativeElement.classList.add('show');
        this._activePane?.elRef.nativeElement.classList.add('active');
    }
    _getPaneForItem(item) {
        return this._panes && this._panes.find(pane => pane.item === item) || null;
    }
    _getActivePane() {
        return this._panes && this._panes.find(pane => pane.item.active) || null;
    }
}
NgbNavOutlet.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbNavOutlet, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
NgbNavOutlet.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: NgbNavOutlet, selector: "[ngbNavOutlet]", inputs: { paneRole: "paneRole", nav: ["ngbNavOutlet", "nav"] }, host: { properties: { "class.tab-content": "true" } }, viewQueries: [{ propertyName: "_panes", predicate: NgbNavPane, descendants: true }], ngImport: i0, template: `
    <ng-template ngFor let-item [ngForOf]="nav.items">
      <div ngbNavPane *ngIf="item.isPanelInDom() || isPanelTransitioning(item)" [item]="item" [nav]="nav" [role]="paneRole">
        <ng-template [ngTemplateOutlet]="item.contentTpl?.templateRef || null"
                     [ngTemplateOutletContext]="{$implicit: item.active || isPanelTransitioning(item)}"></ng-template>
      </div>
    </ng-template>
  `, isInline: true, directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: NgbNavPane, selector: "[ngbNavPane]", inputs: ["item", "nav", "role"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbNavOutlet, decorators: [{
            type: Component,
            args: [{
                    selector: '[ngbNavOutlet]',
                    host: { '[class.tab-content]': 'true' },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <ng-template ngFor let-item [ngForOf]="nav.items">
      <div ngbNavPane *ngIf="item.isPanelInDom() || isPanelTransitioning(item)" [item]="item" [nav]="nav" [role]="paneRole">
        <ng-template [ngTemplateOutlet]="item.contentTpl?.templateRef || null"
                     [ngTemplateOutletContext]="{$implicit: item.active || isPanelTransitioning(item)}"></ng-template>
      </div>
    </ng-template>
  `
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.NgZone }]; }, propDecorators: { _panes: [{
                type: ViewChildren,
                args: [NgbNavPane]
            }], paneRole: [{
                type: Input
            }], nav: [{
                type: Input,
                args: ['ngbNavOutlet']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LW91dGxldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9uYXYvbmF2LW91dGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxTQUFTLEVBRVQsS0FBSyxFQUdMLFlBQVksRUFDWixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLG9CQUFvQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEYsT0FBTyxFQUFDLHNCQUFzQixFQUFFLHVCQUF1QixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDakYsT0FBTyxFQUFDLGdCQUFnQixFQUF1QixNQUFNLGtDQUFrQyxDQUFDOzs7QUFheEYsTUFBTSxPQUFPLFVBQVU7SUFLckIsWUFBbUIsS0FBOEI7UUFBOUIsVUFBSyxHQUFMLEtBQUssQ0FBeUI7SUFBRyxDQUFDOzt1R0FMMUMsVUFBVTsyRkFBVixVQUFVOzJGQUFWLFVBQVU7a0JBVnRCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLElBQUksRUFBRTt3QkFDSixNQUFNLEVBQUUsaUJBQWlCO3dCQUN6QixPQUFPLEVBQUUsVUFBVTt3QkFDbkIsY0FBYyxFQUFFLGVBQWU7d0JBQy9CLGFBQWEsRUFBRSxrREFBa0Q7d0JBQ2pFLHdCQUF3QixFQUFFLFlBQVk7cUJBQ3ZDO2lCQUNGO2lHQUVVLElBQUk7c0JBQVosS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLOztBQUtSOzs7O0dBSUc7QUFlSCxNQUFNLE9BQU8sWUFBWTtJQWV2QixZQUFvQixHQUFzQixFQUFVLE9BQWU7UUFBL0MsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBZDNELGdCQUFXLEdBQXNCLElBQUksQ0FB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UUFBUSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVPLGVBQWUsQ0FBQyxJQUF1QjtRQUM3QyxPQUFPLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQztJQUM3RSxDQUFDO0lBRU8sY0FBYztRQUNwQixPQUFPLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQztJQUMzRSxDQUFDOzt5R0FqRlUsWUFBWTs2RkFBWixZQUFZLHdNQUdULFVBQVUsZ0RBWmQ7Ozs7Ozs7R0FPVCxrT0F6QlUsVUFBVTsyRkEyQlYsWUFBWTtrQkFkeEIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixJQUFJLEVBQUUsRUFBQyxxQkFBcUIsRUFBRSxNQUFNLEVBQUM7b0JBQ3JDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsUUFBUSxFQUFFOzs7Ozs7O0dBT1Q7aUJBQ0Y7NkhBSW1DLE1BQU07c0JBQXZDLFlBQVk7dUJBQUMsVUFBVTtnQkFLZixRQUFRO3NCQUFoQixLQUFLO2dCQUtpQixHQUFHO3NCQUF6QixLQUFLO3VCQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIERpcmVjdGl2ZSxcclxuICBFbGVtZW50UmVmLFxyXG4gIElucHV0LFxyXG4gIE5nWm9uZSxcclxuICBRdWVyeUxpc3QsXHJcbiAgVmlld0NoaWxkcmVuLFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7ZGlzdGluY3RVbnRpbENoYW5nZWQsIHNraXAsIHN0YXJ0V2l0aCwgdGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQge25nYk5hdkZhZGVJblRyYW5zaXRpb24sIG5nYk5hdkZhZGVPdXRUcmFuc2l0aW9ufSBmcm9tICcuL25hdi10cmFuc2l0aW9uJztcclxuaW1wb3J0IHtuZ2JSdW5UcmFuc2l0aW9uLCBOZ2JUcmFuc2l0aW9uT3B0aW9uc30gZnJvbSAnLi4vdXRpbC90cmFuc2l0aW9uL25nYlRyYW5zaXRpb24nO1xyXG5pbXBvcnQge05nYk5hdiwgTmdiTmF2SXRlbX0gZnJvbSAnLi9uYXYnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbmdiTmF2UGFuZV0nLFxyXG4gIGhvc3Q6IHtcclxuICAgICdbaWRdJzogJ2l0ZW0ucGFuZWxEb21JZCcsXHJcbiAgICAnY2xhc3MnOiAndGFiLXBhbmUnLFxyXG4gICAgJ1tjbGFzcy5mYWRlXSc6ICduYXYuYW5pbWF0aW9uJyxcclxuICAgICdbYXR0ci5yb2xlXSc6ICdyb2xlID8gcm9sZSA6IG5hdi5yb2xlcyA/IFwidGFicGFuZWxcIiA6IHVuZGVmaW5lZCcsXHJcbiAgICAnW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XSc6ICdpdGVtLmRvbUlkJ1xyXG4gIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYk5hdlBhbmUge1xyXG4gIEBJbnB1dCgpIGl0ZW06IE5nYk5hdkl0ZW07XHJcbiAgQElucHV0KCkgbmF2OiBOZ2JOYXY7XHJcbiAgQElucHV0KCkgcm9sZTogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7fVxyXG59XHJcblxyXG4vKipcclxuICogVGhlIG91dGxldCB3aGVyZSBjdXJyZW50bHkgYWN0aXZlIG5hdiBjb250ZW50IHdpbGwgYmUgZGlzcGxheWVkLlxyXG4gKlxyXG4gKiBAc2luY2UgNS4yLjBcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnW25nYk5hdk91dGxldF0nLFxyXG4gIGhvc3Q6IHsnW2NsYXNzLnRhYi1jb250ZW50XSc6ICd0cnVlJ30sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1pdGVtIFtuZ0Zvck9mXT1cIm5hdi5pdGVtc1wiPlxyXG4gICAgICA8ZGl2IG5nYk5hdlBhbmUgKm5nSWY9XCJpdGVtLmlzUGFuZWxJbkRvbSgpIHx8IGlzUGFuZWxUcmFuc2l0aW9uaW5nKGl0ZW0pXCIgW2l0ZW1dPVwiaXRlbVwiIFtuYXZdPVwibmF2XCIgW3JvbGVdPVwicGFuZVJvbGVcIj5cclxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiaXRlbS5jb250ZW50VHBsPy50ZW1wbGF0ZVJlZiB8fCBudWxsXCJcclxuICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInskaW1wbGljaXQ6IGl0ZW0uYWN0aXZlIHx8IGlzUGFuZWxUcmFuc2l0aW9uaW5nKGl0ZW0pfVwiPjwvbmctdGVtcGxhdGU+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JOYXZPdXRsZXQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuICBwcml2YXRlIF9hY3RpdmVQYW5lOiBOZ2JOYXZQYW5lIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIEBWaWV3Q2hpbGRyZW4oTmdiTmF2UGFuZSkgcHJpdmF0ZSBfcGFuZXM6IFF1ZXJ5TGlzdDxOZ2JOYXZQYW5lPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSByb2xlIHRvIHNldCBvbiB0aGUgbmF2IHBhbmVcclxuICAgKi9cclxuICBASW5wdXQoKSBwYW5lUm9sZTtcclxuXHJcbiAgLyoqXHJcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBgTmdiTmF2YFxyXG4gICAqL1xyXG4gIEBJbnB1dCgnbmdiTmF2T3V0bGV0JykgbmF2OiBOZ2JOYXY7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUpIHt9XHJcblxyXG4gIGlzUGFuZWxUcmFuc2l0aW9uaW5nKGl0ZW06IE5nYk5hdkl0ZW0pIHsgcmV0dXJuIHRoaXMuX2FjdGl2ZVBhbmUgPy5pdGVtID09PSBpdGVtOyB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIC8vIGluaXRpYWwgZGlzcGxheVxyXG4gICAgdGhpcy5fdXBkYXRlQWN0aXZlUGFuZSgpO1xyXG5cclxuICAgIC8vIHRoaXMgd2lsbCBiZSBlbWl0dGVkIGZvciBhbGwgMyB0eXBlcyBvZiBuYXYgY2hhbmdlczogLnNlbGVjdCgpLCBbYWN0aXZlSWRdIG9yIChjbGljaylcclxuICAgIHRoaXMubmF2Lm5hdkl0ZW1DaGFuZ2UkXHJcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLm5hdi5kZXN0cm95JCksIHN0YXJ0V2l0aCh0aGlzLl9hY3RpdmVQYW5lID8uaXRlbSB8fCBudWxsKSwgZGlzdGluY3RVbnRpbENoYW5nZWQoKSwgc2tpcCgxKSlcclxuICAgICAgLnN1YnNjcmliZShuZXh0SXRlbSA9PiB7XHJcbiAgICAgIGNvbnN0IG9wdGlvbnM6IE5nYlRyYW5zaXRpb25PcHRpb25zPHVuZGVmaW5lZD4gPSB7YW5pbWF0aW9uOiB0aGlzLm5hdi5hbmltYXRpb24sIHJ1bm5pbmdUcmFuc2l0aW9uOiAnc3RvcCd9O1xyXG5cclxuICAgICAgLy8gbmV4dCBwYW5lbCB3ZSdyZSBzd2l0Y2hpbmcgdG8gd2lsbCBvbmx5IGFwcGVhciBpbiBET00gYWZ0ZXIgdGhlIGNoYW5nZSBkZXRlY3Rpb24gaXMgZG9uZVxyXG4gICAgICAvLyBhbmQgYHRoaXMuX3BhbmVzYCB3aWxsIGJlIHVwZGF0ZWRcclxuICAgICAgdGhpcy5fY2QuZGV0ZWN0Q2hhbmdlcygpO1xyXG5cclxuICAgICAgLy8gZmFkaW5nIG91dFxyXG4gICAgICBpZiAodGhpcy5fYWN0aXZlUGFuZSkge1xyXG4gICAgICAgIG5nYlJ1blRyYW5zaXRpb24odGhpcy5fbmdab25lLCB0aGlzLl9hY3RpdmVQYW5lLmVsUmVmLm5hdGl2ZUVsZW1lbnQsIG5nYk5hdkZhZGVPdXRUcmFuc2l0aW9uLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBhY3RpdmVJdGVtID0gdGhpcy5fYWN0aXZlUGFuZSA/Lml0ZW07XHJcbiAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlUGFuZSA9IHRoaXMuX2dldFBhbmVGb3JJdGVtKG5leHRJdGVtKTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gbWFyayBmb3IgY2hlY2sgd2hlbiB0cmFuc2l0aW9uIGZpbmlzaGVzIGFzIG91dGxldCBvciBwYXJlbnQgY29udGFpbmVycyBtaWdodCBiZSBPblB1c2hcclxuICAgICAgICAgICAgICAvLyB3aXRob3V0IHRoaXMgdGhlIHBhbmVzIHRoYXQgaGF2ZSBcImZhZGVkIG91dFwiIHdpbGwgc3RheSBpbiBET01cclxuICAgICAgICAgICAgICB0aGlzLl9jZC5tYXJrRm9yQ2hlY2soKTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gZmFkaW5nIGluXHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZVBhbmUpIHtcclxuICAgICAgICAgICAgICAgIC8vIHdlIGhhdmUgdG8gYWRkIHRoZSAnLmFjdGl2ZScgY2xhc3MgYmVmb3JlIHJ1bm5pbmcgdGhlIHRyYW5zaXRpb24sXHJcbiAgICAgICAgICAgICAgICAvLyBiZWNhdXNlIGl0IHNob3VsZCBiZSBpbiBwbGFjZSBiZWZvcmUgYG5nYlJ1blRyYW5zaXRpb25gIGRvZXMgYHJlZmxvdygpYFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlUGFuZS5lbFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgbmdiUnVuVHJhbnNpdGlvbih0aGlzLl9uZ1pvbmUsIHRoaXMuX2FjdGl2ZVBhbmUuZWxSZWYubmF0aXZlRWxlbWVudCwgbmdiTmF2RmFkZUluVHJhbnNpdGlvbiwgb3B0aW9ucylcclxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0SXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0SXRlbS5zaG93bi5lbWl0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmF2LnNob3duLmVtaXQobmV4dEl0ZW0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgaWYgKGFjdGl2ZUl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUl0ZW0uaGlkZGVuLmVtaXQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubmF2LmhpZGRlbi5lbWl0KGFjdGl2ZUl0ZW0uaWQpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlQWN0aXZlUGFuZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfdXBkYXRlQWN0aXZlUGFuZSgpIHtcclxuICAgIHRoaXMuX2FjdGl2ZVBhbmUgPSB0aGlzLl9nZXRBY3RpdmVQYW5lKCk7XHJcbiAgICB0aGlzLl9hY3RpdmVQYW5lID8uZWxSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICB0aGlzLl9hY3RpdmVQYW5lID8uZWxSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldFBhbmVGb3JJdGVtKGl0ZW06IE5nYk5hdkl0ZW0gfCBudWxsKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcGFuZXMgJiYgdGhpcy5fcGFuZXMuZmluZChwYW5lID0+IHBhbmUuaXRlbSA9PT0gaXRlbSkgfHwgbnVsbDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldEFjdGl2ZVBhbmUoKTogTmdiTmF2UGFuZSB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX3BhbmVzICYmIHRoaXMuX3BhbmVzLmZpbmQocGFuZSA9PiBwYW5lLml0ZW0uYWN0aXZlKSB8fCBudWxsO1xyXG4gIH1cclxufVxyXG4iXX0=