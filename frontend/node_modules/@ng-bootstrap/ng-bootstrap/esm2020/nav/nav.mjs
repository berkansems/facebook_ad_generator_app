import { Attribute, ContentChildren, Directive, EventEmitter, forwardRef, Inject, Input, Output } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isDefined } from '../util/util';
import { Key } from '../util/key';
import * as i0 from "@angular/core";
import * as i1 from "./nav-config";
const isValidNavId = (id) => isDefined(id) && id !== '';
let navCounter = 0;
/**
 * This directive must be used to wrap content to be displayed in the nav.
 *
 * @since 5.2.0
 */
export class NgbNavContent {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbNavContent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbNavContent, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbNavContent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NgbNavContent, selector: "ng-template[ngbNavContent]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbNavContent, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbNavContent]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * The directive used to group nav link and related nav content. As well as set nav identifier and some options.
 *
 * @since 5.2.0
 */
export class NgbNavItem {
    constructor(nav, elementRef) {
        this.elementRef = elementRef;
        /**
         * If `true`, the current nav item is disabled and can't be toggled by user.
         *
         * Nevertheless disabled nav can be selected programmatically via the `.select()` method and the `[activeId]` binding.
         */
        this.disabled = false;
        /**
         * An event emitted when the fade in transition is finished on the related nav content
         *
         * @since 8.0.0
         */
        this.shown = new EventEmitter();
        /**
         * An event emitted when the fade out transition is finished on the related nav content
         *
         * @since 8.0.0
         */
        this.hidden = new EventEmitter();
        // TODO: cf https://github.com/angular/angular/issues/30106
        this._nav = nav;
    }
    ngAfterContentChecked() {
        // We are using @ContentChildren instead of @ContentChild as in the Angular version being used
        // only @ContentChildren allows us to specify the {descendants: false} option.
        // Without {descendants: false} we are hitting bugs described in:
        // https://github.com/ng-bootstrap/ng-bootstrap/issues/2240
        this.contentTpl = this.contentTpls.first;
    }
    ngOnInit() {
        if (!isDefined(this.domId)) {
            this.domId = `ngb-nav-${navCounter++}`;
        }
    }
    get active() { return this._nav.activeId === this.id; }
    get id() { return isValidNavId(this._id) ? this._id : this.domId; }
    get panelDomId() { return `${this.domId}-panel`; }
    isPanelInDom() {
        return (isDefined(this.destroyOnHide) ? !this.destroyOnHide : !this._nav.destroyOnHide) || this.active;
    }
}
NgbNavItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbNavItem, deps: [{ token: forwardRef(() => NgbNav) }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbNavItem.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NgbNavItem, selector: "[ngbNavItem]", inputs: { destroyOnHide: "destroyOnHide", disabled: "disabled", domId: "domId", _id: ["ngbNavItem", "_id"] }, outputs: { shown: "shown", hidden: "hidden" }, host: { properties: { "class.nav-item": "true" } }, queries: [{ propertyName: "contentTpls", predicate: NgbNavContent }], exportAs: ["ngbNavItem"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbNavItem, decorators: [{
            type: Directive,
            args: [{ selector: '[ngbNavItem]', exportAs: 'ngbNavItem', host: { '[class.nav-item]': 'true' } }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => NgbNav)]
                }] }, { type: i0.ElementRef }]; }, propDecorators: { destroyOnHide: [{
                type: Input
            }], disabled: [{
                type: Input
            }], domId: [{
                type: Input
            }], _id: [{
                type: Input,
                args: ['ngbNavItem']
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }], contentTpls: [{
                type: ContentChildren,
                args: [NgbNavContent, { descendants: false }]
            }] } });
/**
 * A nav directive that helps with implementing tabbed navigation components.
 *
 * @since 5.2.0
 */
