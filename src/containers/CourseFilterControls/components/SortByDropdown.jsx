import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';

import { SortKeys } from 'data/constants/app';

import { DropdownButton, Form } from '@edx/paragon';

import messages from '../messages';

export const SortByDropdown = ({
							 handleSortChange,
							 sortBy,
						 }) => {
	const { formatMessage } = useIntl();
	return (
		<>
			<DropdownButton variant="light" title={formatMessage(messages.sortBy)} className="border-gray-400">
				<Form.RadioSet
					name="sort"
					className="ml-3"
					onChange={handleSortChange}
					value={sortBy}
				>
					<Form.Radio className="py-2" value={SortKeys.enrolled}>
						{formatMessage(messages.sortLastEnrolled)}
					</Form.Radio>
					<Form.Radio className="py-2" value={SortKeys.title}>
						{formatMessage(messages.sortTitle)}
					</Form.Radio>
				</Form.RadioSet>

			</DropdownButton>
		</>
	);
};
SortByDropdown.propTypes = {
	handleSortChange: PropTypes.func.isRequired,
	sortBy: PropTypes.string.isRequired,
};

export default SortByDropdown;
