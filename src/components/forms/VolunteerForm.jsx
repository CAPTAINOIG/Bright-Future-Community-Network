import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Check, HandHelping, X } from 'lucide-react';
import { Button } from '../ui';
import { toast, Toaster } from 'sonner';
import { useCreateVolunteer } from '../../api/volunteer';

const volunteerSkills = [
  'Education',
  'Youth Development',
  'Community Outreach',
  'Media',
  'Technology',
  'Event Support',
  'Welfare',
  'Skills Training',
];

const labelClass = 'block text-sm font-semibold text-gray-800 mb-2';
const errorClass = 'text-[13px] text-red-600 mt-1.5 block';
const Req = () => <span className="text-red-600 ml-0.5" aria-hidden="true">*</span>;

const FormSection = ({ title, children }) => (
  <section className="space-y-5">
    <div className="flex items-center gap-4">
      <h3 className="font-serif text-lg text-gray-900 m-0 shrink-0">{title}</h3>
      <span className="h-px flex-1 bg-gray-200" aria-hidden="true" />
    </div>
    {children}
  </section>
);

const VolunteerForm = ({ onClose }) => {
  const { mutateAsync: volunteerMember, isPending: isCreateVolunteerLoading, isError: isCreateVolunteerError } = useCreateVolunteer();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      community: '',
      skills: [],
      availability: '',
      experience: '',
    },
  });

  const skills = watch('skills');
  const fullName = watch('fullName');

  const onSubmit = async (data) => {
    try {
      await volunteerMember(data);
      toast.success(`Thank you, ${fullName}. We will contact you about opportunities.`);
      reset();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'An error occurred. Please try again.');
    }
  };

  const toggleSkill = (skill) => {
    const currentskills = skills || [];
    const updatedskills = currentskills.includes(skill)
      ? currentskills.filter((item) => item !== skill)
      : [...currentskills, skill];
    setValue('skills', updatedskills, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const inputClass = (field) =>
    `w-full h-12 px-4 rounded-xl border ${
      errors[field] ? 'border-red-400' : 'border-gray-300'
    } bg-white text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary-600 focus:shadow-[0_0_0_4px_rgba(23,96,63,0.12)] transition`;

  const textareaClass = (field) =>
    `w-full min-h-[120px] px-4 py-3 rounded-xl border ${
      errors[field] ? 'border-red-400' : 'border-gray-300'
    } bg-white text-[15px] leading-relaxed text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary-600 focus:shadow-[0_0_0_4px_rgba(23,96,63,0.12)] transition resize-y`;

  return (
    <div>
      <Toaster position='top-right' />
      <div className="flex items-start gap-4 mb-8">
        <span className="grid place-items-center w-12 h-12 rounded-full bg-primary-50 text-primary-700 shrink-0" aria-hidden="true">
          <HandHelping size={22} strokeWidth={1.75} />
        </span>
        <div>
          <h3 className="font-serif text-xl text-gray-900 mb-1 leading-snug">Volunteer Registration</h3>
          <p className="text-sm text-gray-600 m-0">Tell us how you'd like to contribute.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-10">
        <FormSection title="Your details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="vol-fullName" className={labelClass}>Full Name <Req /></label>
              <input
                id="vol-fullName"
                {...register('fullName', { required: 'Required' })}
                placeholder="Your name"
                autoComplete="name"
                aria-invalid={!!errors.fullName}
                className={inputClass('fullName')}
              />
              {errors.fullName && (
                <span className={errorClass} role="alert">
                  {errors.fullName.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="vol-phone" className={labelClass}>Phone <Req /></label>
              <input
                id="vol-phone"
                type="tel"
                {...register('phone', { required: 'Required' })}
                placeholder="+234..."
                autoComplete="tel"
                aria-invalid={!!errors.phone}
                className={inputClass('phone')}
              />
              {errors.phone && (
                <span className={errorClass} role="alert">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="vol-email" className={labelClass}>Email <Req /></label>
              <input
                id="vol-email"
                type="email"
                {...register('email', {
                  required: 'Required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email address',
                  },
                })}
                placeholder="your@email.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                className={inputClass('email')}
              />
              {errors.email && (
                <span className={errorClass} role="alert">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="vol-community" className={labelClass}>Community <Req /></label>
              <input
                id="vol-community"
                {...register('community', { required: 'Required' })}
                placeholder="City/Town"
                aria-invalid={!!errors.community}
                className={inputClass('community')}
              />
              {errors.community && (
                <span className={errorClass} role="alert">
                  {errors.community.message}
                </span>
              )}
            </div>
          </div>
        </FormSection>

        <FormSection title="How you can help">
          <fieldset className="m-0 p-0 border-0 min-w-0">
            <legend className={`${labelClass} p-0`}>Volunteer skills <Req /></legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {volunteerSkills.map((skill) => {
                const active = skills?.includes(skill);
                return (
                  <label
                    key={skill}
                    className={`flex items-center gap-3 px-4 py-3 border rounded-xl cursor-pointer text-sm transition-colors has-focus-visible:ring-4 has-focus-visible:ring-primary-100 ${
                      active
                        ? 'border-primary-600 bg-primary-50 text-primary-800 font-semibold'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-primary-400 hover:bg-primary-50/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => toggleSkill(skill)}
                      className="sr-only"
                    />
                    <span
                      className={`grid place-items-center w-5 h-5 rounded-md border shrink-0 transition-colors ${
                        active ? 'bg-primary-700 border-primary-700 text-white' : 'bg-white border-gray-300'
                      }`}
                      aria-hidden="true"
                    >
                      {active && <Check size={13} strokeWidth={3} />}
                    </span>
                    <span>{skill}</span>
                  </label>
                );
              })}
            </div>

            <input
              type="hidden"
              {...register('skills', {
                validate: (value) => value?.length > 0 || 'Select at least one',
              })}
            />

            {errors.skills && (
              <span className={errorClass} role="alert">
                {errors.skills.message}
              </span>
            )}
          </fieldset>

          <div>
            <label htmlFor="vol-availability" className={labelClass}>Availability</label>
            <select
              id="vol-availability"
              {...register('availability')}
              className={`${inputClass('availability')} cursor-pointer`}
            >
              <option value="">Select availability</option>
              <option value="weekdays">Weekdays</option>
              <option value="weekends">Weekends</option>
              <option value="both">Both</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>

          <div>
            <label htmlFor="vol-experience" className={labelClass}>Relevant Experience</label>
            <textarea
              id="vol-experience"
              {...register('experience')}
              placeholder="Tell us about relevant experience..."
              rows={4}
              className={textareaClass('experience')}
            />
          </div>
        </FormSection>

        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            size='lg'
            icon={X}
            fullWidth
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size='lg'
            loading={isCreateVolunteerLoading}
            fullWidth
            icon={HandHelping}
          >
            Register as Volunteer
          </Button>
        </div>
      </form>
    </div>
  );
}

export default VolunteerForm;
