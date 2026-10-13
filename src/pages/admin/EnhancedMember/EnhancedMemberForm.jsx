import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserRound, CheckCircle2, X, Users, UserPlus } from 'lucide-react';
import { FormField, toast, Button } from '../../../components/ui';
import { useCreateMember } from '../../../api/member';

const EnhancedMemberForm = ({ member, onClose, onSubmitted }) => {
  const [submitted, setSubmitted] = useState(false);
  const { mutateAsync: createMember, isPending: isCreatingMemberLoading } = useCreateMember();

  const isEditing = Boolean(member);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: member?.fullName ?? '',
      email: member?.email ?? '',
      phone: member?.phone ?? '',
      type: 'Regular',
    },
  });

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        toast.success('Member updated successfully!');
      } else {
        await createMember({
          fullName: data.name,
          email: data.email,
          phone: data.phone,
        });
        toast.success('Member added successfully!');
      }
      setSubmitted(true);
      onSubmitted?.({ member, ...data });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  const handleSubmitAnother = () => {
    setSubmitted(false);
    reset({ name: '', email: '', phone: '', type: 'Regular' });
  };

  const handleCancel = () => {
    reset();
    onClose?.();
  };

  const isLoading = isCreatingMemberLoading;

  return (
    <div>
      {submitted ? (
        <div className="py-8 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mb-5">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="font-serif text-2xl font-bold mb-2">
            {isEditing ? 'Member updated!' : 'Member added successfully!'}
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            {isEditing
              ? `${member?.fullName ?? 'This member'}'s record has been updated in the member directory.`
              : `Welcome aboard! The new member record has been saved to the BFCN community directory.`}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={handleCancel}
              icon={X}
            >
              Back to Members
            </Button>
            {!isEditing && (
              <Button
                variant="primary"
                size="lg"
                onClick={handleSubmitAnother}
                icon={UserPlus}
              >
                Add Another Member
              </Button>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 py-2">
          {isEditing && member && (
            <div className="p-4 rounded-xl bg-[#f4f6f4] border border-[#e3e7e3] space-y-1.5 mb-1">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[#d9ece0] text-sm font-semibold text-[#427456] shrink-0">
                  {(member?.fullName ?? '??')
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif text-base font-bold text-[#17231d] m-0 leading-tight truncate">
                    {member.fullName}
                  </h4>
                  <p className="text-xs text-[#708078] m-0">
                    Editing existing member record
                  </p>
                </div>
              </div>
            </div>
          )}

          <FormField
            label="Full Name"
            required
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              },
            })}
            error={errors.name}
            placeholder="Enter full name"
          />

          <FormField
            label="Email"
            type="email"
            required
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
            error={errors.email}
            placeholder="Enter email address"
          />

          <FormField
            label="Phone"
            type="tel"
            {...register('phone', {
              pattern: {
                value: /^\+?[1-9]\d{1,14}$|^\d{10,15}$/,
                message: 'Invalid phone number',
              },
            })}
            error={errors.phone}
            placeholder="+234 800 000 0000"
          />

          <FormField
            label="Member Type"
            type="select"
            required
            {...register('type', { required: 'Member type is required' })}
            error={errors.type}
          >
            <option value="Regular">Regular</option>
            <option value="Premium">Premium</option>
          </FormField>

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
              loading={isLoading}
              icon={Users}
              fullWidth
            >
              {isEditing ? 'Update Member' : 'Add Member'}
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center leading-relaxed">
            By saving, you confirm this information is accurate and consent to
            BFCN communicating with this member about community activities.
          </p>
        </form>
      )}
    </div>
  );
};

export default EnhancedMemberForm;
