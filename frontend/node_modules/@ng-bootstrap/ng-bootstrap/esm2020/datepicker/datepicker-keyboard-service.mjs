import { Injectable } from '@angular/core';
import { Key } from '../util/key';
import * as i0 from "@angular/core";
/**
 * A service that represents the keyboard navigation.
 *
 * Default keyboard shortcuts [are documented in the overview](#/components/datepicker/overview#keyboard-shortcuts)
 *
 * @since 5.2.0
 */
export class NgbDatepickerKeyboardService {
    /**
     * Processes a keyboard event.
     */
    processKey(event, datepicker) {
        const { state, calendar } = datepicker;
        /* eslint-disable-next-line deprecation/deprecation */
        switch (event.which) {
            case Key.PageUp:
                datepicker.focusDate(calendar.getPrev(state.focusedDate, event.shiftKey ? 'y' : 'm', 1));
                break;
            case Key.PageDown:
                datepicker.focusDate(calendar.getNext(state.focusedDate, event.shiftKey ? 'y' : 'm', 1));
                break;
            case Key.End:
                datepicker.focusDate(event.shiftKey ? state.maxDate : state.lastDate);
                break;
            case Key.Home:
                datepicker.focusDate(event.shiftKey ? state.minDate : state.firstDate);
                break;
            case Key.ArrowLeft:
                datepicker.focusDate(calendar.getPrev(state.focusedDate, 'd', 1));
                break;
            case Key.ArrowUp:
                datepicker.focusDate(calendar.getPrev(state.focusedDate, 'd', calendar.getDaysPerWeek()));
                break;
            case Key.ArrowRight:
                datepicker.focusDate(calendar.getNext(state.focusedDate, 'd', 1));
                break;
            case Key.ArrowDown:
                datepicker.focusDate(calendar.getNext(state.focusedDate, 'd', calendar.getDaysPerWeek()));
                break;
            case Key.Enter:
            case Key.Space:
                datepicker.focusSelect();
                break;
            default:
                return;
        }
        event.preventDefault();
        event.stopPropagation();
    }
}
NgbDatepickerKeyboardService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDatepickerKeyboardService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NgbDatepickerKeyboardService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDatepickerKeyboardService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDatepickerKeyboardService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1rZXlib2FyZC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci1rZXlib2FyZC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGFBQWEsQ0FBQzs7QUFFaEM7Ozs7OztHQU1HO0FBRUgsTUFBTSxPQUFPLDRCQUE0QjtJQUN2Qzs7T0FFRztJQUNILFVBQVUsQ0FBQyxLQUFvQixFQUFFLFVBQXlCO1FBQ3hELE1BQU0sRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFDLEdBQUcsVUFBVSxDQUFDO1FBQ3JDLHNEQUFzRDtRQUN0RCxRQUFRLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDbkIsS0FBSyxHQUFHLENBQUMsTUFBTTtnQkFDYixVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6RixNQUFNO1lBQ1IsS0FBSyxHQUFHLENBQUMsUUFBUTtnQkFDZixVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6RixNQUFNO1lBQ1IsS0FBSyxHQUFHLENBQUMsR0FBRztnQkFDVixVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEUsTUFBTTtZQUNSLEtBQUssR0FBRyxDQUFDLElBQUk7Z0JBQ1gsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3ZFLE1BQU07WUFDUixLQUFLLEdBQUcsQ0FBQyxTQUFTO2dCQUNoQixVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEUsTUFBTTtZQUNSLEtBQUssR0FBRyxDQUFDLE9BQU87Z0JBQ2QsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzFGLE1BQU07WUFDUixLQUFLLEdBQUcsQ0FBQyxVQUFVO2dCQUNqQixVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEUsTUFBTTtZQUNSLEtBQUssR0FBRyxDQUFDLFNBQVM7Z0JBQ2hCLFVBQVUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMxRixNQUFNO1lBQ1IsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ2YsS0FBSyxHQUFHLENBQUMsS0FBSztnQkFDWixVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3pCLE1BQU07WUFDUjtnQkFDRSxPQUFPO1NBQ1Y7UUFDRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzFCLENBQUM7O3lIQXpDVSw0QkFBNEI7NkhBQTVCLDRCQUE0QixjQURoQixNQUFNOzJGQUNsQiw0QkFBNEI7a0JBRHhDLFVBQVU7bUJBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ2JEYXRlcGlja2VyfSBmcm9tICcuL2RhdGVwaWNrZXInO1xyXG5pbXBvcnQge0tleX0gZnJvbSAnLi4vdXRpbC9rZXknO1xyXG5cclxuLyoqXHJcbiAqIEEgc2VydmljZSB0aGF0IHJlcHJlc2VudHMgdGhlIGtleWJvYXJkIG5hdmlnYXRpb24uXHJcbiAqXHJcbiAqIERlZmF1bHQga2V5Ym9hcmQgc2hvcnRjdXRzIFthcmUgZG9jdW1lbnRlZCBpbiB0aGUgb3ZlcnZpZXddKCMvY29tcG9uZW50cy9kYXRlcGlja2VyL292ZXJ2aWV3I2tleWJvYXJkLXNob3J0Y3V0cylcclxuICpcclxuICogQHNpbmNlIDUuMi4wXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcclxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJLZXlib2FyZFNlcnZpY2Uge1xyXG4gIC8qKlxyXG4gICAqIFByb2Nlc3NlcyBhIGtleWJvYXJkIGV2ZW50LlxyXG4gICAqL1xyXG4gIHByb2Nlc3NLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGRhdGVwaWNrZXI6IE5nYkRhdGVwaWNrZXIpIHtcclxuICAgIGNvbnN0IHtzdGF0ZSwgY2FsZW5kYXJ9ID0gZGF0ZXBpY2tlcjtcclxuICAgIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBkZXByZWNhdGlvbi9kZXByZWNhdGlvbiAqL1xyXG4gICAgc3dpdGNoIChldmVudC53aGljaCkge1xyXG4gICAgICBjYXNlIEtleS5QYWdlVXA6XHJcbiAgICAgICAgZGF0ZXBpY2tlci5mb2N1c0RhdGUoY2FsZW5kYXIuZ2V0UHJldihzdGF0ZS5mb2N1c2VkRGF0ZSwgZXZlbnQuc2hpZnRLZXkgPyAneScgOiAnbScsIDEpKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBLZXkuUGFnZURvd246XHJcbiAgICAgICAgZGF0ZXBpY2tlci5mb2N1c0RhdGUoY2FsZW5kYXIuZ2V0TmV4dChzdGF0ZS5mb2N1c2VkRGF0ZSwgZXZlbnQuc2hpZnRLZXkgPyAneScgOiAnbScsIDEpKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBLZXkuRW5kOlxyXG4gICAgICAgIGRhdGVwaWNrZXIuZm9jdXNEYXRlKGV2ZW50LnNoaWZ0S2V5ID8gc3RhdGUubWF4RGF0ZSA6IHN0YXRlLmxhc3REYXRlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBLZXkuSG9tZTpcclxuICAgICAgICBkYXRlcGlja2VyLmZvY3VzRGF0ZShldmVudC5zaGlmdEtleSA/IHN0YXRlLm1pbkRhdGUgOiBzdGF0ZS5maXJzdERhdGUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEtleS5BcnJvd0xlZnQ6XHJcbiAgICAgICAgZGF0ZXBpY2tlci5mb2N1c0RhdGUoY2FsZW5kYXIuZ2V0UHJldihzdGF0ZS5mb2N1c2VkRGF0ZSwgJ2QnLCAxKSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgS2V5LkFycm93VXA6XHJcbiAgICAgICAgZGF0ZXBpY2tlci5mb2N1c0RhdGUoY2FsZW5kYXIuZ2V0UHJldihzdGF0ZS5mb2N1c2VkRGF0ZSwgJ2QnLCBjYWxlbmRhci5nZXREYXlzUGVyV2VlaygpKSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgS2V5LkFycm93UmlnaHQ6XHJcbiAgICAgICAgZGF0ZXBpY2tlci5mb2N1c0RhdGUoY2FsZW5kYXIuZ2V0TmV4dChzdGF0ZS5mb2N1c2VkRGF0ZSwgJ2QnLCAxKSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgS2V5LkFycm93RG93bjpcclxuICAgICAgICBkYXRlcGlja2VyLmZvY3VzRGF0ZShjYWxlbmRhci5nZXROZXh0KHN0YXRlLmZvY3VzZWREYXRlLCAnZCcsIGNhbGVuZGFyLmdldERheXNQZXJXZWVrKCkpKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBLZXkuRW50ZXI6XHJcbiAgICAgIGNhc2UgS2V5LlNwYWNlOlxyXG4gICAgICAgIGRhdGVwaWNrZXIuZm9jdXNTZWxlY3QoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==