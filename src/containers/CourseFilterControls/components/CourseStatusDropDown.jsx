import React from 'react';
import PropTypes from 'prop-types';

import { FilterKeys } from 'data/constants/app';

import {Form, DropdownButton} from '@edx/paragon';

import Checkbox from './Checkbox';

export const filterOrder = [
	FilterKeys.inProgress,
	FilterKeys.notStarted,
	FilterKeys.done,
];

export const CourseStatusDropDown = ({
							   filters,
							   handleFilterChange,
						   }) => {
		return (
	<DropdownButton variant="light" title="Course status" className="border-gray-400">
		<Form.CheckboxSet
					name="course-status-filters"
					className="ml-3"
					onChange={handleFilterChange}
					value={filters}
				>
					{filterOrder.map(filterKey => (
						<Checkbox filterKey={filterKey} key={filterKey} />
					))}

				</Form.CheckboxSet>

	</DropdownButton>

)};
CourseStatusDropDown.propTypes = {
	filters: PropTypes.arrayOf(PropTypes.string).isRequired,
	handleFilterChange: PropTypes.func.isRequired,
};

export default CourseStatusDropDown;