export class NgbNav {
    constructor(role, config, _cd, _document) {
        this.role = role;
        this._cd = _cd;
        this._document = _document;
        /**
         * The event emitted after the active nav changes
         * The payload of the event is the newly active nav id
         *
         * If you want to prevent nav change, you should use `(navChange)` event
         */
        this.activeIdChange = new EventEmitter();
        /**
         * An event emitted when the fade in transition is finished for one of the items.
         *
         * Payload of the event is the nav id that was just shown.
         *
         * @since 8.0.0
         */
        this.shown = new EventEmitter();
        /**
         * An event emitted when the fade out transition is finished for one of the items.
         *
         * Payload of the event is the nav id that was just hidden.
         *
         * @since 8.0.0
         */
        this.hidden = new EventEmitter();
        this.destroy$ = new Subject();
        this.navItemChange$ = new Subject();
        /**
         * The nav change event emitted right before the nav change happens on user click.
         *
         * This event won't be emitted if nav is changed programmatically via `[activeId]` or `.select()`.
         *
         * See [`NgbNavChangeEvent`](#/components/nav/api#NgbNavChangeEvent) for payload details.
         */
        this.navChange = new EventEmitter();
        this.animation = config.animation;
        this.destroyOnHide = config.destroyOnHide;
        this.orientation = config.orientation;
        this.roles = config.roles;
        this.keyboard = config.keyboard;
    }
    click(item) {
        if (!item.disabled) {
            this._updateActiveId(item.id);
        }
    }
    onKeyDown(event) {
        if (this.roles !== 'tablist' || !this.keyboard) {
            return;
        }
        /* eslint-disable-next-line deprecation/deprecation */
        const key = event.which;
        const enabledLinks = this.links.filter(link => !link.navItem.disabled);
        const { length } = enabledLinks;
        let position = -1;
        enabledLinks.forEach((link, index) => {
            if (link.elRef.nativeElement === this._document.activeElement) {
                position = index;
            }
        });
        if (length) {
            switch (key) {
                case Key.ArrowLeft:
                    if (this.orientation === 'vertical') {
                        return;
                    }
                    position = (position - 1 + length) % length;
                    break;
                case Key.ArrowRight:
                    if (this.orientation === 'vertical') {
                        return;
                    }
                    position = (position + 1) % length;
                    break;
                case Key.ArrowDown:
                    if (this.orientation === 'horizontal') {
                        return;
                    }
                    position = (position + 1) % length;
                    break;
                case Key.ArrowUp:
                    if (this.orientation === 'horizontal') {
                        return;
                    }
                    position = (position - 1 + length) % length;
                    break;
                case Key.Home:
                    position = 0;
                    break;
                case Key.End:
                    position = length - 1;
                    break;
            }
            if (this.keyboard === 'changeWithArrows') {
                this.select(enabledLinks[position].navItem.id);
            }
            enabledLinks[position].elRef.nativeElement.focus();
            event.preventDefault();
        }
    }
    /**
     * Selects the nav with the given id and shows its associated pane.
     * Any other nav that was previously selected becomes unselected and its associated pane is hidden.
     */
    select(id) { this._updateActiveId(id, false); }
    ngAfterContentInit() {
        if (!isDefined(this.activeId)) {
            const nextId = this.items.first ? this.items.first.id : null;
            if (isValidNavId(nextId)) {
                this._updateActiveId(nextId, false);
                this._cd.detectChanges();
            }
        }
        this.items.changes.pipe(takeUntil(this.destroy$)).subscribe(() => this._notifyItemChanged(this.activeId));
    }
    ngOnChanges({ activeId }) {
        if (activeId && !activeId.firstChange) {
            this._notifyItemChanged(activeId.currentValue);
        }
    }
    ngOnDestroy() { this.destroy$.next(); }
    _updateActiveId(nextId, emitNavChange = true) {
        if (this.activeId !== nextId) {
            let defaultPrevented = false;
            if (emitNavChange) {
                this.navChange.emit({ activeId: this.activeId, nextId, preventDefault: () => { defaultPrevented = true; } });
            }
            if (!defaultPrevented) {
                this.activeId = nextId;
                this.activeIdChange.emit(nextId);
                this._notifyItemChanged(nextId);
            }
        }
    }
    _notifyItemChanged(nextItemId) { this.navItemChange$.next(this._getItemById(nextItemId)); }
    _getItemById(itemId) {
        return this.items && this.items.find(item => item.id === itemId) || null;
    }
}
NgbNav.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbNav, deps: [{ token: 'role', attribute: true }, { token: i1.NgbNavConfig }, { token: i0.ChangeDetectorRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
NgbNav.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NgbNav, selector: "[ngbNav]", inputs: { activeId: "activeId", animation: "animation", destroyOnHide: "destroyOnHide", orientation: "orientation", roles: "roles", keyboard: "keyboard" }, outputs: { activeIdChange: "activeIdChange", shown: "shown", hidden: "hidden", navChange: "navChange" }, host: { listeners: { "keydown.arrowLeft": "onKeyDown($event)", "keydown.arrowRight": "onKeyDown($event)", "keydown.arrowDown": "onKeyDown($event)", "keydown.arrowUp": "onKeyDown($event)", "keydown.Home": "onKeyDown($event)", "keydown.End": "onKeyDown($event)" }, properties: { "class.nav": "true", "class.flex-column": "orientation === 'vertical'", "attr.aria-orientation": "orientation === 'vertical' && roles === 'tablist' ? 'vertical' : undefined", "attr.role": "role ? role : roles ? 'tablist' : undefined" } }, queries: [{ propertyName: "items", predicate: NgbNavItem }, { propertyName: "links", predicate: i0.forwardRef(function () { return NgbNavLink; }), descendants: true }], exportAs: ["ngbNav"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbNav, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbNav]',
                    exportAs: 'ngbNav',
                    host: {
                        '[class.nav]': 'true',
                        '[class.flex-column]': `orientation === 'vertical'`,
                        '[attr.aria-orientation]': `orientation === 'vertical' && roles === 'tablist' ? 'vertical' : undefined`,
                        '[attr.role]': `role ? role : roles ? 'tablist' : undefined`,
                        '(keydown.arrowLeft)': 'onKeyDown($event)',
                        '(keydown.arrowRight)': 'onKeyDown($event)',
                        '(keydown.arrowDown)': 'onKeyDown($event)',
                        '(keydown.arrowUp)': 'onKeyDown($event)',
                        '(keydown.Home)': 'onKeyDown($event)',
                        '(keydown.End)': 'onKeyDown($event)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Attribute,
                    args: ['role']
                }] }, { type: i1.NgbNavConfig }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { activeId: [{
                type: Input
            }], activeIdChange: [{
                type: Output
            }], animation: [{
                type: Input
            }], destroyOnHide: [{
                type: Input
            }], orientation: [{
                type: Input
            }], roles: [{
                type: Input
            }], keyboard: [{
                type: Input
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }], items: [{
                type: ContentChildren,
                args: [NgbNavItem]
            }], links: [{
                type: ContentChildren,
                args: [forwardRef(() => NgbNavLink), { descendants: true }]
            }], navChange: [{
                type: Output
            }] } });
/**
 * A directive to put on the nav link.
 *
 * @since 5.2.0
 */
