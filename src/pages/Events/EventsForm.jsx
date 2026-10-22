import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, Clock, MapPin, CheckCircle2, X, UserRound } from 'lucide-react';
import { Button } from '../../components/ui';

const EventsForm = ({ event, onClose, onSubmitted }) => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = (data) => {
    console.log('Event Registration:', { event, ...data });
    setSubmitted(true);
    onSubmitted?.({ event, ...data });
    setTimeout(() => {
      onClose?.();
      setSubmitted(false);
      reset();
    }, 3000);
  };

  const handleSubmitAnother = () => {
    setSubmitted(false);
    reset();
  };

  const handleCancel = () => {
    reset();
    onClose?.();
  };

  const inputClass = (field) =>
    `w-full h-12 px-4 border ${errors[field] ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_4px_rgba(220,38,38,0.12)]' : 'border-gray-300 focus:border-primary-600 focus:shadow-[0_0_0_4px_rgba(23,96,63,0.12)]'} rounded-xl bg-white text-[15px] text-gray-900 focus:outline-none transition-all placeholder:text-gray-400`;

  return (
    <div>
      {submitted ? (
        <div className="py-8 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary-50 text-primary-700 ring-1 ring-inset ring-primary-200 mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="font-serif text-[1.75rem] text-gray-900 mb-3">
            You&apos;re registered!
          </h3>
          <p className="text-[15px] text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            See you at <span className="font-semibold text-gray-900">{event?.title}</span>.
            We&apos;ve noted your spot and will send a confirmation to your email.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                handleSubmitAnother();
                onClose?.();
              }}
              icon={Calendar}
            >
              Browse Other Events
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={handleSubmitAnother}
              icon={UserRound}
            >
              Register Another Person
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 py-2">
          {event && (
            <div className="p-5 rounded-2xl bg-primary-50/60 border border-primary-100 space-y-3 mb-1">
              <span className="eyebrow text-primary-600"><span className="h-px w-6 bg-accent-400" aria-hidden="true" />You&apos;re registering for</span>
              <h3 className="font-serif text-xl text-gray-900 m-0 leading-snug">
                {event.title}
              </h3>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-medium text-gray-600">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={14} />
                  {new Date(event.date).toLocaleDateString('en-NG', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={14} />
                  {event.time}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} />
                  {event.venue}
                </span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="event-fullName" className="block text-sm font-semibold text-gray-800 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="event-fullName"
                {...register('fullName', { required: 'Full name is required' })}
                placeholder="Your name"
                className={inputClass('fullName')}
              />
              {errors.fullName && (
                <span className="text-[13px] text-red-600 mt-1.5 block" role="alert">
                  {errors.fullName.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="event-email" className="block text-sm font-semibold text-gray-800 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="event-email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email address',
                  },
                })}
                type="email"
                placeholder="your@email.com"
                className={inputClass('email')}
              />
              {errors.email && (
                <span className="text-[13px] text-red-600 mt-1.5 block" role="alert">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="event-phone" className="block text-sm font-semibold text-gray-800 mb-2">Phone</label>
            <input
              id="event-phone"
              {...register('phone')}
              placeholder="+234..."
              className={inputClass('phone')}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
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
              fullWidth
              icon={CheckCircle2}
            >
              Confirm Registration
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center leading-relaxed">
            By registering, you agree to receive event-related updates from BFCN.
          </p>
        </form>
      )}
    </div>
  );
};

export default EventsForm;
