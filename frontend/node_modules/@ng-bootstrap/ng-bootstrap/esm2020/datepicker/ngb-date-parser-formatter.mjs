import { padNumber, toInteger, isNumber } from '../util/util';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export function NGB_DATEPICKER_PARSER_FORMATTER_FACTORY() {
    return new NgbDateISOParserFormatter();
}
/**
 * An abstract service for parsing and formatting dates for the
 * [`NgbInputDatepicker`](#/components/datepicker/api#NgbInputDatepicker) directive.
 * Converts between the internal `NgbDateStruct` model presentation and a `string` that is displayed in the
 * input element.
 *
 * When user types something in the input this service attempts to parse it into a `NgbDateStruct` object.
 * And vice versa, when users selects a date in the calendar with the mouse, it must be displayed as a `string`
 * in the input.
 *
 * Default implementation uses the ISO 8601 format, but you can provide another implementation via DI
 * to use an alternative string format or a custom parsing logic.
 *
 * See the [date format overview](#/components/datepicker/overview#date-model) for more details.
 */
export class NgbDateParserFormatter {
}
NgbDateParserFormatter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDateParserFormatter, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NgbDateParserFormatter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDateParserFormatter, providedIn: 'root', useFactory: NGB_DATEPICKER_PARSER_FORMATTER_FACTORY });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDateParserFormatter, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_PARSER_FORMATTER_FACTORY }]
        }] });
