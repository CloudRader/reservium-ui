import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@constants';
import { CloseCircleIcon } from '@components/ui/icons';
import FormInput from '@components/ui/forms/FormInput';
import { useSpaceSelection } from '../hooks/useSpaceSelection';

const EventRegistrationForm = ({ formData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [agreementAccepted, setAgreementAccepted] = useState(false);

  // Use custom hook for space selection
  const {
    selectedSpaces,
    selectedSpace,
    setSelectedSpace,
    addSpace,
    removeSpace,
  } = useSpaceSelection();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreementAccepted) {
      alert('Please accept the agreement terms before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataToSend = {
        event_name: e.target.event_name.value,
        guests: e.target.guests.value,
        event_start: e.target.event_start.value,
        event_end: e.target.event_end.value,
        email: e.target.email.value,
        organizers: e.target.organizers.value,
        space: e.target.space.value,
        other_space: selectedSpaces,
        manager_contact_mail: formData.manager_contact_mail,
      };
      await axios.post(
        `${API_BASE_URL}/emails/send-registration-form`,
        formDataToSend
      );
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {submitSuccess ? (
        <div className="text-center p-6 bg-green-50 rounded-lg">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Registration Submitted Successfully!
          </h2>
          <p className="text-green-600">
            Your registration has been sent to the Head of Dormitory and
            manager.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              id="event_name"
              name="event_name"
              type="text"
              label="Event Name"
              required
              readOnly
              defaultValue={formData.event_name}
            />

            <FormInput
              id="guests"
              name="guests"
              type="number"
              label="Number of Guests"
              required
              readOnly
              defaultValue={formData.guests}
            />

            <FormInput
              id="event_start"
              name="event_start"
              type="datetime-local"
              label="Event Start"
              required
              readOnly
              defaultValue={formData.event_start}
            />

            <FormInput
              id="event_end"
              name="event_end"
              type="datetime-local"
              label="Event End"
              required
              readOnly
              defaultValue={formData.event_end}
            />

            <FormInput
              id="email"
              name="email"
              type="email"
              label="Email"
              required
              readOnly
              defaultValue={formData.email}
            />

            <FormInput
              id="organizers"
              name="organizers"
              type="text"
              label="Other Organizers"
            />

            <FormInput
              id="space"
              name="space"
              type="text"
              label="Space"
              required
              readOnly
              defaultValue={formData.space}
            />
            <div>
              <label htmlFor="additional-spaces" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Spaces
              </label>
              <div className="flex space-x-2">
                <select
                  id="additional-spaces"
                  value={selectedSpace}
                  onChange={(e) => setSelectedSpace(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select a space</option>
                  {formData.allSpace &&
                    formData.allSpace.map((space, index) => (
                      <option key={index} value={space}>
                        {space}
                      </option>
                    ))}
                </select>
                <button
                  type="button"
                  onClick={addSpace}
                  disabled={!selectedSpace}
                  className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                >
                  Add
                </button>
              </div>

              {selectedSpaces.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedSpaces.map((space, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                    >
                      {space}
                      <button
                        type="button"
                        onClick={() => removeSpace(space)}
                        className="ml-1 inline-flex items-center p-0.5 rounded-full text-green-400 hover:bg-green-200 hover:text-green-500 focus:outline-none"
                      >
                        <CloseCircleIcon />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {(!formData.allSpace || formData.allSpace.length === 0) && (
                <p className="mt-2 text-sm text-gray-500 italic">
                  No additional spaces available
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Agreement of Terms
            </h3>
            <p className="text-gray-700 text-sm mb-4">
              By sending this registration form, I acknowledge that I am
              formally registering the event in the system and I am aware of the
              terms of use for the BUK club space and its equipment. I take full
              responsibility for ensuring that the event runs smoothly, without
              health complications or issues. I also acknowledge that the PS
              team will ensure the registration of the event in the reservation
              system. I accept responsibility for any damages caused to the
              space and am prepared to cover the costs in case of any damage.
            </p>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agreement"
                checked={agreementAccepted}
                onChange={(e) => setAgreementAccepted(e.target.checked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label
                htmlFor="agreement"
                className="ml-2 block text-sm text-gray-700"
              >
                I accept the agreement terms
              </label>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting || !agreementAccepted}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Form'}
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default EventRegistrationForm;
