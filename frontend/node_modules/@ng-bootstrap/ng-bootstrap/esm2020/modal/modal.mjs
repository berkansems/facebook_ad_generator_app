import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./modal-stack";
import * as i2 from "./modal-config";
/**
 * A service for opening modal windows.
 *
 * Creating a modal is straightforward: create a component or a template and pass it as an argument to
 * the `.open()` method.
 */
export class NgbModal {
    constructor(_moduleCFR, _injector, _modalStack, _config) {
        this._moduleCFR = _moduleCFR;
        this._injector = _injector;
        this._modalStack = _modalStack;
        this._config = _config;
    }
    /**
     * Opens a new modal window with the specified content and supplied options.
     *
     * Content can be provided as a `TemplateRef` or a component type. If you pass a component type as content,
     * then instances of those components can be injected with an instance of the `NgbActiveModal` class. You can then
     * use `NgbActiveModal` methods to close / dismiss modals from "inside" of your component.
     *
     * Also see the [`NgbModalOptions`](#/components/modal/api#NgbModalOptions) for the list of supported options.
     */
    open(content, options = {}) {
        const combinedOptions = { ...this._config, animation: this._config.animation, ...options };
        return this._modalStack.open(this._moduleCFR, this._injector, content, combinedOptions);
    }
    /**
     * Returns an observable that holds the active modal instances.
     */
    get activeInstances() { return this._modalStack.activeInstances; }
    /**
     * Dismisses all currently displayed modal windows with the supplied reason.
     *
     * @since 3.1.0
     */
    dismissAll(reason) { this._modalStack.dismissAll(reason); }
    /**
     * Indicates if there are currently any open modal windows in the application.
     *
     * @since 3.3.0
     */
    hasOpenModals() { return this._modalStack.hasOpenModals(); }
}
NgbModal.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbModal, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.Injector }, { token: i1.NgbModalStack }, { token: i2.NgbModalConfig }], target: i0.ɵɵFactoryTarget.Injectable });
NgbModal.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbModal, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbModal, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.Injector }, { type: i1.NgbModalStack }, { type: i2.NgbModalConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kYWwvbW9kYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBcUMsTUFBTSxlQUFlLENBQUM7Ozs7QUFNN0U7Ozs7O0dBS0c7QUFFSCxNQUFNLE9BQU8sUUFBUTtJQUNuQixZQUNZLFVBQW9DLEVBQVUsU0FBbUIsRUFBVSxXQUEwQixFQUNyRyxPQUF1QjtRQUR2QixlQUFVLEdBQVYsVUFBVSxDQUEwQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBZTtRQUNyRyxZQUFPLEdBQVAsT0FBTyxDQUFnQjtJQUFHLENBQUM7SUFFdkM7Ozs7Ozs7O09BUUc7SUFDSCxJQUFJLENBQUMsT0FBWSxFQUFFLFVBQTJCLEVBQUU7UUFDOUMsTUFBTSxlQUFlLEdBQUcsRUFBQyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEdBQUcsT0FBTyxFQUFDLENBQUM7UUFDekYsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQzFGLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksZUFBZSxLQUFLLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0lBRWxFOzs7O09BSUc7SUFDSCxVQUFVLENBQUMsTUFBWSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVqRTs7OztPQUlHO0lBQ0gsYUFBYSxLQUFjLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7O3FHQXBDMUQsUUFBUTt5R0FBUixRQUFRLGNBREksTUFBTTsyRkFDbEIsUUFBUTtrQkFEcEIsVUFBVTttQkFBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIEluamVjdG9yLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtOZ2JNb2RhbE9wdGlvbnMsIE5nYk1vZGFsQ29uZmlnfSBmcm9tICcuL21vZGFsLWNvbmZpZyc7XHJcbmltcG9ydCB7TmdiTW9kYWxSZWZ9IGZyb20gJy4vbW9kYWwtcmVmJztcclxuaW1wb3J0IHtOZ2JNb2RhbFN0YWNrfSBmcm9tICcuL21vZGFsLXN0YWNrJztcclxuXHJcbi8qKlxyXG4gKiBBIHNlcnZpY2UgZm9yIG9wZW5pbmcgbW9kYWwgd2luZG93cy5cclxuICpcclxuICogQ3JlYXRpbmcgYSBtb2RhbCBpcyBzdHJhaWdodGZvcndhcmQ6IGNyZWF0ZSBhIGNvbXBvbmVudCBvciBhIHRlbXBsYXRlIGFuZCBwYXNzIGl0IGFzIGFuIGFyZ3VtZW50IHRvXHJcbiAqIHRoZSBgLm9wZW4oKWAgbWV0aG9kLlxyXG4gKi9cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JNb2RhbCB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIHByaXZhdGUgX21vZHVsZUNGUjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBwcml2YXRlIF9pbmplY3RvcjogSW5qZWN0b3IsIHByaXZhdGUgX21vZGFsU3RhY2s6IE5nYk1vZGFsU3RhY2ssXHJcbiAgICAgIHByaXZhdGUgX2NvbmZpZzogTmdiTW9kYWxDb25maWcpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9wZW5zIGEgbmV3IG1vZGFsIHdpbmRvdyB3aXRoIHRoZSBzcGVjaWZpZWQgY29udGVudCBhbmQgc3VwcGxpZWQgb3B0aW9ucy5cclxuICAgKlxyXG4gICAqIENvbnRlbnQgY2FuIGJlIHByb3ZpZGVkIGFzIGEgYFRlbXBsYXRlUmVmYCBvciBhIGNvbXBvbmVudCB0eXBlLiBJZiB5b3UgcGFzcyBhIGNvbXBvbmVudCB0eXBlIGFzIGNvbnRlbnQsXHJcbiAgICogdGhlbiBpbnN0YW5jZXMgb2YgdGhvc2UgY29tcG9uZW50cyBjYW4gYmUgaW5qZWN0ZWQgd2l0aCBhbiBpbnN0YW5jZSBvZiB0aGUgYE5nYkFjdGl2ZU1vZGFsYCBjbGFzcy4gWW91IGNhbiB0aGVuXHJcbiAgICogdXNlIGBOZ2JBY3RpdmVNb2RhbGAgbWV0aG9kcyB0byBjbG9zZSAvIGRpc21pc3MgbW9kYWxzIGZyb20gXCJpbnNpZGVcIiBvZiB5b3VyIGNvbXBvbmVudC5cclxuICAgKlxyXG4gICAqIEFsc28gc2VlIHRoZSBbYE5nYk1vZGFsT3B0aW9uc2BdKCMvY29tcG9uZW50cy9tb2RhbC9hcGkjTmdiTW9kYWxPcHRpb25zKSBmb3IgdGhlIGxpc3Qgb2Ygc3VwcG9ydGVkIG9wdGlvbnMuXHJcbiAgICovXHJcbiAgb3Blbihjb250ZW50OiBhbnksIG9wdGlvbnM6IE5nYk1vZGFsT3B0aW9ucyA9IHt9KTogTmdiTW9kYWxSZWYge1xyXG4gICAgY29uc3QgY29tYmluZWRPcHRpb25zID0gey4uLnRoaXMuX2NvbmZpZywgYW5pbWF0aW9uOiB0aGlzLl9jb25maWcuYW5pbWF0aW9uLCAuLi5vcHRpb25zfTtcclxuICAgIHJldHVybiB0aGlzLl9tb2RhbFN0YWNrLm9wZW4odGhpcy5fbW9kdWxlQ0ZSLCB0aGlzLl9pbmplY3RvciwgY29udGVudCwgY29tYmluZWRPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYW4gb2JzZXJ2YWJsZSB0aGF0IGhvbGRzIHRoZSBhY3RpdmUgbW9kYWwgaW5zdGFuY2VzLlxyXG4gICAqL1xyXG4gIGdldCBhY3RpdmVJbnN0YW5jZXMoKSB7IHJldHVybiB0aGlzLl9tb2RhbFN0YWNrLmFjdGl2ZUluc3RhbmNlczsgfVxyXG5cclxuICAvKipcclxuICAgKiBEaXNtaXNzZXMgYWxsIGN1cnJlbnRseSBkaXNwbGF5ZWQgbW9kYWwgd2luZG93cyB3aXRoIHRoZSBzdXBwbGllZCByZWFzb24uXHJcbiAgICpcclxuICAgKiBAc2luY2UgMy4xLjBcclxuICAgKi9cclxuICBkaXNtaXNzQWxsKHJlYXNvbj86IGFueSkgeyB0aGlzLl9tb2RhbFN0YWNrLmRpc21pc3NBbGwocmVhc29uKTsgfVxyXG5cclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlcmUgYXJlIGN1cnJlbnRseSBhbnkgb3BlbiBtb2RhbCB3aW5kb3dzIGluIHRoZSBhcHBsaWNhdGlvbi5cclxuICAgKlxyXG4gICAqIEBzaW5jZSAzLjMuMFxyXG4gICAqL1xyXG4gIGhhc09wZW5Nb2RhbHMoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9tb2RhbFN0YWNrLmhhc09wZW5Nb2RhbHMoKTsgfVxyXG59XHJcbiJdfQ==