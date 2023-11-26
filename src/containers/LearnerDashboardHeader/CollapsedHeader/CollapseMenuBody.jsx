import React from 'react';
import PropTypes from 'prop-types';

import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';

import { Button } from '@edx/paragon';

import messages from '../messages';

export const CollapseMenuBody = ({ isOpen }) => {
  const { formatMessage } = useIntl();
  const { authenticatedUser } = React.useContext(AppContext);

  return (
    isOpen && (
      <div className="d-flex flex-column shadow-sm nav-small-menu">
        {authenticatedUser && (
          <>
            <Button
              as="a"
              href={getConfig().LOGOUT_URL}
              variant="inverse-primary"
            >
              {formatMessage(messages.signOut)}
            </Button>
          </>
        )}
      </div>
    )
  );
};

CollapseMenuBody.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default CollapseMenuBody;
