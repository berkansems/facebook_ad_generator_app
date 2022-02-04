import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { fromEvent, Subject, zip } from 'rxjs';
import { filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { getFocusableBoundaryElements } from '../util/focus-trap';
import { Key } from '../util/key';
import { ModalDismissReasons } from './modal-dismiss-reasons';
import { ngbRunTransition } from '../util/transition/ngbTransition';
import { reflow } from '../util/util';
import * as i0 from "@angular/core";
export class NgbModalWindow {
    constructor(_document, _elRef, _zone) {
        this._document = _document;
        this._elRef = _elRef;
        this._zone = _zone;
        this._closed$ = new Subject();
        this._elWithFocus = null; // element that is focused prior to modal opening
        this.backdrop = true;
        this.keyboard = true;
        this.dismissEvent = new EventEmitter();
        this.shown = new Subject();
        this.hidden = new Subject();
    }
    dismiss(reason) { this.dismissEvent.emit(reason); }
    ngOnInit() {
        this._elWithFocus = this._document.activeElement;
        this._zone.onStable.asObservable().pipe(take(1)).subscribe(() => { this._show(); });
    }
    ngOnDestroy() { this._disableEventHandling(); }
    hide() {
        const { nativeElement } = this._elRef;
        const context = { animation: this.animation, runningTransition: 'stop' };
        const windowTransition$ = ngbRunTransition(this._zone, nativeElement, () => nativeElement.classList.remove('show'), context);
        const dialogTransition$ = ngbRunTransition(this._zone, this._dialogEl.nativeElement, () => { }, context);
        const transitions$ = zip(windowTransition$, dialogTransition$);
        transitions$.subscribe(() => {
            this.hidden.next();
            this.hidden.complete();
        });
        this._disableEventHandling();
        this._restoreFocus();
        return transitions$;
    }
    _show() {
        const context = { animation: this.animation, runningTransition: 'continue' };
        const windowTransition$ = ngbRunTransition(this._zone, this._elRef.nativeElement, (element, animation) => {
            if (animation) {
                reflow(element);
            }
            element.classList.add('show');
        }, context);
        const dialogTransition$ = ngbRunTransition(this._zone, this._dialogEl.nativeElement, () => { }, context);
        zip(windowTransition$, dialogTransition$).subscribe(() => {
            this.shown.next();
            this.shown.complete();
        });
        this._enableEventHandling();
        this._setFocus();
    }
    _enableEventHandling() {
        const { nativeElement } = this._elRef;
        this._zone.runOutsideAngular(() => {
            fromEvent(nativeElement, 'keydown')
                .pipe(takeUntil(this._closed$), 
            /* eslint-disable-next-line deprecation/deprecation */
            filter(e => e.which === Key.Escape))
                .subscribe(event => {
                if (this.keyboard) {
                    requestAnimationFrame(() => {
                        if (!event.defaultPrevented) {
                            this._zone.run(() => this.dismiss(ModalDismissReasons.ESC));
                        }
                    });
                }
                else if (this.backdrop === 'static') {
                    this._bumpBackdrop();
                }
            });
            // We're listening to 'mousedown' and 'mouseup' to prevent modal from closing when pressing the mouse
            // inside the modal dialog and releasing it outside
            let preventClose = false;
            fromEvent(this._dialogEl.nativeElement, 'mousedown')
                .pipe(takeUntil(this._closed$), tap(() => preventClose = false), switchMap(() => fromEvent(nativeElement, 'mouseup').pipe(takeUntil(this._closed$), take(1))), filter(({ target }) => nativeElement === target))
                .subscribe(() => { preventClose = true; });
            // We're listening to 'click' to dismiss modal on modal window click, except when:
            // 1. clicking on modal dialog itself
            // 2. closing was prevented by mousedown/up handlers
            // 3. clicking on scrollbar when the viewport is too small and modal doesn't fit (click is not triggered at all)
            fromEvent(nativeElement, 'click').pipe(takeUntil(this._closed$)).subscribe(({ target }) => {
                if (nativeElement === target) {
                    if (this.backdrop === 'static') {
                        this._bumpBackdrop();
                    }
                    else if (this.backdrop === true && !preventClose) {
                        this._zone.run(() => this.dismiss(ModalDismissReasons.BACKDROP_CLICK));
                    }
                }
                preventClose = false;
            });
        });
    }
    _disableEventHandling() { this._closed$.next(); }
    _setFocus() {
        const { nativeElement } = this._elRef;
        if (!nativeElement.contains(document.activeElement)) {
            const autoFocusable = nativeElement.querySelector(`[ngbAutofocus]`);
            const firstFocusable = getFocusableBoundaryElements(nativeElement)[0];
            const elementToFocus = autoFocusable || firstFocusable || nativeElement;
            elementToFocus.focus();
        }
    }
    _restoreFocus() {
        const body = this._document.body;
        const elWithFocus = this._elWithFocus;
        let elementToFocus;
        if (elWithFocus && elWithFocus['focus'] && body.contains(elWithFocus)) {
            elementToFocus = elWithFocus;
        }
        else {
            elementToFocus = body;
        }
        this._zone.runOutsideAngular(() => {
            setTimeout(() => elementToFocus.focus());
            this._elWithFocus = null;
        });
    }
    _bumpBackdrop() {
        if (this.backdrop === 'static') {
            ngbRunTransition(this._zone, this._elRef.nativeElement, ({ classList }) => {
                classList.add('modal-static');
                return () => classList.remove('modal-static');
            }, { animation: this.animation, runningTransition: 'continue' });
        }
    }
}
NgbModalWindow.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbModalWindow, deps: [{ token: DOCUMENT }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
NgbModalWindow.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: NgbModalWindow, selector: "ngb-modal-window", inputs: { animation: "animation", ariaLabelledBy: "ariaLabelledBy", ariaDescribedBy: "ariaDescribedBy", backdrop: "backdrop", centered: "centered", keyboard: "keyboard", scrollable: "scrollable", size: "size", windowClass: "windowClass", modalDialogClass: "modalDialogClass" }, outputs: { dismissEvent: "dismiss" }, host: { attributes: { "role": "dialog", "tabindex": "-1" }, properties: { "class": "\"modal d-block\" + (windowClass ? \" \" + windowClass : \"\")", "class.fade": "animation", "attr.aria-modal": "true", "attr.aria-labelledby": "ariaLabelledBy", "attr.aria-describedby": "ariaDescribedBy" } }, viewQueries: [{ propertyName: "_dialogEl", first: true, predicate: ["dialog"], descendants: true, static: true }], ngImport: i0, template: `
    <div #dialog [class]="'modal-dialog' + (size ? ' modal-' + size : '') + (centered ? ' modal-dialog-centered' : '') +
     (scrollable ? ' modal-dialog-scrollable' : '') + (modalDialogClass ? ' ' + modalDialogClass : '')" role="document">
        <div class="modal-content"><ng-content></ng-content></div>
    </div>
    `, isInline: true, styles: ["ngb-modal-window .component-host-scrollable{display:flex;flex-direction:column;overflow:hidden}\n"], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbModalWindow, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-modal-window', host: {
                        '[class]': '"modal d-block" + (windowClass ? " " + windowClass : "")',
                        '[class.fade]': 'animation',
                        'role': 'dialog',
                        'tabindex': '-1',
                        '[attr.aria-modal]': 'true',
                        '[attr.aria-labelledby]': 'ariaLabelledBy',
                        '[attr.aria-describedby]': 'ariaDescribedBy'
                    }, template: `
    <div #dialog [class]="'modal-dialog' + (size ? ' modal-' + size : '') + (centered ? ' modal-dialog-centered' : '') +
     (scrollable ? ' modal-dialog-scrollable' : '') + (modalDialogClass ? ' ' + modalDialogClass : '')" role="document">
        <div class="modal-content"><ng-content></ng-content></div>
    </div>
    `, encapsulation: ViewEncapsulation.None, styles: ["ngb-modal-window .component-host-scrollable{display:flex;flex-direction:column;overflow:hidden}\n"] }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ElementRef }, { type: i0.NgZone }]; }, propDecorators: { _dialogEl: [{
                type: ViewChild,
                args: ['dialog', { static: true }]
            }], animation: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], ariaDescribedBy: [{
                type: Input
            }], backdrop: [{
                type: Input
            }], centered: [{
                type: Input
            }], keyboard: [{
                type: Input
            }], scrollable: [{
                type: Input
            }], size: [{
                type: Input
            }], windowClass: [{
                type: Input
            }], modalDialogClass: [{
                type: Input
            }], dismissEvent: [{
                type: Output,
                args: ['dismiss']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtd2luZG93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZGFsL21vZGFsLXdpbmRvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUNMLFNBQVMsRUFFVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFJTCxNQUFNLEVBQ04sU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsU0FBUyxFQUFjLE9BQU8sRUFBRSxHQUFHLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDekQsT0FBTyxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2RSxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzVELE9BQU8sRUFBQyxnQkFBZ0IsRUFBdUIsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sY0FBYyxDQUFDOztBQXNCcEMsTUFBTSxPQUFPLGNBQWM7SUF1QnpCLFlBQzhCLFNBQWMsRUFBVSxNQUErQixFQUFVLEtBQWE7UUFBOUUsY0FBUyxHQUFULFNBQVMsQ0FBSztRQUFVLFdBQU0sR0FBTixNQUFNLENBQXlCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQXRCcEcsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFDL0IsaUJBQVksR0FBbUIsSUFBSSxDQUFDLENBQUUsaURBQWlEO1FBT3RGLGFBQVEsR0FBcUIsSUFBSSxDQUFDO1FBRWxDLGFBQVEsR0FBRyxJQUFJ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QUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUVhLFlBQVk7c0JBQTlCLE1BQU07dUJBQUMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEluamVjdCxcclxuICBJbnB1dCxcclxuICBOZ1pvbmUsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgVmlld0NoaWxkLFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQge2Zyb21FdmVudCwgT2JzZXJ2YWJsZSwgU3ViamVjdCwgemlwfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtmaWx0ZXIsIHN3aXRjaE1hcCwgdGFrZSwgdGFrZVVudGlsLCB0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7Z2V0Rm9jdXNhYmxlQm91bmRhcnlFbGVtZW50c30gZnJvbSAnLi4vdXRpbC9mb2N1cy10cmFwJztcclxuaW1wb3J0IHtLZXl9IGZyb20gJy4uL3V0aWwva2V5JztcclxuaW1wb3J0IHtNb2RhbERpc21pc3NSZWFzb25zfSBmcm9tICcuL21vZGFsLWRpc21pc3MtcmVhc29ucyc7XHJcbmltcG9ydCB7bmdiUnVuVHJhbnNpdGlvbiwgTmdiVHJhbnNpdGlvbk9wdGlvbnN9IGZyb20gJy4uL3V0aWwvdHJhbnNpdGlvbi9uZ2JUcmFuc2l0aW9uJztcclxuaW1wb3J0IHtyZWZsb3d9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nYi1tb2RhbC13aW5kb3cnLFxyXG4gIGhvc3Q6IHtcclxuICAgICdbY2xhc3NdJzogJ1wibW9kYWwgZC1ibG9ja1wiICsgKHdpbmRvd0NsYXNzID8gXCIgXCIgKyB3aW5kb3dDbGFzcyA6IFwiXCIpJyxcclxuICAgICdbY2xhc3MuZmFkZV0nOiAnYW5pbWF0aW9uJyxcclxuICAgICdyb2xlJzogJ2RpYWxvZycsXHJcbiAgICAndGFiaW5kZXgnOiAnLTEnLFxyXG4gICAgJ1thdHRyLmFyaWEtbW9kYWxdJzogJ3RydWUnLFxyXG4gICAgJ1thdHRyLmFyaWEtbGFiZWxsZWRieV0nOiAnYXJpYUxhYmVsbGVkQnknLFxyXG4gICAgJ1thdHRyLmFyaWEtZGVzY3JpYmVkYnldJzogJ2FyaWFEZXNjcmliZWRCeSdcclxuICB9LFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2ICNkaWFsb2cgW2NsYXNzXT1cIidtb2RhbC1kaWFsb2cnICsgKHNpemUgPyAnIG1vZGFsLScgKyBzaXplIDogJycpICsgKGNlbnRlcmVkID8gJyBtb2RhbC1kaWFsb2ctY2VudGVyZWQnIDogJycpICtcclxuICAgICAoc2Nyb2xsYWJsZSA/ICcgbW9kYWwtZGlhbG9nLXNjcm9sbGFibGUnIDogJycpICsgKG1vZGFsRGlhbG9nQ2xhc3MgPyAnICcgKyBtb2RhbERpYWxvZ0NsYXNzIDogJycpXCIgcm9sZT1cImRvY3VtZW50XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBzdHlsZVVybHM6IFsnLi9tb2RhbC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nYk1vZGFsV2luZG93IGltcGxlbWVudHMgT25Jbml0LFxyXG4gICAgT25EZXN0cm95IHtcclxuICBwcml2YXRlIF9jbG9zZWQkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuICBwcml2YXRlIF9lbFdpdGhGb2N1czogRWxlbWVudCB8IG51bGwgPSBudWxsOyAgLy8gZWxlbWVudCB0aGF0IGlzIGZvY3VzZWQgcHJpb3IgdG8gbW9kYWwgb3BlbmluZ1xyXG5cclxuICBAVmlld0NoaWxkKCdkaWFsb2cnLCB7c3RhdGljOiB0cnVlfSkgcHJpdmF0ZSBfZGlhbG9nRWw6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICBASW5wdXQoKSBhbmltYXRpb246IGJvb2xlYW47XHJcbiAgQElucHV0KCkgYXJpYUxhYmVsbGVkQnk6IHN0cmluZztcclxuICBASW5wdXQoKSBhcmlhRGVzY3JpYmVkQnk6IHN0cmluZztcclxuICBASW5wdXQoKSBiYWNrZHJvcDogYm9vbGVhbiB8IHN0cmluZyA9IHRydWU7XHJcbiAgQElucHV0KCkgY2VudGVyZWQ6IHN0cmluZztcclxuICBASW5wdXQoKSBrZXlib2FyZCA9IHRydWU7XHJcbiAgQElucHV0KCkgc2Nyb2xsYWJsZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHNpemU6IHN0cmluZztcclxuICBASW5wdXQoKSB3aW5kb3dDbGFzczogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIG1vZGFsRGlhbG9nQ2xhc3M6IHN0cmluZztcclxuXHJcbiAgQE91dHB1dCgnZGlzbWlzcycpIGRpc21pc3NFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgc2hvd24gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG4gIGhpZGRlbiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LCBwcml2YXRlIF9lbFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge31cclxuXHJcbiAgZGlzbWlzcyhyZWFzb24pOiB2b2lkIHsgdGhpcy5kaXNtaXNzRXZlbnQuZW1pdChyZWFzb24pOyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5fZWxXaXRoRm9jdXMgPSB0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50O1xyXG4gICAgdGhpcy5fem9uZS5vblN0YWJsZS5hc09ic2VydmFibGUoKS5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB7IHRoaXMuX3Nob3coKTsgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHsgdGhpcy5fZGlzYWJsZUV2ZW50SGFuZGxpbmcoKTsgfVxyXG5cclxuICBoaWRlKCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBjb25zdCB7bmF0aXZlRWxlbWVudH0gPSB0aGlzLl9lbFJlZjtcclxuICAgIGNvbnN0IGNvbnRleHQ6IE5nYlRyYW5zaXRpb25PcHRpb25zPGFueT4gPSB7YW5pbWF0aW9uOiB0aGlzLmFuaW1hdGlvbiwgcnVubmluZ1RyYW5zaXRpb246ICdzdG9wJ307XHJcblxyXG4gICAgY29uc3Qgd2luZG93VHJhbnNpdGlvbiQgPVxyXG4gICAgICAgIG5nYlJ1blRyYW5zaXRpb24odGhpcy5fem9uZSwgbmF0aXZlRWxlbWVudCwgKCkgPT4gbmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93JyksIGNvbnRleHQpO1xyXG4gICAgY29uc3QgZGlhbG9nVHJhbnNpdGlvbiQgPSBuZ2JSdW5UcmFuc2l0aW9uKHRoaXMuX3pvbmUsIHRoaXMuX2RpYWxvZ0VsLm5hdGl2ZUVsZW1lbnQsICgpID0+IHt9LCBjb250ZXh0KTtcclxuXHJcbiAgICBjb25zdCB0cmFuc2l0aW9ucyQgPSB6aXAod2luZG93VHJhbnNpdGlvbiQsIGRpYWxvZ1RyYW5zaXRpb24kKTtcclxuICAgIHRyYW5zaXRpb25zJC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLmhpZGRlbi5uZXh0KCk7XHJcbiAgICAgIHRoaXMuaGlkZGVuLmNvbXBsZXRlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLl9kaXNhYmxlRXZlbnRIYW5kbGluZygpO1xyXG4gICAgdGhpcy5fcmVzdG9yZUZvY3VzKCk7XHJcblxyXG4gICAgcmV0dXJuIHRyYW5zaXRpb25zJDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3Nob3coKSB7XHJcbiAgICBjb25zdCBjb250ZXh0OiBOZ2JUcmFuc2l0aW9uT3B0aW9uczxhbnk+ID0ge2FuaW1hdGlvbjogdGhpcy5hbmltYXRpb24sIHJ1bm5pbmdUcmFuc2l0aW9uOiAnY29udGludWUnfTtcclxuXHJcbiAgICBjb25zdCB3aW5kb3dUcmFuc2l0aW9uJCA9XHJcbiAgICAgICAgbmdiUnVuVHJhbnNpdGlvbih0aGlzLl96b25lLCB0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50LCAoZWxlbWVudDogSFRNTEVsZW1lbnQsIGFuaW1hdGlvbjogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgaWYgKGFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICByZWZsb3coZWxlbWVudCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICAgICB9LCBjb250ZXh0KTtcclxuICAgIGNvbnN0IGRpYWxvZ1RyYW5zaXRpb24kID0gbmdiUnVuVHJhbnNpdGlvbih0aGlzLl96b25lLCB0aGlzLl9kaWFsb2dFbC5uYXRpdmVFbGVtZW50LCAoKSA9PiB7fSwgY29udGV4dCk7XHJcblxyXG4gICAgemlwKHdpbmRvd1RyYW5zaXRpb24kLCBkaWFsb2dUcmFuc2l0aW9uJCkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5zaG93bi5uZXh0KCk7XHJcbiAgICAgIHRoaXMuc2hvd24uY29tcGxldGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuX2VuYWJsZUV2ZW50SGFuZGxpbmcoKTtcclxuICAgIHRoaXMuX3NldEZvY3VzKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9lbmFibGVFdmVudEhhbmRsaW5nKCkge1xyXG4gICAgY29uc3Qge25hdGl2ZUVsZW1lbnR9ID0gdGhpcy5fZWxSZWY7XHJcbiAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgZnJvbUV2ZW50PEtleWJvYXJkRXZlbnQ+KG5hdGl2ZUVsZW1lbnQsICdrZXlkb3duJylcclxuICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLl9jbG9zZWQkKSxcclxuICAgICAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZGVwcmVjYXRpb24vZGVwcmVjYXRpb24gKi9cclxuICAgICAgICAgICAgICBmaWx0ZXIoZSA9PiBlLndoaWNoID09PSBLZXkuRXNjYXBlKSlcclxuICAgICAgICAgIC5zdWJzY3JpYmUoZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5rZXlib2FyZCkge1xyXG4gICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4gdGhpcy5kaXNtaXNzKE1vZGFsRGlzbWlzc1JlYXNvbnMuRVNDKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5iYWNrZHJvcCA9PT0gJ3N0YXRpYycpIHtcclxuICAgICAgICAgICAgICB0aGlzLl9idW1wQmFja2Ryb3AoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBXZSdyZSBsaXN0ZW5pbmcgdG8gJ21vdXNlZG93bicgYW5kICdtb3VzZXVwJyB0byBwcmV2ZW50IG1vZGFsIGZyb20gY2xvc2luZyB3aGVuIHByZXNzaW5nIHRoZSBtb3VzZVxyXG4gICAgICAvLyBpbnNpZGUgdGhlIG1vZGFsIGRpYWxvZyBhbmQgcmVsZWFzaW5nIGl0IG91dHNpZGVcclxuICAgICAgbGV0IHByZXZlbnRDbG9zZSA9IGZhbHNlO1xyXG4gICAgICBmcm9tRXZlbnQ8TW91c2VFdmVudD4odGhpcy5fZGlhbG9nRWwubmF0aXZlRWxlbWVudCwgJ21vdXNlZG93bicpXHJcbiAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgICB0YWtlVW50aWwodGhpcy5fY2xvc2VkJCksIHRhcCgoKSA9PiBwcmV2ZW50Q2xvc2UgPSBmYWxzZSksXHJcbiAgICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IGZyb21FdmVudDxNb3VzZUV2ZW50PihuYXRpdmVFbGVtZW50LCAnbW91c2V1cCcpLnBpcGUodGFrZVVudGlsKHRoaXMuX2Nsb3NlZCQpLCB0YWtlKDEpKSksXHJcbiAgICAgICAgICAgICAgZmlsdGVyKCh7dGFyZ2V0fSkgPT4gbmF0aXZlRWxlbWVudCA9PT0gdGFyZ2V0KSlcclxuICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4geyBwcmV2ZW50Q2xvc2UgPSB0cnVlOyB9KTtcclxuXHJcbiAgICAgIC8vIFdlJ3JlIGxpc3RlbmluZyB0byAnY2xpY2snIHRvIGRpc21pc3MgbW9kYWwgb24gbW9kYWwgd2luZG93IGNsaWNrLCBleGNlcHQgd2hlbjpcclxuICAgICAgLy8gMS4gY2xpY2tpbmcgb24gbW9kYWwgZGlhbG9nIGl0c2VsZlxyXG4gICAgICAvLyAyLiBjbG9zaW5nIHdhcyBwcmV2ZW50ZWQgYnkgbW91c2Vkb3duL3VwIGhhbmRsZXJzXHJcbiAgICAgIC8vIDMuIGNsaWNraW5nIG9uIHNjcm9sbGJhciB3aGVuIHRoZSB2aWV3cG9ydCBpcyB0b28gc21hbGwgYW5kIG1vZGFsIGRvZXNuJ3QgZml0IChjbGljayBpcyBub3QgdHJpZ2dlcmVkIGF0IGFsbClcclxuICAgICAgZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KG5hdGl2ZUVsZW1lbnQsICdjbGljaycpLnBpcGUodGFrZVVudGlsKHRoaXMuX2Nsb3NlZCQpKS5zdWJzY3JpYmUoKHt0YXJnZXR9KSA9PiB7XHJcbiAgICAgICAgaWYgKG5hdGl2ZUVsZW1lbnQgPT09IHRhcmdldCkge1xyXG4gICAgICAgICAgaWYgKHRoaXMuYmFja2Ryb3AgPT09ICdzdGF0aWMnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1bXBCYWNrZHJvcCgpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJhY2tkcm9wID09PSB0cnVlICYmICFwcmV2ZW50Q2xvc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4gdGhpcy5kaXNtaXNzKE1vZGFsRGlzbWlzc1JlYXNvbnMuQkFDS0RST1BfQ0xJQ0spKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByZXZlbnRDbG9zZSA9IGZhbHNlO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZGlzYWJsZUV2ZW50SGFuZGxpbmcoKSB7IHRoaXMuX2Nsb3NlZCQubmV4dCgpOyB9XHJcblxyXG4gIHByaXZhdGUgX3NldEZvY3VzKCkge1xyXG4gICAgY29uc3Qge25hdGl2ZUVsZW1lbnR9ID0gdGhpcy5fZWxSZWY7XHJcbiAgICBpZiAoIW5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIHtcclxuICAgICAgY29uc3QgYXV0b0ZvY3VzYWJsZSA9IG5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihgW25nYkF1dG9mb2N1c11gKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgY29uc3QgZmlyc3RGb2N1c2FibGUgPSBnZXRGb2N1c2FibGVCb3VuZGFyeUVsZW1lbnRzKG5hdGl2ZUVsZW1lbnQpWzBdO1xyXG5cclxuICAgICAgY29uc3QgZWxlbWVudFRvRm9jdXMgPSBhdXRvRm9jdXNhYmxlIHx8IGZpcnN0Rm9jdXNhYmxlIHx8IG5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgIGVsZW1lbnRUb0ZvY3VzLmZvY3VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9yZXN0b3JlRm9jdXMoKSB7XHJcbiAgICBjb25zdCBib2R5ID0gdGhpcy5fZG9jdW1lbnQuYm9keTtcclxuICAgIGNvbnN0IGVsV2l0aEZvY3VzID0gdGhpcy5fZWxXaXRoRm9jdXM7XHJcblxyXG4gICAgbGV0IGVsZW1lbnRUb0ZvY3VzO1xyXG4gICAgaWYgKGVsV2l0aEZvY3VzICYmIGVsV2l0aEZvY3VzWydmb2N1cyddICYmIGJvZHkuY29udGFpbnMoZWxXaXRoRm9jdXMpKSB7XHJcbiAgICAgIGVsZW1lbnRUb0ZvY3VzID0gZWxXaXRoRm9jdXM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlbGVtZW50VG9Gb2N1cyA9IGJvZHk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiBlbGVtZW50VG9Gb2N1cy5mb2N1cygpKTtcclxuICAgICAgdGhpcy5fZWxXaXRoRm9jdXMgPSBudWxsO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9idW1wQmFja2Ryb3AoKSB7XHJcbiAgICBpZiAodGhpcy5iYWNrZHJvcCA9PT0gJ3N0YXRpYycpIHtcclxuICAgICAgbmdiUnVuVHJhbnNpdGlvbih0aGlzLl96b25lLCB0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50LCAoe2NsYXNzTGlzdH0pID0+IHtcclxuICAgICAgICBjbGFzc0xpc3QuYWRkKCdtb2RhbC1zdGF0aWMnKTtcclxuICAgICAgICByZXR1cm4gKCkgPT4gY2xhc3NMaXN0LnJlbW92ZSgnbW9kYWwtc3RhdGljJyk7XHJcbiAgICAgIH0sIHthbmltYXRpb246IHRoaXMuYW5pbWF0aW9uLCBydW5uaW5nVHJhbnNpdGlvbjogJ2NvbnRpbnVlJ30pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=