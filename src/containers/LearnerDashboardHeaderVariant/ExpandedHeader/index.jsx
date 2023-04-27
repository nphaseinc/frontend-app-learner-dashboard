import React from 'react';

import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Button, Dropdown, DropdownButton } from '@edx/paragon';

import urls from 'data/services/lms/urls';
import { reduxHooks } from 'hooks';

import AuthenticatedUserDropdown from './AuthenticatedUserDropdown';

import { useIsCollapsed, findCoursesNavClicked } from '../hooks';
import messages from '../messages';
import BrandLogo from '../BrandLogo';

export const ExpandedHeader = ({selectRole, showUserRccRoleData, title}) => {
  const { formatMessage } = useIntl();
  const { courseSearchUrl } = reduxHooks.usePlatformSettingsData();
  const isCollapsed = useIsCollapsed();

  const exploreCoursesClick = findCoursesNavClicked(courseSearchUrl);

  return (
    !isCollapsed && (
    <header className="d-flex shadow-sm align-items-center learner-variant-header pl-4">
      <div className="flex-grow-1 d-flex align-items-center">
        <BrandLogo />

        <span className="flex-grow-1" />
      </div>
        <div className="pr-2.5">
            <DropdownButton variant="light" className="p-4" id="dropdown-basic-button" title={title}>
                {showUserRccRoleData?.map(roles => (
                    <>
                    <Dropdown.Item className={roles.rcc_role === title ? 'active' : ''} onClick={() => { selectRole(roles.rcc_role) }}>{roles.rcc_role}</Dropdown.Item>
                    <Dropdown.Divider />
                    </>
                ))}
            </DropdownButton>
        </div>

      <AuthenticatedUserDropdown />
    </header>
    )
  );
};

ExpandedHeader.propTypes = {};

export default ExpandedHeader;
