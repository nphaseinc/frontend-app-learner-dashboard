import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { CardGrid, Pagination} from '@edx/paragon';

import { reduxHooks } from 'hooks';
import {
	ActiveCourseFilters,
	NavBarFilters,
} from 'containers/CourseFilterControls';
import CourseCard from 'containers/CourseCard';
import NoCoursesView from './NoCoursesView';

import { useCourseListData, useIsCollapsed } from './hooks';

import messages from './messages';

import './index.scss';

export const CourseList = () => {
	const { formatMessage } = useIntl();
	const hasCourses = reduxHooks.useHasCourses();
	const {
		filterOptions,
		setPageNumber,
		numPages,
		showFilters,
		visibleList,
	} = useCourseListData();
	const isCollapsed = useIsCollapsed();

	return (
		<>
			<div className="w-100 px-0 pb-3">
		<NavBarFilters {...filterOptions} />
			</div>

		<div className="course-list-container">
			<div className="course-list-heading-container mb-2">
				<h3>{formatMessage(messages.allCourses)}({visibleList.length})</h3>
			</div>
			{hasCourses
				? (
					<>
						{showFilters && (
							<div id="course-list-active-filters-container">
								<ActiveCourseFilters {...filterOptions} />
							</div>
						)}
			<div>
				<CardGrid
					columnSizes={{
						xs: 6,
						lg: 3,
						xl: 3,
					}}
					hasEqualColumnHeights='true'
				>
					{visibleList.map(({cardId}) => (
						<CourseCard key={cardId} cardId={cardId}/>
					))}
				</CardGrid>

				{numPages > 1 && (
					<Pagination
						variant={isCollapsed ? 'reduced' : 'secondary'}
						paginationLabel="Course List"
						className="mx-auto mb-2"
						pageCount={numPages}
						onPageSelect={setPageNumber}
					/>
				)}
			</div>
		</>
		) : (
		<NoCoursesView/>
		)}
		</div>
</>
);
};

CourseList.propTypes = {};

export default CourseList;
