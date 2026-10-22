import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle2, X, Plus, Calendar, Users, MapPin, Target, Tag, DollarSign } from 'lucide-react';
import { FormField, toast, Button } from '../../../components/ui';

const ProgrammeForm = ({ programme, onClose, onSubmitted }) => {
  const [submitted, setSubmitted] = useState(false);
  const isEditing = Boolean(programme);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: programme?.title ?? '',
      description: programme?.description ?? '',
      type: programme?.type ?? 'Training',
      duration: programme?.duration ?? '',
      startDate: programme?.startDate ?? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      endDate: programme?.endDate ?? new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      targetParticipants: programme?.targetParticipants ?? '',
      fee: programme?.fee ?? '',
      location: programme?.location ?? '',
      coordinator: programme?.coordinator ?? '',
    },
  });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (isEditing) {
        toast.success('Programme updated successfully!');
      } else {
        toast.success('Programme created successfully!');
      }
      setSubmitted(true);
      onSubmitted?.({ programme, ...data });
    } catch (error) {
      toast.error(error?.message || 'Something went wrong. Please try again.');
    }
  };

  const handleSubmitAnother = () => {
    setSubmitted(false);
    reset({
      title: '', description: '', type: 'Training', duration: '',
      startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      endDate: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      targetParticipants: '', fee: '', location: '', coordinator: '',
    });
  };

  const handleCancel = () => {
    reset();
    onClose?.();
  };

  return (
    <div>
      {submitted ? (
        <div className="py-8 text-center">
          <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-primary-50 text-primary-600 ring-1 ring-inset ring-primary-100">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="mb-2 font-serif text-2xl text-gray-900">
            {isEditing ? 'Programme updated!' : 'Programme created successfully!'}
          </h3>
          <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-gray-500">
            {isEditing
              ? `"${programme?.title ?? 'This programme'}" has been updated in the programmes calendar.`
              : `Great! The new programme has been added to the BFCN programmes list.`}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="outline" size="lg" onClick={handleCancel} icon={X}>
              Back to programmes
            </Button>
            {!isEditing && (
              <Button variant="primary" size="lg" onClick={handleSubmitAnother} icon={Plus}>
                Create another programme
              </Button>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 py-2">
          {isEditing && programme && (
            <div className="mb-1 space-y-1.5 rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-50 text-sm font-semibold text-primary-700">
                  {(programme?.title ?? '??').split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h4 className="m-0 truncate text-[15px] font-semibold leading-tight text-gray-900">
                    {programme.title}
                  </h4>
                  <p className="m-0 mt-0.5 text-xs text-gray-500">
                    Editing existing programme · {programme.type ?? 'Programme'}
                  </p>
                </div>
              </div>
            </div>
          )}

          <FormField
            label="Programme title"
            required
            {...register('title', {
              required: 'Programme title is required',
              minLength: { value: 3, message: 'Title must be at least 3 characters' },
            })}
            error={errors.title}
            placeholder="e.g. Youth Leadership Programme 2026"
            icon={Target}
          />

          <FormField
            label="Description"
            type="textarea"
            required
            {...register('description', { required: 'Description is required' })}
            error={errors.description}
            placeholder="Describe what the programme covers, its goals, and target outcomes"
            rows={4}
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormField
              label="Programme type"
              type="select"
              required
              {...register('type', { required: 'Type is required' })}
              error={errors.type}
              icon={Tag}
            >
              <option value="Training">Training</option>
              <option value="Workshop">Workshop</option>
              <option value="Seminar">Seminar</option>
              <option value="Conference">Conference</option>
              <option value="Outreach">Outreach</option>
              <option value="Mentorship">Mentorship</option>
            </FormField>

            <FormField
              label="Duration"
              {...register('duration')}
              error={errors.duration}
              placeholder="e.g. 4 weeks, 6 months"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormField
              label="Start date"
              type="date"
              required
              {...register('startDate', { required: 'Start date is required' })}
              error={errors.startDate}
              icon={Calendar}
            />
            <FormField
              label="End date"
              type="date"
              required
              {...register('endDate', { required: 'End date is required' })}
              error={errors.endDate}
              icon={Calendar}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormField
              label="Target participants"
              type="number"
              required
              {...register('targetParticipants', {
                required: 'Target participants is required',
                min: { value: 1, message: 'At least 1 participant' },
              })}
              error={errors.targetParticipants}
              placeholder="50"
              icon={Users}
            />

            <FormField
              label="Registration fee (₦)"
              type="number"
              {...register('fee', { min: { value: 0, message: 'Fee cannot be negative' } })}
              error={errors.fee}
              placeholder="0 for free programmes"
              icon={DollarSign}
            />
          </div>

          <FormField
            label="Location"
            required
            {...register('location', { required: 'Location is required' })}
            error={errors.location}
            placeholder="Venue name or online platform"
            icon={MapPin}
          />

          <FormField
            label="Coordinator"
            required
            {...register('coordinator', { required: 'Coordinator is required' })}
            error={errors.coordinator}
            placeholder="Programme coordinator name"
          />

          <div className="flex flex-col items-stretch gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center">
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
              icon={Target}
              fullWidth
            >
              {isEditing ? 'Update programme' : 'Create programme'}
            </Button>
          </div>
          <p className="mt-2 text-center text-xs leading-relaxed text-gray-500">
            Programme details are visible to the public on the Programmes page once published.
          </p>
        </form>
      )}
    </div>
  );
};

export default ProgrammeForm;
