import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  JhipsterSampleGatewaySharedLibsModule,
  JhipsterSampleGatewaySharedCommonModule,
  JhiLoginModalComponent,
  HasAnyAuthorityDirective
} from './';

@NgModule({
  imports: [JhipsterSampleGatewaySharedLibsModule, JhipsterSampleGatewaySharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [JhipsterSampleGatewaySharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleGatewaySharedModule {
  static forRoot() {
    return {
      ngModule: JhipsterSampleGatewaySharedModule
    };
  }
}
