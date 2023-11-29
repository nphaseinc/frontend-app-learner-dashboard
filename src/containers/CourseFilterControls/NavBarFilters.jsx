import {
	useMediaQuery,
	breakpoints,
	Stack,
	Form,
	FormControl,
	StatefulButton,
	Icon
} from '@edx/paragon';
import React, {
	useEffect,
	useState,
} from 'react';
import useCourseFilterControlsData from "./hooks";
import CourseStatusDropDown from "./components/CourseStatusDropDown";
import PropTypes from "prop-types";
import SortByDropdown from "./components/SortByDropdown";
import {useSearchCourseInApp} from "../../hooks/api";
import messages from "./messages";
import {formatMessage} from "../../testUtils";
import { Search } from '@edx/paragon/icons';
import {updateQueryParam} from "./utils";
import './index.scss';

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
	const [searchCourse, setSearchCourse] = useState('');

	useEffect(() => {
		const getQueryParamValue = (param) => {
			const queryParams = new URLSearchParams(window.location.search);
			return queryParams.get(param);
		};
		// Check if the 'searchCourse' query parameter exists
		const searchCourseFromUrl = getQueryParamValue('search_course');

		// Update the state if the query parameter is present
		if (searchCourseFromUrl) {
			setSearchCourse(searchCourseFromUrl);
		}
	}, []);
	const handleSearchCourseInputChange = (e) => setSearchCourse(e.target.value);

	const isExtraSmall = useMediaQuery({ maxWidth: breakpoints.medium.maxWidth})
	const handleMaSearchCourse = useSearchCourseInApp(searchCourse);
	const handleCourseSearchSubmit = () => (e) => {
		handleMaSearchCourse(searchCourse);
		updateQueryParam('search_course', searchCourse);
		e.preventDefault();
	};

	return (
			<Stack
				className="bg-dark-700 p-3"
				gap={3}
				direction={ isExtraSmall ? "vertical" : "horizontal" }
			>
				<div className="d-flex flex-row flex-grow-1">
					<div className="pr-3">
						<CourseStatusDropDown {...{ filters, handleFilterChange }} />
					</div>
					<SortByDropdown {...{ sortBy, handleSortChange }} />
				</div>
				<Form inline className="float-right">
					<FormControl
						leadingElement={<Icon src={Search} />}
						value={searchCourse}
						onChange={handleSearchCourseInputChange}
						type="text" placeholder="Search for courses" />
					<StatefulButton
						variant="primary"
						onClick={handleCourseSearchSubmit(searchCourse)}
						labels={{
							default: formatMessage(messages.SearchButton),
						}}
						className="mr-3 primary-blue-bg-color"
						type="submit"
					/>
				</Form>
			</Stack>
	);
};
NavBarFilters.propTypes = {
	filters: PropTypes.arrayOf(PropTypes.string).isRequired,
	handleFilterChange: PropTypes.func.isRequired,
};

export default NavBarFilters;
