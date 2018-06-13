export const INVALID_LOGIN_CREDENTIALS = 'Login failed: invalid credentials'
export const PICKUP_EMAIL_SENT = email => `Certificate pickup email successfully sent to ${email}`
export const PICKUP_EMAIL_ERROR = 'Error sending certificate pickup email'
export const CREATE_USER_ERROR = message => `Error creating user: ${message}`
export const EDIT_USER_ERROR = message => `Error editing user: ${message}`
export const CREATE_CLAIM_TEMPLATE_ERROR = message => `Error creating claim template: ${message}`
export const EDIT_CLAIM_TEMPLATE_ERROR = message => `Error saving claim template: ${message}`
export const CREATE_ISSUANCE_ERROR = message => `Error creating issuance: ${message}`
export const EDIT_ISSUANCE_ERROR = message => `Error saving issuance: ${message}`
export const BATCH_ISSUE_STARTED = 'Batch Issuance Started'
export const BATCH_ISSUE_ERROR = message => `Error executing batch issuance: ${message}`
export const BATCH_ISSUE_COMPLETED = 'Batch Issuance Completed'
export const POLL_ISSUANCE_ERROR = message => `Error polling issuance: ${message}`
export const RESENT = email => `Certificate pickup email successfully resent to ${email}`
export const RESEND_ERROR = message => `Error resending certificate pickup email: ${message}`
export const ATTESTATION_PUSHED = email => `Attestation pushed to ${email}`
export const PUSH_ATTESTATION_ERROR = message => `Error pushing attestation: ${message}`
export const ATTESTATION_EMAILED = email => `Attestation emailed to ${email}`
export const EMAIL_ATTESTATION_ERROR = message => `Error emailing attestation: ${message}`
export const TEST_ISSUE_SENT = email => `Test certificate pickup email successfully sent to ${email}`
export const TEST_ISSUE_ERROR = message => `Error sending test certificate pickup email: ${message}`
