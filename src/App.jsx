import React, {useState} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { useIntl } from '@edx/frontend-platform/i18n';
import { logError } from '@edx/frontend-platform/logging';
import { initializeHotjar } from '@edx/frontend-enterprise-hotjar';

import { ErrorPage, AppContext } from '@edx/frontend-platform/react';
import Footer from '@edx/frontend-component-footer';
import { Alert } from '@edx/paragon';

import { RequestKeys } from 'data/constants/requests';
import store from 'data/store';
import {
  selectors,
  actions,
} from 'data/redux';
import { reduxHooks } from 'hooks';
import Dashboard from 'containers/Dashboard';
import ZendeskFab from 'components/ZendeskFab';

import track from 'tracking';

import fakeData from 'data/services/lms/fakeData/courses';
import LearnerDashboardHeaderVariant from './containers/LearnerDashboardHeaderVariant';

import messages from './messages';

import './App.scss';

export const App = () => {
  const { authenticatedUser } = React.useContext(AppContext);
  const { formatMessage } = useIntl();
  const isFailed = {
    initialize: reduxHooks.useRequestIsFailed(RequestKeys.initialize),
    refreshList: reduxHooks.useRequestIsFailed(RequestKeys.refreshList),
  };
  const hasNetworkFailure = isFailed.initialize || isFailed.refreshList;
  const { supportEmail } = reduxHooks.usePlatformSettingsData();
  const showUserRccRoleData = reduxHooks.userRccRoleData();
  const loadData = reduxHooks.useLoadData();

  React.useEffect(() => {
    if (authenticatedUser?.administrator || process.env.NODE_ENV === 'development') {
      window.loadEmptyData = () => {
        loadData({ ...fakeData.globalData, courses: [] });
      };
      window.loadMockData = () => {
        loadData({
          ...fakeData.globalData,
          courses: [
            ...fakeData.courseRunData,
            ...fakeData.entitlementData,
          ],
        });
      };
      window.store = store;
      window.selectors = selectors;
      window.actions = actions;
      window.track = track;
    }
    if (process.env.HOTJAR_APP_ID) {
      try {
        initializeHotjar({
          hotjarId: process.env.HOTJAR_APP_ID,
          hotjarVersion: process.env.HOTJAR_VERSION,
          hotjarDebug: !!process.env.HOTJAR_DEBUG,
        });
      } catch (error) {
        logError(error);
      }
    }
  }, [authenticatedUser, loadData]);
  const [currentRole, setCurrentRole] = useState(localStorage.getItem('current_role'), '');
  const handleClick = (role) => {
    localStorage.setItem('current_role', role);
    setCurrentRole(role);
  };

  return (
    <Router>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <div>
        <LearnerDashboardHeaderVariant
            selectRole = {handleClick} showUserRccRoleData={showUserRccRoleData}
            title={currentRole || (showUserRccRoleData && showUserRccRoleData[0] && showUserRccRoleData[0].rcc_role) ? (currentRole ? currentRole : showUserRccRoleData[0].rcc_role) : 'Select Role'}
        />
        <main>
          {hasNetworkFailure
            ? (
              <Alert variant="danger">
                <ErrorPage message={formatMessage(messages.errorMessage, { supportEmail })} />
              </Alert>
            ) : (<Dashboard role={currentRole} />)}
        </main>
        <Footer logo={process.env.LOGO_POWERED_BY_OPEN_EDX_URL_SVG} />
        <ZendeskFab />
      </div>
    </Router>
  );
};

export default App;
