
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  CheckCircle2,
  X,
  Plus,
  Calendar,
  Users,
  Target,
  DollarSign,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import { Button } from '../ui';
import { toast, Toaster } from 'sonner';
import { useCreateProject } from '../../api/project';

const labelClass = 'block text-sm font-semibold text-gray-800 mb-2';
const errorClass = 'text-[13px] text-red-600 mt-1.5 block';

const Req = () => (
  <span className="text-red-600 ml-0.5" aria-hidden="true">
    *
  </span>
);

const FormSection = ({ title, children }) => (
  <section className="space-y-5">
    <div className="flex items-center gap-4">
      <h3 className="font-serif text-lg text-gray-900 m-0 shrink-0">
        {title}
      </h3>
      <span className="h-px flex-1 bg-gray-200" aria-hidden="true" />
    </div>
    {children}
  </section>
);

const getDefaultValues = (project) => ({
  title: project?.title ?? '',
  description: project?.description ?? '',
  startDate:
    project?.startDate?.slice(0, 10) ??
    new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
  endDate:
    project?.endDate?.slice(0, 10) ??
    new Date(Date.now() + 90 * 86400000).toISOString().slice(0, 10),
  budget: project?.budget ?? '',
  category: project?.category ?? 'Education',
  targetBeneficiaries: project?.targetBeneficiaries ?? '',
  projectLead: project?.projectLead ?? '',
  status: project?.status ?? 'Planning',
});

