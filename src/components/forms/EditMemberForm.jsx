import { useForm } from 'react-hook-form';
import { BadgeCheck, Check, Save, UserCog, X } from 'lucide-react';
import { Button, toast } from '../ui';
import { useEditMember } from '../../api/member';

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

const EditMemberForm = ({ member, onClose, onSubmitted }) => {
  const memberId = member?._id
  const { mutateAsync: editMember, isPending: isEditMemberLoading, isError: isEditMemberError } = useEditMember(memberId);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: member?.fullName ?? '',
      phone: member?.phone ?? '',
      email: member?.email ?? '',
      location: member?.location ?? '',
      community: member?.community ?? '',
      interests: Array.isArray(member?.interests) ? member.interests : [],
      skill: member?.skill ?? '',
      reason: member?.reason ?? '',
      isActive: member?.isActive ?? true,
    },
  });

  const interests = watch('interests') || [];
  const isActive = watch('isActive');

  const field = (name) =>
    `w-full h-12 px-4 rounded-xl border ${
      errors[name] ? 'border-red-400' : 'border-gray-300'
    } bg-white text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary-600 focus:shadow-[0_0_0_4px_rgba(23,96,63,0.12)] transition`;

  const area = (name) =>
    `w-full min-h-[120px] px-4 py-3 rounded-xl border ${
      errors[name] ? 'border-red-400' : 'border-gray-300'
    } bg-white text-[15px] leading-relaxed text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary-600 focus:shadow-[0_0_0_4px_rgba(23,96,63,0.12)] transition resize-y`;

  const toggleInterest = (interest) => {
    const next = interests.includes(interest)
      ? interests.filter((item) => item !== interest)
      : [...interests, interest];
    setValue('interests', next, { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = async (data) => {
    try {
      const res = await editMember({ ...data });
      toast.success(res?.message || 'Member updated successfully');
      onSubmitted?.(res?.data);
      if (!isEditMemberLoading && !isEditMemberError) {
        onClose?.();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || 'Failed to update member.'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="flex items-center gap-4 rounded-[20px] border border-gray-200 bg-white px-5 py-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary-50 text-primary-700" aria-hidden="true">
          <UserCog size={20} strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <p className="m-0 font-serif text-lg leading-snug text-gray-900">Update member details</p>
          <p className="m-0 mt-0.5 text-[13px] text-gray-500">
            Editing {member?.fullName || 'this member'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="edit-member-fullName" className="mb-2 block text-sm font-semibold text-gray-800">Full name <span className="text-red-600" aria-hidden="true">*</span></label>
          <input
            id="edit-member-fullName"
            {...register('fullName', { required: 'Required' })}
            placeholder="Full name"
            className={field('fullName')}
          />
          {errors.fullName && (
            <span className="mt-1.5 block text-[13px] text-red-600" role="alert">{errors.fullName.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="edit-member-phone" className="mb-2 block text-sm font-semibold text-gray-800">Phone <span className="text-red-600" aria-hidden="true">*</span></label>
          <input
            id="edit-member-phone"
            {...register('phone', { required: 'Required' })}
            placeholder="+234..."
            className={field('phone')}
          />
          {errors.phone && (
            <span className="mt-1.5 block text-[13px] text-red-600" role="alert">{errors.phone.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="edit-member-email" className="mb-2 block text-sm font-semibold text-gray-800">Email <span className="text-red-600" aria-hidden="true">*</span></label>
          <input
            type="email"
            id="edit-member-email"
            {...register('email', {
              required: 'Required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
              },
            })}
            placeholder="name@email.com"
            className={field('email')}
          />
          {errors.email && (
            <span className="mt-1.5 block text-[13px] text-red-600" role="alert">{errors.email.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="edit-member-location" className="mb-2 block text-sm font-semibold text-gray-800">Location <span className="text-red-600" aria-hidden="true">*</span></label>
          <input
            id="edit-member-location"
            {...register('location', { required: 'Required' })}
            placeholder="City / Town"
            className={field('location')}
          />
          {errors.location && (
            <span className="mt-1.5 block text-[13px] text-red-600" role="alert">{errors.location.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="edit-member-community" className="mb-2 block text-sm font-semibold text-gray-800">Community</label>
          <input
            id="edit-member-community"
            {...register('community')}
            placeholder="Community"
            className={field('community')}
          />
        </div>

        <div>
          <label htmlFor="edit-member-skill" className="mb-2 block text-sm font-semibold text-gray-800">Skill <span className="text-red-600" aria-hidden="true">*</span></label>
          <input
            id="edit-member-skill"
            {...register('skill', { required: 'Required' })}
            placeholder="E.g. Teaching, Programming"
            className={field('skill')}
          />
          {errors.skill && (
            <span className="mt-1.5 block text-[13px] text-red-600" role="alert">{errors.skill.message}</span>
          )}
        </div>
      </div>

      <div>
        <p className="mb-2 block text-sm font-semibold text-gray-800" id="edit-member-interests">Areas of interest <span className="text-red-600" aria-hidden="true">*</span></p>
        <div className="flex flex-wrap gap-2" role="group" aria-labelledby="edit-member-interests">
          {interestOptions.map((opt) => {
            const selected = interests.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggleInterest(opt)}
                aria-pressed={selected}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[13px] font-medium cursor-pointer transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-100 ${
                  selected
                    ? 'border-primary-600 bg-primary-50 text-primary-800 font-semibold'
                    : 'border-gray-300 bg-white text-gray-600 hover:border-primary-400 hover:text-primary-700'
                }`}
              >
                {selected && <Check size={13} strokeWidth={2.5} />}
                {opt}
              </button>
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
          <span className="mt-1.5 block text-[13px] text-red-600" role="alert">{errors.interests.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="edit-member-reason" className="mb-2 block text-sm font-semibold text-gray-800">Why join BFCN? <span className="text-red-600" aria-hidden="true">*</span></label>
        <textarea
          id="edit-member-reason"
            {...register('reason', { required: 'Required' })}
          placeholder="Tell us..."
          rows={4}
          className={area('reason')}
        />
        {errors.reason && (
          <span className="mt-1.5 block text-[13px] text-red-600" role="alert">{errors.reason.message}</span>
        )}
      </div>

      <label className="flex cursor-pointer items-center justify-between gap-4 rounded-[20px] border border-gray-200 bg-white px-5 py-4 transition-colors hover:border-gray-300">
        <span className="flex items-center gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent-50 text-accent-600" aria-hidden="true">
            <BadgeCheck size={18} />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-gray-900">Active member</span>
            <span className="block text-[13px] text-gray-500">
              Inactive members are excluded from active filters
            </span>
          </span>
        </span>
        <input
          type="checkbox"
          checked={Boolean(isActive)}
          onChange={(event) => setValue('isActive', event.target.checked)}
          className="h-5 w-5 shrink-0 cursor-pointer accent-primary-700"
        />
      </label>

      <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          icon={X}
          onClick={onClose}
          fullWidth
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          icon={Save}
          loading={isEditMemberLoading}
          fullWidth
        >
          Save changes
        </Button>
      </div>
    </form>
  );
};

export default EditMemberForm;
