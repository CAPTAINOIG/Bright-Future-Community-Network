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
    `w-full py-3 px-4 border ${errors[field] ? 'border-red-500' : 'border-gray-200'} rounded-lg bg-white text-sm focus:outline-none focus:border-primary-600 focus:shadow-[0_0_0_3px_rgba(27,94,32,0.12)] transition-all placeholder:text-gray-400`;

  return (
    <div>
      {submitted ? (
        <div className="py-8 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mb-5">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="font-serif text-2xl font-bold mb-2">
            You&apos;re registered!
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            See you at <span className="font-semibold text-[#17231d]">{event?.title}</span>.
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
              variant="outline"
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
            <div className="p-4 rounded-xl bg-[#f4f6f4] border border-[#e3e7e3] space-y-2 mb-1">
              <h4 className="font-serif text-lg font-bold text-[#17231d] m-0 leading-tight">
                {event.title}
              </h4>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#5a6b62]">
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
              <label className="block text-sm font-medium mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register('fullName', { required: 'Full name is required' })}
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
              <label className="block text-sm font-medium mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
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
                <span className="text-sm text-red-600 mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              {...register('phone')}
              placeholder="+234..."
              className={inputClass('phone')}
            />
          </div>

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
