import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Eye, Lightbulb, CheckCircle2, X } from 'lucide-react';
import { Button } from '../../components/ui';

const CommunityIdeasForm = ({ onClose, onSubmitted, onViewTracker }) => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      community: '',
      problem: '',
      solution: '',
      beneficiaries: '',
      additionalInfo: '',
    },
  });

  const onSubmit = (data) => {
    console.log('Submitted idea:', data);
    setSubmitted(true);
    toast.success('Idea Submitted. Our team will review and keep you updated.');
    onSubmitted?.(data);
  };

  const handleSubmitAnother = () => {
    setSubmitted(false);
    reset();
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
            Thank you — your idea is on its way!
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            A member of the BFCN team will review your submission and post any
            updates to the Idea Tracker. You can safely close this panel or
            browse recent submissions below.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={handleSubmitAnother}
              icon={Lightbulb}
            >
              Submit Another Idea
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                onViewTracker?.();
                onClose?.();
              }}
              icon={Eye}
            >
              Open Idea Tracker
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register('name', { required: 'Required' })}
                placeholder="Full name"
                className={inputClass('name')}
              />
              {errors.name && (
                <span className="text-sm text-red-600 mt-1 block">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Community <span className="text-red-500">*</span>
              </label>
              <input
                {...register('community', { required: 'Required' })}
                placeholder="Your community"
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
            <label className="block text-sm font-medium mb-2">
              Problem / Challenge <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('problem', { required: 'Required' })}
              placeholder="Describe the problem in a few sentences. Who is affected, and how is it showing up today?"
              rows={5}
              className={`${inputClass('problem')} resize-y min-h-[120px]`}
            />
            {errors.problem && (
              <span className="text-sm text-red-600 mt-1 block">
                {errors.problem.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Suggested Solution <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('solution', { required: 'Required' })}
              placeholder="What solution do you suggest? Feel free to be bold — even rough sketches help."
              rows={4}
              className={`${inputClass('solution')} resize-y min-h-[100px]`}
            />
            {errors.solution && (
              <span className="text-sm text-red-600 mt-1 block">
                {errors.solution.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Who Will Benefit?
            </label>
            <input
              {...register('beneficiaries')}
              placeholder="E.g., Students, Women, Elderly, Traders"
              className={inputClass('beneficiaries')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Additional Context (optional)
            </label>
            <textarea
              {...register('additionalInfo')}
              placeholder="Anything else we should know — timelines, existing efforts, contacts, etc."
              rows={3}
              className={`${inputClass('additionalInfo')} resize-y min-h-[80px]`}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onClose}
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
              icon={Lightbulb}
            >
              Submit Idea
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center leading-relaxed">
            By submitting, you agree that BFCN may contact you about this idea
            and display a summary in the public Idea Tracker.
          </p>
        </form>
      )}
    </div>
  );
};

export default CommunityIdeasForm;
