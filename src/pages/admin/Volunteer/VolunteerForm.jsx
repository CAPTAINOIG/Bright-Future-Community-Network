import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle2, X, UserPlus, HeartHandshake, Clock, Wrench } from 'lucide-react';
import { FormField, toast, Button } from '../../../components/ui';

const VolunteerForm = ({ volunteer, onClose, onSubmitted }) => {
  const [submitted, setSubmitted] = useState(false);
  const isEditing = Boolean(volunteer);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: volunteer?.name ?? '',
      email: volunteer?.email ?? '',
      phone: volunteer?.phone ?? '',
      skills: volunteer?.skills ?? '',
      availability: volunteer?.availability ?? 'Weekends',
    },
  });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (isEditing) {
        toast.success('Volunteer updated successfully!');
      } else {
        toast.success('Volunteer added successfully!');
      }
      setSubmitted(true);
      onSubmitted?.({ volunteer, ...data });
    } catch (error) {
      toast.error(error?.message || 'Something went wrong. Please try again.');
    }
  };

  const handleSubmitAnother = () => {
    setSubmitted(false);
    reset({ name: '', email: '', phone: '', skills: '', availability: 'Weekends' });
  };

  const handleCancel = () => {
    reset();
    onClose?.();
  };

  return (
    <div>
      {submitted ? (
        <div className="py-8 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mb-5">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="font-serif text-2xl font-bold mb-2">
            {isEditing ? 'Volunteer updated!' : 'Volunteer added successfully!'}
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            {isEditing
              ? `${volunteer?.name ?? 'This volunteer'}'s profile has been updated.`
              : `Great! We've added a new volunteer to the community directory.`}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="outline" size="lg" onClick={handleCancel} icon={X}>
              Back to Volunteers
            </Button>
            {!isEditing && (
              <Button variant="primary" size="lg" onClick={handleSubmitAnother} icon={UserPlus}>
                Add Another Volunteer
              </Button>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 py-2">
          {isEditing && volunteer && (
            <div className="p-4 rounded-xl bg-[#f4f6f4] border border-[#e3e7e3] space-y-1.5 mb-1">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[#d9ece0] text-sm font-semibold text-[#427456] shrink-0">
                  {(volunteer?.name ?? '??')
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif text-base font-bold text-[#17231d] m-0 leading-tight truncate">
                    {volunteer.name}
                  </h4>
                  <p className="text-xs text-[#708078] m-0">Editing existing volunteer profile</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField
              label="Full Name"
              required
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' },
              })}
              error={errors.name}
              placeholder="Enter full name"
            />
            <FormField
              label="Email"
              type="email"
              required
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
              error={errors.email}
              placeholder="your@email.com"
            />
          </div>

          <FormField
            label="Phone"
            type="tel"
            {...register('phone', {
              pattern: { value: /^\+?[1-9]\d{1,14}$|^\d{10,15}$/, message: 'Invalid phone number' },
            })}
            error={errors.phone}
            placeholder="+234 800 000 0000"
          />

          <FormField
            label="Skills"
            required
            {...register('skills', { required: 'At least one skill is required' })}
            error={errors.skills}
            placeholder="e.g. Teaching, Event Planning, Photography"
            help="List relevant skills"
            icon={Wrench}
          />

          <FormField
            label="Availability"
            type="select"
            required
            {...register('availability', { required: 'Availability is required' })}
            error={errors.availability}
            icon={Clock}
          >
            <option value="Weekdays">Weekdays</option>
            <option value="Weekends">Weekends</option>
            <option value="Evenings">Evenings</option>
            <option value="Flexible">Flexible</option>
            <option value="Part-time">Part-time</option>
          </FormField>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleCancel}
              icon={X}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon={HeartHandshake}
              fullWidth
            >
              {isEditing ? 'Update Volunteer' : 'Add Volunteer'}
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center leading-relaxed">
            By saving, you agree this information may be used to contact the volunteer
            about upcoming BFCN activities.
          </p>
        </form>
      )}
    </div>
  );
};

export default VolunteerForm;
