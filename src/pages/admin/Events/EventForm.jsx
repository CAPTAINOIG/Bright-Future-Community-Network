import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle2, X, Plus, Calendar, Clock, MapPin, Users, CalendarPlus, Link2, Upload } from 'lucide-react';
import { FormField, toast, Button } from '../../../components/ui';

const EventForm = ({ event, onClose, onSubmitted }) => {
  const [submitted, setSubmitted] = useState(false);
  const isEditing = Boolean(event);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: event?.title ?? '',
      description: event?.description ?? '',
      category: event?.category ?? 'Community',
      date: event?.date ?? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      time: event?.time ?? '10:00',
      venue: event?.venue ?? '',
      city: event?.city ?? '',
      capacity: event?.capacity ?? 100,
      image: event?.image ?? '',
      registrationLink: event?.registrationLink ?? '',
      cost: event?.cost ?? '',
    },
  });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (isEditing) {
        toast.success('Event updated successfully!');
      } else {
        toast.success('Event created successfully!');
      }
      setSubmitted(true);
      onSubmitted?.({ event, ...data });
    } catch (error) {
      toast.error(error?.message || 'Something went wrong. Please try again.');
    }
  };

  const handleSubmitAnother = () => {
    setSubmitted(false);
    reset({
      title: '', description: '', category: 'Community',
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      time: '10:00', venue: '', city: '', capacity: 100, image: '', registrationLink: '', cost: '',
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
            {isEditing ? 'Event updated!' : 'Event created successfully!'}
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            {isEditing
              ? `"${event?.title ?? 'This event'}" has been updated in the events calendar.`
              : `Great! The new event is live on the Events page and open to registrations.`}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="outline" size="lg" onClick={handleCancel} icon={X}>
              Back to Events
            </Button>
            {!isEditing && (
              <Button variant="primary" size="lg" onClick={handleSubmitAnother} icon={CalendarPlus}>
                Create Another Event
              </Button>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 py-2">
          {isEditing && event && (
            <div className="p-4 rounded-xl bg-[#f4f6f4] border border-[#e3e7e3] space-y-1.5 mb-1">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[#d9ece0] text-sm font-semibold text-[#427456] shrink-0">
                  {(event?.title ?? '??').split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif text-base font-bold text-[#17231d] m-0 leading-tight truncate">
                    {event.title}
                  </h4>
                  <p className="text-xs text-[#708078] m-0">
                    Editing existing event · {event.date ? new Date(event.date).toLocaleDateString() : 'TBD'}
                  </p>
                </div>
              </div>
            </div>
          )}

          <FormField
            label="Event Title"
            required
            {...register('title', {
              required: 'Event title is required',
              minLength: { value: 3, message: 'Title must be at least 3 characters' },
            })}
            error={errors.title}
            placeholder="e.g. Annual Youth Leadership Summit"
            icon={CalendarPlus}
          />

          <FormField
            label="Description"
            type="textarea"
            required
            {...register('description', { required: 'Description is required' })}
            error={errors.description}
            placeholder="Describe the event, its purpose, agenda highlights, and what attendees should expect"
            rows={4}
          />

          <FormField
            label="Event Category"
            type="select"
            required
            {...register('category', { required: 'Category is required' })}
            error={errors.category}
          >
            <option value="Community">Community</option>
            <option value="Training">Training</option>
            <option value="Workshop">Workshop</option>
            <option value="Meeting">Meeting</option>
            <option value="Celebration">Celebration</option>
            <option value="Fundraiser">Fundraiser</option>
            <option value="Outreach">Outreach</option>
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField
              label="Date"
              type="date"
              required
              {...register('date', { required: 'Date is required' })}
              error={errors.date}
              icon={Calendar}
            />
            <FormField
              label="Time"
              type="time"
              required
              {...register('time', { required: 'Time is required' })}
              error={errors.time}
              icon={Clock}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField
              label="Venue"
              required
              {...register('venue', { required: 'Venue is required' })}
              error={errors.venue}
              placeholder="e.g. BFCN Community Hall"
              icon={MapPin}
            />
            <FormField
              label="City / Town"
              required
              {...register('city', { required: 'City is required' })}
              error={errors.city}
              placeholder="e.g. Abuja"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField
              label="Capacity"
              type="number"
              required
              {...register('capacity', {
                required: 'Capacity is required',
                min: { value: 1, message: 'At least 1 attendee' },
              })}
              error={errors.capacity}
              placeholder="200"
              icon={Users}
            />
            <FormField
              label="Cost (₦)"
              {...register('cost', { min: { value: 0, message: 'Cost cannot be negative' } })}
              error={errors.cost}
              placeholder="0 for free events"
            />
          </div>

          <FormField
            label="Cover Image URL"
            {...register('image')}
            error={errors.image}
            placeholder="https://images.unsplash.com/..."
            icon={Upload}
          />

          <FormField
            label="Registration Link"
            {...register('registrationLink')}
            error={errors.registrationLink}
            placeholder="Optional external registration URL"
            icon={Link2}
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
              icon={Calendar}
              fullWidth
            >
              {isEditing ? 'Update Event' : 'Create Event'}
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center leading-relaxed">
            Event details are published to the public Events page.
          </p>
        </form>
      )}
    </div>
  );
};

export default EventForm;
