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
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mb-5">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="font-serif text-2xl font-bold mb-2">
            {isEditing ? 'Programme updated!' : 'Programme created successfully!'}
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            {isEditing
              ? `"${programme?.title ?? 'This programme'}" has been updated in the programmes calendar.`
              : `Great! The new programme has been added to the BFCN programmes list.`}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="outline" size="lg" onClick={handleCancel} icon={X}>
              Back to Programmes
            </Button>
            {!isEditing && (
              <Button variant="primary" size="lg" onClick={handleSubmitAnother} icon={Plus}>
                Create Another Programme
              </Button>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 py-2">
          {isEditing && programme && (
            <div className="p-4 rounded-xl bg-[#f4f6f4] border border-[#e3e7e3] space-y-1.5 mb-1">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[#d9ece0] text-sm font-semibold text-[#427456] shrink-0">
                  {(programme?.title ?? '??').split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif text-base font-bold text-[#17231d] m-0 leading-tight truncate">
                    {programme.title}
                  </h4>
                  <p className="text-xs text-[#708078] m-0">
                    Editing existing programme · {programme.type ?? 'Programme'}
                  </p>
                </div>
              </div>
            </div>
          )}

          <FormField
            label="Programme Title"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField
              label="Programme Type"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField
              label="Start Date"
              type="date"
              required
              {...register('startDate', { required: 'Start date is required' })}
              error={errors.startDate}
              icon={Calendar}
            />
            <FormField
              label="End Date"
              type="date"
              required
              {...register('endDate', { required: 'End date is required' })}
              error={errors.endDate}
              icon={Calendar}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField
              label="Target Participants"
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
              label="Registration Fee (₦)"
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
              icon={Target}
              fullWidth
            >
              {isEditing ? 'Update Programme' : 'Create Programme'}
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center leading-relaxed">
            Programme details are visible to the public on the Programmes page once published.
          </p>
        </form>
      )}
    </div>
  );
};

export default ProgrammeForm;
