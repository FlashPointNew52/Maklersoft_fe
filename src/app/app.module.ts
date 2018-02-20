/**
 * Created by Aleksandr on 11.11.16.
 */
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {HttpModule} from "@angular/http";
import {RouterModule, Routes } from '@angular/router';

import {AppComponent} from "./app.component";

import {ContextMenuComponent} from "./component/context-menu.component";
import {NotebookComponent} from "./component/notebook.component";
import {NotebookTask} from "./component/notebook/notebook-task.component";
import {Almanac} from "./component/notebook/almanac.component";
import {NotebookTaskDescribe} from "./component/notebook/notebook-task-describe.component";
import {TabSystemComponent} from "./component/tab-system.component";
import {TabRootComponent} from "./component/tab/tab-root.component";
import {TabMainComponent} from "./component/tab/tab-main.component";
import {TabListOfferComponent} from "./component/tab/tab-list-offer.component";
import {TabOfferComponent} from "./component/tab/tab-offer.component";
import {TabListPersonComponent} from "./component/tab/tab-list-person.component";
import {TabPersonComponent} from "./component/tab/tab-person.component";
import {TabListOrganisationComponent} from "./component/tab/tab-list-organisation.component";
import {TabOrganisationComponent} from "./component/tab/tab-organisation.component";
import {TabListRequestComponent} from "./component/tab/tab-list-request.component";
import {TabRequestComponent} from "./component/tab/tab-request.component";
import {TabListUserComponent} from "./component/tab/tab-list-user.component";
import {TabUserComponent} from "./component/tab/tab-user.component";
import {TabAdvertisingComponent} from "./component/tab/tab-advertising.component";
import {TabActivityComponent} from "./component/tab/tab-activity.component";
import {TabListActivityComponent} from "./component/tab/tab-list-activity.component";
import {TabDailyComponent} from "./component/tab/tab-daily.component";
import {UISelect} from "./component/ui/ui-select.component";
import {UIMultiSelect} from "./component/ui/ui-multiselect.component";
import {UIInputLine} from "./component/ui/ui-input-line.component";
import {UIViewLine} from "./component/ui/ui-view-line.component";
import {UISlidingMenu} from "./component/ui/ui-slidingMenu.component";
import {OfferTableComponent} from "./component/offer-table.component";
import {DigestOfferComponent} from "./component/digest/digest-offer.component";
import {DigestOfferLineComponent} from "./component/digest/digest-offer-line.component";
import {DigestOfferTableComponent} from "./component/digest/digest-offer-table.component";
import {DigestOfferTable2Component} from "./component/digest/digest-offer-table2.component";
import {GoogleMapComponent, GoogleMapMarkerComponent} from "./component/google-map.component";
import {UITabs} from "./component/ui/ui-tabs.component";
import {UITab} from "./component/ui/ui-tab.component";
import {DigestHistoryComponent} from "./component/digest/digest-history.component";
import {DigestUserComponent} from "./component/digest/digest-user.component";
import {DigestWindowComponent} from "./component/digest/digest-window.component";
import {DigestOrganisationComponent} from "./component/digest/digest-organisation.component";
import {DigestRequestComponent} from "./component/digest/digest-request.component";
import {UILineChart} from "./component/ui/ui-line-chart.component";
import {UIBarChart} from "./component/ui/ui-bar-chart.component";
import {UIPieChart} from "./component/ui/ui-pie-chart.component";
import {UICarousel} from "./component/ui/ui-carousel.component";
import {UITagBlock} from "./component/ui/ui-tag-block.component";
import {DigestPersonComponent} from "./component/digest/digest-person.component";
import {UITag} from "./component/ui/ui-tag.component";
import {UIViewValue} from "./component/ui/ui-view-value";
import {UIUploadFile} from "./component/ui/ui-upload-file.component";
import {UIMultiView} from "./component/ui/ui-multi-view";
import {OffClickDirective} from "./component/ui/off-click";
import {UIDocument} from "./component/ui/ui-document.component";
import {UIAdvertising} from "./component/ui/ui-advertising.component";
import {UISwitchButton} from "./component/ui/ui-switch-button";
import {DigestPieChartComponent} from "./component/digest/digest-pie-chart.component";
import {DigestColumnChartComponent} from "./component/digest/digest-column-chart.component";
import {DigestAreaChartComponent} from "./component/digest/digest-area-chart.component";

import {LoginScreenComponent} from "./login-screen.component";
import {AdminPageComponent} from "./admin-page.component";
import {MainComponent} from "./main.component";

import {FormatDatePipe} from "./pipe/format-date.pipe";
import {StrNnPipe} from "./pipe/str-nn.pipe";

import {GoogleChartComponent} from "./component/ui/chart/google-chart.component";
import {phoneBlockAsStringPipe} from "./pipe/phone-block-as-string.pipe";

const appRoutes: Routes = [
    { path: 'admin', component: AdminPageComponent },
    { path: 'main', component: MainComponent },
    { path: '',
        redirectTo: '/main',
        pathMatch: 'full'
    }
    //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes, {useHash: true})
    ],
    declarations: [
        FormatDatePipe,
        StrNnPipe,
        phoneBlockAsStringPipe,

        LoginScreenComponent,
        AdminPageComponent,

        AppComponent,
        MainComponent,
        ContextMenuComponent,
        NotebookComponent,
        NotebookTask,
        Almanac,
        NotebookTaskDescribe,
        TabSystemComponent,
        TabRootComponent,
        TabMainComponent,
        TabListOfferComponent,
        TabOfferComponent,
        TabListPersonComponent,
        TabPersonComponent,
        TabListOrganisationComponent,
        TabOrganisationComponent,
        TabListRequestComponent,
        TabRequestComponent,
        TabListUserComponent,
        TabUserComponent,
        TabAdvertisingComponent,
        TabListActivityComponent,
        TabActivityComponent,
        TabDailyComponent,
        OfferTableComponent,
        DigestOfferComponent,
        DigestOfferLineComponent,
        DigestOfferTableComponent,
        DigestOfferTable2Component,
        GoogleMapComponent,
        GoogleMapMarkerComponent,

        DigestHistoryComponent,
        DigestUserComponent,
        DigestWindowComponent,
        DigestOrganisationComponent,
        DigestRequestComponent,
        DigestPersonComponent,
        DigestPieChartComponent,
        DigestColumnChartComponent,
        DigestAreaChartComponent,

        UISelect,
        UIMultiSelect,
        UISlidingMenu,
        UIInputLine,
        UIViewValue,
        UIViewLine,
        UIMultiView,
        UITabs,
        UITab,
        UITag,
        UITagBlock,
        UILineChart,
        UIBarChart,
        UIPieChart,
        UICarousel,
        UIUploadFile,
        UIDocument,
        GoogleChartComponent,
        UIAdvertising,
        UISwitchButton,

        OffClickDirective
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {
}
