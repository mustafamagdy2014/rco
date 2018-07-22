import { Injectable } from '@angular/core'

@Injectable()
export class Globals {
   static DATE_FMT="yyyy-MM-dd";
   static IBAN_PATTERN="[Bb][Hh]\\d{2}[A-Za-z]{4}[A-Za-z0-9]{14}";
   static TOPIC_STOP_SPONSERSHIP_ID=3;
   static TOPIC_RESUME_SPONSERSHIP_ID=4;
   static TOPIC_PAY_SPONSERSHIP_ID=5;
   static TOPIC_CHANGE_DATA_ID=6;
   
   static REASON_DEATH_ID=3;
   static REASON_WORKING_ID=4;
   static REASON_MARRIAGE_ID=5;
   static REASON_NOT_IN_BAHRAIN_ID=6;
   static REASON_NOT_STUDYING_ID=7;
   static REASON_GRADUATING_ID=8;
   static REASON_STUDYING_ID=9;
   static REASON_IN_BAHRAIN_ID=10;
   static REASON_OTHER_ID=11;
   static REASON_CHANGE_ACCOUNT_DETAILS_ID=15;
   static REASON_CHANGE_SPONSER_ID=16;
   static REASON_CHANGE_CONTACT_DETAILS_ID=17;

    static   CONTACT_OWNER_NEXT_OF_KIN=1;
    static   CONTACT_OWNER_SPONSOR=2;
    static   CONTACT_OWNER_WIDOW=3;
    static DECISION_DESERVE=1;
    static DECISION_NOT_DESERVE=2;

    static REQUEST_TYPE_SPONSORSHIP_REQUEST_ID=1;
    static REQUEST_TYPE_SPONSORSHIP_CHANGE_REQUEST_ID=2;
    
   
    GENERAL_SEARCH = 'بحث عام';
    APPLICANTS_DATA = 'بيانات الافراد الرئيسية';
    FAMILY_ID = 'رقم الاسرة';
    CPR_NUMBER = 'الرقم الشخصي';
    NAME = 'الاسم';
    APPLICANT_TYPE = 'نوع الفرد';
    APPLICANT_STATUS = 'حالة الفرد';
    VIEW = 'عرض';
    CHANGE_REQ = 'بلاغ وارد';
    No_RECORDS = 'لا يوجد بيانات';

    /* Section Header Name */
    SPONSER_HEADER='بيانات الكفيل';
    ORPHAN_HEADER='بيانات الفرد';
    WIDOW_HEADER='بيانات الأم';
    FATHER_HEADER='بيانات الأب';
    FAMILY_MEMBERS_HEADER='بيانات المستفيدين';
    NEXTOFKIN_HEADER='بيانات ولي الأمر';
    INCOME_HEADER='بيانات الدخل';
    EXPENSE_HEADER='بيانات المصروفات';
    FAMILY_HEADER='بيانات الأسرة';
    APPLICANT_HEADER='بيانات مقدم الطلب';
    ATTACHMENT_HEADER='المرفقات';
    COMMENT_HEADER='الملاحظات';
    PAYMENT_DETAILS_HEADER='تفاصيل الصرف';
    VISIT_DETAILS_HEADER='تفاصيل الزيارة';
    SOCIAL_RESEARCHER_RECOMMENDATION_HEADER='توصية الباحث';
    static COMMITTEE_DECISION_HEADER="قرار اللجنة";
    static ASSIGNEES_HEADER='أختر الموظف التالى';
    static BREADCRUMB_TASK_LIST='قائمة المهام';
    static BREADCRUMB_INDIVIDUAL_INFO='بيانات الفرد';
    static BREADCRUMB_FAMILY_MEMBERS_INFO='بيانات الاسرة';
    static BREADCRUMB_NEW_SPONSERSHIP_REQUEST='طلب كفالة جديد';
    static BREADCRUMB_REVIEW_SPONSERSHIP_REQUEST='مراجعة طلب كفالة';
    static BREADCRUMB_INDIVIDUALS_LIST='قائمة الافراد';
    static BREADCRUMB_CHANGE_REQUEST='بلاغ وارد';

}