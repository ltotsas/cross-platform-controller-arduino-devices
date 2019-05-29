import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RouteReusableStrategy } from './route-reusable-strategy';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { I18nService } from './i18n.service';
import { HttpService } from './http/http.service';
import { HttpCacheService } from './http/http-cache.service';
import { ApiPrefixInterceptor } from './http/api-prefix.interceptor';
import { ErrorHandlerInterceptor } from './http/error-handler.interceptor';
import { CacheInterceptor } from './http/cache.interceptor';
import { SocketService } from './services/socket.service';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '@env/environment';
import { NgxsModule } from '@ngxs/store';
import { DevicesState } from '@app/devices/state/devices.store';
import { SocketState } from './state/socket-store';
import { GroupsState } from '@app/groups/state/groups-state';
import { ModalService } from './services/modal.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    NgxsModule.forRoot([SocketState, DevicesState, GroupsState], { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production, // Set to true for prod mode
      maxAge: 10
    }),
    RouterModule
  ],
  providers: [
    SocketService,
    ModalService,
    AuthenticationService,
    AuthenticationGuard,
    I18nService,
    HttpCacheService,
    ApiPrefixInterceptor,
    ErrorHandlerInterceptor,
    CacheInterceptor,
    {
      provide: HttpClient,
      useClass: HttpService
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule, socketService: SocketService) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}
