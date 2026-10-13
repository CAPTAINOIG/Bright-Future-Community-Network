import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle2, X, Plus, Calendar, Users, Target, DollarSign, Briefcase, Sparkles } from 'lucide-react';
import { FormField, toast, Button } from '../../../components/ui';

const ProjectForm = ({ project, onClose, onSubmitted }) => {
  const [submitted, setSubmitted] = useState(false);
  const isEditing = Boolean(project);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: project?.title ?? '',
      description: project?.description ?? '',
      startDate: project?.startDate ?? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      endDate: project?.endDate ?? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      budget: project?.budget ?? '',
      category: project?.category ?? 'Education',
      targetBeneficiaries: project?.targetBeneficiaries ?? '',
      lead: project?.lead ?? '',
      status: project?.status ?? 'Planning',
    },
  });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (isEditing) {
        toast.success('Project updated successfully!');
      } else {
        toast.success('Project created successfully!');
      }
      setSubmitted(true);
      onSubmitted?.({ project, ...data });
    } catch (error) {
      toast.error(error?.message || 'Something went wrong. Please try again.');
    }
  };

  const handleSubmitAnother = () => {
    setSubmitted(false);
    reset({
      title: '', description: '',
      startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      budget: '', category: 'Education', targetBeneficiaries: '', lead: '', status: 'Planning',
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
            {isEditing ? 'Project updated!' : 'Project created successfully!'}
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            {isEditing
              ? `"${project?.title ?? 'This project'}" has been updated in the projects tracker.`
              : `Great! The new project has been added to the BFCN projects directory.`}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="outline" size="lg" onClick={handleCancel} icon={X}>
              Back to Projects
            </Button>
            {!isEditing && (
              <Button variant="primary" size="lg" onClick={handleSubmitAnother} icon={Plus}>
                Create Another Project
              </Button>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 py-2">
          {isEditing && project && (
            <div className="p-4 rounded-xl bg-[#f4f6f4] border border-[#e3e7e3] space-y-1.5 mb-1">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[#d9ece0] text-sm font-semibold text-[#427456] shrink-0">
                  {(project?.title ?? '??').split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif text-base font-bold text-[#17231d] m-0 leading-tight truncate">
                    {project.title}
                  </h4>
                  <p className="text-xs text-[#708078] m-0">Editing existing project · {project.category ?? 'Project'}</p>
                </div>
              </div>
            </div>
          )}

          <FormField
            label="Project Title"
            required
            {...register('title', {
              required: 'Project title is required',
              minLength: { value: 3, message: 'Title must be at least 3 characters' },
            })}
            error={errors.title}
            placeholder="e.g. Back-to-School Support Initiative 2026"
            icon={Briefcase}
          />

          <FormField
            label="Description"
            type="textarea"
            required
            {...register('description', { required: 'Description is required' })}
            error={errors.description}
            placeholder="Describe the project, objectives, key activities, and expected impact"
            rows={4}
          />

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
              label="Budget (₦)"
              type="number"
              required
              {...register('budget', {
                required: 'Budget is required',
                min: { value: 0, message: 'Budget cannot be negative' },
              })}
              error={errors.budget}
              placeholder="500000"
              icon={DollarSign}
            />
            <FormField
              label="Category"
              type="select"
              required
              {...register('category', { required: 'Category is required' })}
              error={errors.category}
              icon={Sparkles}
            >
              <option value="Education">Education</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Welfare">Welfare</option>
              <option value="Community Development">Community Development</option>
              <option value="Youth Empowerment">Youth Empowerment</option>
              <option value="Women Empowerment">Women Empowerment</option>
              <option value="Environment">Environment</option>
              <option value="Infrastructure">Infrastructure</option>
            </FormField>
          </div>

          <FormField
            label="Target Beneficiaries"
            type="number"
            required
            {...register('targetBeneficiaries', {
              required: 'Target number is required',
              min: { value: 1, message: 'At least 1 beneficiary' },
            })}
            error={errors.targetBeneficiaries}
            placeholder="e.g. 200 students"
            icon={Users}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField
              label="Project Lead"
              required
              {...register('lead', { required: 'Project lead name is required' })}
              error={errors.lead}
              placeholder="Project manager / lead name"
              icon={Target}
            />
            <FormField
              label="Status"
              type="select"
              required
              {...register('status', { required: 'Status is required' })}
              error={errors.status}
            >
              <option value="Planning">Planning</option>
              <option value="Fundraising">Fundraising</option>
              <option value="Active">Active</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </FormField>
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
              icon={Briefcase}
              fullWidth
            >
              {isEditing ? 'Update Project' : 'Create Project'}
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center leading-relaxed">
            Project details are visible on the Projects page and may be used in donor reports.
          </p>
        </form>
      )}
    </div>
  );
};

export default ProjectForm;
