import React from 'react';
import PropTypes from 'prop-types';

import { ActionRow, Button } from '@edx/paragon';
import CreditRequestForm from './CreditRequestForm';

export const CreditContent = ({ action, message, requestData }) => (
  <>
    <div className="message-copy credit-msg">
      {message}
    </div>
    {action && (
      <ActionRow className="mt-4">
        <Button
          as="a"
          href={action.href}
          rel="noopener"
          target="_blank"
          variant="outline-primary"
          className="border-gray-400"
          onClick={action.onClick}
        >
          {action.message}
        </Button>
      </ActionRow>
    )}
    <CreditRequestForm requestData={requestData} />
  </>
);
CreditContent.defaultProps = {
  action: null,
  requestData: null,
};
CreditContent.propTypes = {
  action: PropTypes.shape({
    href: PropTypes.string,
    onClick: PropTypes.func,
    message: PropTypes.string,
  }),
  message: PropTypes.node.isRequired,
  requestData: PropTypes.shape({
    url: PropTypes.string,
    parameters: PropTypes.objectOf(PropTypes.string),
  }),
};

export default CreditContent;