export class NgbNavLink {
    constructor(role, navItem, nav, elRef) {
        this.role = role;
        this.navItem = navItem;
        this.nav = nav;
        this.elRef = elRef;
    }
    hasNavItemClass() {
        // with alternative markup we have to add `.nav-item` class, because `ngbNavItem` is on the ng-container
        return this.navItem.elementRef.nativeElement.nodeType === Node.COMMENT_NODE;
    }
}
NgbNavLink.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbNavLink, deps: [{ token: 'role', attribute: true }, { token: NgbNavItem }, { token: NgbNav }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NgbNavLink.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: NgbNavLink, selector: "a[ngbNavLink]", host: { attributes: { "href": "" }, listeners: { "click": "nav.click(navItem); $event.preventDefault()" }, properties: { "id": "navItem.domId", "class.nav-link": "true", "class.nav-item": "hasNavItemClass()", "attr.role": "role ? role : nav.roles ? 'tab' : undefined", "class.active": "navItem.active", "class.disabled": "navItem.disabled", "attr.tabindex": "navItem.disabled ? -1 : undefined", "attr.aria-controls": "navItem.isPanelInDom() ? navItem.panelDomId : null", "attr.aria-selected": "navItem.active", "attr.aria-disabled": "navItem.disabled" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbNavLink, decorators: [{
            type: Directive,
            args: [{
                    selector: 'a[ngbNavLink]',
                    host: {
                        '[id]': 'navItem.domId',
                        '[class.nav-link]': 'true',
                        '[class.nav-item]': 'hasNavItemClass()',
                        '[attr.role]': `role ? role : nav.roles ? 'tab' : undefined`,
                        'href': '',
                        '[class.active]': 'navItem.active',
                        '[class.disabled]': 'navItem.disabled',
                        '[attr.tabindex]': 'navItem.disabled ? -1 : undefined',
                        '[attr.aria-controls]': 'navItem.isPanelInDom() ? navItem.panelDomId : null',
                        '[attr.aria-selected]': 'navItem.active',
                        '[attr.aria-disabled]': 'navItem.disabled',
                        '(click)': 'nav.click(navItem); $event.preventDefault()'
                    }
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Attribute,
                    args: ['role']
                }] }, { type: NgbNavItem }, { type: NgbNav }, { type: i0.ElementRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25hdi9uYXYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdMLFNBQVMsRUFFVCxlQUFlLEVBQ2YsU0FBUyxFQUVULFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFJTCxNQUFNLEVBSVAsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRXpDLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDN0IsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXpDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFdkMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGFBQWEsQ0FBQzs7O0FBRWhDLE1BQU0sWUFBWSxHQUFHLENBQUMsRUFBTyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUU3RCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFpQm5COzs7O0dBSUc7QUFFSCxNQUFNLE9BQU8sYUFBYTtJQUN4QixZQUFtQixXQUE2QjtRQUE3QixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7SUFBRyxDQUFDOzswR0FEekMsYUFBYTs4RkFBYixhQUFhOzJGQUFiLGFBQWE7a0JBRHpCLFNBQVM7bUJBQUMsRUFBQyxRQUFRLEVBQUUsNEJBQTRCLEVBQUM7O0FBTW5EOzs7O0dBSUc7QUFFSCxNQUFNLE9BQU8sVUFBVTtJQW1EckIsWUFBOEMsR0FBRyxFQUFTLFVBQTJCO1FBQTNCLGVBQVUsR0FBVixVQUFVLENBQWlCO1FBMUNyRjs7OztXQUlHO1FBQ00sYUFBUSxHQUFHLEtBQUssQ0FBQztRQW1CMUI7Ozs7V0FJRztRQUNPLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBUSxD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QyxPQUFPLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM5RSxDQUFDOzt1R0FSVSxVQUFVLGtCQUVOLE1BQU0sOEJBQXVDLFVBQVUsYUFBYyxNQUFNOzJGQUYvRSxVQUFVOzJGQUFWLFVBQVU7a0JBakJ0QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO29CQUN6QixJQUFJLEVBQUU7d0JBQ0osTUFBTSxFQUFFLGVBQWU7d0JBQ3ZCLGtCQUFrQixFQUFFLE1BQU07d0JBQzFCLGtCQUFrQixFQUFFLG1CQUFtQjt3QkFDdkMsYUFBYSxFQUFFLDZDQUE2Qzt3QkFDNUQsTUFBTSxFQUFFLEVBQUU7d0JBQ1YsZ0JBQWdCLEVBQUUsZ0JBQWdCO3dCQUNsQyxrQkFBa0IsRUFBRSxrQkFBa0I7d0JBQ3RDLGlCQUFpQixFQUFFLG1DQUFtQzt3QkFDdEQsc0JBQXNCLEVBQUUsb0RBQW9EO3dCQUM1RSxzQkFBc0IsRUFBRSxnQkFBZ0I7d0JBQ3hDLHNCQUFzQixFQUFFLGtCQUFrQjt3QkFDMUMsU0FBUyxFQUFFLDZDQUE2QztxQkFDekQ7aUJBQ0Y7OzBCQUdNLFNBQVM7MkJBQUMsTUFBTTs4QkFBdUMsVUFBVSxZQUFjLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFmdGVyQ29udGVudENoZWNrZWQsXHJcbiAgQWZ0ZXJDb250ZW50SW5pdCxcclxuICBBdHRyaWJ1dGUsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29udGVudENoaWxkcmVuLFxyXG4gIERpcmVjdGl2ZSxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBmb3J3YXJkUmVmLFxyXG4gIEluamVjdCxcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgUXVlcnlMaXN0LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7dGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQge2lzRGVmaW5lZH0gZnJvbSAnLi4vdXRpbC91dGlsJztcclxuaW1wb3J0IHtOZ2JOYXZDb25maWd9IGZyb20gJy4vbmF2LWNvbmZpZyc7XHJcbmltcG9ydCB7S2V5fSBmcm9tICcuLi91dGlsL2tleSc7XHJcblxyXG5jb25zdCBpc1ZhbGlkTmF2SWQgPSAoaWQ6IGFueSkgPT4gaXNEZWZpbmVkKGlkKSAmJiBpZCAhPT0gJyc7XHJcblxyXG5sZXQgbmF2Q291bnRlciA9IDA7XHJcblxyXG4vKipcclxuICogQ29udGV4dCBwYXNzZWQgdG8gdGhlIG5hdiBjb250ZW50IHRlbXBsYXRlLlxyXG4gKlxyXG4gKiBTZWUgW3RoaXMgZGVtb10oIy9jb21wb25lbnRzL25hdi9leGFtcGxlcyNrZWVwLWNvbnRlbnQpIGFzIHRoZSBleGFtcGxlLlxyXG4gKlxyXG4gKiBAc2luY2UgNS4yLjBcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTmdiTmF2Q29udGVudENvbnRleHQge1xyXG4gIC8qKlxyXG4gICAqIElmIGB0cnVlYCwgY3VycmVudCBuYXYgY29udGVudCBpcyB2aXNpYmxlIGFuZCBhY3RpdmVcclxuICAgKi9cclxuICAkaW1wbGljaXQ6IGJvb2xlYW47XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogVGhpcyBkaXJlY3RpdmUgbXVzdCBiZSB1c2VkIHRvIHdyYXAgY29udGVudCB0byBiZSBkaXNwbGF5ZWQgaW4gdGhlIG5hdi5cclxuICpcclxuICogQHNpbmNlIDUuMi4wXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nLXRlbXBsYXRlW25nYk5hdkNvbnRlbnRdJ30pXHJcbmV4cG9ydCBjbGFzcyBOZ2JOYXZDb250ZW50IHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogVGhlIGRpcmVjdGl2ZSB1c2VkIHRvIGdyb3VwIG5hdiBsaW5rIGFuZCByZWxhdGVkIG5hdiBjb250ZW50LiBBcyB3ZWxsIGFzIHNldCBuYXYgaWRlbnRpZmllciBhbmQgc29tZSBvcHRpb25zLlxyXG4gKlxyXG4gKiBAc2luY2UgNS4yLjBcclxuICovXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nYk5hdkl0ZW1dJywgZXhwb3J0QXM6ICduZ2JOYXZJdGVtJywgaG9zdDogeydbY2xhc3MubmF2LWl0ZW1dJzogJ3RydWUnfX0pXHJcbmV4cG9ydCBjbGFzcyBOZ2JOYXZJdGVtIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgT25Jbml0IHtcclxuICBwcml2YXRlIF9uYXY6IE5nYk5hdjtcclxuXHJcbiAgLyoqXHJcbiAgICogSWYgYHRydWVgLCBub24tYWN0aXZlIGN1cnJlbnQgbmF2IGl0ZW0gY29udGVudCB3aWxsIGJlIHJlbW92ZWQgZnJvbSBET01cclxuICAgKiBPdGhlcndpc2UgaXQgd2lsbCBqdXN0IGJlIGhpZGRlblxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRlc3Ryb3lPbkhpZGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIGB0cnVlYCwgdGhlIGN1cnJlbnQgbmF2IGl0ZW0gaXMgZGlzYWJsZWQgYW5kIGNhbid0IGJlIHRvZ2dsZWQgYnkgdXNlci5cclxuICAgKlxyXG4gICAqIE5ldmVydGhlbGVzcyBkaXNhYmxlZCBuYXYgY2FuIGJlIHNlbGVjdGVkIHByb2dyYW1tYXRpY2FsbHkgdmlhIHRoZSBgLnNlbGVjdCgpYCBtZXRob2QgYW5kIHRoZSBgW2FjdGl2ZUlkXWAgYmluZGluZy5cclxuICAgKi9cclxuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgaWQgdXNlZCBmb3IgdGhlIERPTSBlbGVtZW50cy5cclxuICAgKiBNdXN0IGJlIHVuaXF1ZSBpbnNpZGUgdGhlIGRvY3VtZW50IGluIGNhc2UgeW91IGhhdmUgbXVsdGlwbGUgYG5nYk5hdmBzIG9uIHRoZSBwYWdlLlxyXG4gICAqXHJcbiAgICogQXV0b2dlbmVyYXRlZCBhcyBgbmdiLW5hdi1YWFhgIGlmIG5vdCBwcm92aWRlZC5cclxuICAgKi9cclxuICBASW5wdXQoKSBkb21JZDogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgaWQgdXNlZCBhcyBhIG1vZGVsIGZvciBhY3RpdmUgbmF2LlxyXG4gICAqIEl0IGNhbiBiZSBhbnl0aGluZywgYnV0IG11c3QgYmUgdW5pcXVlIGluc2lkZSBvbmUgYG5nYk5hdmAuXHJcbiAgICpcclxuICAgKiBUaGUgb25seSBsaW1pdGF0aW9uIGlzIHRoYXQgaXQgaXMgbm90IHBvc3NpYmxlIHRvIGhhdmUgdGhlIGAnJ2AgKGVtcHR5IHN0cmluZykgYXMgaWQsXHJcbiAgICogYmVjYXVzZSBgIG5nYk5hdkl0ZW0gYCwgYG5nYk5hdkl0ZW09JydgIGFuZCBgW25nYk5hdkl0ZW1dPVwiJydcImAgYXJlIGluZGlzdGluZ3Vpc2hhYmxlXHJcbiAgICovXHJcbiAgQElucHV0KCduZ2JOYXZJdGVtJykgX2lkOiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZmFkZSBpbiB0cmFuc2l0aW9uIGlzIGZpbmlzaGVkIG9uIHRoZSByZWxhdGVkIG5hdiBjb250ZW50XHJcbiAgICpcclxuICAgKiBAc2luY2UgOC4wLjBcclxuICAgKi9cclxuICBAT3V0cHV0KCkgc2hvd24gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZmFkZSBvdXQgdHJhbnNpdGlvbiBpcyBmaW5pc2hlZCBvbiB0aGUgcmVsYXRlZCBuYXYgY29udGVudFxyXG4gICAqXHJcbiAgICogQHNpbmNlIDguMC4wXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGhpZGRlbiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuXHJcbiAgY29udGVudFRwbDogTmdiTmF2Q29udGVudCB8IG51bGw7XHJcblxyXG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiTmF2Q29udGVudCwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIGNvbnRlbnRUcGxzOiBRdWVyeUxpc3Q8TmdiTmF2Q29udGVudD47XHJcblxyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ2JOYXYpKSBuYXYsIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmPGFueT4pIHtcclxuICAgIC8vIFRPRE86IGNmIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzMwMTA2XHJcbiAgICB0aGlzLl9uYXYgPSBuYXY7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XHJcbiAgICAvLyBXZSBhcmUgdXNpbmcgQENvbnRlbnRDaGlsZHJlbiBpbnN0ZWFkIG9mIEBDb250ZW50Q2hpbGQgYXMgaW4gdGhlIEFuZ3VsYXIgdmVyc2lvbiBiZWluZyB1c2VkXHJcbiAgICAvLyBvbmx5IEBDb250ZW50Q2hpbGRyZW4gYWxsb3dzIHVzIHRvIHNwZWNpZnkgdGhlIHtkZXNjZW5kYW50czogZmFsc2V9IG9wdGlvbi5cclxuICAgIC8vIFdpdGhvdXQge2Rlc2NlbmRhbnRzOiBmYWxzZX0gd2UgYXJlIGhpdHRpbmcgYnVncyBkZXNjcmliZWQgaW46XHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9pc3N1ZXMvMjI0MFxyXG4gICAgdGhpcy5jb250ZW50VHBsID0gdGhpcy5jb250ZW50VHBscy5maXJzdDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKCFpc0RlZmluZWQodGhpcy5kb21JZCkpIHtcclxuICAgICAgdGhpcy5kb21JZCA9IGBuZ2ItbmF2LSR7bmF2Q291bnRlcisrfWA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQgYWN0aXZlKCkgeyByZXR1cm4gdGhpcy5fbmF2LmFjdGl2ZUlkID09PSB0aGlzLmlkOyB9XHJcblxyXG4gIGdldCBpZCgpIHsgcmV0dXJuIGlzVmFsaWROYXZJZCh0aGlzLl9pZCkgPyB0aGlzLl9pZCA6IHRoaXMuZG9tSWQ7IH1cclxuXHJcbiAgZ2V0IHBhbmVsRG9tSWQoKSB7IHJldHVybiBgJHt0aGlzLmRvbUlkfS1wYW5lbGA7IH1cclxuXHJcbiAgaXNQYW5lbEluRG9tKCkge1xyXG4gICAgcmV0dXJuIChpc0RlZmluZWQodGhpcy5kZXN0cm95T25IaWRlKSA/ICF0aGlzLmRlc3Ryb3lPbkhpZGUgOiAhdGhpcy5fbmF2LmRlc3Ryb3lPbkhpZGUpIHx8IHRoaXMuYWN0aXZlO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBBIG5hdiBkaXJlY3RpdmUgdGhhdCBoZWxwcyB3aXRoIGltcGxlbWVudGluZyB0YWJiZWQgbmF2aWdhdGlvbiBjb21wb25lbnRzLlxyXG4gKlxyXG4gKiBAc2luY2UgNS4yLjBcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW25nYk5hdl0nLFxyXG4gIGV4cG9ydEFzOiAnbmdiTmF2JyxcclxuICBob3N0OiB7XHJcbiAgICAnW2NsYXNzLm5hdl0nOiAndHJ1ZScsXHJcbiAgICAnW2NsYXNzLmZsZXgtY29sdW1uXSc6IGBvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJ2AsXHJcbiAgICAnW2F0dHIuYXJpYS1vcmllbnRhdGlvbl0nOiBgb3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcgJiYgcm9sZXMgPT09ICd0YWJsaXN0JyA/ICd2ZXJ0aWNhbCcgOiB1bmRlZmluZWRgLFxyXG4gICAgJ1thdHRyLnJvbGVdJzogYHJvbGUgPyByb2xlIDogcm9sZXMgPyAndGFibGlzdCcgOiB1bmRlZmluZWRgLFxyXG4gICAgJyhrZXlkb3duLmFycm93TGVmdCknOiAnb25LZXlEb3duKCRldmVudCknLFxyXG4gICAgJyhrZXlkb3duLmFycm93UmlnaHQpJzogJ29uS2V5RG93bigkZXZlbnQpJyxcclxuICAgICcoa2V5ZG93bi5hcnJvd0Rvd24pJzogJ29uS2V5RG93bigkZXZlbnQpJyxcclxuICAgICcoa2V5ZG93bi5hcnJvd1VwKSc6ICdvbktleURvd24oJGV2ZW50KScsXHJcbiAgICAnKGtleWRvd24uSG9tZSknOiAnb25LZXlEb3duKCRldmVudCknLFxyXG4gICAgJyhrZXlkb3duLkVuZCknOiAnb25LZXlEb3duKCRldmVudCknXHJcbiAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiTmF2IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCxcclxuICAgIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfb3JpZW50YXRpb246IHN0cmluZztcclxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfcm9sZXM6IGJvb2xlYW4gfCBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBpZCBvZiB0aGUgbmF2IHRoYXQgc2hvdWxkIGJlIGFjdGl2ZVxyXG4gICAqXHJcbiAgICogWW91IGNvdWxkIGFsc28gdXNlIHRoZSBgLnNlbGVjdCgpYCBtZXRob2QgYW5kIHRoZSBgKG5hdkNoYW5nZSlgIGV2ZW50XHJcbiAgICovXHJcbiAgQElucHV0KCkgYWN0aXZlSWQ6IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGV2ZW50IGVtaXR0ZWQgYWZ0ZXIgdGhlIGFjdGl2ZSBuYXYgY2hhbmdlc1xyXG4gICAqIFRoZSBwYXlsb2FkIG9mIHRoZSBldmVudCBpcyB0aGUgbmV3bHkgYWN0aXZlIG5hdiBpZFxyXG4gICAqXHJcbiAgICogSWYgeW91IHdhbnQgdG8gcHJldmVudCBuYXYgY2hhbmdlLCB5b3Ugc2hvdWxkIHVzZSBgKG5hdkNoYW5nZSlgIGV2ZW50XHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGFjdGl2ZUlkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIGB0cnVlYCwgbmF2IGNoYW5nZSB3aWxsIGJlIGFuaW1hdGVkLlxyXG4gICAqXHJcbiAgICogQHNpbmNlIDguMC4wXHJcbiAgICovXHJcbiAgQElucHV0KCkgYW5pbWF0aW9uOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBJZiBgdHJ1ZWAsIG5vbi1hY3RpdmUgbmF2IGNvbnRlbnQgd2lsbCBiZSByZW1vdmVkIGZyb20gRE9NXHJcbiAgICogT3RoZXJ3aXNlIGl0IHdpbGwganVzdCBiZSBoaWRkZW5cclxuICAgKi9cclxuICBASW5wdXQoKSBkZXN0cm95T25IaWRlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgb3JpZW50YXRpb24gb2YgbmF2cy5cclxuICAgKlxyXG4gICAqIFVzaW5nIGB2ZXJ0aWNhbGAgd2lsbCBhbHNvIGFkZCB0aGUgYGFyaWEtb3JpZW50YXRpb25gIGF0dHJpYnV0ZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnO1xyXG5cclxuICAvKipcclxuICAgKiBSb2xlIGF0dHJpYnV0ZSBnZW5lcmF0aW5nIHN0cmF0ZWd5OlxyXG4gICAqIC0gYGZhbHNlYCAtIG5vIHJvbGUgYXR0cmlidXRlcyB3aWxsIGJlIGdlbmVyYXRlZFxyXG4gICAqIC0gYCd0YWJsaXN0J2AgLSAndGFibGlzdCcsICd0YWInIGFuZCAndGFicGFuZWwnIHdpbGwgYmUgZ2VuZXJhdGVkIChkZWZhdWx0KVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHJvbGVzOiAndGFibGlzdCcgfCBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogS2V5Ym9hcmQgc3VwcG9ydCBmb3IgbmF2IGZvY3VzL3NlbGVjdGlvbiB1c2luZyBhcnJvdyBrZXlzLlxyXG4gICAqXHJcbiAgICogKiBgZmFsc2VgIC0gbm8ga2V5Ym9hcmQgc3VwcG9ydC5cclxuICAgKiAqIGB0cnVlYCAtIG5hdnMgd2lsbCBiZSBmb2N1c2VkIHVzaW5nIGtleWJvYXJkIGFycm93IGtleXNcclxuICAgKiAqIGAnY2hhbmdlV2l0aEFycm93cydgIC0gIG5hdiB3aWxsIGJlIHNlbGVjdGVkIHVzaW5nIGtleWJvYXJkIGFycm93IGtleXNcclxuICAgKlxyXG4gICAqIFNlZSB0aGUgW2xpc3Qgb2YgYXZhaWxhYmxlIGtleWJvYXJkIHNob3J0Y3V0c10oIy9jb21wb25lbnRzL25hdi9vdmVydmlldyNrZXlib2FyZC1zaG9ydGN1dHMpLlxyXG4gICAqXHJcbiAgICogQHNpbmNlIDYuMS4wXHJcbiAqL1xyXG4gIEBJbnB1dCgpIGtleWJvYXJkOiBib29sZWFuIHwgJ2NoYW5nZVdpdGhBcnJvd3MnO1xyXG5cclxuICAvKipcclxuICAgKiBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIGZhZGUgaW4gdHJhbnNpdGlvbiBpcyBmaW5pc2hlZCBmb3Igb25lIG9mIHRoZSBpdGVtcy5cclxuICAgKlxyXG4gICAqIFBheWxvYWQgb2YgdGhlIGV2ZW50IGlzIHRoZSBuYXYgaWQgdGhhdCB3YXMganVzdCBzaG93bi5cclxuICAgKlxyXG4gICAqIEBzaW5jZSA4LjAuMFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzaG93biA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAvKipcclxuICAgKiBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIGZhZGUgb3V0IHRyYW5zaXRpb24gaXMgZmluaXNoZWQgZm9yIG9uZSBvZiB0aGUgaXRlbXMuXHJcbiAgICpcclxuICAgKiBQYXlsb2FkIG9mIHRoZSBldmVudCBpcyB0aGUgbmF2IGlkIHRoYXQgd2FzIGp1c3QgaGlkZGVuLlxyXG4gICAqXHJcbiAgICogQHNpbmNlIDguMC4wXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGhpZGRlbiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICBAQ29udGVudENoaWxkcmVuKE5nYk5hdkl0ZW0pIGl0ZW1zOiBRdWVyeUxpc3Q8TmdiTmF2SXRlbT47XHJcbiAgQENvbnRlbnRDaGlsZHJlbihmb3J3YXJkUmVmKCgpID0+IE5nYk5hdkxpbmspLCB7ZGVzY2VuZGFudHM6IHRydWV9KSBsaW5rczogUXVlcnlMaXN0PE5nYk5hdkxpbms+O1xyXG5cclxuICBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcbiAgbmF2SXRlbUNoYW5nZSQgPSBuZXcgU3ViamVjdDxOZ2JOYXZJdGVtIHwgbnVsbD4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIEBBdHRyaWJ1dGUoJ3JvbGUnKSBwdWJsaWMgcm9sZTogc3RyaW5nLCBjb25maWc6IE5nYk5hdkNvbmZpZywgcHJpdmF0ZSBfY2Q6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55KSB7XHJcbiAgICB0aGlzLmFuaW1hdGlvbiA9IGNvbmZpZy5hbmltYXRpb247XHJcbiAgICB0aGlzLmRlc3Ryb3lPbkhpZGUgPSBjb25maWcuZGVzdHJveU9uSGlkZTtcclxuICAgIHRoaXMub3JpZW50YXRpb24gPSBjb25maWcub3JpZW50YXRpb247XHJcbiAgICB0aGlzLnJvbGVzID0gY29uZmlnLnJvbGVzO1xyXG4gICAgdGhpcy5rZXlib2FyZCA9IGNvbmZpZy5rZXlib2FyZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBuYXYgY2hhbmdlIGV2ZW50IGVtaXR0ZWQgcmlnaHQgYmVmb3JlIHRoZSBuYXYgY2hhbmdlIGhhcHBlbnMgb24gdXNlciBjbGljay5cclxuICAgKlxyXG4gICAqIFRoaXMgZXZlbnQgd29uJ3QgYmUgZW1pdHRlZCBpZiBuYXYgaXMgY2hhbmdlZCBwcm9ncmFtbWF0aWNhbGx5IHZpYSBgW2FjdGl2ZUlkXWAgb3IgYC5zZWxlY3QoKWAuXHJcbiAgICpcclxuICAgKiBTZWUgW2BOZ2JOYXZDaGFuZ2VFdmVudGBdKCMvY29tcG9uZW50cy9uYXYvYXBpI05nYk5hdkNoYW5nZUV2ZW50KSBmb3IgcGF5bG9hZCBkZXRhaWxzLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBuYXZDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYk5hdkNoYW5nZUV2ZW50PigpO1xyXG5cclxuICBjbGljayhpdGVtOiBOZ2JOYXZJdGVtKSB7XHJcbiAgICBpZiAoIWl0ZW0uZGlzYWJsZWQpIHtcclxuICAgICAgdGhpcy5fdXBkYXRlQWN0aXZlSWQoaXRlbS5pZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgIGlmICh0aGlzLnJvbGVzICE9PSAndGFibGlzdCcgfHwgIXRoaXMua2V5Ym9hcmQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGRlcHJlY2F0aW9uL2RlcHJlY2F0aW9uICovXHJcbiAgICBjb25zdCBrZXkgPSBldmVudC53aGljaDtcclxuICAgIGNvbnN0IGVuYWJsZWRMaW5rcyA9IHRoaXMubGlua3MuZmlsdGVyKGxpbmsgPT4gIWxpbmsubmF2SXRlbS5kaXNhYmxlZCk7XHJcbiAgICBjb25zdCB7bGVuZ3RofSA9IGVuYWJsZWRMaW5rcztcclxuXHJcbiAgICBsZXQgcG9zaXRpb24gPSAtMTtcclxuXHJcbiAgICBlbmFibGVkTGlua3MuZm9yRWFjaCgobGluaywgaW5kZXgpID0+IHtcclxuICAgICAgaWYgKGxpbmsuZWxSZWYubmF0aXZlRWxlbWVudCA9PT0gdGhpcy5fZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xyXG4gICAgICAgIHBvc2l0aW9uID0gaW5kZXg7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChsZW5ndGgpIHtcclxuICAgICAgc3dpdGNoIChrZXkpIHtcclxuICAgICAgICBjYXNlIEtleS5BcnJvd0xlZnQ6XHJcbiAgICAgICAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBwb3NpdGlvbiA9IChwb3NpdGlvbiAtIDEgKyBsZW5ndGgpICUgbGVuZ3RoO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBLZXkuQXJyb3dSaWdodDpcclxuICAgICAgICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHBvc2l0aW9uID0gKHBvc2l0aW9uICsgMSkgJSBsZW5ndGg7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEtleS5BcnJvd0Rvd246XHJcbiAgICAgICAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHBvc2l0aW9uID0gKHBvc2l0aW9uICsgMSkgJSBsZW5ndGg7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEtleS5BcnJvd1VwOlxyXG4gICAgICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBwb3NpdGlvbiA9IChwb3NpdGlvbiAtIDEgKyBsZW5ndGgpICUgbGVuZ3RoO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBLZXkuSG9tZTpcclxuICAgICAgICAgIHBvc2l0aW9uID0gMDtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgS2V5LkVuZDpcclxuICAgICAgICAgIHBvc2l0aW9uID0gbGVuZ3RoIC0gMTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLmtleWJvYXJkID09PSAnY2hhbmdlV2l0aEFycm93cycpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdChlbmFibGVkTGlua3NbcG9zaXRpb25dLm5hdkl0ZW0uaWQpO1xyXG4gICAgICB9XHJcbiAgICAgIGVuYWJsZWRMaW5rc1twb3NpdGlvbl0uZWxSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG5cclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlbGVjdHMgdGhlIG5hdiB3aXRoIHRoZSBnaXZlbiBpZCBhbmQgc2hvd3MgaXRzIGFzc29jaWF0ZWQgcGFuZS5cclxuICAgKiBBbnkgb3RoZXIgbmF2IHRoYXQgd2FzIHByZXZpb3VzbHkgc2VsZWN0ZWQgYmVjb21lcyB1bnNlbGVjdGVkIGFuZCBpdHMgYXNzb2NpYXRlZCBwYW5lIGlzIGhpZGRlbi5cclxuICAgKi9cclxuICBzZWxlY3QoaWQ6IGFueSkgeyB0aGlzLl91cGRhdGVBY3RpdmVJZChpZCwgZmFsc2UpOyB9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgIGlmICghaXNEZWZpbmVkKHRoaXMuYWN0aXZlSWQpKSB7XHJcbiAgICAgIGNvbnN0IG5leHRJZCA9IHRoaXMuaXRlbXMuZmlyc3QgPyB0aGlzLml0ZW1zLmZpcnN0LmlkIDogbnVsbDtcclxuICAgICAgaWYgKGlzVmFsaWROYXZJZChuZXh0SWQpKSB7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlQWN0aXZlSWQobmV4dElkLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5fY2QuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pdGVtcy5jaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fbm90aWZ5SXRlbUNoYW5nZWQodGhpcy5hY3RpdmVJZCkpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoe2FjdGl2ZUlkfTogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgaWYgKGFjdGl2ZUlkICYmICFhY3RpdmVJZC5maXJzdENoYW5nZSkge1xyXG4gICAgICB0aGlzLl9ub3RpZnlJdGVtQ2hhbmdlZChhY3RpdmVJZC5jdXJyZW50VmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7IHRoaXMuZGVzdHJveSQubmV4dCgpOyB9XHJcblxyXG4gIHByaXZhdGUgX3VwZGF0ZUFjdGl2ZUlkKG5leHRJZDogYW55LCBlbWl0TmF2Q2hhbmdlID0gdHJ1ZSkge1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlSWQgIT09IG5leHRJZCkge1xyXG4gICAgICBsZXQgZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgaWYgKGVtaXROYXZDaGFuZ2UpIHtcclxuICAgICAgICB0aGlzLm5hdkNoYW5nZS5lbWl0KHthY3RpdmVJZDogdGhpcy5hY3RpdmVJZCwgbmV4dElkLCBwcmV2ZW50RGVmYXVsdDogKCkgPT4geyBkZWZhdWx0UHJldmVudGVkID0gdHJ1ZTsgfX0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWRlZmF1bHRQcmV2ZW50ZWQpIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZUlkID0gbmV4dElkO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlSWRDaGFuZ2UuZW1pdChuZXh0SWQpO1xyXG4gICAgICAgIHRoaXMuX25vdGlmeUl0ZW1DaGFuZ2VkKG5leHRJZCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX25vdGlmeUl0ZW1DaGFuZ2VkKG5leHRJdGVtSWQ6IGFueSkgeyB0aGlzLm5hdkl0ZW1DaGFuZ2UkLm5leHQodGhpcy5fZ2V0SXRlbUJ5SWQobmV4dEl0ZW1JZCkpOyB9XHJcblxyXG4gIHByaXZhdGUgX2dldEl0ZW1CeUlkKGl0ZW1JZDogYW55KTogTmdiTmF2SXRlbSB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuaXRlbXMgJiYgdGhpcy5pdGVtcy5maW5kKGl0ZW0gPT4gaXRlbS5pZCA9PT0gaXRlbUlkKSB8fCBudWxsO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBBIGRpcmVjdGl2ZSB0byBwdXQgb24gdGhlIG5hdiBsaW5rLlxyXG4gKlxyXG4gKiBAc2luY2UgNS4yLjBcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnYVtuZ2JOYXZMaW5rXScsXHJcbiAgaG9zdDoge1xyXG4gICAgJ1tpZF0nOiAnbmF2SXRlbS5kb21JZCcsXHJcbiAgICAnW2NsYXNzLm5hdi1saW5rXSc6ICd0cnVlJyxcclxuICAgICdbY2xhc3MubmF2LWl0ZW1dJzogJ2hhc05hdkl0ZW1DbGFzcygpJyxcclxuICAgICdbYXR0ci5yb2xlXSc6IGByb2xlID8gcm9sZSA6IG5hdi5yb2xlcyA/ICd0YWInIDogdW5kZWZpbmVkYCxcclxuICAgICdocmVmJzogJycsXHJcbiAgICAnW2NsYXNzLmFjdGl2ZV0nOiAnbmF2SXRlbS5hY3RpdmUnLFxyXG4gICAgJ1tjbGFzcy5kaXNhYmxlZF0nOiAnbmF2SXRlbS5kaXNhYmxlZCcsXHJcbiAgICAnW2F0dHIudGFiaW5kZXhdJzogJ25hdkl0ZW0uZGlzYWJsZWQgPyAtMSA6IHVuZGVmaW5lZCcsXHJcbiAgICAnW2F0dHIuYXJpYS1jb250cm9sc10nOiAnbmF2SXRlbS5pc1BhbmVsSW5Eb20oKSA/IG5hdkl0ZW0ucGFuZWxEb21JZCA6IG51bGwnLFxyXG4gICAgJ1thdHRyLmFyaWEtc2VsZWN0ZWRdJzogJ25hdkl0ZW0uYWN0aXZlJyxcclxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICduYXZJdGVtLmRpc2FibGVkJyxcclxuICAgICcoY2xpY2spJzogJ25hdi5jbGljayhuYXZJdGVtKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KCknXHJcbiAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiTmF2TGluayB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIEBBdHRyaWJ1dGUoJ3JvbGUnKSBwdWJsaWMgcm9sZTogc3RyaW5nLCBwdWJsaWMgbmF2SXRlbTogTmdiTmF2SXRlbSwgcHVibGljIG5hdjogTmdiTmF2LFxyXG4gICAgICBwdWJsaWMgZWxSZWY6IEVsZW1lbnRSZWYpIHt9XHJcblxyXG4gIGhhc05hdkl0ZW1DbGFzcygpIHtcclxuICAgIC8vIHdpdGggYWx0ZXJuYXRpdmUgbWFya3VwIHdlIGhhdmUgdG8gYWRkIGAubmF2LWl0ZW1gIGNsYXNzLCBiZWNhdXNlIGBuZ2JOYXZJdGVtYCBpcyBvbiB0aGUgbmctY29udGFpbmVyXHJcbiAgICByZXR1cm4gdGhpcy5uYXZJdGVtLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5ub2RlVHlwZSA9PT0gTm9kZS5DT01NRU5UX05PREU7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIFRoZSBwYXlsb2FkIG9mIHRoZSBjaGFuZ2UgZXZlbnQgZW1pdHRlZCByaWdodCBiZWZvcmUgdGhlIG5hdiBjaGFuZ2UgaGFwcGVucyBvbiB1c2VyIGNsaWNrLlxyXG4gKlxyXG4gKiBUaGlzIGV2ZW50IHdvbid0IGJlIGVtaXR0ZWQgaWYgbmF2IGlzIGNoYW5nZWQgcHJvZ3JhbW1hdGljYWxseSB2aWEgYFthY3RpdmVJZF1gIG9yIGAuc2VsZWN0KClgLlxyXG4gKlxyXG4gKiBAc2luY2UgNS4yLjBcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTmdiTmF2Q2hhbmdlRXZlbnQ8VCA9IGFueT4ge1xyXG4gIC8qKlxyXG4gICAqIElkIG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlIG5hdi5cclxuICAgKi9cclxuICBhY3RpdmVJZDogVDtcclxuXHJcbiAgLyoqXHJcbiAgICogSWQgb2YgdGhlIG5ld2x5IHNlbGVjdGVkIG5hdi5cclxuICAgKi9cclxuICBuZXh0SWQ6IFQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHRoYXQgd2lsbCBwcmV2ZW50IG5hdiBjaGFuZ2UgaWYgY2FsbGVkLlxyXG4gICAqL1xyXG4gIHByZXZlbnREZWZhdWx0OiAoKSA9PiB2b2lkO1xyXG59XHJcbiJdfQ==