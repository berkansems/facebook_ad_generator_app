import { NgbDate } from './ngb-date';
import { Injectable } from '@angular/core';
import { isInteger, toInteger } from '../util/util';
import { Subject } from 'rxjs';
import { buildMonths, checkDateInRange, checkMinBeforeMax, generateSelectBoxMonths, generateSelectBoxYears, isChangedDate, isChangedMonth, isDateSelectable, nextMonthDisabled, prevMonthDisabled } from './datepicker-tools';
import { filter } from 'rxjs/operators';
import { TranslationWidth } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "./ngb-calendar";
import * as i2 from "./datepicker-i18n";
export class NgbDatepickerService {
    constructor(_calendar, _i18n) {
        this._calendar = _calendar;
        this._i18n = _i18n;
        this._VALIDATORS = {
            dayTemplateData: (dayTemplateData) => {
                if (this._state.dayTemplateData !== dayTemplateData) {
                    return { dayTemplateData };
                }
            },
            displayMonths: (displayMonths) => {
                displayMonths = toInteger(displayMonths);
                if (isInteger(displayMonths) && displayMonths > 0 && this._state.displayMonths !== displayMonths) {
                    return { displayMonths };
                }
            },
            disabled: (disabled) => {
                if (this._state.disabled !== disabled) {
                    return { disabled };
                }
            },
            firstDayOfWeek: (firstDayOfWeek) => {
                firstDayOfWeek = toInteger(firstDayOfWeek);
                if (isInteger(firstDayOfWeek) && firstDayOfWeek >= 0 && this._state.firstDayOfWeek !== firstDayOfWeek) {
                    return { firstDayOfWeek };
                }
            },
            focusVisible: (focusVisible) => {
                if (this._state.focusVisible !== focusVisible && !this._state.disabled) {
                    return { focusVisible };
                }
            },
            markDisabled: (markDisabled) => {
                if (this._state.markDisabled !== markDisabled) {
                    return { markDisabled };
                }
            },
            maxDate: (date) => {
                const maxDate = this.toValidDate(date, null);
                if (isChangedDate(this._state.maxDate, maxDate)) {
                    return { maxDate };
                }
            },
            minDate: (date) => {
                const minDate = this.toValidDate(date, null);
                if (isChangedDate(this._state.minDate, minDate)) {
                    return { minDate };
                }
            },
            navigation: (navigation) => {
                if (this._state.navigation !== navigation) {
                    return { navigation };
                }
            },
            outsideDays: (outsideDays) => {
                if (this._state.outsideDays !== outsideDays) {
                    return { outsideDays };
                }
            },
            weekdays: (weekdays) => {
                const weekdayWidth = weekdays === true || weekdays === false ? TranslationWidth.Short : weekdays;
                const weekdaysVisible = weekdays === true || weekdays === false ? weekdays : true;
                if (this._state.weekdayWidth !== weekdayWidth || this._state.weekdaysVisible !== weekdaysVisible) {
                    return { weekdayWidth, weekdaysVisible };
                }
            }
        };
        this._model$ = new Subject();
        this._dateSelect$ = new Subject();
        this._state = {
            dayTemplateData: null,
            markDisabled: null,
            maxDate: null,
            minDate: null,
            disabled: false,
            displayMonths: 1,
            firstDate: null,
            firstDayOfWeek: 1,
            lastDate: null,
            focusDate: null,
            focusVisible: false,
            months: [],
            navigation: 'select',
            outsideDays: 'visible',
            prevDisabled: false,
            nextDisabled: false,
            selectedDate: null,
            selectBoxes: { years: [], months: [] },
            weekdayWidth: TranslationWidth.Short,
            weekdaysVisible: true
        };
    }
    get model$() { return this._model$.pipe(filter(model => model.months.length > 0)); }
    get dateSelect$() { return this._dateSelect$.pipe(filter(date => date !== null)); }
    set(options) {
        let patch = Object.keys(options)
            .map(key => this._VALIDATORS[key](options[key]))
            .reduce((obj, part) => ({ ...obj, ...part }), {});
        if (Object.keys(patch).length > 0) {
            this._nextState(patch);
        }
    }
    focus(date) {
        const focusedDate = this.toValidDate(date, null);
        if (focusedDate != null && !this._state.disabled && isChangedDate(this._state.focusDate, focusedDate)) {
            this._nextState({ focusDate: date });
        }
    }
    focusSelect() {
        if (isDateSelectable(this._state.focusDate, this._state)) {
            this.select(this._state.focusDate, { emitEvent: true });
        }
    }
    open(date) {
        const firstDate = this.toValidDate(date, this._calendar.getToday());
        if (firstDate != null && !this._state.disabled &&
            (!this._state.firstDate || isChangedMonth(this._state.firstDate, firstDate))) {
            this._nextState({ firstDate });
        }
    }
    select(date, options = {}) {
        const selectedDate = this.toValidDate(date, null);
        if (selectedDate != null && !this._state.disabled) {
            if (isChangedDate(this._state.selectedDate, selectedDate)) {
                this._nextState({ selectedDate });
            }
            if (options.emitEvent && isDateSelectable(selectedDate, this._state)) {
                this._dateSelect$.next(selectedDate);
            }
        }
    }
    toValidDate(date, defaultValue) {
        const ngbDate = NgbDate.from(date);
        if (defaultValue === undefined) {
            defaultValue = this._calendar.getToday();
        }
        return this._calendar.isValid(ngbDate) ? ngbDate : defaultValue;
    }
    getMonth(struct) {
        for (let month of this._state.months) {
            if (struct.month === month.number && struct.year === month.year) {
                return month;
            }
        }
        throw new Error(`month ${struct.month} of year ${struct.year} not found`);
    }
    _nextState(patch) {
        const newState = this._updateState(patch);
        this._patchContexts(newState);
        this._state = newState;
        this._model$.next(this._state);
    }
    _patchContexts(state) {
        const { months, displayMonths, selectedDate, focusDate, focusVisible, disabled, outsideDays } = state;
        state.months.forEach(month => {
            month.weeks.forEach(week => {
                week.days.forEach(day => {
                    // patch focus flag
                    if (focusDate) {
                        day.context.focused = focusDate.equals(day.date) && focusVisible;
                    }
                    // calculating tabindex
                    day.tabindex =
                        !disabled && focusDate && day.date.equals(focusDate) && focusDate.month === month.number ? 0 : -1;
                    // override context disabled
                    if (disabled === true) {
                        day.context.disabled = true;
                    }
                    // patch selection flag
                    if (selectedDate !== undefined) {
                        day.context.selected = selectedDate !== null && selectedDate.equals(day.date);
                    }
                    // visibility
                    if (month.number !== day.date.month) {
                        day.hidden = outsideDays === 'hidden' || outsideDays === 'collapsed' ||
                            (displayMonths > 1 && day.date.after(months[0].firstDate) &&
                                day.date.before(months[displayMonths - 1].lastDate));
                    }
                });
            });
        });
    }
    _updateState(patch) {
        // patching fields
        const state = Object.assign({}, this._state, patch);
        let startDate = state.firstDate;
        // min/max dates changed
        if ('minDate' in patch || 'maxDate' in patch) {
            checkMinBeforeMax(state.minDate, state.maxDate);
            state.focusDate = checkDateInRange(state.focusDate, state.minDate, state.maxDate);
            state.firstDate = checkDateInRange(state.firstDate, state.minDate, state.maxDate);
            startDate = state.focusDate;
        }
        // disabled
        if ('disabled' in patch) {
            state.focusVisible = false;
        }
        // initial rebuild via 'select()'
        if ('selectedDate' in patch && this._state.months.length === 0) {
            startDate = state.selectedDate;
        }
        // terminate early if only focus visibility was changed
        if ('focusVisible' in patch) {
            return state;
        }
        // focus date changed
        if ('focusDate' in patch) {
            state.focusDate = checkDateInRange(state.focusDate, state.minDate, state.maxDate);
            startDate = state.focusDate;
            // nothing to rebuild if only focus changed and it is still visible
            if (state.months.length !== 0 && state.focusDate && !state.focusDate.before(state.firstDate) &&
                !state.focusDate.after(state.lastDate)) {
                return state;
            }
        }
        // first date changed
        if ('firstDate' in patch) {
            state.firstDate = checkDateInRange(state.firstDate, state.minDate, state.maxDate);
            startDate = state.firstDate;
        }
        // rebuilding months
        if (startDate) {
            const forceRebuild = 'dayTemplateData' in patch || 'firstDayOfWeek' in patch || 'markDisabled' in patch ||
                'minDate' in patch || 'maxDate' in patch || 'disabled' in patch || 'outsideDays' in patch ||
                'weekdaysVisible' in patch;
            const months = buildMonths(this._calendar, startDate, state, this._i18n, forceRebuild);
            // updating months and boundary dates
            state.months = months;
            state.firstDate = months[0].firstDate;
            state.lastDate = months[months.length - 1].lastDate;
            // reset selected date if 'markDisabled' returns true
            if ('selectedDate' in patch && !isDateSelectable(state.selectedDate, state)) {
                state.selectedDate = null;
            }
            // adjusting focus after months were built
            if ('firstDate' in patch) {
                if (!state.focusDate || state.focusDate.before(state.firstDate) || state.focusDate.after(state.lastDate)) {
                    state.focusDate = startDate;
                }
            }
            // adjusting months/years for the select box navigation
            const yearChanged = !this._state.firstDate || this._state.firstDate.year !== state.firstDate.year;
            const monthChanged = !this._state.firstDate || this._state.firstDate.month !== state.firstDate.month;
            if (state.navigation === 'select') {
                // years ->  boundaries (min/max were changed)
                if ('minDate' in patch || 'maxDate' in patch || state.selectBoxes.years.length === 0 || yearChanged) {
                    state.selectBoxes.years = generateSelectBoxYears(state.firstDate, state.minDate, state.maxDate);
                }
                // months -> when current year or boundaries change
                if ('minDate' in patch || 'maxDate' in patch || state.selectBoxes.months.length === 0 || yearChanged) {
                    state.selectBoxes.months =
                        generateSelectBoxMonths(this._calendar, state.firstDate, state.minDate, state.maxDate);
                }
            }
            else {
                state.selectBoxes = { years: [], months: [] };
            }
            // updating navigation arrows -> boundaries change (min/max) or month/year changes
            if ((state.navigation === 'arrows' || state.navigation === 'select') &&
                (monthChanged || yearChanged || 'minDate' in patch || 'maxDate' in patch || 'disabled' in patch)) {
                state.prevDisabled = state.disabled || prevMonthDisabled(this._calendar, state.firstDate, state.minDate);
                state.nextDisabled = state.disabled || nextMonthDisabled(this._calendar, state.lastDate, state.maxDate);
            }
        }
        return state;
    }
}
NgbDatepickerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDatepickerService, deps: [{ token: i1.NgbCalendar }, { token: i2.NgbDatepickerI18n }], target: i0.ɵɵFactoryTarget.Injectable });
NgbDatepickerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDatepickerService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbDatepickerService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.NgbCalendar }, { type: i2.NgbDatepickerI18n }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFHbkMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsU0FBUyxFQUFFLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUNsRCxPQUFPLEVBQWEsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFDTCxXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsc0JBQXNCLEVBQ3RCLGFBQWEsRUFDYixjQUFjLEVBQ2QsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQixpQkFBaUIsRUFDbEIsTUFBTSxvQkFBb0IsQ0FBQztBQUU1QixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFrQmpELE1BQU0sT0FBTyxvQkFBb0I7SUEyRy9CLFlBQW9CLFNBQXNCLEVBQVUsS0FBd0I7UUFBeEQsY0FBUyxHQUFULFNBQVMsQ0FBYTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBMUdwRSxnQkFBVyxHQUNpRztZQUM5RyxlQUFlLEVBQUUsQ0FBQyxlQUFtQyxFQUFFLEVBQUU7Z0JBQ3ZELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEtBQUssZUFBZSxFQUFFO29CQUNuRCxPQUFPLEVBQUMsZUFBZSxFQUFDLENBQUM7aUJBQzFCO1lBQ0gsQ0FBQztZQUNELGFBQWEsRUFBRSxDQUFDLGFBQXFCLEVBQUUsRUFBRTtnQkFDdkMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUMs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QUFTLElBQUksS0FBSyxJQUFJLFNBQVMsSUFBSSxLQUFLLElBQUksVUFBVSxJQUFJLEtBQUssQ0FBQyxFQUFFO2dCQUNwRyxLQUFLLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxRQUFRLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDekcsS0FBSyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsUUFBUSxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDekc7U0FDRjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7aUhBOVNVLG9CQUFvQjtxSEFBcEIsb0JBQW9COzJGQUFwQixvQkFBb0I7a0JBRGhDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nYkNhbGVuZGFyfSBmcm9tICcuL25nYi1jYWxlbmRhcic7XHJcbmltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XHJcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xyXG5pbXBvcnQge0RhdGVwaWNrZXJWaWV3TW9kZWwsIE5nYkRheVRlbXBsYXRlRGF0YSwgTmdiTWFya0Rpc2FibGVkfSBmcm9tICcuL2RhdGVwaWNrZXItdmlldy1tb2RlbCc7XHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7aXNJbnRlZ2VyLCB0b0ludGVnZXJ9IGZyb20gJy4uL3V0aWwvdXRpbCc7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7XHJcbiAgYnVpbGRNb250aHMsXHJcbiAgY2hlY2tEYXRlSW5SYW5nZSxcclxuICBjaGVja01pbkJlZm9yZU1heCxcclxuICBnZW5lcmF0ZVNlbGVjdEJveE1vbnRocyxcclxuICBnZW5lcmF0ZVNlbGVjdEJveFllYXJzLFxyXG4gIGlzQ2hhbmdlZERhdGUsXHJcbiAgaXNDaGFuZ2VkTW9udGgsXHJcbiAgaXNEYXRlU2VsZWN0YWJsZSxcclxuICBuZXh0TW9udGhEaXNhYmxlZCxcclxuICBwcmV2TW9udGhEaXNhYmxlZFxyXG59IGZyb20gJy4vZGF0ZXBpY2tlci10b29scyc7XHJcblxyXG5pbXBvcnQge2ZpbHRlcn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge05nYkRhdGVwaWNrZXJJMThufSBmcm9tICcuL2RhdGVwaWNrZXItaTE4bic7XHJcbmltcG9ydCB7VHJhbnNsYXRpb25XaWR0aH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcblxyXG5leHBvcnQgdHlwZSBEYXRlcGlja2VyU2VydmljZUlucHV0cyA9IFBhcnRpYWw8e1xyXG4gIGRheVRlbXBsYXRlRGF0YTogTmdiRGF5VGVtcGxhdGVEYXRhLFxyXG4gIGRpc3BsYXlNb250aHM6IG51bWJlcixcclxuICBkaXNhYmxlZDogYm9vbGVhbixcclxuICBmaXJzdERheU9mV2VlazogbnVtYmVyLFxyXG4gIGZvY3VzVmlzaWJsZTogYm9vbGVhbixcclxuICBtYXJrRGlzYWJsZWQ6IE5nYk1hcmtEaXNhYmxlZCxcclxuICBtYXhEYXRlOiBOZ2JEYXRlIHwgbnVsbCxcclxuICBtaW5EYXRlOiBOZ2JEYXRlIHwgbnVsbCxcclxuICBuYXZpZ2F0aW9uOiAnc2VsZWN0JyB8ICdhcnJvd3MnIHwgJ25vbmUnLFxyXG4gIG91dHNpZGVEYXlzOiAndmlzaWJsZScgfCAnY29sbGFwc2VkJyB8ICdoaWRkZW4nLFxyXG4gIHdlZWtkYXlzOiBUcmFuc2xhdGlvbldpZHRoIHwgYm9vbGVhblxyXG59PjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJTZXJ2aWNlIHtcclxuICBwcml2YXRlIF9WQUxJREFUT1JTOlxyXG4gICAgICB7W0sgaW4ga2V5b2YgRGF0ZXBpY2tlclNlcnZpY2VJbnB1dHNdOiAodjogRGF0ZXBpY2tlclNlcnZpY2VJbnB1dHNbS10pID0+IFBhcnRpYWw8RGF0ZXBpY2tlclZpZXdNb2RlbD58IHZvaWR9ID0ge1xyXG4gICAgICAgIGRheVRlbXBsYXRlRGF0YTogKGRheVRlbXBsYXRlRGF0YTogTmdiRGF5VGVtcGxhdGVEYXRhKSA9PiB7XHJcbiAgICAgICAgICBpZiAodGhpcy5fc3RhdGUuZGF5VGVtcGxhdGVEYXRhICE9PSBkYXlUZW1wbGF0ZURhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtkYXlUZW1wbGF0ZURhdGF9O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGlzcGxheU1vbnRoczogKGRpc3BsYXlNb250aHM6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgZGlzcGxheU1vbnRocyA9IHRvSW50ZWdlcihkaXNwbGF5TW9udGhzKTtcclxuICAgICAgICAgIGlmIChpc0ludGVnZXIoZGlzcGxheU1vbnRocykgJiYgZGlzcGxheU1vbnRocyA+IDAgJiYgdGhpcy5fc3RhdGUuZGlzcGxheU1vbnRocyAhPT0gZGlzcGxheU1vbnRocykge1xyXG4gICAgICAgICAgICByZXR1cm4ge2Rpc3BsYXlNb250aHN9O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGlzYWJsZWQ6IChkaXNhYmxlZDogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgaWYgKHRoaXMuX3N0YXRlLmRpc2FibGVkICE9PSBkaXNhYmxlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge2Rpc2FibGVkfTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGZpcnN0RGF5T2ZXZWVrOiAoZmlyc3REYXlPZldlZWs6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgZmlyc3REYXlPZldlZWsgPSB0b0ludGVnZXIoZmlyc3REYXlPZldlZWspO1xyXG4gICAgICAgICAgaWYgKGlzSW50ZWdlcihmaXJzdERheU9mV2VlaykgJiYgZmlyc3REYXlPZldlZWsgPj0gMCAmJiB0aGlzLl9zdGF0ZS5maXJzdERheU9mV2VlayAhPT0gZmlyc3REYXlPZldlZWspIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtmaXJzdERheU9mV2Vla307XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmb2N1c1Zpc2libGU6IChmb2N1c1Zpc2libGU6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLl9zdGF0ZS5mb2N1c1Zpc2libGUgIT09IGZvY3VzVmlzaWJsZSAmJiAhdGhpcy5fc3RhdGUuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtmb2N1c1Zpc2libGV9O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWFya0Rpc2FibGVkOiAobWFya0Rpc2FibGVkOiBOZ2JNYXJrRGlzYWJsZWQpID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLl9zdGF0ZS5tYXJrRGlzYWJsZWQgIT09IG1hcmtEaXNhYmxlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge21hcmtEaXNhYmxlZH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtYXhEYXRlOiAoZGF0ZTogTmdiRGF0ZSB8IG51bGwpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG1heERhdGUgPSB0aGlzLnRvVmFsaWREYXRlKGRhdGUsIG51bGwpO1xyXG4gICAgICAgICAgaWYgKGlzQ2hhbmdlZERhdGUodGhpcy5fc3RhdGUubWF4RGF0ZSwgbWF4RGF0ZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHttYXhEYXRlfTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG1pbkRhdGU6IChkYXRlOiBOZ2JEYXRlIHwgbnVsbCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgbWluRGF0ZSA9IHRoaXMudG9WYWxpZERhdGUoZGF0ZSwgbnVsbCk7XHJcbiAgICAgICAgICBpZiAoaXNDaGFuZ2VkRGF0ZSh0aGlzLl9zdGF0ZS5taW5EYXRlLCBtaW5EYXRlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4ge21pbkRhdGV9O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbmF2aWdhdGlvbjogKG5hdmlnYXRpb246ICdzZWxlY3QnIHwgJ2Fycm93cycgfCAnbm9uZScpID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLl9zdGF0ZS5uYXZpZ2F0aW9uICE9PSBuYXZpZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7bmF2aWdhdGlvbn07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvdXRzaWRlRGF5czogKG91dHNpZGVEYXlzOiAndmlzaWJsZScgfCAnY29sbGFwc2VkJyB8ICdoaWRkZW4nKSA9PiB7XHJcbiAgICAgICAgICBpZiAodGhpcy5fc3RhdGUub3V0c2lkZURheXMgIT09IG91dHNpZGVEYXlzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7b3V0c2lkZURheXN9O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgd2Vla2RheXM6ICh3ZWVrZGF5czogYm9vbGVhbiB8IFRyYW5zbGF0aW9uV2lkdGgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHdlZWtkYXlXaWR0aCA9IHdlZWtkYXlzID09PSB0cnVlIHx8IHdlZWtkYXlzID09PSBmYWxzZSA/IFRyYW5zbGF0aW9uV2lkdGguU2hvcnQgOiB3ZWVrZGF5cztcclxuICAgICAgICAgIGNvbnN0IHdlZWtkYXlzVmlzaWJsZSA9IHdlZWtkYXlzID09PSB0cnVlIHx8IHdlZWtkYXlzID09PSBmYWxzZSA/IHdlZWtkYXlzIDogdHJ1ZTtcclxuICAgICAgICAgIGlmICh0aGlzLl9zdGF0ZS53ZWVrZGF5V2lkdGggIT09IHdlZWtkYXlXaWR0aCB8fCB0aGlzLl9zdGF0ZS53ZWVrZGF5c1Zpc2libGUgIT09IHdlZWtkYXlzVmlzaWJsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4ge3dlZWtkYXlXaWR0aCwgd2Vla2RheXNWaXNpYmxlfTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gIHByaXZhdGUgX21vZGVsJCA9IG5ldyBTdWJqZWN0PERhdGVwaWNrZXJWaWV3TW9kZWw+KCk7XHJcblxyXG4gIHByaXZhdGUgX2RhdGVTZWxlY3QkID0gbmV3IFN1YmplY3Q8TmdiRGF0ZT4oKTtcclxuXHJcbiAgcHJpdmF0ZSBfc3RhdGU6IERhdGVwaWNrZXJWaWV3TW9kZWwgPSB7XHJcbiAgICBkYXlUZW1wbGF0ZURhdGE6IG51bGwsXHJcbiAgICBtYXJrRGlzYWJsZWQ6IG51bGwsXHJcbiAgICBtYXhEYXRlOiBudWxsLFxyXG4gICAgbWluRGF0ZTogbnVsbCxcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIGRpc3BsYXlNb250aHM6IDEsXHJcbiAgICBmaXJzdERhdGU6IG51bGwsXHJcbiAgICBmaXJzdERheU9mV2VlazogMSxcclxuICAgIGxhc3REYXRlOiBudWxsLFxyXG4gICAgZm9jdXNEYXRlOiBudWxsLFxyXG4gICAgZm9jdXNWaXNpYmxlOiBmYWxzZSxcclxuICAgIG1vbnRoczogW10sXHJcbiAgICBuYXZpZ2F0aW9uOiAnc2VsZWN0JyxcclxuICAgIG91dHNpZGVEYXlzOiAndmlzaWJsZScsXHJcbiAgICBwcmV2RGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgbmV4dERpc2FibGVkOiBmYWxzZSxcclxuICAgIHNlbGVjdGVkRGF0ZTogbnVsbCxcclxuICAgIHNlbGVjdEJveGVzOiB7eWVhcnM6IFtdLCBtb250aHM6IFtdfSxcclxuICAgIHdlZWtkYXlXaWR0aDogVHJhbnNsYXRpb25XaWR0aC5TaG9ydCxcclxuICAgIHdlZWtkYXlzVmlzaWJsZTogdHJ1ZVxyXG4gIH07XHJcblxyXG4gIGdldCBtb2RlbCQoKTogT2JzZXJ2YWJsZTxEYXRlcGlja2VyVmlld01vZGVsPiB7IHJldHVybiB0aGlzLl9tb2RlbCQucGlwZShmaWx0ZXIobW9kZWwgPT4gbW9kZWwubW9udGhzLmxlbmd0aCA+IDApKTsgfVxyXG5cclxuICBnZXQgZGF0ZVNlbGVjdCQoKTogT2JzZXJ2YWJsZTxOZ2JEYXRlPiB7IHJldHVybiB0aGlzLl9kYXRlU2VsZWN0JC5waXBlKGZpbHRlcihkYXRlID0+IGRhdGUgIT09IG51bGwpKTsgfVxyXG5cclxuICBzZXQob3B0aW9uczogRGF0ZXBpY2tlclNlcnZpY2VJbnB1dHMpIHtcclxuICAgIGxldCBwYXRjaCA9IE9iamVjdC5rZXlzKG9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcChrZXkgPT4gdGhpcy5fVkFMSURBVE9SU1trZXldKG9wdGlvbnNba2V5XSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlZHVjZSgob2JqLCBwYXJ0KSA9PiAoey4uLm9iaiwgLi4ucGFydH0pLCB7fSk7XHJcblxyXG4gICAgaWYgKE9iamVjdC5rZXlzKHBhdGNoKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMuX25leHRTdGF0ZShwYXRjaCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jYWxlbmRhcjogTmdiQ2FsZW5kYXIsIHByaXZhdGUgX2kxOG46IE5nYkRhdGVwaWNrZXJJMThuKSB7fVxyXG5cclxuICBmb2N1cyhkYXRlPzogTmdiRGF0ZSB8IG51bGwpIHtcclxuICAgIGNvbnN0IGZvY3VzZWREYXRlID0gdGhpcy50b1ZhbGlkRGF0ZShkYXRlLCBudWxsKTtcclxuICAgIGlmIChmb2N1c2VkRGF0ZSAhPSBudWxsICYmICF0aGlzLl9zdGF0ZS5kaXNhYmxlZCAmJiBpc0NoYW5nZWREYXRlKHRoaXMuX3N0YXRlLmZvY3VzRGF0ZSwgZm9jdXNlZERhdGUpKSB7XHJcbiAgICAgIHRoaXMuX25leHRTdGF0ZSh7Zm9jdXNEYXRlOiBkYXRlfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb2N1c1NlbGVjdCgpIHtcclxuICAgIGlmIChpc0RhdGVTZWxlY3RhYmxlKHRoaXMuX3N0YXRlLmZvY3VzRGF0ZSwgdGhpcy5fc3RhdGUpKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuX3N0YXRlLmZvY3VzRGF0ZSwge2VtaXRFdmVudDogdHJ1ZX0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb3BlbihkYXRlPzogTmdiRGF0ZSB8IG51bGwpIHtcclxuICAgIGNvbnN0IGZpcnN0RGF0ZSA9IHRoaXMudG9WYWxpZERhdGUoZGF0ZSwgdGhpcy5fY2FsZW5kYXIuZ2V0VG9kYXkoKSk7XHJcbiAgICBpZiAoZmlyc3REYXRlICE9IG51bGwgJiYgIXRoaXMuX3N0YXRlLmRpc2FibGVkICYmXHJcbiAgICAgICAgKCF0aGlzLl9zdGF0ZS5maXJzdERhdGUgfHwgaXNDaGFuZ2VkTW9udGgodGhpcy5fc3RhdGUuZmlyc3REYXRlLCBmaXJzdERhdGUpKSkge1xyXG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe2ZpcnN0RGF0ZX0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2VsZWN0KGRhdGU/OiBOZ2JEYXRlIHwgbnVsbCwgb3B0aW9uczoge2VtaXRFdmVudD86IGJvb2xlYW59ID0ge30pIHtcclxuICAgIGNvbnN0IHNlbGVjdGVkRGF0ZSA9IHRoaXMudG9WYWxpZERhdGUoZGF0ZSwgbnVsbCk7XHJcbiAgICBpZiAoc2VsZWN0ZWREYXRlICE9IG51bGwgJiYgIXRoaXMuX3N0YXRlLmRpc2FibGVkKSB7XHJcbiAgICAgIGlmIChpc0NoYW5nZWREYXRlKHRoaXMuX3N0YXRlLnNlbGVjdGVkRGF0ZSwgc2VsZWN0ZWREYXRlKSkge1xyXG4gICAgICAgIHRoaXMuX25leHRTdGF0ZSh7c2VsZWN0ZWREYXRlfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChvcHRpb25zLmVtaXRFdmVudCAmJiBpc0RhdGVTZWxlY3RhYmxlKHNlbGVjdGVkRGF0ZSwgdGhpcy5fc3RhdGUpKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0ZVNlbGVjdCQubmV4dChzZWxlY3RlZERhdGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0b1ZhbGlkRGF0ZShkYXRlPzogTmdiRGF0ZVN0cnVjdCB8IG51bGwsIGRlZmF1bHRWYWx1ZT86IE5nYkRhdGUgfCBudWxsKTogTmdiRGF0ZSB8IG51bGwge1xyXG4gICAgY29uc3QgbmdiRGF0ZSA9IE5nYkRhdGUuZnJvbShkYXRlKTtcclxuICAgIGlmIChkZWZhdWx0VmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBkZWZhdWx0VmFsdWUgPSB0aGlzLl9jYWxlbmRhci5nZXRUb2RheSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX2NhbGVuZGFyLmlzVmFsaWQobmdiRGF0ZSkgPyBuZ2JEYXRlIDogZGVmYXVsdFZhbHVlO1xyXG4gIH1cclxuXHJcbiAgZ2V0TW9udGgoc3RydWN0OiBOZ2JEYXRlU3RydWN0KSB7XHJcbiAgICBmb3IgKGxldCBtb250aCBvZiB0aGlzLl9zdGF0ZS5tb250aHMpIHtcclxuICAgICAgaWYgKHN0cnVjdC5tb250aCA9PT0gbW9udGgubnVtYmVyICYmIHN0cnVjdC55ZWFyID09PSBtb250aC55ZWFyKSB7XHJcbiAgICAgICAgcmV0dXJuIG1vbnRoO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYG1vbnRoICR7c3RydWN0Lm1vbnRofSBvZiB5ZWFyICR7c3RydWN0LnllYXJ9IG5vdCBmb3VuZGApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfbmV4dFN0YXRlKHBhdGNoOiBQYXJ0aWFsPERhdGVwaWNrZXJWaWV3TW9kZWw+KSB7XHJcbiAgICBjb25zdCBuZXdTdGF0ZSA9IHRoaXMuX3VwZGF0ZVN0YXRlKHBhdGNoKTtcclxuICAgIHRoaXMuX3BhdGNoQ29udGV4dHMobmV3U3RhdGUpO1xyXG4gICAgdGhpcy5fc3RhdGUgPSBuZXdTdGF0ZTtcclxuICAgIHRoaXMuX21vZGVsJC5uZXh0KHRoaXMuX3N0YXRlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3BhdGNoQ29udGV4dHMoc3RhdGU6IERhdGVwaWNrZXJWaWV3TW9kZWwpIHtcclxuICAgIGNvbnN0IHttb250aHMsIGRpc3BsYXlNb250aHMsIHNlbGVjdGVkRGF0ZSwgZm9jdXNEYXRlLCBmb2N1c1Zpc2libGUsIGRpc2FibGVkLCBvdXRzaWRlRGF5c30gPSBzdGF0ZTtcclxuICAgIHN0YXRlLm1vbnRocy5mb3JFYWNoKG1vbnRoID0+IHtcclxuICAgICAgbW9udGgud2Vla3MuZm9yRWFjaCh3ZWVrID0+IHtcclxuICAgICAgICB3ZWVrLmRheXMuZm9yRWFjaChkYXkgPT4ge1xyXG5cclxuICAgICAgICAgIC8vIHBhdGNoIGZvY3VzIGZsYWdcclxuICAgICAgICAgIGlmIChmb2N1c0RhdGUpIHtcclxuICAgICAgICAgICAgZGF5LmNvbnRleHQuZm9jdXNlZCA9IGZvY3VzRGF0ZS5lcXVhbHMoZGF5LmRhdGUpICYmIGZvY3VzVmlzaWJsZTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBjYWxjdWxhdGluZyB0YWJpbmRleFxyXG4gICAgICAgICAgZGF5LnRhYmluZGV4ID1cclxuICAgICAgICAgICAgICAhZGlzYWJsZWQgJiYgZm9jdXNEYXRlICYmIGRheS5kYXRlLmVxdWFscyhmb2N1c0RhdGUpICYmIGZvY3VzRGF0ZS5tb250aCA9PT0gbW9udGgubnVtYmVyID8gMCA6IC0xO1xyXG5cclxuICAgICAgICAgIC8vIG92ZXJyaWRlIGNvbnRleHQgZGlzYWJsZWRcclxuICAgICAgICAgIGlmIChkaXNhYmxlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBkYXkuY29udGV4dC5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gcGF0Y2ggc2VsZWN0aW9uIGZsYWdcclxuICAgICAgICAgIGlmIChzZWxlY3RlZERhdGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBkYXkuY29udGV4dC5zZWxlY3RlZCA9IHNlbGVjdGVkRGF0ZSAhPT0gbnVsbCAmJiBzZWxlY3RlZERhdGUuZXF1YWxzKGRheS5kYXRlKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyB2aXNpYmlsaXR5XHJcbiAgICAgICAgICBpZiAobW9udGgubnVtYmVyICE9PSBkYXkuZGF0ZS5tb250aCkge1xyXG4gICAgICAgICAgICBkYXkuaGlkZGVuID0gb3V0c2lkZURheXMgPT09ICdoaWRkZW4nIHx8IG91dHNpZGVEYXlzID09PSAnY29sbGFwc2VkJyB8fFxyXG4gICAgICAgICAgICAgICAgKGRpc3BsYXlNb250aHMgPiAxICYmIGRheS5kYXRlLmFmdGVyKG1vbnRoc1swXS5maXJzdERhdGUpICYmXHJcbiAgICAgICAgICAgICAgICAgZGF5LmRhdGUuYmVmb3JlKG1vbnRoc1tkaXNwbGF5TW9udGhzIC0gMV0ubGFzdERhdGUpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3VwZGF0ZVN0YXRlKHBhdGNoOiBQYXJ0aWFsPERhdGVwaWNrZXJWaWV3TW9kZWw+KTogRGF0ZXBpY2tlclZpZXdNb2RlbCB7XHJcbiAgICAvLyBwYXRjaGluZyBmaWVsZHNcclxuICAgIGNvbnN0IHN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fc3RhdGUsIHBhdGNoKTtcclxuXHJcbiAgICBsZXQgc3RhcnREYXRlID0gc3RhdGUuZmlyc3REYXRlO1xyXG5cclxuICAgIC8vIG1pbi9tYXggZGF0ZXMgY2hhbmdlZFxyXG4gICAgaWYgKCdtaW5EYXRlJyBpbiBwYXRjaCB8fCAnbWF4RGF0ZScgaW4gcGF0Y2gpIHtcclxuICAgICAgY2hlY2tNaW5CZWZvcmVNYXgoc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XHJcbiAgICAgIHN0YXRlLmZvY3VzRGF0ZSA9IGNoZWNrRGF0ZUluUmFuZ2Uoc3RhdGUuZm9jdXNEYXRlLCBzdGF0ZS5taW5EYXRlLCBzdGF0ZS5tYXhEYXRlKTtcclxuICAgICAgc3RhdGUuZmlyc3REYXRlID0gY2hlY2tEYXRlSW5SYW5nZShzdGF0ZS5maXJzdERhdGUsIHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xyXG4gICAgICBzdGFydERhdGUgPSBzdGF0ZS5mb2N1c0RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZGlzYWJsZWRcclxuICAgIGlmICgnZGlzYWJsZWQnIGluIHBhdGNoKSB7XHJcbiAgICAgIHN0YXRlLmZvY3VzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGluaXRpYWwgcmVidWlsZCB2aWEgJ3NlbGVjdCgpJ1xyXG4gICAgaWYgKCdzZWxlY3RlZERhdGUnIGluIHBhdGNoICYmIHRoaXMuX3N0YXRlLm1vbnRocy5sZW5ndGggPT09IDApIHtcclxuICAgICAgc3RhcnREYXRlID0gc3RhdGUuc2VsZWN0ZWREYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRlcm1pbmF0ZSBlYXJseSBpZiBvbmx5IGZvY3VzIHZpc2liaWxpdHkgd2FzIGNoYW5nZWRcclxuICAgIGlmICgnZm9jdXNWaXNpYmxlJyBpbiBwYXRjaCkge1xyXG4gICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZm9jdXMgZGF0ZSBjaGFuZ2VkXHJcbiAgICBpZiAoJ2ZvY3VzRGF0ZScgaW4gcGF0Y2gpIHtcclxuICAgICAgc3RhdGUuZm9jdXNEYXRlID0gY2hlY2tEYXRlSW5SYW5nZShzdGF0ZS5mb2N1c0RhdGUsIHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xyXG4gICAgICBzdGFydERhdGUgPSBzdGF0ZS5mb2N1c0RhdGU7XHJcblxyXG4gICAgICAvLyBub3RoaW5nIHRvIHJlYnVpbGQgaWYgb25seSBmb2N1cyBjaGFuZ2VkIGFuZCBpdCBpcyBzdGlsbCB2aXNpYmxlXHJcbiAgICAgIGlmIChzdGF0ZS5tb250aHMubGVuZ3RoICE9PSAwICYmIHN0YXRlLmZvY3VzRGF0ZSAmJiAhc3RhdGUuZm9jdXNEYXRlLmJlZm9yZShzdGF0ZS5maXJzdERhdGUpICYmXHJcbiAgICAgICAgICAhc3RhdGUuZm9jdXNEYXRlLmFmdGVyKHN0YXRlLmxhc3REYXRlKSkge1xyXG4gICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGZpcnN0IGRhdGUgY2hhbmdlZFxyXG4gICAgaWYgKCdmaXJzdERhdGUnIGluIHBhdGNoKSB7XHJcbiAgICAgIHN0YXRlLmZpcnN0RGF0ZSA9IGNoZWNrRGF0ZUluUmFuZ2Uoc3RhdGUuZmlyc3REYXRlLCBzdGF0ZS5taW5EYXRlLCBzdGF0ZS5tYXhEYXRlKTtcclxuICAgICAgc3RhcnREYXRlID0gc3RhdGUuZmlyc3REYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHJlYnVpbGRpbmcgbW9udGhzXHJcbiAgICBpZiAoc3RhcnREYXRlKSB7XHJcbiAgICAgIGNvbnN0IGZvcmNlUmVidWlsZCA9ICdkYXlUZW1wbGF0ZURhdGEnIGluIHBhdGNoIHx8ICdmaXJzdERheU9mV2VlaycgaW4gcGF0Y2ggfHwgJ21hcmtEaXNhYmxlZCcgaW4gcGF0Y2ggfHxcclxuICAgICAgICAgICdtaW5EYXRlJyBpbiBwYXRjaCB8fCAnbWF4RGF0ZScgaW4gcGF0Y2ggfHwgJ2Rpc2FibGVkJyBpbiBwYXRjaCB8fCAnb3V0c2lkZURheXMnIGluIHBhdGNoIHx8XHJcbiAgICAgICAgICAnd2Vla2RheXNWaXNpYmxlJyBpbiBwYXRjaDtcclxuXHJcbiAgICAgIGNvbnN0IG1vbnRocyA9IGJ1aWxkTW9udGhzKHRoaXMuX2NhbGVuZGFyLCBzdGFydERhdGUsIHN0YXRlLCB0aGlzLl9pMThuLCBmb3JjZVJlYnVpbGQpO1xyXG5cclxuICAgICAgLy8gdXBkYXRpbmcgbW9udGhzIGFuZCBib3VuZGFyeSBkYXRlc1xyXG4gICAgICBzdGF0ZS5tb250aHMgPSBtb250aHM7XHJcbiAgICAgIHN0YXRlLmZpcnN0RGF0ZSA9IG1vbnRoc1swXS5maXJzdERhdGU7XHJcbiAgICAgIHN0YXRlLmxhc3REYXRlID0gbW9udGhzW21vbnRocy5sZW5ndGggLSAxXS5sYXN0RGF0ZTtcclxuXHJcbiAgICAgIC8vIHJlc2V0IHNlbGVjdGVkIGRhdGUgaWYgJ21hcmtEaXNhYmxlZCcgcmV0dXJucyB0cnVlXHJcbiAgICAgIGlmICgnc2VsZWN0ZWREYXRlJyBpbiBwYXRjaCAmJiAhaXNEYXRlU2VsZWN0YWJsZShzdGF0ZS5zZWxlY3RlZERhdGUsIHN0YXRlKSkge1xyXG4gICAgICAgIHN0YXRlLnNlbGVjdGVkRGF0ZSA9IG51bGw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGFkanVzdGluZyBmb2N1cyBhZnRlciBtb250aHMgd2VyZSBidWlsdFxyXG4gICAgICBpZiAoJ2ZpcnN0RGF0ZScgaW4gcGF0Y2gpIHtcclxuICAgICAgICBpZiAoIXN0YXRlLmZvY3VzRGF0ZSB8fCBzdGF0ZS5mb2N1c0RhdGUuYmVmb3JlKHN0YXRlLmZpcnN0RGF0ZSkgfHwgc3RhdGUuZm9jdXNEYXRlLmFmdGVyKHN0YXRlLmxhc3REYXRlKSkge1xyXG4gICAgICAgICAgc3RhdGUuZm9jdXNEYXRlID0gc3RhcnREYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gYWRqdXN0aW5nIG1vbnRocy95ZWFycyBmb3IgdGhlIHNlbGVjdCBib3ggbmF2aWdhdGlvblxyXG4gICAgICBjb25zdCB5ZWFyQ2hhbmdlZCA9ICF0aGlzLl9zdGF0ZS5maXJzdERhdGUgfHwgdGhpcy5fc3RhdGUuZmlyc3REYXRlLnllYXIgIT09IHN0YXRlLmZpcnN0RGF0ZS55ZWFyO1xyXG4gICAgICBjb25zdCBtb250aENoYW5nZWQgPSAhdGhpcy5fc3RhdGUuZmlyc3REYXRlIHx8IHRoaXMuX3N0YXRlLmZpcnN0RGF0ZS5tb250aCAhPT0gc3RhdGUuZmlyc3REYXRlLm1vbnRoO1xyXG4gICAgICBpZiAoc3RhdGUubmF2aWdhdGlvbiA9PT0gJ3NlbGVjdCcpIHtcclxuICAgICAgICAvLyB5ZWFycyAtPiAgYm91bmRhcmllcyAobWluL21heCB3ZXJlIGNoYW5nZWQpXHJcbiAgICAgICAgaWYgKCdtaW5EYXRlJyBpbiBwYXRjaCB8fCAnbWF4RGF0ZScgaW4gcGF0Y2ggfHwgc3RhdGUuc2VsZWN0Qm94ZXMueWVhcnMubGVuZ3RoID09PSAwIHx8IHllYXJDaGFuZ2VkKSB7XHJcbiAgICAgICAgICBzdGF0ZS5zZWxlY3RCb3hlcy55ZWFycyA9IGdlbmVyYXRlU2VsZWN0Qm94WWVhcnMoc3RhdGUuZmlyc3REYXRlLCBzdGF0ZS5taW5EYXRlLCBzdGF0ZS5tYXhEYXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG1vbnRocyAtPiB3aGVuIGN1cnJlbnQgeWVhciBvciBib3VuZGFyaWVzIGNoYW5nZVxyXG4gICAgICAgIGlmICgnbWluRGF0ZScgaW4gcGF0Y2ggfHwgJ21heERhdGUnIGluIHBhdGNoIHx8IHN0YXRlLnNlbGVjdEJveGVzLm1vbnRocy5sZW5ndGggPT09IDAgfHwgeWVhckNoYW5nZWQpIHtcclxuICAgICAgICAgIHN0YXRlLnNlbGVjdEJveGVzLm1vbnRocyA9XHJcbiAgICAgICAgICAgICAgZ2VuZXJhdGVTZWxlY3RCb3hNb250aHModGhpcy5fY2FsZW5kYXIsIHN0YXRlLmZpcnN0RGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN0YXRlLnNlbGVjdEJveGVzID0ge3llYXJzOiBbXSwgbW9udGhzOiBbXX07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHVwZGF0aW5nIG5hdmlnYXRpb24gYXJyb3dzIC0+IGJvdW5kYXJpZXMgY2hhbmdlIChtaW4vbWF4KSBvciBtb250aC95ZWFyIGNoYW5nZXNcclxuICAgICAgaWYgKChzdGF0ZS5uYXZpZ2F0aW9uID09PSAnYXJyb3dzJyB8fCBzdGF0ZS5uYXZpZ2F0aW9uID09PSAnc2VsZWN0JykgJiZcclxuICAgICAgICAgIChtb250aENoYW5nZWQgfHwgeWVhckNoYW5nZWQgfHwgJ21pbkRhdGUnIGluIHBhdGNoIHx8ICdtYXhEYXRlJyBpbiBwYXRjaCB8fCAnZGlzYWJsZWQnIGluIHBhdGNoKSkge1xyXG4gICAgICAgIHN0YXRlLnByZXZEaXNhYmxlZCA9IHN0YXRlLmRpc2FibGVkIHx8IHByZXZNb250aERpc2FibGVkKHRoaXMuX2NhbGVuZGFyLCBzdGF0ZS5maXJzdERhdGUsIHN0YXRlLm1pbkRhdGUpO1xyXG4gICAgICAgIHN0YXRlLm5leHREaXNhYmxlZCA9IHN0YXRlLmRpc2FibGVkIHx8IG5leHRNb250aERpc2FibGVkKHRoaXMuX2NhbGVuZGFyLCBzdGF0ZS5sYXN0RGF0ZSwgc3RhdGUubWF4RGF0ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3RhdGU7XHJcbiAgfVxyXG59XHJcbiJdfQ==