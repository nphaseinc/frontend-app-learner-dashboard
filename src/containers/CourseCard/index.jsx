import React from 'react';
import PropTypes from 'prop-types';

import { Card } from '@edx/paragon';
import 'react-circular-progressbar/dist/styles.css';

import { useIsCollapsed } from './hooks';
import CourseCardActions from './components/CourseCardActions';
import CourseCardDetails from './components/CourseCardDetails';
import CourseCardTitle from './components/CourseCardTitle';
import {reduxHooks} from "../../hooks";
import RCCLogoSVG from 'assets/redcap-cloud-primary-logo.svg';

import './CourseCard.scss';
import {useIntl} from "@edx/frontend-platform/i18n";

export const CourseCard = ({
  cardId,
}) => {
  const isCollapsed = useIsCollapsed();
  const orientation = isCollapsed ? 'vertical' : 'horizontal';
  const { gradeValue } = reduxHooks.useCardGrade(cardId);
  const { bannerImgSrc } = reduxHooks.useCardCourseData(cardId);
  const { homeUrl } = reduxHooks.useCardCourseRunData(cardId);
  const { formatMessage } = useIntl();

  const gradeVal = () => {
    const val = gradeValue*100;
    return val.toFixed();
  }
  return (
      <Card id={cardId} >
            <Card.ImageCap
                src={bannerImgSrc}
                srcAlt="Card image"
                logoSrc={RCCLogoSVG}
                fallbackLogoSrc="https://www.redcapcloud.com/wp-content/uploads/2022/08/redcap-cloud-primary-logo.svg"
                logoAlt="Card logo"
            />
              <Card.Header
                title={<CourseCardTitle cardId={cardId} />}
              />
              <Card.Section className="pt-0 float-left">
                <CourseCardDetails cardId={cardId} />
              </Card.Section>
              <Card.Footer>
                <CourseCardActions cardId={cardId} />
              </Card.Footer>
      </Card>
  );
};
CourseCard.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCard;
