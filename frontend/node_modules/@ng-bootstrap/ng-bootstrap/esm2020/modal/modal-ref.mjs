import { of, Subject, zip } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isPromise } from '../util/util';
/**
 * A reference to the currently opened (active) modal.
 *
 * Instances of this class can be injected into your component passed as modal content.
 * So you can `.close()` or `.dismiss()` the modal window from your component.
 */
export class NgbActiveModal {
    /**
     * Closes the modal with an optional `result` value.
     *
     * The `NgbModalRef.result` promise will be resolved with the provided value.
     */
    close(result) { }
    /**
     * Dismisses the modal with an optional `reason` value.
     *
     * The `NgbModalRef.result` promise will be rejected with the provided value.
     */
    dismiss(reason) { }
}
/**
 * A reference to the newly opened modal returned by the `NgbModal.open()` method.
 */
export class NgbModalRef {
    constructor(_windowCmptRef, _contentRef, _backdropCmptRef, _beforeDismiss) {
        this._windowCmptRef = _windowCmptRef;
        this._contentRef = _contentRef;
        this._backdropCmptRef = _backdropCmptRef;
        this._beforeDismiss = _beforeDismiss;
        this._closed = new Subject();
        this._dismissed = new Subject();
        this._hidden = new Subject();
        _windowCmptRef.instance.dismissEvent.subscribe((reason) => { this.dismiss(reason); });
        this.result = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
        this.result.then(null, () => { });
    }
    /**
     * The instance of a component used for the modal content.
     *
     * When a `TemplateRef` is used as the content or when the modal is closed, will return `undefined`.
     */
    get componentInstance() {
        if (this._contentRef && this._contentRef.componentRef) {
            return this._contentRef.componentRef.instance;
        }
    }
    /**
     * The observable that emits when the modal is closed via the `.close()` method.
     *
     * It will emit the result passed to the `.close()` method.
     *
     * @since 8.0.0
     */
    get closed() { return this._closed.asObservable().pipe(takeUntil(this._hidden)); }
    /**
     * The observable that emits when the modal is dismissed via the `.dismiss()` method.
     *
     * It will emit the reason passed to the `.dismissed()` method by the user, or one of the internal
     * reasons like backdrop click or ESC key press.
     *
     * @since 8.0.0
     */
    get dismissed() { return this._dismissed.asObservable().pipe(takeUntil(this._hidden)); }
    /**
     * The observable that emits when both modal window and backdrop are closed and animations were finished.
     * At this point modal and backdrop elements will be removed from the DOM tree.
     *
     * This observable will be completed after emitting.
     *
     * @since 8.0.0
     */
    get hidden() { return this._hidden.asObservable(); }
    /**
     * The observable that emits when modal is fully visible and animation was finished.
     * Modal DOM element is always available synchronously after calling 'modal.open()' service.
     *
     * This observable will be completed after emitting.
     * It will not emit, if modal is closed before open animation is finished.
     *
     * @since 8.0.0
     */
    get shown() { return this._windowCmptRef.instance.shown.asObservable(); }
    /**
     * Closes the modal with an optional `result` value.
     *
     * The `NgbMobalRef.result` promise will be resolved with the provided value.
     */
    close(result) {
        if (this._windowCmptRef) {
            this._closed.next(result);
            this._resolve(result);
            this._removeModalElements();
        }
    }
    _dismiss(reason) {
        this._dismissed.next(reason);
        this._reject(reason);
        this._removeModalElements();
    }
    /**
     * Dismisses the modal with an optional `reason` value.
     *
     * The `NgbModalRef.result` promise will be rejected with the provided value.
     */
    dismiss(reason) {
        if (this._windowCmptRef) {
            if (!this._beforeDismiss) {
                this._dismiss(reason);
            }
            else {
                const dismiss = this._beforeDismiss();
                if (isPromise(dismiss)) {
                    dismiss.then(result => {
                        if (result !== false) {
                            this._dismiss(reason);
                        }
                    }, () => { });
                }
                else if (dismiss !== false) {
                    this._dismiss(reason);
                }
            }
        }
    }
    _removeModalElements() {
        const windowTransition$ = this._windowCmptRef.instance.hide();
        const backdropTransition$ = this._backdropCmptRef ? this._backdropCmptRef.instance.hide() : of(undefined);
        // hiding window
        windowTransition$.subscribe(() => {
            const { nativeElement } = this._windowCmptRef.location;
            nativeElement.parentNode.removeChild(nativeElement);
            this._windowCmptRef.destroy();
            if (this._contentRef && this._contentRef.viewRef) {
                this._contentRef.viewRef.destroy();
            }
            this._windowCmptRef = null;
            this._contentRef = null;
        });
        // hiding backdrop
        backdropTransition$.subscribe(() => {
            if (this._backdropCmptRef) {
                const { nativeElement } = this._backdropCmptRef.location;
                nativeElement.parentNode.removeChild(nativeElement);
                this._backdropCmptRef.destroy();
                this._backdropCmptRef = null;
            }
        });
        // all done
        zip(windowTransition$, backdropTransition$).subscribe(() => {
            this._hidden.next();
            this._hidden.complete();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtcmVmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZGFsL21vZGFsLXJlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQWEsRUFBRSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDbEQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBTXpDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFdkM7Ozs7O0dBS0c7QUFDSCxNQUFNLE9BQU8sY0FBYztJQUN6Qjs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLE1BQVksSUFBUyxDQUFDO0lBRTVCOzs7O09BSUc7SUFDSCxPQUFPLENBQUMsTUFBWSxJQUFTLENBQUM7Q0FDL0I7QUFFRDs7R0FFRztBQUNILE1BQU0sT0FBTyxXQUFXO0lBK0R0QixZQUNZLGNBQTRDLEVBQVUsV0FBdUIsRUFDN0UsZ0JBQWlELEVBQ2pELGNBQWlEO1FBRmpELG1CQUFjLEdBQWQsY0FBYyxDQUE4QjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQzdFLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUM7UUFDakQsbUJBQWMsR0FBZCxjQUFjLENBQW1DO1FBakVyRCxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUM3QixlQUFVLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUNoQyxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQWdFcEMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBVyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFM0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFB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Q3pELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50UmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7T2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QsIHppcH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7dGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQge05nYk1vZGFsQmFja2Ryb3B9IGZyb20gJy4vbW9kYWwtYmFja2Ryb3AnO1xyXG5pbXBvcnQge05nYk1vZGFsV2luZG93fSBmcm9tICcuL21vZGFsLXdpbmRvdyc7XHJcblxyXG5pbXBvcnQge0NvbnRlbnRSZWZ9IGZyb20gJy4uL3V0aWwvcG9wdXAnO1xyXG5pbXBvcnQge2lzUHJvbWlzZX0gZnJvbSAnLi4vdXRpbC91dGlsJztcclxuXHJcbi8qKlxyXG4gKiBBIHJlZmVyZW5jZSB0byB0aGUgY3VycmVudGx5IG9wZW5lZCAoYWN0aXZlKSBtb2RhbC5cclxuICpcclxuICogSW5zdGFuY2VzIG9mIHRoaXMgY2xhc3MgY2FuIGJlIGluamVjdGVkIGludG8geW91ciBjb21wb25lbnQgcGFzc2VkIGFzIG1vZGFsIGNvbnRlbnQuXHJcbiAqIFNvIHlvdSBjYW4gYC5jbG9zZSgpYCBvciBgLmRpc21pc3MoKWAgdGhlIG1vZGFsIHdpbmRvdyBmcm9tIHlvdXIgY29tcG9uZW50LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE5nYkFjdGl2ZU1vZGFsIHtcclxuICAvKipcclxuICAgKiBDbG9zZXMgdGhlIG1vZGFsIHdpdGggYW4gb3B0aW9uYWwgYHJlc3VsdGAgdmFsdWUuXHJcbiAgICpcclxuICAgKiBUaGUgYE5nYk1vZGFsUmVmLnJlc3VsdGAgcHJvbWlzZSB3aWxsIGJlIHJlc29sdmVkIHdpdGggdGhlIHByb3ZpZGVkIHZhbHVlLlxyXG4gICAqL1xyXG4gIGNsb3NlKHJlc3VsdD86IGFueSk6IHZvaWQge31cclxuXHJcbiAgLyoqXHJcbiAgICogRGlzbWlzc2VzIHRoZSBtb2RhbCB3aXRoIGFuIG9wdGlvbmFsIGByZWFzb25gIHZhbHVlLlxyXG4gICAqXHJcbiAgICogVGhlIGBOZ2JNb2RhbFJlZi5yZXN1bHRgIHByb21pc2Ugd2lsbCBiZSByZWplY3RlZCB3aXRoIHRoZSBwcm92aWRlZCB2YWx1ZS5cclxuICAgKi9cclxuICBkaXNtaXNzKHJlYXNvbj86IGFueSk6IHZvaWQge31cclxufVxyXG5cclxuLyoqXHJcbiAqIEEgcmVmZXJlbmNlIHRvIHRoZSBuZXdseSBvcGVuZWQgbW9kYWwgcmV0dXJuZWQgYnkgdGhlIGBOZ2JNb2RhbC5vcGVuKClgIG1ldGhvZC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBOZ2JNb2RhbFJlZiB7XHJcbiAgcHJpdmF0ZSBfY2xvc2VkID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gIHByaXZhdGUgX2Rpc21pc3NlZCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuICBwcml2YXRlIF9oaWRkZW4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG4gIHByaXZhdGUgX3Jlc29sdmU6IChyZXN1bHQ/OiBhbnkpID0+IHZvaWQ7XHJcbiAgcHJpdmF0ZSBfcmVqZWN0OiAocmVhc29uPzogYW55KSA9PiB2b2lkO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgaW5zdGFuY2Ugb2YgYSBjb21wb25lbnQgdXNlZCBmb3IgdGhlIG1vZGFsIGNvbnRlbnQuXHJcbiAgICpcclxuICAgKiBXaGVuIGEgYFRlbXBsYXRlUmVmYCBpcyB1c2VkIGFzIHRoZSBjb250ZW50IG9yIHdoZW4gdGhlIG1vZGFsIGlzIGNsb3NlZCwgd2lsbCByZXR1cm4gYHVuZGVmaW5lZGAuXHJcbiAgICovXHJcbiAgZ2V0IGNvbXBvbmVudEluc3RhbmNlKCk6IGFueSB7XHJcbiAgICBpZiAodGhpcy5fY29udGVudFJlZiAmJiB0aGlzLl9jb250ZW50UmVmLmNvbXBvbmVudFJlZikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fY29udGVudFJlZi5jb21wb25lbnRSZWYuaW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgcHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gdGhlIG1vZGFsIGlzIGNsb3NlZCBhbmQgcmVqZWN0ZWQgd2hlbiB0aGUgbW9kYWwgaXMgZGlzbWlzc2VkLlxyXG4gICAqL1xyXG4gIHJlc3VsdDogUHJvbWlzZTxhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgb2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHdoZW4gdGhlIG1vZGFsIGlzIGNsb3NlZCB2aWEgdGhlIGAuY2xvc2UoKWAgbWV0aG9kLlxyXG4gICAqXHJcbiAgICogSXQgd2lsbCBlbWl0IHRoZSByZXN1bHQgcGFzc2VkIHRvIHRoZSBgLmNsb3NlKClgIG1ldGhvZC5cclxuICAgKlxyXG4gICAqIEBzaW5jZSA4LjAuMFxyXG4gICAqL1xyXG4gIGdldCBjbG9zZWQoKTogT2JzZXJ2YWJsZTxhbnk+IHsgcmV0dXJuIHRoaXMuX2Nsb3NlZC5hc09ic2VydmFibGUoKS5waXBlKHRha2VVbnRpbCh0aGlzLl9oaWRkZW4pKTsgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgb2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHdoZW4gdGhlIG1vZGFsIGlzIGRpc21pc3NlZCB2aWEgdGhlIGAuZGlzbWlzcygpYCBtZXRob2QuXHJcbiAgICpcclxuICAgKiBJdCB3aWxsIGVtaXQgdGhlIHJlYXNvbiBwYXNzZWQgdG8gdGhlIGAuZGlzbWlzc2VkKClgIG1ldGhvZCBieSB0aGUgdXNlciwgb3Igb25lIG9mIHRoZSBpbnRlcm5hbFxyXG4gICAqIHJlYXNvbnMgbGlrZSBiYWNrZHJvcCBjbGljayBvciBFU0Mga2V5IHByZXNzLlxyXG4gICAqXHJcbiAgICogQHNpbmNlIDguMC4wXHJcbiAgICovXHJcbiAgZ2V0IGRpc21pc3NlZCgpOiBPYnNlcnZhYmxlPGFueT4geyByZXR1cm4gdGhpcy5fZGlzbWlzc2VkLmFzT2JzZXJ2YWJsZSgpLnBpcGUodGFrZVVudGlsKHRoaXMuX2hpZGRlbikpOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBvYnNlcnZhYmxlIHRoYXQgZW1pdHMgd2hlbiBib3RoIG1vZGFsIHdpbmRvdyBhbmQgYmFja2Ryb3AgYXJlIGNsb3NlZCBhbmQgYW5pbWF0aW9ucyB3ZXJlIGZpbmlzaGVkLlxyXG4gICAqIEF0IHRoaXMgcG9pbnQgbW9kYWwgYW5kIGJhY2tkcm9wIGVsZW1lbnRzIHdpbGwgYmUgcmVtb3ZlZCBmcm9tIHRoZSBET00gdHJlZS5cclxuICAgKlxyXG4gICAqIFRoaXMgb2JzZXJ2YWJsZSB3aWxsIGJlIGNvbXBsZXRlZCBhZnRlciBlbWl0dGluZy5cclxuICAgKlxyXG4gICAqIEBzaW5jZSA4LjAuMFxyXG4gICAqL1xyXG4gIGdldCBoaWRkZW4oKTogT2JzZXJ2YWJsZTx2b2lkPiB7IHJldHVybiB0aGlzLl9oaWRkZW4uYXNPYnNlcnZhYmxlKCk7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG9ic2VydmFibGUgdGhhdCBlbWl0cyB3aGVuIG1vZGFsIGlzIGZ1bGx5IHZpc2libGUgYW5kIGFuaW1hdGlvbiB3YXMgZmluaXNoZWQuXHJcbiAgICogTW9kYWwgRE9NIGVsZW1lbnQgaXMgYWx3YXlzIGF2YWlsYWJsZSBzeW5jaHJvbm91c2x5IGFmdGVyIGNhbGxpbmcgJ21vZGFsLm9wZW4oKScgc2VydmljZS5cclxuICAgKlxyXG4gICAqIFRoaXMgb2JzZXJ2YWJsZSB3aWxsIGJlIGNvbXBsZXRlZCBhZnRlciBlbWl0dGluZy5cclxuICAgKiBJdCB3aWxsIG5vdCBlbWl0LCBpZiBtb2RhbCBpcyBjbG9zZWQgYmVmb3JlIG9wZW4gYW5pbWF0aW9uIGlzIGZpbmlzaGVkLlxyXG4gICAqXHJcbiAgICogQHNpbmNlIDguMC4wXHJcbiAgICovXHJcbiAgZ2V0IHNob3duKCk6IE9ic2VydmFibGU8dm9pZD4geyByZXR1cm4gdGhpcy5fd2luZG93Q21wdFJlZi5pbnN0YW5jZS5zaG93bi5hc09ic2VydmFibGUoKTsgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgcHJpdmF0ZSBfd2luZG93Q21wdFJlZjogQ29tcG9uZW50UmVmPE5nYk1vZGFsV2luZG93PiwgcHJpdmF0ZSBfY29udGVudFJlZjogQ29udGVudFJlZixcclxuICAgICAgcHJpdmF0ZSBfYmFja2Ryb3BDbXB0UmVmPzogQ29tcG9uZW50UmVmPE5nYk1vZGFsQmFja2Ryb3A+LFxyXG4gICAgICBwcml2YXRlIF9iZWZvcmVEaXNtaXNzPzogKCkgPT4gYm9vbGVhbiB8IFByb21pc2U8Ym9vbGVhbj4pIHtcclxuICAgIF93aW5kb3dDbXB0UmVmLmluc3RhbmNlLmRpc21pc3NFdmVudC5zdWJzY3JpYmUoKHJlYXNvbjogYW55KSA9PiB7IHRoaXMuZGlzbWlzcyhyZWFzb24pOyB9KTtcclxuXHJcbiAgICB0aGlzLnJlc3VsdCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5fcmVzb2x2ZSA9IHJlc29sdmU7XHJcbiAgICAgIHRoaXMuX3JlamVjdCA9IHJlamVjdDtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5yZXN1bHQudGhlbihudWxsLCAoKSA9PiB7fSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbG9zZXMgdGhlIG1vZGFsIHdpdGggYW4gb3B0aW9uYWwgYHJlc3VsdGAgdmFsdWUuXHJcbiAgICpcclxuICAgKiBUaGUgYE5nYk1vYmFsUmVmLnJlc3VsdGAgcHJvbWlzZSB3aWxsIGJlIHJlc29sdmVkIHdpdGggdGhlIHByb3ZpZGVkIHZhbHVlLlxyXG4gICAqL1xyXG4gIGNsb3NlKHJlc3VsdD86IGFueSk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX3dpbmRvd0NtcHRSZWYpIHtcclxuICAgICAgdGhpcy5fY2xvc2VkLm5leHQocmVzdWx0KTtcclxuICAgICAgdGhpcy5fcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICB0aGlzLl9yZW1vdmVNb2RhbEVsZW1lbnRzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9kaXNtaXNzKHJlYXNvbj86IGFueSkge1xyXG4gICAgdGhpcy5fZGlzbWlzc2VkLm5leHQocmVhc29uKTtcclxuICAgIHRoaXMuX3JlamVjdChyZWFzb24pO1xyXG4gICAgdGhpcy5fcmVtb3ZlTW9kYWxFbGVtZW50cygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGlzbWlzc2VzIHRoZSBtb2RhbCB3aXRoIGFuIG9wdGlvbmFsIGByZWFzb25gIHZhbHVlLlxyXG4gICAqXHJcbiAgICogVGhlIGBOZ2JNb2RhbFJlZi5yZXN1bHRgIHByb21pc2Ugd2lsbCBiZSByZWplY3RlZCB3aXRoIHRoZSBwcm92aWRlZCB2YWx1ZS5cclxuICAgKi9cclxuICBkaXNtaXNzKHJlYXNvbj86IGFueSk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX3dpbmRvd0NtcHRSZWYpIHtcclxuICAgICAgaWYgKCF0aGlzLl9iZWZvcmVEaXNtaXNzKSB7XHJcbiAgICAgICAgdGhpcy5fZGlzbWlzcyhyZWFzb24pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGRpc21pc3MgPSB0aGlzLl9iZWZvcmVEaXNtaXNzKCk7XHJcbiAgICAgICAgaWYgKGlzUHJvbWlzZShkaXNtaXNzKSkge1xyXG4gICAgICAgICAgZGlzbWlzcy50aGVuKFxyXG4gICAgICAgICAgICAgIHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLl9kaXNtaXNzKHJlYXNvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAoKSA9PiB7fSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkaXNtaXNzICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgdGhpcy5fZGlzbWlzcyhyZWFzb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfcmVtb3ZlTW9kYWxFbGVtZW50cygpIHtcclxuICAgIGNvbnN0IHdpbmRvd1RyYW5zaXRpb24kID0gdGhpcy5fd2luZG93Q21wdFJlZi5pbnN0YW5jZS5oaWRlKCk7XHJcbiAgICBjb25zdCBiYWNrZHJvcFRyYW5zaXRpb24kID0gdGhpcy5fYmFja2Ryb3BDbXB0UmVmID8gdGhpcy5fYmFja2Ryb3BDbXB0UmVmLmluc3RhbmNlLmhpZGUoKSA6IG9mKHVuZGVmaW5lZCk7XHJcblxyXG4gICAgLy8gaGlkaW5nIHdpbmRvd1xyXG4gICAgd2luZG93VHJhbnNpdGlvbiQuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgY29uc3Qge25hdGl2ZUVsZW1lbnR9ID0gdGhpcy5fd2luZG93Q21wdFJlZi5sb2NhdGlvbjtcclxuICAgICAgbmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICB0aGlzLl93aW5kb3dDbXB0UmVmLmRlc3Ryb3koKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLl9jb250ZW50UmVmICYmIHRoaXMuX2NvbnRlbnRSZWYudmlld1JlZikge1xyXG4gICAgICAgIHRoaXMuX2NvbnRlbnRSZWYudmlld1JlZi5kZXN0cm95KCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuX3dpbmRvd0NtcHRSZWYgPSA8YW55Pm51bGw7XHJcbiAgICAgIHRoaXMuX2NvbnRlbnRSZWYgPSA8YW55Pm51bGw7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBoaWRpbmcgYmFja2Ryb3BcclxuICAgIGJhY2tkcm9wVHJhbnNpdGlvbiQuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuX2JhY2tkcm9wQ21wdFJlZikge1xyXG4gICAgICAgIGNvbnN0IHtuYXRpdmVFbGVtZW50fSA9IHRoaXMuX2JhY2tkcm9wQ21wdFJlZi5sb2NhdGlvbjtcclxuICAgICAgICBuYXRpdmVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobmF0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5fYmFja2Ryb3BDbXB0UmVmLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLl9iYWNrZHJvcENtcHRSZWYgPSA8YW55Pm51bGw7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGFsbCBkb25lXHJcbiAgICB6aXAod2luZG93VHJhbnNpdGlvbiQsIGJhY2tkcm9wVHJhbnNpdGlvbiQpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2hpZGRlbi5uZXh0KCk7XHJcbiAgICAgIHRoaXMuX2hpZGRlbi5jb21wbGV0ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==