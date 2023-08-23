import React from 'react';
import PropTypes from 'prop-types';

import { Card } from '@edx/paragon';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { useIsCollapsed } from './hooks';
import CourseCardBanners from './components/CourseCardBanners';
import CourseCardImage from './components/CourseCardImage';
import CourseCardMenu from './components/CourseCardMenu';
import CourseCardActions from './components/CourseCardActions';
import CourseCardDetails from './components/CourseCardDetails';
import CourseCardTitle from './components/CourseCardTitle';
import {reduxHooks} from "../../hooks";

import './CourseCard.scss';

export const CourseCard = ({
  cardId,
}) => {
  const isCollapsed = useIsCollapsed();
  const orientation = isCollapsed ? 'vertical' : 'horizontal';
  const { gradeValue } = reduxHooks.useCardGrade(cardId);
  const gradeVal = () => {
    const val = gradeValue*100;
    return val.toFixed();
  }
  return (
    <div className="mb-4.5 course-card" id={cardId} data-testid="CourseCard">
      <Card orientation={orientation}>
        <div className="d-flex flex-column w-100">
          <div {...(!isCollapsed && { className: 'd-flex' })}>
            <CourseCardImage cardId={cardId} orientation="horizontal" />
            <Card.Body>
              <Card.Header
                title={<CourseCardTitle cardId={cardId} />}
              />
              <Card.Section className="pt-0 w-50 float-left">
                <CourseCardDetails cardId={cardId} />
              </Card.Section>
              <Card.Section className="pt-0 w-50  float-right">
                <div style={{ width: 100}}>
                  <CircularProgressbar value={gradeValue} maxValue={1} text={gradeVal()}
                                       background
                                       backgroundPadding={6}
                                       styles={buildStyles({
                                         backgroundColor: "green",
                                         textColor: "#fff",
                                         pathColor: "#fff",
                                         trailColor: "transparent"
                                       })}
                  />
                </div>
              </Card.Section>
              <Card.Footer orientation={orientation}>
                <CourseCardActions cardId={cardId} />
              </Card.Footer>
            </Card.Body>
          </div>
          <CourseCardBanners cardId={cardId} />
        </div>
      </Card>
    </div>
  );
};
CourseCard.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCard;
