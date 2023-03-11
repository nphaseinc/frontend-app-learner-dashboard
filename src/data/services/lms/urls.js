import { StrictDict } from 'utils';
import { configuration } from 'config';
import { getConfig } from '@edx/frontend-platform';

const baseUrl = 'https://lms-dev.redcapcloud.com';
export const ecommerceUrl = `${configuration.ECOMMERCE_PUBLIC_URL_ROOT}`;

export const api = `${baseUrl}/api`;

// const init = `${api}learner_home/mock/init`; // mock endpoint for testing
const init = `${api}/rcc-custom-dashboard/init-dashboard/`;

const event = `${baseUrl}/event`;
const courseUnenroll = `${baseUrl}/change_enrollment`;
const updateEmailSettings = `${api}/change_email_settings`;
const entitlementEnrollment = (uuid) => `${api}/entitlements/v1/entitlements/${uuid}/enrollments`;

// if url is null or absolute, return it as is
const updateUrl = (base, url) => ((url == null || url.startsWith('http://') || url.startsWith('https://')) ? url : `${base}${url}`);

export const baseAppUrl = (url) => updateUrl(baseUrl, url);
export const learningMfeUrl = (url) => updateUrl(getConfig().LEARNING_BASE_URL, url);

// static view url
const programsUrl = baseAppUrl('/dashboard/programs');

export const creditPurchaseUrl = (courseId) => `${ecommerceUrl}/credit/checkout/${courseId}`;
export const creditRequestUrl = (providerId) => `${api}/credit/v1/providers/${providerId}/request`;

export default StrictDict({
  api,
  baseAppUrl,
  courseUnenroll,
  creditPurchaseUrl,
  creditRequestUrl,
  entitlementEnrollment,
  event,
  init,
  learningMfeUrl,
  programsUrl,
  updateEmailSettings,
});
