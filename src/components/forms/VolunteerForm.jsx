import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HandHelping, X } from 'lucide-react';
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
    `w-full py-3 px-4 border ${
      errors[field] ? 'border-red-500' : 'border-gray-200'
    } rounded-lg bg-white text-sm focus:outline-none focus:border-green-600 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.12)] transition-all placeholder:text-gray-400`;

  return (
    <div>
      <Toaster position='top-right' />
      <div className="text-center mb-6">
        <HandHelping size={24} className="text-green-600 mx-auto mb-3" />
        <h3 className="text-lg font-semibold mb-2">Volunteer Registration</h3>
        <p className="text-sm text-gray-600">Tell us how you'd like to contribute.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name *</label>
            <input
              {...register('fullName', { required: 'Required' })}
              placeholder="Your name"
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
            <label className="block text-sm font-medium mb-2">Community *</label>
            <input
              {...register('community', { required: 'Required' })}
              placeholder="City/Town"
              className={inputClass('community')}
              />
            {errors.community && (
              <span className="text-sm text-red-600 mt-1 block">
                {errors.community.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Volunteer skills *</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {volunteerSkills.map((skill) => (
              <label
                key={skill}
                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer text-sm transition-all ${
                  skills?.includes(skill)
                    ? 'border-green-600 bg-green-50 text-green-600 font-medium'
                    : 'border-gray-200 hover:border-green-600 hover:bg-green-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={skills?.includes(skill)}
                  onChange={() => toggleSkill(skill)}
                  className="w-4 h-4 accent-green-600"
                />
                <span>{skill}</span>
              </label>
            ))}
          </div>

          <input
            type="hidden"
            {...register('skills', {
              validate: (value) => value?.length > 0 || 'Select at least one',
            })}
          />

          {errors.skills && (
            <span className="text-sm text-red-600 mt-1 block">
              {errors.skills.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Availability</label>
          <select
            {...register('availability')}
            className={inputClass('availability')}
          >
            <option value="">Select availability</option>
            <option value="weekdays">Weekdays</option>
            <option value="weekends">Weekends</option>
            <option value="both">Both</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Relevant Experience</label>
          <textarea
            {...register('experience')}
            placeholder="Tell us about relevant experience..."
            rows={4}
            className={`${inputClass('experience')} resize-y min-h-[100px]`}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
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