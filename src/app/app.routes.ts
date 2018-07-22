import { CachingReportComponent } from './report/component/caching-report/caching-report.component';
import { MonthlyDifferencesReportComponent } from './report/component/monthly-differences-report/monthly-differences-report.component';
import { ChangeRequestComponent } from './change-request/change-request/change-request.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
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
import { ViewAllApplicantComponent } from './view-all-applicant/view-all-applicant.component';
import { ViewPersonInfoComponent } from './request/view/view-person-info/view-person-info.component';
import { LookupResolverService } from './resolver/lookup-resolver.service';
import { AuthGuard } from './guard/authguard';
import { TaskComponent } from './task/task/task.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MeetingComponent } from './committee/meeting/meeting.component';
import { ViewMeetingComponent } from './committee/view-meeting/view-meeting.component';
import { MeetingActionComponent } from './committee/meeting-action/meeting-action.component';


export const routes: Routes = [
    { path: '', component: TaskComponent, canActivate: [AuthGuard], resolve: { data: LookupResolverService } },
    { path: 'task', component: TaskComponent, canActivate: [AuthGuard], resolve: { data: LookupResolverService } },
    { path: 'meeting', component: MeetingComponent, canActivate: [AuthGuard], resolve: { data: LookupResolverService } },
    { path: 'sample', component: SampleDemoComponent },
    { path: 'forms', component: FormsDemoComponent },
    { path: 'data', component: DataDemoComponent },
    { path: 'panels', component: PanelsDemoComponent },
    { path: 'overlays', component: OverlaysDemoComponent },
    { path: 'menus', component: MenusDemoComponent },
    { path: 'messages', component: MessagesDemoComponent },
    { path: 'misc', component: MiscDemoComponent },
    { path: 'empty', component: EmptyDemoComponent },
    { path: 'charts', component: ChartsDemoComponent },
    { path: 'file', component: FileDemoComponent },
    { path: 'utils', component: UtilsDemoComponent },
    { path: 'documentation', component: DocumentationComponent },
    { path: "viewApplicantList", component: ViewAllApplicantComponent, canActivate: [AuthGuard] },
    { path: "view-person-info/:applicantCpr/:applicantFamilyRelationCode/:applicantFamilyId/:familyId", component: ViewPersonInfoComponent, canActivate: [AuthGuard], resolve: { data: LookupResolverService } },
    { path: "view-family-members-info/:familyId", component: ViewPersonInfoComponent, canActivate: [AuthGuard], resolve: { data: LookupResolverService } },
    { path: "applyforMonthlySponsership", component: ViewPersonInfoComponent, canActivate: [AuthGuard], resolve: { data: LookupResolverService } },
    { path: "updateMonthlySponsershipRequest/:requestId/:taskId/:stageName", component: ViewPersonInfoComponent, canActivate: [AuthGuard], resolve: { data: LookupResolverService } },
    { path: 'viewMeeting/:meetingId', component: ViewMeetingComponent, canActivate: [AuthGuard], resolve: { data: LookupResolverService } },
    { path: 'startMeeting/:meetingId', component: MeetingActionComponent, canActivate: [AuthGuard]},
    { path: "monthlySponsershipChangeRequest/:applicantCpr/:applicantFamilyRelationCode/:applicantFamilyId/:familyId", component: ChangeRequestComponent, canActivate: [AuthGuard], resolve: { data: LookupResolverService } },
    { path: "updateMonthlySponsershipChangeRequest/:applicantCpr/:familyId/:taskId/:stageName", component: ChangeRequestComponent, canActivate: [AuthGuard], resolve: { data: LookupResolverService } },
    { path: "monthlyDifferencesReport", component: MonthlyDifferencesReportComponent, canActivate: [AuthGuard], resolve: { data: LookupResolverService } },
    { path: "monthlyCashingReport", component: CachingReportComponent, canActivate: [AuthGuard], resolve: { data: LookupResolverService } },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '/404' }

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
