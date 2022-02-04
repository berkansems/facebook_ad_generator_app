import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbHighlight } from './highlight';
import { NgbTypeaheadWindow } from './typeahead-window';
import { NgbTypeahead } from './typeahead';
import * as i0 from "@angular/core";
export { NgbHighlight } from './highlight';
export { NgbTypeaheadWindow } from './typeahead-window';
export { NgbTypeaheadConfig } from './typeahead-config';
export { NgbTypeahead } from './typeahead';
export class NgbTypeaheadModule {
}
NgbTypeaheadModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbTypeaheadModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgbTypeaheadModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbTypeaheadModule, declarations: [NgbTypeahead, NgbHighlight, NgbTypeaheadWindow], imports: [CommonModule], exports: [NgbTypeahead, NgbHighlight] });
NgbTypeaheadModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbTypeaheadModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbTypeaheadModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NgbTypeahead, NgbHighlight, NgbTypeaheadWindow],
                    exports: [NgbTypeahead, NgbHighlight],
                    imports: [CommonModule]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90eXBlYWhlYWQvdHlwZWFoZWFkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUU3QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxhQUFhLENBQUM7O0FBRXpDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFDLFlBQVksRUFBOEIsTUFBTSxhQUFhLENBQUM7QUFPdEUsTUFBTSxPQUFPLGtCQUFrQjs7K0dBQWxCLGtCQUFrQjtnSEFBbEIsa0JBQWtCLGlCQUpkLFlBQVksRUFBRSxZQUFZLEVBQUUsa0JBQWtCLGFBRW5ELFlBQVksYUFEWixZQUFZLEVBQUUsWUFBWTtnSEFHekIsa0JBQWtCLFlBRnBCLENBQUMsWUFBWSxDQUFDOzJGQUVaLGtCQUFrQjtrQkFMOUIsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixDQUFDO29CQUM5RCxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDO29CQUNyQyxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7aUJBQ3hCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHtOZ2JIaWdobGlnaHR9IGZyb20gJy4vaGlnaGxpZ2h0JztcclxuaW1wb3J0IHtOZ2JUeXBlYWhlYWRXaW5kb3d9IGZyb20gJy4vdHlwZWFoZWFkLXdpbmRvdyc7XHJcbmltcG9ydCB7TmdiVHlwZWFoZWFkfSBmcm9tICcuL3R5cGVhaGVhZCc7XHJcblxyXG5leHBvcnQge05nYkhpZ2hsaWdodH0gZnJvbSAnLi9oaWdobGlnaHQnO1xyXG5leHBvcnQge05nYlR5cGVhaGVhZFdpbmRvd30gZnJvbSAnLi90eXBlYWhlYWQtd2luZG93JztcclxuZXhwb3J0IHtOZ2JUeXBlYWhlYWRDb25maWd9IGZyb20gJy4vdHlwZWFoZWFkLWNvbmZpZyc7XHJcbmV4cG9ydCB7TmdiVHlwZWFoZWFkLCBOZ2JUeXBlYWhlYWRTZWxlY3RJdGVtRXZlbnR9IGZyb20gJy4vdHlwZWFoZWFkJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbTmdiVHlwZWFoZWFkLCBOZ2JIaWdobGlnaHQsIE5nYlR5cGVhaGVhZFdpbmRvd10sXHJcbiAgZXhwb3J0czogW05nYlR5cGVhaGVhZCwgTmdiSGlnaGxpZ2h0XSxcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdiVHlwZWFoZWFkTW9kdWxlIHtcclxufVxyXG4iXX0=