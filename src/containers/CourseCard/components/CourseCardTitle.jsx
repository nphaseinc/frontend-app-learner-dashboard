import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@edx/paragon';

import track from 'tracking';
import { reduxHooks } from 'hooks';

const { courseTitleClicked } = track.course;

export const CourseCardTitle = ({ cardId }) => {
  const { courseName } = reduxHooks.useCardCourseData(cardId);
  const { isEntitlement, isFulfilled } = reduxHooks.useCardEntitlementData(cardId);
  const { homeUrl } = reduxHooks.useCardCourseRunData(cardId);
  const handleTitleClicked = reduxHooks.useTrackCourseEvent(courseTitleClicked, cardId, homeUrl);
  return (
    <Button
      variant="link"
      as="a"
      href={homeUrl || 'disabled'}
      className="course-card-title text-dark p-0"
      data-testid="CourseCardTitle"
      onClick={handleTitleClicked}
      disabled={isEntitlement && !isFulfilled}
    >
      <h3>{courseName}</h3>
    </Button>
  );
};

CourseCardTitle.propTypes = {
  cardId: PropTypes.string.isRequired,
};

CourseCardTitle.defaultProps = {};

export default CourseCardTitle;
