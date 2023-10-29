import { StrictDict } from 'utils';
import { baseAppUrl } from 'data/services/lms/urls';

import * as module from './courseCard';
import * as simpleSelectors from './simpleSelectors';

const { cardSimpleSelectors, mkCardSelector } = simpleSelectors;

const today = new Date();
const dateSixMonthsFromNow = new Date();
dateSixMonthsFromNow.setDate(dateSixMonthsFromNow.getDate() + 180);

export const loadDateVal = (date) => (date ? new Date(date) : null);

export const courseCard = StrictDict({
  certificate: mkCardSelector(
    cardSimpleSelectors.certificate,
    (certificate) => {
      const availableDate = new Date(certificate.availableDate);
      const isAvailable = availableDate <= new Date();
      return {
        availableDate,
        certPreviewUrl: baseAppUrl(certificate.certPreviewUrl),
        isDownloadable: certificate.isDownloadable,
        isEarnedButUnavailable: certificate.isEarned && !isAvailable,
        isRestricted: certificate.isRestricted,
      };
    },
  ),
  course: mkCardSelector(
    cardSimpleSelectors.course,
    (course) => ({
      bannerImgSrc: baseAppUrl(course.bannerImgSrc),
      courseNumber: course.courseNumber,
      courseName: course.courseName,
      socialShareUrl: course.socialShareUrl,
    }),
  ),
  courseProvider: mkCardSelector(
    cardSimpleSelectors.courseProvider,
    (courseProvider) => ({ name: courseProvider?.name }),
  ),
  courseRun: mkCardSelector(
    cardSimpleSelectors.courseRun,
    (courseRun) => (courseRun === null ? {} : {
      endDate: module.loadDateVal(courseRun.endDate),
      startDate: module.loadDateVal(courseRun.startDate),

      courseId: courseRun.courseId,
      isArchived: courseRun.isArchived,
      isStarted: courseRun.isStarted,

      minPassingGrade: Math.floor(courseRun.minPassingGrade * 100),

      homeUrl: courseRun.homeUrl,
      marketingUrl: courseRun.marketingUrl,
      upgradeUrl: courseRun.upgradeUrl,

      progressUrl: baseAppUrl(courseRun.progressUrl),
      resumeUrl: baseAppUrl(courseRun.resumeUrl), // resume will route this to learning mfe.
      unenrollUrl: baseAppUrl(courseRun.unenrollUrl),
    }),
  ),
  credit: mkCardSelector(
    cardSimpleSelectors.credit,
    (credit) => {
      if (!credit || Object.keys(credit).length === 0) {
        return { isEligible: false };
      }
      return {
        isEligible: true,
        providerStatusUrl: credit.providerStatusUrl,
        providerName: credit.providerName,
        providerId: credit.providerId,
        error: credit.error,
        purchased: credit.purchased,
        requestStatus: credit.requestStatus,
      };
    },
  ),
  enrollment: mkCardSelector(
    cardSimpleSelectors.enrollment,
    (enrollment) => {
      if (enrollment == null) {
        return { isEnrolled: false };
      }
      const { isStaff, hasUnmetPrereqs, isTooEarly } = enrollment.coursewareAccess;
      return {
        coursewareAccess: enrollment.coursewareAccess,
        hasAccess: isStaff || !(hasUnmetPrereqs || isTooEarly),
        isEnrolled: enrollment.isEnrolled,
        lastEnrolled: enrollment.lastEnrolled,
        hasStarted: enrollment.hasStarted,

        accessExpirationDate: module.loadDateVal(enrollment.accessExpirationDate),
        canUpgrade: enrollment.canUpgrade,
        isAudit: enrollment.isAudit,
        isAuditAccessExpired: enrollment.isAuditAccessExpired,
        isVerified: enrollment.isVerified,

        isEmailEnabled: enrollment.isEmailEnabled,
        hasOptedOutOfEmail: enrollment.hasOptedOutOfEmail,
      };
    },
  ),
  entitlement: mkCardSelector(
    cardSimpleSelectors.entitlement,
    (entitlement) => {
      if (!entitlement || Object.keys(entitlement).length === 0) {
        return { isEntitlement: false };
      }
      const deadline = new Date(entitlement.changeDeadline);
      const deadlinePassed = deadline < today;
      const showExpirationWarning = (
        !entitlement.isFulfilled
        && !deadlinePassed
        && deadline <= dateSixMonthsFromNow
      );
      return {
        isEntitlement: true,

        availableSessions: entitlement.availableSessions,
        changeDeadline: deadline,
        isExpired: entitlement.isExpired,
        isFulfilled: entitlement.isFulfilled,
        uuid: entitlement.uuid,

        hasSessions: entitlement.availableSessions?.length > 0,
        canChange: !deadlinePassed,
        showExpirationWarning,
      };
    },
  ),
  gradeData: mkCardSelector(
    cardSimpleSelectors.gradeData,
    (gradeData) => ({ isPassing: gradeData.isPassing }),
  ),
  grade: mkCardSelector(
    cardSimpleSelectors.grade,
    (grade) => ({ gradeValue: grade.gradeValue }),
  ),
  subsectionCompletion: mkCardSelector(
   cardSimpleSelectors.subsectionCompletion,
   (subsectionCompletion) => ({ subsectionCompletionSummary: subsectionCompletion.subsectionCompletionSummary }),
  ),
  relatedPrograms: mkCardSelector(
    cardSimpleSelectors.relatedPrograms,
    (relatedPrograms) => ({
      list: relatedPrograms.map(program => ({
        bannerImgSrc: program.bannerImgSrc,
        logoImgSrc: program.logoImgSrc,
        numberOfCourses: program.numberOfCourses,
        programType: program.programType,
        programUrl: program.programUrl,
        provider: program.provider,
        title: program.title,
      })),
      length: relatedPrograms.length,
    }),
  ),
});

export default courseCard;
