import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserPlus } from 'lucide-react';
import { Button } from '../ui';
import { toast } from 'sonner';
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
    `w-full py-3 px-4 border ${
      errors[field] ? 'border-red-500' : 'border-gray-200'
    } rounded-lg bg-white text-sm focus:outline-none focus:border-green-600 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.12)] transition-all placeholder:text-gray-400`;

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
      <div className="text-center mb-6">
        <UserPlus size={24} className="text-green-600 mx-auto mb-3" />
        <h3 className="text-lg font-semibold mb-2">Membership Application</h3>
        <p className="text-sm text-gray-600">Fill out the form below to apply.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name *</label>
            <input
              {...register('fullName', { required: 'Required' })}
              placeholder="Your full name"
              className={inputClass('fullName')}
            />
            {errors.fullName && (
              <span className="text-sm text-red-600 mt-1 block">
                {errors.fullName.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone *</label>
            <input
              {...register('phone', { required: 'Required' })}
              placeholder="+234..."
              className={inputClass('phone')}
            />
            {errors.phone && (
              <span className="text-sm text-red-600 mt-1 block">
                {errors.phone.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <input
              type="email"
              {...register('email', {
                required: 'Required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address',
                },
              })}
              placeholder="your@email.com"
              className={inputClass('email')}
            />
            {errors.email && (
              <span className="text-sm text-red-600 mt-1 block">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Location *</label>
            <input
              {...register('location', { required: 'Required' })}
              placeholder="City/Town"
              className={inputClass('location')}
            />
            {errors.location && (
              <span className="text-sm text-red-600 mt-1 block">
                {errors.location.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Community</label>
          <input
            {...register('community')}
            placeholder="Your community"
            className={inputClass('community')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Areas of Interest *</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {interestOptions.map((opt) => (
              <label
                key={opt}
                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer text-sm transition-all ${
                  interests?.includes(opt)
                    ? 'border-green-600 bg-green-50 text-green-600 font-medium'
                    : 'border-gray-200 hover:border-green-600 hover:bg-green-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={interests?.includes(opt)}
                  onChange={() => toggleInterest(opt)}
                  className="w-4 h-4 accent-green-600"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>

          <input
            type="hidden"
            {...register('interests', {
              validate: (value) => value?.length > 0 || 'Select at least one',
            })}
          />

          {errors.interests && (
            <span className="text-sm text-red-600 mt-1 block">
              {errors.interests.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Skills *</label>
          <input
            {...register('skill', { required: 'Required' })}
            placeholder="E.g., Teaching, Programming"
            className={inputClass('skill')}
          />
          {errors.skill && (
            <span className="text-sm text-red-600 mt-1 block">
              {errors.skill.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Why join BFCN? *</label>
          <textarea
            {...register('reason', { required: 'Required' })}
            placeholder="Tell us..."
            rows={4}
            className={`${inputClass('reason')} resize-y min-h-[100px]`}
          />
          {errors.reason && (
            <span className="text-sm text-red-600 mt-1 block">
              {errors.reason.message}
            </span>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            size='lg'
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