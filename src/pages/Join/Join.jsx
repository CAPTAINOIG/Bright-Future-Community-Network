import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserPlus } from 'lucide-react';
import { Button, ScrollReveal } from '../../components/ui';
import { toast } from 'sonner';

const interestOptions = [
  'Education',
  'Youth Development',
  'Skills Training',
  'Leadership',
  'Community Outreach',
  'Welfare',
  'Media & Communications',
  'Technology',
];

const Join = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      location: '',
      community: '',
      interests: [],
      skills: '',
      reason: '',
    },
  });

   const inputClass = (field) =>
      `w-full py-3 px-4 border ${errors[field] ? 'border-red-500' : 'border-gray-200'
      } rounded-lg bg-white text-sm focus:outline-none focus:border-primary-600 focus:shadow-[0_0_0_3px_rgba(27,94,32,0.12)] transition-all placeholder:text-gray-400`;
  
  const interests = watch('interests');

  const onSubmit = (data) => {
    console.log('Membership Application:', data);
    toast.success(`Thank you, ${watch('fullName')}. We will review and contact you soon.`);
    setValue('fullName', "")
    setValue('phone', "")
    setValue('email', "")
    setValue('location', "")
    setValue('community', "")
    setValue('skills', "")
    setValue('reason', "")
  };

  const toggleInterest = (interest) => {
    const currentInterests = interests || [];
    const updatedInterests = currentInterests.includes(interest)
      ? currentInterests.filter((item) => item !== interest)
      : [...currentInterests, interest];

    setValue('interests', updatedInterests, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div>
      <section className="relative py-24 bg-gradient-to-br from-primary-800 to-primary-600 overflow-hidden -mt-[72px] pt-[calc(72px+4rem)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(212,160,23,0.12)_0%,transparent_50%)]" />

        <div className="container-main relative z-10">
          <ScrollReveal className="text-center max-w-[700px] mx-auto">
            <span className="inline-block text-sm font-semibold uppercase tracking-[0.1em] text-accent-400 mb-4">
              Become a Member
            </span>

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Join BFCN
            </h1>

            <p className="text-base text-white/85 max-w-[560px] mx-auto">
              Be part of a growing community of changemakers.
            </p>
          </ScrollReveal>
        </div>

        <div className="absolute bottom-[-1px] left-0 right-0 z-10 hero-wave">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-main max-w-[720px]">
          <ScrollReveal>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <div className="text-center mb-8">
                <UserPlus
                  size={24}
                  className="text-primary-600 mx-auto mb-3"
                />

                <h2 className="font-serif text-2xl mb-2">
                  Membership Application
                </h2>

                <p className="text-sm text-gray-600">
                  Fill out the form below to apply.
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
                      Full Name *
                    </label>

                    <input
                      {...register('fullName', {
                        required: 'Required',
                      })}
                      placeholder="Your full name"
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
                      Phone *
                    </label>

                    <input
                      {...register('phone', {
                        required: 'Required',
                      })}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email *
                    </label>

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
                    <label className="block text-sm font-medium mb-2">
                      Location *
                    </label>

                    <input
                      {...register('location', {
                        required: 'Required',
                      })}
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
                  <label className="block text-sm font-medium mb-2">
                    Community
                  </label>

                  <input
                    {...register('community')}
                    placeholder="Your community"
                    className={inputClass('community')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Areas of Interest *
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {interestOptions.map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer text-sm transition-all ${interests?.includes(opt)
                            ? 'border-primary-600 bg-primary-50 text-primary-600 font-medium'
                            : 'border-gray-200 hover:border-primary-600 hover:bg-primary-50'
                          }`}
                      >
                        <input
                          type="checkbox"
                          checked={interests?.includes(opt)}
                          onChange={() => toggleInterest(opt)}
                          className="w-4 h-4 accent-primary-600"
                        />

                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>

                  <input
                    type="hidden"
                    {...register('interests', {
                      validate: (value) =>
                        value?.length > 0 || 'Select at least one',
                    })}
                  />

                  {errors.interests && (
                    <span className="text-sm text-red-600 mt-1 block">
                      {errors.interests.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Skills
                  </label>

                  <input
                    {...register('skills')}
                    placeholder="E.g., Teaching, Programming"
                    className={inputClass('skills')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Why join BFCN?
                  </label>

                  <textarea
                    {...register('reason')}
                    placeholder="Tell us..."
                    rows={4}
                    className={`${inputClass('reason')} resize-y min-h-[100px]`}
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  icon={UserPlus}
                >
                  Submit Application
                </Button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

export default Join;