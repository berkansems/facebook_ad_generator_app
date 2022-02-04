import { fromEvent } from 'rxjs';
import { filter, map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Key } from './key';
export const FOCUSABLE_ELEMENTS_SELECTOR = [
    'a[href]', 'button:not([disabled])', 'input:not([disabled]):not([type="hidden"])', 'select:not([disabled])',
    'textarea:not([disabled])', '[contenteditable]', '[tabindex]:not([tabindex="-1"])'
].join(', ');
/**
 * Returns first and last focusable elements inside of a given element based on specific CSS selector
 */
export function getFocusableBoundaryElements(element) {
    const list = Array.from(element.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR))
        .filter(el => el.tabIndex !== -1);
    return [list[0], list[list.length - 1]];
}
/**
 * Function that enforces browser focus to be trapped inside a DOM element.
 *
 * Works only for clicks inside the element and navigation with 'Tab', ignoring clicks outside of the element
 *
 * @param zone Angular zone
 * @param element The element around which focus will be trapped inside
 * @param stopFocusTrap$ The observable stream. When completed the focus trap will clean up listeners
 * and free internal resources
 * @param refocusOnClick Put the focus back to the last focused element whenever a click occurs on element (default to
 * false)
 */
export const ngbFocusTrap = (zone, element, stopFocusTrap$, refocusOnClick = false) => {
    zone.runOutsideAngular(() => {
        // last focused element
        const lastFocusedElement$ = fromEvent(element, 'focusin').pipe(takeUntil(stopFocusTrap$), map(e => e.target));
        // 'tab' / 'shift+tab' stream
        fromEvent(element, 'keydown')
            .pipe(takeUntil(stopFocusTrap$), 
        /* eslint-disable-next-line deprecation/deprecation */
        filter(e => e.which === Key.Tab), withLatestFrom(lastFocusedElement$))
            .subscribe(([tabEvent, focusedElement]) => {
            const [first, last] = getFocusableBoundaryElements(element);
            if ((focusedElement === first || focusedElement === element) && tabEvent.shiftKey) {
                last.focus();
                tabEvent.preventDefault();
            }
            if (focusedElement === last && !tabEvent.shiftKey) {
                first.focus();
                tabEvent.preventDefault();
            }
        });
        // inside click
        if (refocusOnClick) {
            fromEvent(element, 'click')
                .pipe(takeUntil(stopFocusTrap$), withLatestFrom(lastFocusedElement$), map(arr => arr[1]))
                .subscribe(lastFocusedElement => lastFocusedElement.focus());
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtdHJhcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91dGlsL2ZvY3VzLXRyYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFDLFNBQVMsRUFBYSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEUsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUcxQixNQUFNLENBQUMsTUFBTSwyQkFBMkIsR0FBRztJQUN6QyxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsNENBQTRDLEVBQUUsd0JBQXdCO0lBQzNHLDBCQUEwQixFQUFFLG1CQUFtQixFQUFFLGlDQUFpQztDQUNuRixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUViOztHQUVHO0FBQ0gsTUFBTSxVQUFVLDRCQUE0QixDQUFDLE9BQW9CO0lBQy9ELE1BQU0sSUFBSSxHQUNOLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLDJCQUEyQixDQUE0QixDQUFDO1NBQ3ZGLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUMsQ0FBQztBQUVEOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUNyQixDQUFDLElBQVksRUFBRSxPQUFvQixFQUFFLGNBQStCLEVBQUUsY0FBYyxHQUFHLEtBQUssRUFBRSxFQUFFO0lBQzlGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7UUFDMUIsdUJBQXVCO1FBQ3ZCLE1BQU0sbUJBQW1CLEdBQ3JCLFNBQVMsQ0FBYSxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUVsRyw2QkFBNkI7UUFDN0IsU0FBUyxDQUFnQixPQUFPLEVBQUUsU0FBUyxDQUFDO2FBQ3ZDLElBQUksQ0FDRCxTQUFTLENBQUMsY0FBYyxDQUFDO1FBQ3pCLHNEQUFzRDtRQUN0RCxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQzthQUN6RSxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUMsRUFBRSxFQUFFO1lBQ3hDLE1BQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsNEJBQTRCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFM0QsSUFBSSxDQUFDLGNBQWMsS0FBSyxLQUFLLElBQUksY0FBYyxLQUFLLE9BQU8sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pGLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDYixRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDM0I7WUFFRCxJQUFJLGNBQWMsS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO2dCQUNqRCxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2QsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQzNCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFUCxlQUFlO1FBQ2YsSUFBSSxjQUFjLEVBQUU7WUFDbEIsU0FBUyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7aUJBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLEVBQUUsY0FBYyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBZ0IsQ0FBQyxDQUFDO2lCQUN2RyxTQUFTLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDbEU7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Tmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7ZnJvbUV2ZW50LCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtmaWx0ZXIsIG1hcCwgdGFrZVVudGlsLCB3aXRoTGF0ZXN0RnJvbX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHtLZXl9IGZyb20gJy4va2V5JztcclxuXHJcblxyXG5leHBvcnQgY29uc3QgRk9DVVNBQkxFX0VMRU1FTlRTX1NFTEVDVE9SID0gW1xyXG4gICdhW2hyZWZdJywgJ2J1dHRvbjpub3QoW2Rpc2FibGVkXSknLCAnaW5wdXQ6bm90KFtkaXNhYmxlZF0pOm5vdChbdHlwZT1cImhpZGRlblwiXSknLCAnc2VsZWN0Om5vdChbZGlzYWJsZWRdKScsXHJcbiAgJ3RleHRhcmVhOm5vdChbZGlzYWJsZWRdKScsICdbY29udGVudGVkaXRhYmxlXScsICdbdGFiaW5kZXhdOm5vdChbdGFiaW5kZXg9XCItMVwiXSknXHJcbl0uam9pbignLCAnKTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGZpcnN0IGFuZCBsYXN0IGZvY3VzYWJsZSBlbGVtZW50cyBpbnNpZGUgb2YgYSBnaXZlbiBlbGVtZW50IGJhc2VkIG9uIHNwZWNpZmljIENTUyBzZWxlY3RvclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZvY3VzYWJsZUJvdW5kYXJ5RWxlbWVudHMoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudFtdIHtcclxuICBjb25zdCBsaXN0OiBIVE1MRWxlbWVudFtdID1cclxuICAgICAgQXJyYXkuZnJvbShlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoRk9DVVNBQkxFX0VMRU1FTlRTX1NFTEVDVE9SKSBhcyBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PilcclxuICAgICAgICAgIC5maWx0ZXIoZWwgPT4gZWwudGFiSW5kZXggIT09IC0xKTtcclxuICByZXR1cm4gW2xpc3RbMF0sIGxpc3RbbGlzdC5sZW5ndGggLSAxXV07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGdW5jdGlvbiB0aGF0IGVuZm9yY2VzIGJyb3dzZXIgZm9jdXMgdG8gYmUgdHJhcHBlZCBpbnNpZGUgYSBET00gZWxlbWVudC5cclxuICpcclxuICogV29ya3Mgb25seSBmb3IgY2xpY2tzIGluc2lkZSB0aGUgZWxlbWVudCBhbmQgbmF2aWdhdGlvbiB3aXRoICdUYWInLCBpZ25vcmluZyBjbGlja3Mgb3V0c2lkZSBvZiB0aGUgZWxlbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0gem9uZSBBbmd1bGFyIHpvbmVcclxuICogQHBhcmFtIGVsZW1lbnQgVGhlIGVsZW1lbnQgYXJvdW5kIHdoaWNoIGZvY3VzIHdpbGwgYmUgdHJhcHBlZCBpbnNpZGVcclxuICogQHBhcmFtIHN0b3BGb2N1c1RyYXAkIFRoZSBvYnNlcnZhYmxlIHN0cmVhbS4gV2hlbiBjb21wbGV0ZWQgdGhlIGZvY3VzIHRyYXAgd2lsbCBjbGVhbiB1cCBsaXN0ZW5lcnNcclxuICogYW5kIGZyZWUgaW50ZXJuYWwgcmVzb3VyY2VzXHJcbiAqIEBwYXJhbSByZWZvY3VzT25DbGljayBQdXQgdGhlIGZvY3VzIGJhY2sgdG8gdGhlIGxhc3QgZm9jdXNlZCBlbGVtZW50IHdoZW5ldmVyIGEgY2xpY2sgb2NjdXJzIG9uIGVsZW1lbnQgKGRlZmF1bHQgdG9cclxuICogZmFsc2UpXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbmdiRm9jdXNUcmFwID1cclxuICAgICh6b25lOiBOZ1pvbmUsIGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBzdG9wRm9jdXNUcmFwJDogT2JzZXJ2YWJsZTxhbnk+LCByZWZvY3VzT25DbGljayA9IGZhbHNlKSA9PiB7XHJcbiAgICAgIHpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgIC8vIGxhc3QgZm9jdXNlZCBlbGVtZW50XHJcbiAgICAgICAgY29uc3QgbGFzdEZvY3VzZWRFbGVtZW50JCA9XHJcbiAgICAgICAgICAgIGZyb21FdmVudDxGb2N1c0V2ZW50PihlbGVtZW50LCAnZm9jdXNpbicpLnBpcGUodGFrZVVudGlsKHN0b3BGb2N1c1RyYXAkKSwgbWFwKGUgPT4gZS50YXJnZXQpKTtcclxuXHJcbiAgICAgICAgLy8gJ3RhYicgLyAnc2hpZnQrdGFiJyBzdHJlYW1cclxuICAgICAgICBmcm9tRXZlbnQ8S2V5Ym9hcmRFdmVudD4oZWxlbWVudCwgJ2tleWRvd24nKVxyXG4gICAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgICAgIHRha2VVbnRpbChzdG9wRm9jdXNUcmFwJCksXHJcbiAgICAgICAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZGVwcmVjYXRpb24vZGVwcmVjYXRpb24gKi9cclxuICAgICAgICAgICAgICAgIGZpbHRlcihlID0+IGUud2hpY2ggPT09IEtleS5UYWIpLCB3aXRoTGF0ZXN0RnJvbShsYXN0Rm9jdXNlZEVsZW1lbnQkKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoW3RhYkV2ZW50LCBmb2N1c2VkRWxlbWVudF0pID0+IHtcclxuICAgICAgICAgICAgICBjb25zdFtmaXJzdCwgbGFzdF0gPSBnZXRGb2N1c2FibGVCb3VuZGFyeUVsZW1lbnRzKGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICBpZiAoKGZvY3VzZWRFbGVtZW50ID09PSBmaXJzdCB8fCBmb2N1c2VkRWxlbWVudCA9PT0gZWxlbWVudCkgJiYgdGFiRXZlbnQuc2hpZnRLZXkpIHtcclxuICAgICAgICAgICAgICAgIGxhc3QuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIHRhYkV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBpZiAoZm9jdXNlZEVsZW1lbnQgPT09IGxhc3QgJiYgIXRhYkV2ZW50LnNoaWZ0S2V5KSB7XHJcbiAgICAgICAgICAgICAgICBmaXJzdC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgdGFiRXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBpbnNpZGUgY2xpY2tcclxuICAgICAgICBpZiAocmVmb2N1c09uQ2xpY2spIHtcclxuICAgICAgICAgIGZyb21FdmVudChlbGVtZW50LCAnY2xpY2snKVxyXG4gICAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbChzdG9wRm9jdXNUcmFwJCksIHdpdGhMYXRlc3RGcm9tKGxhc3RGb2N1c2VkRWxlbWVudCQpLCBtYXAoYXJyID0+IGFyclsxXSBhcyBIVE1MRWxlbWVudCkpXHJcbiAgICAgICAgICAgICAgLnN1YnNjcmliZShsYXN0Rm9jdXNlZEVsZW1lbnQgPT4gbGFzdEZvY3VzZWRFbGVtZW50LmZvY3VzKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG4iXX0=