const ProjectForm = ({ project, onClose, onSubmitted }) => {
  const { mutateAsync: createProject, isPending: isProjectLoading } = useCreateProject();

  const [submitted, setSubmitted] = useState(false);
  const isEditing = Boolean(project);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: getDefaultValues(project),
  });

  const inputClass = (field) =>
    `w-full h-12 px-4 rounded-xl border ${errors[field] ? 'border-red-400' : 'border-gray-300'
    } bg-white text-[15px] text-gray-900 placeholder:text-gray-400
    focus:outline-none focus:border-primary-600
    focus:shadow-[0_0_0_4px_rgba(23,96,63,0.12)] transition`;

  const textareaClass = (field) =>
    `w-full min-h-[140px] px-4 py-3 rounded-xl border ${errors[field] ? 'border-red-400' : 'border-gray-300'
    } bg-white text-[15px] leading-relaxed text-gray-900
    placeholder:text-gray-400 focus:outline-none focus:border-primary-600
    focus:shadow-[0_0_0_4px_rgba(23,96,63,0.12)] transition resize-y`;

  const onSubmit = async (data) => {
    try {
      await createProject(data);
      toast.success(isEditing ? 'Project updated successfully!' : 'Project created successfully!');
      setSubmitted(true);
       reset();
      onClose();
      onSubmitted?.({ project, ...data });
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || 'Failed to save project.');
    }
  };

  const handleCancel = () => {
    reset();
    onClose?.();
  };

  const handleSubmitAnother = () => {
    reset(getDefaultValues(null));
    setSubmitted(false);
  };

  return (
    <div>
      <Toaster position="top-right" />
      <>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-10"
        >
          <FormSection title="Project details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label htmlFor="project-title" className={labelClass}>
                  Project title <Req />
                </label>

                <input
                  id="project-title"
                  {...register('title', {
                    required: 'Project title is required',
                    minLength: {
                      value: 3,
                      message: 'Title must be at least 3 characters',
                    },
                  })}
                  placeholder="e.g. Back-to-School Support Initiative 2026"
                  aria-invalid={!!errors.title}
                  className={inputClass('title')}
                />

                {errors.title && (
                  <span className={errorClass} role="alert">
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="project-description" className={labelClass}>
                  Description <Req />
                </label>

                <textarea
                  id="project-description"
                  {...register('description', {
                    required: 'Description is required',
                    minLength: {
                      value: 10,
                      message: 'Description must be at least 10 characters',
                    },
                  })}
                  placeholder="Describe the project, objectives, key activities, and expected impact"
                  rows={5}
                  aria-invalid={!!errors.description}
                  className={textareaClass('description')}
                />

                {errors.description && (
                  <span className={errorClass} role="alert">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </div>
          </FormSection>

          <FormSection title="Project timeline">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="project-startDate" className={labelClass}>
                  Start date <Req />
                </label>

                <div className="relative">
                  <input
                    id="project-startDate"
                    type="date"
                    {...register('startDate', {
                      required: 'Start date is required',
                      validate: (value, values) =>
                        !values.endDate ||
                        value <= values.endDate ||
                        'Start date cannot be after the end date',
                    })}
                    aria-invalid={!!errors.startDate}
                    className={`${inputClass('startDate')} pr-10`}
                  />
                  <Calendar
                    size={17}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>

                {errors.startDate && (
                  <span className={errorClass} role="alert">
                    {errors.startDate.message}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="project-endDate" className={labelClass}>
                  End date <Req />
                </label>

                <div className="relative">
                  <input
                    id="project-endDate"
                    type="date"
                    {...register('endDate', {
                      required: 'End date is required',
                      validate: (value, values) =>
                        !values.startDate ||
                        value >= values.startDate ||
                        'End date cannot be before the start date',
                    })}
                    aria-invalid={!!errors.endDate}
                    className={`${inputClass('endDate')} pr-10`}
                  />
                  <Calendar
                    size={17}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>

                {errors.endDate && (
                  <span className={errorClass} role="alert">
                    {errors.endDate.message}
                  </span>
                )}
              </div>
            </div>
          </FormSection>

          <FormSection title="Budget and beneficiaries">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="project-budget" className={labelClass}>
                  Budget (₦) <Req />
                </label>

                <div className="relative">
                  <DollarSign
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="project-budget"
                    type="number"
                    min="0"
                    step="any"
                    {...register('budget', {
                      required: 'Budget is required',
                      valueAsNumber: true,
                      validate: (value) =>
                        (Number.isFinite(value) && value >= 0) ||
                        'Enter a valid non-negative budget',
                    })}
                    placeholder="500000"
                    aria-invalid={!!errors.budget}
                    className={`${inputClass('budget')} pl-11`}
                  />
                </div>

                {errors.budget && (
                  <span className={errorClass} role="alert">
                    {errors.budget.message}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="project-category" className={labelClass}>
                  Category <Req />
                </label>

                <div className="relative">
                  <Sparkles
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                  <select
                    id="project-category"
                    {...register('category', {
                      required: 'Category is required',
                    })}
                    aria-invalid={!!errors.category}
                    className={`${inputClass('category')} pl-11`}
                  >
                    <option value="Education">Education</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Welfare">Welfare</option>
                    <option value="Community Development">
                      Community Development
                    </option>
                    <option value="Youth Empowerment">
                      Youth Empowerment
                    </option>
                    <option value="Women Empowerment">
                      Women Empowerment
                    </option>
                    <option value="Environment">Environment</option>
                    <option value="Infrastructure">Infrastructure</option>
                  </select>
                </div>

                {errors.category && (
                  <span className={errorClass} role="alert">
                    {errors.category.message}
                  </span>
                )}
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="project-targetBeneficiaries"
                  className={labelClass}
                >
                  Target beneficiaries <Req />
                </label>

                <div className="relative">
                  <Users
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="project-targetBeneficiaries"
                    type="number"
                    min="1"
                    step="1"
                    {...register('targetBeneficiaries', {
                      required: 'Target beneficiaries is required',
                      valueAsNumber: true,
                      validate: (value) =>
                        (Number.isInteger(value) && value >= 1) ||
                        'Enter a whole number of at least 1 beneficiary',
                    })}
                    placeholder="e.g. 100"
                    aria-invalid={!!errors.targetBeneficiaries}
                    className={`${inputClass('targetBeneficiaries')} pl-11`}
                  />
                </div>

                {errors.targetBeneficiaries && (
                  <span className={errorClass} role="alert">
                    {errors.targetBeneficiaries.message}
                  </span>
                )}
              </div>
            </div>
          </FormSection>

          <FormSection title="Project management">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="project-projectLead" className={labelClass}>
                  Project lead <Req />
                </label>

                <div className="relative">
                  <Target
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="project-projectLead"
                    {...register('projectLead', {
                      required: 'Project lead is required',
                    })}
                    placeholder="Project manager / lead name"
                    aria-invalid={!!errors.projectLead}
                    className={`${inputClass('projectLead')} pl-11`}
                  />
                </div>

                {errors.projectLead && (
                  <span className={errorClass} role="alert">
                    {errors.projectLead.message}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="project-status" className={labelClass}>
                  Status <Req />
                </label>

                <select
                  id="project-status"
                  {...register('status', {
                    required: 'Status is required',
                  })}
                  aria-invalid={!!errors.status}
                  className={inputClass('status')}
                >
                  <option value="Planning">Planning</option>
                  <option value="Fundraising">Fundraising</option>
                  <option value="Active">Active</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                {errors.status && (
                  <span className={errorClass} role="alert">
                    {errors.status.message}
                  </span>
                )}
              </div>
            </div>
          </FormSection>

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              size="lg"
              icon={X}
              fullWidth
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isProjectLoading}
              fullWidth
              icon={Briefcase}
            >
              {isEditing ? 'Update project' : 'Create project'}
            </Button>
          </div>

          <p className="text-xs text-center text-gray-500">
            Project details are used for BFCN project tracking and reporting.
          </p>
        </form>
      </>
    </div>
  );
};

export default ProjectForm;
