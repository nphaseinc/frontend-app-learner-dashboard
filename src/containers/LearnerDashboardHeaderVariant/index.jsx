import React from 'react';

import MasqueradeBar from 'containers/MasqueradeBar';
import ConfirmEmailBanner from 'containers/LearnerDashboardHeader/ConfirmEmailBanner';

import CollapsedHeader from './CollapsedHeader';
import ExpandedHeader from './ExpandedHeader';

import './index.scss';

export const LearnerDashboardHeaderVariant = ({selectRole, showUserRccRoleData, title}) => (
  <>
    <CollapsedHeader />
    <ExpandedHeader selectRole={selectRole} showUserRccRoleData={showUserRccRoleData} title={title} />
    <MasqueradeBar />
  </>
);

LearnerDashboardHeaderVariant.propTypes = {};

export default LearnerDashboardHeaderVariant;
