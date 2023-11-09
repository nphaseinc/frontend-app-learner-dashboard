import { useMediaQuery, breakpoints, Stack } from '@edx/paragon';
import React from "react";
import useCourseFilterControlsData from "./hooks";
import CourseStatusDropDown from "./components/CourseStatusDropDown";
import PropTypes from "prop-types";
import SortByDropdown from "./components/SortByDropdown";
export const NavBarFilters = ({
								  sortBy,
								  setSortBy,
								  filters,
								  setFilters,
							  }) => {
	const {
		handleFilterChange,
		handleSortChange,
	} = useCourseFilterControlsData({
		filters,
		setFilters,
		setSortBy,
	});
	const isExtraSmall = useMediaQuery({ maxWidth: breakpoints.medium.maxWidth})

	return (
			<Stack
				className="bg-dark-700 p-4"
				gap={3}
				direction={ isExtraSmall ? "vertical" : "horizontal" }
			>
			<CourseStatusDropDown {...{ filters, handleFilterChange }} />
			<SortByDropdown {...{ sortBy, handleSortChange }} />
			</Stack>
	);
};
NavBarFilters.propTypes = {
	filters: PropTypes.arrayOf(PropTypes.string).isRequired,
	handleFilterChange: PropTypes.func.isRequired,
};

export default NavBarFilters;
