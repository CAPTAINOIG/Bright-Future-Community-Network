import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Check, UserPlus, X } from 'lucide-react';
import { Button } from '../ui';
import { toast, Toaster } from 'sonner';
import { useCreateMember } from '../../api/member';

const interestOptions = [
  'Education',
  'Youth Development',
  'Skill Training',
  'Leadership',
  'Community Outreach',
  'Welfare',
  'Media & Communications',
  'Technology',
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

const JoinForm = ({ onClose }) => {
  const { mutateAsync: createMember, isPending: isCreatingMemberLoading } = useCreateMember();

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
      location: '',
      community: '',
      interests: [],
      skill: '',
      reason: '',
    },
  });

  const inputClass = (field) =>
    `w-full h-12 px-4 rounded-xl border ${
      errors[field] ? 'border-red-400' : 'border-gray-300'
    } bg-white text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary-600 focus:shadow-[0_0_0_4px_rgba(23,96,63,0.12)] transition`;

  const textareaClass = (field) =>
    `w-full min-h-[120px] px-4 py-3 rounded-xl border ${
      errors[field] ? 'border-red-400' : 'border-gray-300'
    } bg-white text-[15px] leading-relaxed text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary-600 focus:shadow-[0_0_0_4px_rgba(23,96,63,0.12)] transition resize-y`;

  const interests = watch('interests');

  const onSubmit = async (data) => {
    try {
      const res = await createMember(data);
      toast.success(res.message);
      reset();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'An error occurred. Please try again.');
    }
  };

  const toggleInterest = (interest) => {
    const currentInterests = interests || [];
    const updatedInterests = currentInterests.includes(interest)
      ? currentInterests.filter((item) => item !== interest)
      : [...currentInterests, interest];

    setValue('interests', updatedInterests, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div>
      <Toaster position='top-right' />
      <div className="flex items-start gap-4 mb-8">
        <span className="grid place-items-center w-12 h-12 rounded-full bg-primary-50 text-primary-700 shrink-0" aria-hidden="true">
          <UserPlus size={22} strokeWidth={1.75} />
        </span>
        <div>
          <h3 className="font-serif text-xl text-gray-900 mb-1 leading-snug">Membership Application</h3>
          <p className="text-sm text-gray-600 m-0">Fill out the form below to apply.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-10">
        <FormSection title="About you">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="join-fullName" className={labelClass}>Full Name <Req /></label>
              <input
                id="join-fullName"
                {...register('fullName', { required: 'Required' })}
                placeholder="Your full name"
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
              <label htmlFor="join-phone" className={labelClass}>Phone <Req /></label>
              <input
                id="join-phone"
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
              <label htmlFor="join-email" className={labelClass}>Email <Req /></label>
              <input
                id="join-email"
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
              <label htmlFor="join-location" className={labelClass}>Location <Req /></label>
              <input
                id="join-location"
                {...register('location', { required: 'Required' })}
                placeholder="City/Town"
                aria-invalid={!!errors.location}
                className={inputClass('location')}
              />
              {errors.location && (
                <span className={errorClass} role="alert">
                  {errors.location.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="join-community" className={labelClass}>Community</label>
            <input
              id="join-community"
              {...register('community')}
              placeholder="Your community"
              className={inputClass('community')}
            />
          </div>
        </FormSection>

        <FormSection title="How you'd like to help">
          <fieldset className="m-0 p-0 border-0 min-w-0">
            <legend className={`${labelClass} p-0`}>Areas of Interest <Req /></legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {interestOptions.map((opt) => {
                const active = interests?.includes(opt);
                return (
                  <label
                    key={opt}
                    className={`flex items-center gap-3 px-4 py-3 border rounded-xl cursor-pointer text-sm transition-colors has-focus-visible:ring-4 has-focus-visible:ring-primary-100 ${
                      active
                        ? 'border-primary-600 bg-primary-50 text-primary-800 font-semibold'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-primary-400 hover:bg-primary-50/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => toggleInterest(opt)}
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
                    <span>{opt}</span>
                  </label>
                );
              })}
            </div>

            <input
              type="hidden"
              {...register('interests', {
                validate: (value) => value?.length > 0 || 'Select at least one',
              })}
            />

            {errors.interests && (
              <span className={errorClass} role="alert">
                {errors.interests.message}
              </span>
            )}
          </fieldset>

          <div>
            <label htmlFor="join-skill" className={labelClass}>Skills <Req /></label>
            <input
              id="join-skill"
              {...register('skill', { required: 'Required' })}
              placeholder="E.g., Teaching, Programming"
              aria-invalid={!!errors.skill}
              className={inputClass('skill')}
            />
            {errors.skill && (
              <span className={errorClass} role="alert">
                {errors.skill.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="join-reason" className={labelClass}>Why join BFCN? <Req /></label>
            <textarea
              id="join-reason"
              {...register('reason', { required: 'Required' })}
              placeholder="Tell us..."
              rows={4}
              aria-invalid={!!errors.reason}
              className={textareaClass('reason')}
            />
            {errors.reason && (
              <span className={errorClass} role="alert">
                {errors.reason.message}
              </span>
            )}
          </div>
        </FormSection>

        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="secondary"
            size='lg'
            icon={X}
            onClick={onClose}
            fullWidth
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size='lg'
            loading={isCreatingMemberLoading}
            fullWidth
            icon={UserPlus}
          >
            Submit Application
          </Button>
        </div>
      </form>
    </div>
  );
}

export default JoinForm;
