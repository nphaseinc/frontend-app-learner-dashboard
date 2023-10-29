import React from 'react';
import PropTypes from 'prop-types';

import { ActionRow } from '@edx/paragon';

import { reduxHooks } from 'hooks';

import BeginCourseButton from './BeginCourseButton';
import ResumeButton from './ResumeButton';
import ViewCourseButton from './ViewCourseButton';
import ViewCertificateButton from './ViewCertificateButton';

export const CourseCardActions = ({ cardId }) => {
  const { isVerified, hasStarted } = reduxHooks.useCardEnrollmentData(cardId);
  const { isArchived } = reduxHooks.useCardCourseRunData(cardId);
  const certificate = reduxHooks.useCardCertificateData(cardId);

  let PrimaryButton;
  if (certificate.isDownloadable) {
    PrimaryButton = ViewCertificateButton;
  } else if (isArchived) {
    PrimaryButton = ViewCourseButton;
  } else {
    PrimaryButton = hasStarted ? ResumeButton : BeginCourseButton;
  }

  return (
    <ActionRow data-test-id="CourseCardActions">
      <PrimaryButton cardId={cardId} />
    </ActionRow>
  );
};
CourseCardActions.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCardActions;