export class NgbDateISOParserFormatter extends NgbDateParserFormatter {
    parse(value) {
        if (value != null) {
            const dateParts = value.trim().split('-');
            if (dateParts.length === 1 && isNumber(dateParts[0])) {
                return { year: toInteger(dateParts[0]), month: null, day: null };
            }
            else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
                return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: null };
            }
            else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
                return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: toInteger(dateParts[2]) };
            }
        }
        return null;
    }
    format(date) {
        return date ?
            `${date.year}-${isNumber(date.month) ? padNumber(date.month) : ''}-${isNumber(date.day) ? padNumber(date.day) : ''}` :
            '';
    }
}
NgbDateISOParserFormatter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDateISOParserFormatter, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
NgbDateISOParserFormatter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDateISOParserFormatter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDateISOParserFormatter, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWRhdGUtcGFyc2VyLWZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRlcGlja2VyL25nYi1kYXRlLXBhcnNlci1mb3JtYXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRTVELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBRXpDLE1BQU0sVUFBVSx1Q0FBdUM7SUFDckQsT0FBTyxJQUFJLHlCQUF5QixFQUFFLENBQUM7QUFDekMsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBRUgsTUFBTSxPQUFnQixzQkFBc0I7O21IQUF0QixzQkFBc0I7dUhBQXRCLHNCQUFzQixjQURuQixNQUFNLGNBQWMsdUNBQXVDOzJGQUM5RCxzQkFBc0I7a0JBRDNDLFVBQVU7bUJBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSx1Q0FBdUMsRUFBQzs7QUFvQnJGLE1BQU0sT0FBTyx5QkFBMEIsU0FBUSxzQkFBc0I7SUFDbkUsS0FBSyxDQUFDLEtBQWE7UUFDakIsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ2pCLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUMsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3BELE9BQU8sRUFBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBTyxJQUFJLEVBQUUsR0FBRyxFQUFPLElBQUksRUFBQyxDQUFDO2FBQzFFO2lCQUFNLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDckYsT0FBTyxFQUFDLElBQUksRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQU8sSUFBSSxFQUFDLENBQUM7YUFDeEY7aUJBQU0sSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDL0csT0FBTyxFQUFDLElBQUksRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7YUFDdEc7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUEwQjtRQUMvQixPQUFPLElBQUksQ0FBQyxDQUFDO1lBQ1QsR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3RILEVBQUUsQ0FBQztJQUNULENBQUM7O3NIQW5CVSx5QkFBeUI7MEhBQXpCLHlCQUF5QjsyRkFBekIseUJBQXlCO2tCQURyQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtwYWROdW1iZXIsIHRvSW50ZWdlciwgaXNOdW1iZXJ9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xyXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE5HQl9EQVRFUElDS0VSX1BBUlNFUl9GT1JNQVRURVJfRkFDVE9SWSgpIHtcclxuICByZXR1cm4gbmV3IE5nYkRhdGVJU09QYXJzZXJGb3JtYXR0ZXIoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFuIGFic3RyYWN0IHNlcnZpY2UgZm9yIHBhcnNpbmcgYW5kIGZvcm1hdHRpbmcgZGF0ZXMgZm9yIHRoZVxyXG4gKiBbYE5nYklucHV0RGF0ZXBpY2tlcmBdKCMvY29tcG9uZW50cy9kYXRlcGlja2VyL2FwaSNOZ2JJbnB1dERhdGVwaWNrZXIpIGRpcmVjdGl2ZS5cclxuICogQ29udmVydHMgYmV0d2VlbiB0aGUgaW50ZXJuYWwgYE5nYkRhdGVTdHJ1Y3RgIG1vZGVsIHByZXNlbnRhdGlvbiBhbmQgYSBgc3RyaW5nYCB0aGF0IGlzIGRpc3BsYXllZCBpbiB0aGVcclxuICogaW5wdXQgZWxlbWVudC5cclxuICpcclxuICogV2hlbiB1c2VyIHR5cGVzIHNvbWV0aGluZyBpbiB0aGUgaW5wdXQgdGhpcyBzZXJ2aWNlIGF0dGVtcHRzIHRvIHBhcnNlIGl0IGludG8gYSBgTmdiRGF0ZVN0cnVjdGAgb2JqZWN0LlxyXG4gKiBBbmQgdmljZSB2ZXJzYSwgd2hlbiB1c2VycyBzZWxlY3RzIGEgZGF0ZSBpbiB0aGUgY2FsZW5kYXIgd2l0aCB0aGUgbW91c2UsIGl0IG11c3QgYmUgZGlzcGxheWVkIGFzIGEgYHN0cmluZ2BcclxuICogaW4gdGhlIGlucHV0LlxyXG4gKlxyXG4gKiBEZWZhdWx0IGltcGxlbWVudGF0aW9uIHVzZXMgdGhlIElTTyA4NjAxIGZvcm1hdCwgYnV0IHlvdSBjYW4gcHJvdmlkZSBhbm90aGVyIGltcGxlbWVudGF0aW9uIHZpYSBESVxyXG4gKiB0byB1c2UgYW4gYWx0ZXJuYXRpdmUgc3RyaW5nIGZvcm1hdCBvciBhIGN1c3RvbSBwYXJzaW5nIGxvZ2ljLlxyXG4gKlxyXG4gKiBTZWUgdGhlIFtkYXRlIGZvcm1hdCBvdmVydmlld10oIy9jb21wb25lbnRzL2RhdGVwaWNrZXIvb3ZlcnZpZXcjZGF0ZS1tb2RlbCkgZm9yIG1vcmUgZGV0YWlscy5cclxuICovXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCcsIHVzZUZhY3Rvcnk6IE5HQl9EQVRFUElDS0VSX1BBUlNFUl9GT1JNQVRURVJfRkFDVE9SWX0pXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOZ2JEYXRlUGFyc2VyRm9ybWF0dGVyIHtcclxuICAvKipcclxuICAgKiBQYXJzZXMgdGhlIGdpdmVuIGBzdHJpbmdgIHRvIGFuIGBOZ2JEYXRlU3RydWN0YC5cclxuICAgKlxyXG4gICAqIEltcGxlbWVudGF0aW9ucyBzaG91bGQgdHJ5IHRoZWlyIGJlc3QgdG8gcHJvdmlkZSBhIHJlc3VsdCwgZXZlblxyXG4gICAqIHBhcnRpYWwuIFRoZXkgbXVzdCByZXR1cm4gYG51bGxgIGlmIHRoZSB2YWx1ZSBjYW4ndCBiZSBwYXJzZWQuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgcGFyc2UodmFsdWU6IHN0cmluZyk6IE5nYkRhdGVTdHJ1Y3QgfCBudWxsO1xyXG5cclxuICAvKipcclxuICAgKiBGb3JtYXRzIHRoZSBnaXZlbiBgTmdiRGF0ZVN0cnVjdGAgdG8gYSBgc3RyaW5nYC5cclxuICAgKlxyXG4gICAqIEltcGxlbWVudGF0aW9ucyBzaG91bGQgcmV0dXJuIGFuIGVtcHR5IHN0cmluZyBpZiB0aGUgZ2l2ZW4gZGF0ZSBpcyBgbnVsbGAsXHJcbiAgICogYW5kIHRyeSB0aGVpciBiZXN0IHRvIHByb3ZpZGUgYSBwYXJ0aWFsIHJlc3VsdCBpZiB0aGUgZ2l2ZW4gZGF0ZSBpcyBpbmNvbXBsZXRlIG9yIGludmFsaWQuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZm9ybWF0KGRhdGU6IE5nYkRhdGVTdHJ1Y3QgfCBudWxsKTogc3RyaW5nO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlSVNPUGFyc2VyRm9ybWF0dGVyIGV4dGVuZHMgTmdiRGF0ZVBhcnNlckZvcm1hdHRlciB7XHJcbiAgcGFyc2UodmFsdWU6IHN0cmluZyk6IE5nYkRhdGVTdHJ1Y3QgfCBudWxsIHtcclxuICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgIGNvbnN0IGRhdGVQYXJ0cyA9IHZhbHVlLnRyaW0oKS5zcGxpdCgnLScpO1xyXG4gICAgICBpZiAoZGF0ZVBhcnRzLmxlbmd0aCA9PT0gMSAmJiBpc051bWJlcihkYXRlUGFydHNbMF0pKSB7XHJcbiAgICAgICAgcmV0dXJuIHt5ZWFyOiB0b0ludGVnZXIoZGF0ZVBhcnRzWzBdKSwgbW9udGg6IDxhbnk+bnVsbCwgZGF5OiA8YW55Pm51bGx9O1xyXG4gICAgICB9IGVsc2UgaWYgKGRhdGVQYXJ0cy5sZW5ndGggPT09IDIgJiYgaXNOdW1iZXIoZGF0ZVBhcnRzWzBdKSAmJiBpc051bWJlcihkYXRlUGFydHNbMV0pKSB7XHJcbiAgICAgICAgcmV0dXJuIHt5ZWFyOiB0b0ludGVnZXIoZGF0ZVBhcnRzWzBdKSwgbW9udGg6IHRvSW50ZWdlcihkYXRlUGFydHNbMV0pLCBkYXk6IDxhbnk+bnVsbH07XHJcbiAgICAgIH0gZWxzZSBpZiAoZGF0ZVBhcnRzLmxlbmd0aCA9PT0gMyAmJiBpc051bWJlcihkYXRlUGFydHNbMF0pICYmIGlzTnVtYmVyKGRhdGVQYXJ0c1sxXSkgJiYgaXNOdW1iZXIoZGF0ZVBhcnRzWzJdKSkge1xyXG4gICAgICAgIHJldHVybiB7eWVhcjogdG9JbnRlZ2VyKGRhdGVQYXJ0c1swXSksIG1vbnRoOiB0b0ludGVnZXIoZGF0ZVBhcnRzWzFdKSwgZGF5OiB0b0ludGVnZXIoZGF0ZVBhcnRzWzJdKX07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgZm9ybWF0KGRhdGU6IE5nYkRhdGVTdHJ1Y3QgfCBudWxsKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBkYXRlID9cclxuICAgICAgICBgJHtkYXRlLnllYXJ9LSR7aXNOdW1iZXIoZGF0ZS5tb250aCkgPyBwYWROdW1iZXIoZGF0ZS5tb250aCkgOiAnJ30tJHtpc051bWJlcihkYXRlLmRheSkgPyBwYWROdW1iZXIoZGF0ZS5kYXkpIDogJyd9YCA6XHJcbiAgICAgICAgJyc7XHJcbiAgfVxyXG59XHJcbiJdfQ==