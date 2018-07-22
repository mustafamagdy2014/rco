import { SponsorshipChangeRequestService } from './service/sponsorship-change-request.service';
import { TaskService } from './service/task.service';
import { PaymentDetailsService } from './service/payment-details.service';
import { IncomeAttachmentService } from './service/income-attachment.service';
import { ExpenseAttachmentService } from './service/expense-attachment.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { AppRoutes } from './app.routes';
import 'rxjs/add/operator/toPromise';

import { AccordionModule, ConfirmationService } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { BreadcrumbModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { CarouselModule } from 'primeng/primeng';
import { ChartModule } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';
import { ChipsModule } from 'primeng/primeng';
import { CodeHighlighterModule } from 'primeng/primeng';
import { ConfirmDialogModule } from 'primeng/primeng';
import { ColorPickerModule } from 'primeng/primeng';
import { SharedModule } from 'primeng/primeng';
import { ContextMenuModule } from 'primeng/primeng';
import { DataGridModule } from 'primeng/primeng';
import { DataListModule } from 'primeng/primeng';
import { DataScrollerModule } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { DragDropModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { EditorModule } from 'primeng/primeng';
import { FieldsetModule } from 'primeng/primeng';
import { FileUploadModule } from 'primeng/primeng';
import { GalleriaModule } from 'primeng/primeng';
import { GMapModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { InputMaskModule } from 'primeng/primeng';
import { InputSwitchModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { InputTextareaModule } from 'primeng/primeng';
import { LightboxModule } from 'primeng/primeng';
import { ListboxModule } from 'primeng/primeng';
import { MegaMenuModule } from 'primeng/primeng';
import { MenuModule } from 'primeng/primeng';
import { MenubarModule } from 'primeng/primeng';
import { MessagesModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/primeng';
import { OrderListModule } from 'primeng/primeng';
import { OrganizationChartModule } from 'primeng/primeng';
import { OverlayPanelModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { PanelMenuModule } from 'primeng/primeng';
import { PasswordModule } from 'primeng/primeng';
import { PickListModule } from 'primeng/primeng';
import { ProgressBarModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { RatingModule } from 'primeng/primeng';
import { ScheduleModule } from 'primeng/primeng';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectButtonModule } from 'primeng/primeng';
import { SlideMenuModule } from 'primeng/primeng';
import { SliderModule } from 'primeng/primeng';
import { SpinnerModule } from 'primeng/primeng';
import { SplitButtonModule } from 'primeng/primeng';
import { StepsModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/primeng';
import { TabViewModule } from 'primeng/primeng';
import { TerminalModule } from 'primeng/primeng';
import { TieredMenuModule } from 'primeng/primeng';
import { ToggleButtonModule } from 'primeng/primeng';
import { ToolbarModule } from 'primeng/primeng';
import { TooltipModule } from 'primeng/primeng';
import { TreeModule } from 'primeng/primeng';
import { TreeTableModule } from 'primeng/primeng';
import { BlockUIModule } from 'primeng/blockui';
import { AppComponent } from './app.component';
import { AppMenuComponent, AppSubMenuComponent } from './app.menu.component';
import { AppBreadcrumbComponent } from './app.breadcrumb.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { DashboardComponent } from './demo/view/dashboard.component';
import { SampleDemoComponent } from './demo/view/sampledemo.component';
import { FormsDemoComponent } from './demo/view/formsdemo.component';
import { DataDemoComponent } from './demo/view/datademo.component';
import { PanelsDemoComponent } from './demo/view/panelsdemo.component';
import { OverlaysDemoComponent } from './demo/view/overlaysdemo.component';
import { MenusDemoComponent } from './demo/view/menusdemo.component';
import { MessagesDemoComponent } from './demo/view/messagesdemo.component';
import { MiscDemoComponent } from './demo/view/miscdemo.component';
import { EmptyDemoComponent } from './demo/view/emptydemo.component';
import { ChartsDemoComponent } from './demo/view/chartsdemo.component';
import { FileDemoComponent } from './demo/view/filedemo.component';
import { UtilsDemoComponent } from './demo/view/utilsdemo.component';
import { DocumentationComponent } from './demo/view/documentation.component';

import { CarService } from './demo/service/carservice';
import { CountryService } from './demo/service/countryservice';
import { EventService } from './demo/service/eventservice';
import { NodeService } from './demo/service/nodeservice';

import { BreadcrumbService } from './breadcrumb.service';
import { CardModule } from 'primeng/card';

import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { FamilyService } from './service/family.service';
import { ViewAllApplicantComponent } from './view-all-applicant/view-all-applicant.component';

import { OrphanComponent } from './request/component/orphan/orphan.component';
import { WidowComponent } from './request/component/widow/widow.component';
import { FatherComponent } from './request/component/father/father.component';
import { NextOfKinComponent } from './request/component/next-of-kin/next-of-kin.component';
import { SponsorComponent } from './request/component/sponsor/sponsor.component';
import { IncomeComponent } from './request/component/income/income.component';
import { ExpenseComponent } from './request/component/expense/expense.component';
import { ViewPersonInfoComponent } from './request/view/view-person-info/view-person-info.component';


import { PersonService } from './service/person.service';
import { SharedService } from './service/shared.service';
import { LookupService } from './service/lookup.service';
import { LookupResolverService } from './resolver/lookup-resolver.service';
import { FamilymembersComponent } from './request/component/familymembers/familymembers.component';
import { UtilityService } from './service/utility.service';
import { FamilyComponent } from './request/component/family/family.component';
import { AttachmentComponent } from './request/component/attachment/attachment.component';
import { CommentComponent } from './request/component/comment/comment.component';
import { ApplicantComponent } from './request/component/applicant/applicant.component';
import { AttachmentService } from './service/attachment.service';
import { SponsorshipRequestService } from './service/sponsorship-request.service';
import { Globals } from './common/globals';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AppService } from './service/app.service';
import { UserService } from './service/user.service';
import { PaymentDetailsComponent } from './request/component/payment-details/payment-details.component';
import { AuthGuard } from './guard/authguard';
import { TaskComponent } from './task/task/task.component';
import { TaskSearchComponent } from './task/component/task-search/task-search.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ResearcherVisitComponent } from './request/component/researcher-visit/researcher-visit.component';
import { TaskListComponent } from './task/component/task-list/task-list.component';
import { VisitDetailsComponent } from './request/component/visit-details/visit-details.component';
import { VisitDetailService } from './service/visit-detail.service';
import { AssigneesComponent } from './assignees/assignees.component';
import { HttpErrorInterceptor } from './interceptor/http-error-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorComponent } from './error/error.component';
import { MeetingComponent } from './committee/meeting/meeting.component';
import { MeetingListComponent } from './committee/meeting-list/meeting-list.component';
import { MeetingService } from './service/meeting.service';
import { ViewMeetingComponent } from './committee/view-meeting/view-meeting.component';
import { MeetingActionComponent } from './committee/meeting-action/meeting-action.component';
import { ChangeRequestComponent } from './change-request/change-request/change-request.component';
import { CommitteeDiscussComponent } from './committee/committee-discuss/committee-discuss.component';
import { TopicComponent } from './change-request/component/topic/topic.component';
import { ChangeRequestApplicantComponent } from './change-request/component/change-request-applicant/change-request-applicant.component';
import { DisscussPipe } from './common/pipe/disscuss.pipe';
import { BeneficiaryInfoComponent } from './change-request/component/beneficiary-info/beneficiary-info.component';
import { ResearcherRecommendationComponent } from './request/component/researcher-recommendation/researcher-recommendation.component';
import { NumberSuffexPipe } from './common/pipe/number-suffex.pipe';
import { CachingReportComponent } from './report/component/caching-report/caching-report.component';
import { CommitteeDecisionComponent } from './change-request/component/committee-decision/committee-decision.component';
import { MonthlyDifferencesReportComponent } from './report/component/monthly-differences-report/monthly-differences-report.component';
import { ResearcherVisitChangeRequestComponent } from './change-request/component/researcher-visit-change-request/researcher-visit-change-request.component';
import { environment } from '../environments/environment';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutes,
        HttpModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CarouselModule,
        ChartModule,
        CheckboxModule,
        ChipsModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        ColorPickerModule,
        SharedModule,
        ContextMenuModule,
        DataGridModule,
        DataListModule,
        DataScrollerModule,
        DataTableModule,
        DialogModule,
        DragDropModule,
        DropdownModule,
        EditorModule,
        FieldsetModule,
        FileUploadModule,
        GalleriaModule,
        GMapModule,
        GrowlModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        ScheduleModule,
        ScrollPanelModule,
        SelectButtonModule,
        SlideMenuModule,
        SliderModule,
        SpinnerModule,
        SplitButtonModule,
        StepsModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TerminalModule,
        TieredMenuModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,
        BlockUIModule,
        CardModule,
        LoggerModule.forRoot({ level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR }),
        OAuthModule.forRoot({
            resourceServer: {
                allowedUrls: [environment.resourceServer],
                sendAccessToken: true
            }
        })
    ],
    declarations: [
        AppComponent,
        AppMenuComponent,
        AppSubMenuComponent,
        AppBreadcrumbComponent,
        AppTopBarComponent,
        AppFooterComponent,
        DashboardComponent,
        SampleDemoComponent,
        FormsDemoComponent,
        DataDemoComponent,
        PanelsDemoComponent,
        OverlaysDemoComponent,
        MenusDemoComponent,
        MessagesDemoComponent,
        MessagesDemoComponent,
        MiscDemoComponent,
        ChartsDemoComponent,
        EmptyDemoComponent,
        FileDemoComponent,
        UtilsDemoComponent,
        DocumentationComponent,
        ViewAllApplicantComponent,
        FamilyComponent,
        OrphanComponent,
        WidowComponent,
        FatherComponent,
        NextOfKinComponent,
        SponsorComponent,
        IncomeComponent,
        ExpenseComponent,
        ViewPersonInfoComponent,
        FamilymembersComponent,
        CommentComponent,
        AttachmentComponent,
        ApplicantComponent,
        PaymentDetailsComponent,
        TaskSearchComponent,
        TaskComponent,
        VisitDetailsComponent,
        TaskListComponent,
        NotFoundComponent,
        MeetingComponent,
        ResearcherVisitComponent,
        AssigneesComponent,
        MeetingListComponent,
        ErrorComponent,
        ViewMeetingComponent,
        MeetingActionComponent,
        ChangeRequestComponent,
        CommitteeDiscussComponent,
        TopicComponent,
        ChangeRequestApplicantComponent,
        DisscussPipe,
        BeneficiaryInfoComponent,
        ResearcherRecommendationComponent,
        NumberSuffexPipe,
        CachingReportComponent,
        CommitteeDecisionComponent,
        MonthlyDifferencesReportComponent,
        ResearcherVisitChangeRequestComponent
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: HttpErrorInterceptor,
        multi: true,
      },
        AppService,UserService,BreadcrumbService,CarService, CountryService, EventService, NodeService, SponsorshipRequestService, DatePipe,
        UtilityService, LookupService, LookupResolverService, Globals, FamilyService, PersonService, SharedService,
        LookupService, LookupResolverService, Globals, FamilyService, PersonService, SharedService,
        AttachmentService, ConfirmationService, IncomeAttachmentService, ExpenseAttachmentService,
        PaymentDetailsService, AuthGuard, VisitDetailService, TaskService, MeetingService, SponsorshipChangeRequestService],
    bootstrap: [AppComponent]
})
export class AppModule { }
