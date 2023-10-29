import React from 'react';
import PropTypes from 'prop-types';

import {Icon, Image} from '@edx/paragon';
import GraduationCapSVG from 'assets/graduation-cap.svg';
import { useIntl } from '@edx/frontend-platform/i18n';
import { BookOpen } from '@edx/paragon/icons';
import useCardDetailsData from './hooks';
import './index.scss';
import messages from "../../../CourseList/NoCoursesView/messages";
import {reduxHooks} from "../../../../hooks";
import { CheckCircle } from '@edx/paragon/icons';

export const CourseCardDetails = ({ cardId }) => {
  const {
    providerName,
  } = useCardDetailsData({ cardId });
  const { minPassingGrade } = reduxHooks.useCardCourseRunData(cardId);
    const { subsectionCompletionSummary } = reduxHooks.useCardSubsectionCompletion(cardId);
    const certificate = reduxHooks.useCardCertificateData(cardId);

  const { formatMessage } = useIntl();

  return (
      <>
    <p className="small" data-testid="CourseCardDetails">
      {providerName}
    </p>
          <div className="align-items-center justify-content-center mb-3 small">
              <div className="vertical-align">
    <span>
      <Icon className="m-auto" src={BookOpen} alt={formatMessage<(messages.bannerAlt)} />
    </span>
                  {subsectionCompletionSummary.complete_count>0?
                  <span className="ml-2">{subsectionCompletionSummary.complete_count}/{subsectionCompletionSummary.total_count} chapters completed</span>
                      :<span className="ml-2">{subsectionCompletionSummary.total_count} chapters</span>}
              </div>
          </div>
        <div className="align-items-center justify-content-center mb-3 small">
        <div className="vertical-align">
    <span>
      <Image className="m-auto" src={GraduationCapSVG} alt={formatMessage<(messages.bannerAlt)} />
    </span>
        <span className="ml-2">{minPassingGrade}% min grade required </span>
        {certificate.isDownloadable &&
            <span className="ml-2"><Icon className="text-success-500" src={CheckCircle}/></span>
        }
        </div>
        </div>
        </>
  );
};

CourseCardDetails.propTypes = {
  cardId: PropTypes.string.isRequired,
};

CourseCardDetails.defaultProps = {};

export default CourseCardDetails;
