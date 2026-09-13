import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Lightbulb, CheckCircle } from 'lucide-react';
import { Button, ScrollReveal, Badge, SectionHeader } from '../../components/ui';

const sampleIdeas = [
  {
    id: 1,
    name: 'Adeola Ibrahim',
    community: 'Oke-Elerin',
    problem: 'No access to clean drinking water',
    status: 'In Progress',
  },
  {
    id: 2,
    name: 'Rasheed Afolabi',
    community: 'Isale-Ora',
    problem: 'Youth unemployment and lack of training centres',
    status: 'Under Review',
  },
  {
    id: 3,
    name: 'Mrs. Funke Balogun',
    community: 'Arowomole',
    problem: 'Poor road access to schools',
    status: 'Discussed',
  },
];

const CommunityIdeas = () => {
  const [submitted, setSubmitted] = useState(false);
  const [showTracker, setShowTracker] = useState(false);

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
  };

  const handleSubmitAnother = () => {
    setSubmitted(false);
    reset();
  };

  const inputClass = (field) =>
    `w-full py-3 px-4 border ${errors[field] ? 'border-red-500' : 'border-gray-200'
    } rounded-lg bg-white text-sm focus:outline-none focus:border-primary-600 focus:shadow-[0_0_0_3px_rgba(27,94,32,0.12)] transition-all placeholder:text-gray-400`;

  return (
    <div>
      <section className="relative py-24 bg-gradient-to-br from-primary-800 to-primary-600 overflow-hidden -mt-[72px] pt-[calc(72px+4rem)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(212,160,23,0.12)_0%,transparent_50%)]" />

        <div className="container-main relative z-10">
          <ScrollReveal className="text-center max-w-[700px] mx-auto">
            <span className="inline-block text-sm font-semibold uppercase tracking-[0.1em] text-accent-400 mb-4">
              Your Voice Matters
            </span>

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Community Ideas
            </h1>

            <p className="text-base text-white/85 max-w-[560px] mx-auto">
              Share challenges and solutions. BFCN listens and acts.
            </p>
          </ScrollReveal>
        </div>

        <div className="absolute bottom-[-1px] left-0 right-0 z-10 hero-wave">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path
              d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-main">
          <div className="flex gap-2 mb-8 border-b border-gray-200">
            <button
              className={`px-6 py-3 text-sm font-semibold border-b-[3px] -mb-px transition-all cursor-pointer bg-transparent ${!showTracker
                  ? 'text-primary-600 border-primary-600'
                  : 'text-gray-500 border-transparent hover:text-primary-600'
                }`}
              onClick={() => setShowTracker(false)}
            >
              Submit an Idea
            </button>

            <button
              className={`px-6 py-3 text-sm font-semibold border-b-[3px] -mb-px transition-all cursor-pointer bg-transparent ${showTracker
                  ? 'text-primary-600 border-primary-600'
                  : 'text-gray-500 border-transparent hover:text-primary-600'
                }`}
              onClick={() => setShowTracker(true)}
            >
              Idea Tracker
            </button>
          </div>

          {showTracker ? (
            <div className="max-w-[800px]">
              <SectionHeader
                align="left"
                title="Submitted Ideas"
                subtitle="Track the progress of community ideas."
              />

              {sampleIdeas.map((idea) => (
                <div
                  key={idea.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white border border-gray-200 rounded-lg mb-3"
                >
                  <div className="flex-1">
                    <strong className="text-sm">{idea.name}</strong>{' '}
                    —{' '}
                    <span className="text-sm text-primary-600">
                      {idea.community}
                    </span>

                    <p className="text-sm text-gray-600 mt-2 mb-0">
                      {idea.problem}
                    </p>
                  </div>

                  <Badge.Status status={idea.status} />
                </div>
              ))}
            </div>
          ) : submitted ? (
            <div className="text-center max-w-[500px] mx-auto py-10">
              <CheckCircle
                size={48}
                className="text-green-700 mx-auto mb-4"
              />

              <h2 className="font-serif text-2xl mb-4">
                Idea Submitted!
              </h2>

              <p className="text-gray-600 mb-8">
                Our team will review and keep you updated.
              </p>

              <Button
                variant="primary"
                onClick={handleSubmitAnother}
              >
                Submit Another
              </Button>
            </div>
          ) : (
            <div className="max-w-[720px] mx-auto">
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <div className="text-center mb-8">
                  <Lightbulb
                    size={24}
                    className="text-primary-600 mx-auto mb-3"
                  />

                  <h2 className="font-serif text-2xl mb-2">
                    Share Your Idea
                  </h2>

                  <p className="text-sm text-gray-600">
                    Tell us about a challenge and your proposed solution.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Your Name *
                      </label>

                      <input {...register('name', { required: 'Required', })} placeholder="Full name" className={inputClass('name')} />
                      {errors.name && (
                        <span className="text-sm text-red-600 mt-1 block">
                          {errors.name.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Community *
                      </label>

                      <input
                        {...register('community', {
                          required: 'Required',
                        })}
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
                      Problem / Challenge *
                    </label>

                    <textarea
                      {...register('problem', {
                        required: 'Required',
                      })}
                      placeholder="Describe the problem..."
                      rows={4}
                      className={`${inputClass(
                        'problem'
                      )} resize-y min-h-[100px]`}
                    />

                    {errors.problem && (
                      <span className="text-sm text-red-600 mt-1 block">
                        {errors.problem.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Suggested Solution
                    </label>
                    <textarea {...register('solution', {
                        required: 'Required',
                      })}
                      placeholder="What solution do you suggest?"
                      rows={3}
                      className={`${inputClass(
                        'solution'
                      )} resize-y min-h-[80px]`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Who Will Benefit?
                    </label>
                    <input {...register('beneficiaries')} placeholder="E.g., Students, Women" className={inputClass('beneficiaries')} />
                  </div>
                  <Button type="submit" variant="primary" size="lg" fullWidth icon={Lightbulb}>
                    Submit Idea
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CommunityIdeas;