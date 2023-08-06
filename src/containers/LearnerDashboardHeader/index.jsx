import React from 'react';

import MasqueradeBar from 'containers/MasqueradeBar';

import CollapsedHeader from './CollapsedHeader';
import ExpandedHeader from './ExpandedHeader';

import './index.scss';

export const LearnerDashboardHeader = ({selectRole, showUserRccRoleData, title}) => (
  <>
    <CollapsedHeader />
      <ExpandedHeader selectRole={selectRole} showUserRccRoleData={showUserRccRoleData} title={title} />
    <MasqueradeBar />
  </>
);

LearnerDashboardHeader.propTypes = {};

export default LearnerDashboardHeader;
