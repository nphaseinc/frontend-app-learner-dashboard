import React from 'react';
import PropTypes from 'prop-types';

import { Container, Col, Row } from '@edx/paragon';

import hooks from './hooks';

export const columnConfig = {
  courseList: {
    lg: { span: 6, offset: 0 },
    xl: { span: 6, offset: 0 },
  },
  sidebar: {
    lg: { span: 4, offset: 0 },
    xl: { span: 3, offset: 0 },
  },
};

export const DashboardLayout = ({ children, sidebar }) => {
  const isCollapsed = hooks.useIsDashboardCollapsed();

  return (
    <Container fluid>
      <Row>
        <Col {...columnConfig.courseList} className="course-list-column">
          {children}
        </Col>
      </Row>
    </Container>
  );
};
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  sidebar: PropTypes.node.isRequired,
};

export default DashboardLayout;
