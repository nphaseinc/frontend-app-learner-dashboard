import React from 'react';

import { Dropdown, DropdownButton } from '@edx/paragon';

import AuthenticatedUserDropdown from './AuthenticatedUserDropdown';

import { useIsCollapsed } from '../hooks';
import BrandLogo from '../BrandLogo';

export const ExpandedHeader = ({selectRole, showUserRccRoleData, title}) => {
  const isCollapsed = useIsCollapsed();


  return (
    !isCollapsed && (
    <header className="d-flex shadow-sm align-items-center learner-variant-header pl-4">
      <div className="flex-grow-1">
        <BrandLogo />
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
