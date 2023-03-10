import React from 'react';
import { useWindowSize, breakpoints } from '@edx/paragon';
import track from 'tracking';
import { linkNames } from 'tracking/constants';

export const useIsCollapsed = () => {
  const { width } = useWindowSize();
  const isCollapsed = React.useMemo(() => (width <= breakpoints.large.maxWidth), [width]);
  return isCollapsed;
};

export const findCoursesNavClicked = (href) => track.findCourses.findCoursesClicked(href, {
  linkName: linkNames.learnerHomeNavExplore,
});

export const findCoursesNavDropdownClicked = (href) => track.findCourses.findCoursesClicked(href, {
  linkName: linkNames.learnerHomeNavDropdownExplore,
});

export default {
  useIsCollapsed,
  findCoursesNavClicked,
  findCoursesNavDropdownClicked,
};
