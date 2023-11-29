import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import { reduxHooks } from 'hooks';
import ActionButton from './ActionButton';
import messages from './messages';

export const ViewCertificateButton = ({ cardId }) => {
	const { formatMessage } = useIntl();
	const certificate = reduxHooks.useCardCertificateData(cardId);

	return (
		<ActionButton
			as="a"
			href={certificate.certPreviewUrl}
			size="lg"
			className="primary-blue-bg-color"
			block
		>
			{formatMessage(messages.getCertificate)}
		</ActionButton>
	);
};
ViewCertificateButton.propTypes = {
	cardId: PropTypes.string.isRequired,
};
export default ViewCertificateButton;
