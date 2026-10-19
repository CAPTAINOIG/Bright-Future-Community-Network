import { useForm } from 'react-hook-form';
import { BadgeCheck, Save, Sparkles, UserCog, X } from 'lucide-react';
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
    `w-full py-3 px-4 border ${
      errors[name] ? 'border-red-500' : 'border-[#e3e7e3]'
    } rounded-xl bg-white text-sm text-[#17231d] focus:outline-none focus:border-[#427456] focus:shadow-[0_0_0_3px_rgba(66,116,86,0.14)] transition-all placeholder:text-gray-400`;

  const toggleInterest = (interest) => {
    const next = interests.includes(interest)
      ? interests.filter((item) => item !== interest)
      : [...interests, interest];
    setValue('interests', next, { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = async (data) => {
    try {
      await editMember({ ...data });
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
      <div className="flex items-center gap-3 rounded-2xl border border-[#e3e7e3] bg-white px-4 py-3.5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#edf3eb] text-[#427456]">
          <UserCog size={18} />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#17231d]">Update member details</p>
          <p className="text-xs text-[#708078]">
            Editing {member?.fullName || 'this member'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#34443a]">Full name *</label>
          <input
            {...register('fullName', { required: 'Required' })}
            placeholder="Full name"
            className={field('fullName')}
          />
          {errors.fullName && (
            <span className="mt-1 block text-sm text-red-600">{errors.fullName.message}</span>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#34443a]">Phone *</label>
          <input
            {...register('phone', { required: 'Required' })}
            placeholder="+234..."
            className={field('phone')}
          />
          {errors.phone && (
            <span className="mt-1 block text-sm text-red-600">{errors.phone.message}</span>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#34443a]">Email *</label>
          <input
            type="email"
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
            <span className="mt-1 block text-sm text-red-600">{errors.email.message}</span>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#34443a]">Location *</label>
          <input
            {...register('location', { required: 'Required' })}
            placeholder="City / Town"
            className={field('location')}
          />
          {errors.location && (
            <span className="mt-1 block text-sm text-red-600">{errors.location.message}</span>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#34443a]">Community</label>
          <input
            {...register('community')}
            placeholder="Community"
            className={field('community')}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#34443a]">Skill *</label>
          <input
            {...register('skill', { required: 'Required' })}
            placeholder="E.g. Teaching, Programming"
            className={field('skill')}
          />
          {errors.skill && (
            <span className="mt-1 block text-sm text-red-600">{errors.skill.message}</span>
          )}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-[#34443a]">Areas of interest *</label>
        <div className="flex flex-wrap gap-2">
          {interestOptions.map((opt) => {
            const selected = interests.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggleInterest(opt)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-all ${
                  selected
                    ? 'border-[#427456] bg-[#edf6f0] text-[#2f6b47]'
                    : 'border-[#e3e7e3] bg-white text-[#5b6b62] hover:border-[#9ec3a8] hover:text-[#2f6b47]'
                }`}
              >
                {selected && <Sparkles size={13} />}
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
          <span className="mt-2 block text-sm text-red-600">{errors.interests.message}</span>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-[#34443a]">Why join BFCN? *</label>
        <textarea
          {...register('reason', { required: 'Required' })}
          placeholder="Tell us..."
          rows={4}
          className={`${field('reason')} resize-y min-h-[100px]`}
        />
        {errors.reason && (
          <span className="mt-1 block text-sm text-red-600">{errors.reason.message}</span>
        )}
      </div>

      <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-[#e3e7e3] bg-white px-4 py-3.5">
        <span className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f7e8bd] text-[#a27018]">
            <BadgeCheck size={18} />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-[#17231d]">Active member</span>
            <span className="block text-xs text-[#708078]">
              Inactive members are excluded from active filters
            </span>
          </span>
        </span>
        <input
          type="checkbox"
          checked={Boolean(isActive)}
          onChange={(event) => setValue('isActive', event.target.checked)}
          className="h-5 w-5 shrink-0 accent-[#427456]"
        />
      </label>

      <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row">
        <Button
          type="button"
          variant="outline"
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
