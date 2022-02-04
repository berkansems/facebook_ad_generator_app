import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * A configuration service for the [`NgbPagination`](#/components/pagination/api#NgbPagination) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the paginations used in the application.
 */
export class NgbPaginationConfig {
    constructor() {
        this.disabled = false;
        this.boundaryLinks = false;
        this.directionLinks = true;
        this.ellipses = true;
        this.maxSize = 0;
        this.pageSize = 10;
        this.rotate = false;
    }
}
NgbPaginationConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbPaginationConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NgbPaginationConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbPaginationConfig, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NgbPaginationConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUV6Qzs7Ozs7R0FLRztBQUVILE1BQU0sT0FBTyxtQkFBbUI7SUFEaEM7UUFFRSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxXQUFNLEdBQUcsS0FBSyxDQUFDO0tBRWhCOztnSEFUWSxtQkFBbUI7b0hBQW5CLG1CQUFtQixjQURQLE1BQU07MkZBQ2xCLG1CQUFtQjtrQkFEL0IsVUFBVTttQkFBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIEEgY29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgW2BOZ2JQYWdpbmF0aW9uYF0oIy9jb21wb25lbnRzL3BhZ2luYXRpb24vYXBpI05nYlBhZ2luYXRpb24pIGNvbXBvbmVudC5cclxuICpcclxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXHJcbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgcGFnaW5hdGlvbnMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcclxuZXhwb3J0IGNsYXNzIE5nYlBhZ2luYXRpb25Db25maWcge1xyXG4gIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgYm91bmRhcnlMaW5rcyA9IGZhbHNlO1xyXG4gIGRpcmVjdGlvbkxpbmtzID0gdHJ1ZTtcclxuICBlbGxpcHNlcyA9IHRydWU7XHJcbiAgbWF4U2l6ZSA9IDA7XHJcbiAgcGFnZVNpemUgPSAxMDtcclxuICByb3RhdGUgPSBmYWxzZTtcclxuICBzaXplOiAnc20nIHwgJ2xnJztcclxufVxyXG4iXX0=