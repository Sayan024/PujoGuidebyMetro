/**
 * The Google Form that receives feedback. Everything here is read from the form's
 * public page. If a question or option changes in the form, change it here too,
 * or Google will quietly drop the answer.
 */
export const FEEDBACK_FORM_ID = '1FAIpQLSfb7C1LJs3Ea3ND7REg92wiAqW6IQViQZXRaC7BgD_-sqe5_Q';
export const FEEDBACK_FORM_URL = `https://docs.google.com/forms/d/e/${FEEDBACK_FORM_ID}/viewform`;
export const FEEDBACK_SUBMIT_URL = `https://docs.google.com/forms/d/e/${FEEDBACK_FORM_ID}/formResponse`;

/** Field codes of the form's questions. */
export const FIELD = {
  rating: 'entry.102684508',
  uses: 'entry.1865576245',
  worked: 'entry.1395254142',
  better: 'entry.401466012',
  wrong: 'entry.412158378',
  email: 'entry.549345693',
} as const;

/** The checkbox options exactly as they are spelled in the form. */
export const USES = ['Finding pandals', 'Metro route', 'Map', 'Day planner', 'Ask the guide'] as const;

export const MAX_TEXT = 2000;
