import React from 'react';

import MasqueradeBar from 'containers/MasqueradeBar';
import ConfirmEmailBanner from 'containers/LearnerDashboardHeader/ConfirmEmailBanner';

import CollapsedHeader from './CollapsedHeader';
import ExpandedHeader from './ExpandedHeader';

import './index.scss';

export const LearnerDashboardHeaderVariant = () => (
  <>
    <CollapsedHeader />
    <ExpandedHeader />
    <MasqueradeBar />
  </>
);

LearnerDashboardHeaderVariant.propTypes = {};

export default LearnerDashboardHeaderVariant;
