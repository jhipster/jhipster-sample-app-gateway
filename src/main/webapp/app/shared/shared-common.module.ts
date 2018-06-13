import { NgModule } from '@angular/core';

import { JhipsterSampleGatewaySharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [JhipsterSampleGatewaySharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [JhipsterSampleGatewaySharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class JhipsterSampleGatewaySharedCommonModule {}
