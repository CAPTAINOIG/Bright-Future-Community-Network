import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HandHelping } from 'lucide-react';
import { Button } from '../ui';
import { toast } from 'sonner';

const volunteerAreas = [
  'Education',
  'Youth Development',
  'Community Outreach',
  'Media',
  'Technology',
  'Event Support',
  'Welfare',
  'Skills Training',
];

export default function VolunteerForm({ onClose }) {
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
      areas: [],
      availability: '',
      experience: '',
    },
  });

  const areas = watch('areas');
  const fullName = watch('fullName');

  const onSubmit = (data) => {
    console.log('Volunteer Registration:', data);
    toast.success(`Thank you, ${fullName}. We will contact you about opportunities.`);
    reset();
    onClose();
  };

  const toggleArea = (area) => {
    const currentAreas = areas || [];
    const updatedAreas = currentAreas.includes(area)
      ? currentAreas.filter((item) => item !== area)
      : [...currentAreas, area];

    setValue('areas', updatedAreas, {
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
          <label className="block text-sm font-medium mb-2">Volunteer Areas *</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {volunteerAreas.map((area) => (
              <label
                key={area}
                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer text-sm transition-all ${
                  areas?.includes(area)
                    ? 'border-green-600 bg-green-50 text-green-600 font-medium'
                    : 'border-gray-200 hover:border-green-600 hover:bg-green-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={areas?.includes(area)}
                  onChange={() => toggleArea(area)}
                  className="w-4 h-4 accent-green-600"
                />
                <span>{area}</span>
              </label>
            ))}
          </div>

          <input
            type="hidden"
            {...register('areas', {
              validate: (value) => value?.length > 0 || 'Select at least one',
            })}
          />

          {errors.areas && (
            <span className="text-sm text-red-600 mt-1 block">
              {errors.areas.message}
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
            fullWidth
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size='lg'
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