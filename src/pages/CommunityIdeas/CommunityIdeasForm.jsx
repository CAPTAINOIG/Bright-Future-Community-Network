import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Eye, Lightbulb, CheckCircle2, X } from 'lucide-react';
import { Button } from '../../components/ui';

const labelClass = 'block text-sm font-semibold text-gray-800 mb-2';
const errorClass = 'text-[13px] text-red-600 mt-1.5 block';
const Req = () => <span className="text-red-600 ml-0.5" aria-hidden="true">*</span>;

const FormSection = ({ title, children }) => (
  <section className="space-y-5">
    <div className="flex items-center gap-4">
      <h3 className="font-serif text-lg text-gray-900 m-0 shrink-0">{title}</h3>
      <span className="h-px flex-1 bg-gray-200" aria-hidden="true" />
    </div>
    {children}
  </section>
);

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
    `w-full h-12 px-4 rounded-xl border ${
      errors[field] ? 'border-red-400' : 'border-gray-300'
    } bg-white text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary-600 focus:shadow-[0_0_0_4px_rgba(23,96,63,0.12)] transition`;

  const textareaClass = (field, minH = 'min-h-[120px]') =>
    `w-full ${minH} px-4 py-3 rounded-xl border ${
      errors[field] ? 'border-red-400' : 'border-gray-300'
    } bg-white text-[15px] leading-relaxed text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary-600 focus:shadow-[0_0_0_4px_rgba(23,96,63,0.12)] transition resize-y`;

  return (
    <div>
      {submitted ? (
        <div className="py-10 text-center" role="status">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary-50 text-primary-700 ring-8 ring-primary-50/50 mb-6">
            <CheckCircle2 size={30} strokeWidth={1.75} />
          </div>
          <h3 className="font-serif text-[1.75rem] text-gray-900 leading-tight mb-3">
            Thank you — your idea is on its way!
          </h3>
          <p className="text-[15px] text-gray-600 mb-10 max-w-md mx-auto leading-relaxed">
            A member of the BFCN team will review your submission and post any
            updates to the Idea Tracker. You can safely close this panel or
            browse recent submissions below.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={handleSubmitAnother}
              icon={Lightbulb}
            >
              Submit Another Idea
            </Button>
            <Button
              variant="secondary"
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
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-10 py-2">
          <FormSection title="About you">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="idea-name" className={labelClass}>
                  Your Name <Req />
                </label>
                <input
                  id="idea-name"
                  {...register('name', { required: 'Required' })}
                  placeholder="Full name"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  className={inputClass('name')}
                />
                {errors.name && (
                  <span className={errorClass} role="alert">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="idea-community" className={labelClass}>
                  Community <Req />
                </label>
                <input
                  id="idea-community"
                  {...register('community', { required: 'Required' })}
                  placeholder="Your community"
                  aria-invalid={!!errors.community}
                  className={inputClass('community')}
                />
                {errors.community && (
                  <span className={errorClass} role="alert">
                    {errors.community.message}
                  </span>
                )}
              </div>
            </div>
          </FormSection>

          <FormSection title="Your idea">
            <div>
              <label htmlFor="idea-problem" className={labelClass}>
                Problem / Challenge <Req />
              </label>
              <textarea
                id="idea-problem"
                {...register('problem', { required: 'Required' })}
                placeholder="Describe the problem in a few sentences. Who is affected, and how is it showing up today?"
                rows={5}
                aria-invalid={!!errors.problem}
                className={textareaClass('problem', 'min-h-[132px]')}
              />
              {errors.problem && (
                <span className={errorClass} role="alert">
                  {errors.problem.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="idea-solution" className={labelClass}>
                Suggested Solution <Req />
              </label>
              <textarea
                id="idea-solution"
                {...register('solution', { required: 'Required' })}
                placeholder="What solution do you suggest? Feel free to be bold — even rough sketches help."
                rows={4}
                aria-invalid={!!errors.solution}
                className={textareaClass('solution')}
              />
              {errors.solution && (
                <span className={errorClass} role="alert">
                  {errors.solution.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="idea-beneficiaries" className={labelClass}>
                Who Will Benefit?
              </label>
              <input
                id="idea-beneficiaries"
                {...register('beneficiaries')}
                placeholder="E.g., Students, Women, Elderly, Traders"
                className={inputClass('beneficiaries')}
              />
            </div>

            <div>
              <label htmlFor="idea-additionalInfo" className={labelClass}>
                Additional Context <span className="font-normal text-gray-500">(optional)</span>
              </label>
              <textarea
                id="idea-additionalInfo"
                {...register('additionalInfo')}
                placeholder="Anything else we should know — timelines, existing efforts, contacts, etc."
                rows={3}
                className={textareaClass('additionalInfo', 'min-h-[96px]')}
              />
            </div>
          </FormSection>

          <div className="pt-6 border-t border-gray-200">
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                type="button"
                variant="secondary"
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
            <p className="text-[13px] text-gray-500 mt-4 mb-0 text-center leading-relaxed">
              By submitting, you agree that BFCN may contact you about this idea
              and display a summary in the public Idea Tracker.
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default CommunityIdeasForm;
