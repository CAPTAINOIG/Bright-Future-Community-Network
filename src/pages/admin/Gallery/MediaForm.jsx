import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle2, X, Plus, Upload, Tag, Image as ImageIcon, FileType } from 'lucide-react';
import { FormField, toast, Button } from '../../../components/ui';

const MediaForm = ({ media, onClose, onSubmitted }) => {
  const [submitted, setSubmitted] = useState(false);
  const isEditing = Boolean(media);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: media?.title ?? '',
      caption: media?.caption ?? '',
      url: media?.url ?? '',
      type: media?.type ?? 'Image',
      category: media?.category ?? 'Events',
      tags: (media?.tags ?? []).join(', '),
      altText: media?.altText ?? '',
      credits: media?.credits ?? '',
    },
  });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (isEditing) {
        toast.success('Media updated successfully!');
      } else {
        toast.success('Media uploaded successfully!');
      }
      setSubmitted(true);
      onSubmitted?.({ media, ...data, tags: data.tags.split(',').map((t) => t.trim()).filter(Boolean) });
    } catch (error) {
      toast.error(error?.message || 'Something went wrong. Please try again.');
    }
  };

  const handleSubmitAnother = () => {
    setSubmitted(false);
    reset({
      title: '', caption: '', url: '', type: 'Image', category: 'Events',
      tags: '', altText: '', credits: '',
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
          <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-primary-50 text-primary-600 ring-1 ring-inset ring-primary-100">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="mb-2 font-serif text-2xl text-gray-900">
            {isEditing ? 'Media updated!' : 'Media added successfully!'}
          </h3>
          <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-gray-500">
            {isEditing
              ? `"${media?.title ?? 'This item'}" has been updated in the gallery.`
              : `Great! The media item is now live in the BFCN public gallery.`}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="outline" size="lg" onClick={handleCancel} icon={X}>
              Back to gallery
            </Button>
            {!isEditing && (
              <Button variant="primary" size="lg" onClick={handleSubmitAnother} icon={Upload}>
                Upload another item
              </Button>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 py-2">
          {isEditing && media && (
            <div className="mb-1 space-y-1.5 rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-50 text-sm font-semibold text-primary-700 overflow-hidden">
                  {media.url ? (
                    <img
                      src={media.url}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <ImageIcon size={18} />
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="m-0 truncate text-[15px] font-semibold leading-tight text-gray-900">
                    {media.title}
                  </h4>
                  <p className="m-0 mt-0.5 text-xs text-gray-500">Editing media · {media.type ?? 'Image'}</p>
                </div>
              </div>
            </div>
          )}

          <FormField
            label="Title"
            required
            {...register('title', {
              required: 'Title is required',
              minLength: { value: 2, message: 'Title must be at least 2 characters' },
            })}
            error={errors.title}
            placeholder="e.g. 2025 Youth Summit Group Photo"
            icon={ImageIcon}
          />

          <FormField
            label="Caption"
            type="textarea"
            required
            {...register('caption', { required: 'Caption is required' })}
            error={errors.caption}
            placeholder="Describe what this image/video shows"
            rows={3}
          />

          <FormField
            label="Media URL"
            type="url"
            required
            {...register('url', {
              required: 'Media URL is required',
              pattern: { value: /^https?:\/\/.+/, message: 'Must be a valid URL starting with http(s)' },
            })}
            error={errors.url}
            placeholder="https://..."
            icon={Upload}
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormField
              label="Media type"
              type="select"
              required
              {...register('type', { required: 'Media type is required' })}
              error={errors.type}
              icon={FileType}
            >
              <option value="Image">Image</option>
              <option value="Video">Video</option>
              <option value="Document">Document</option>
              <option value="Audio">Audio</option>
            </FormField>

            <FormField
              label="Gallery category"
              type="select"
              required
              {...register('category', { required: 'Category is required' })}
              error={errors.category}
              icon={Tag}
            >
              <option value="Events">Events</option>
              <option value="Programmes">Programmes</option>
              <option value="Projects">Projects</option>
              <option value="Community">Community</option>
              <option value="Outreach">Outreach</option>
              <option value="Training">Training</option>
            </FormField>
          </div>

          <FormField
            label="Tags (comma-separated)"
            {...register('tags')}
            error={errors.tags}
            placeholder="e.g. youth, summit, 2025, abuja"
            icon={Tag}
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormField
              label="Alt text (accessibility)"
              {...register('altText')}
              error={errors.altText}
              placeholder="Describe the image for screen readers"
            />
            <FormField
              label="Photographer / credits"
              {...register('credits')}
              error={errors.credits}
              placeholder="e.g. Photo by BFCN Media Team"
            />
          </div>

          <div className="flex flex-col items-stretch gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center">
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
              icon={Upload}
              fullWidth
            >
              {isEditing ? 'Update media' : 'Upload media'}
            </Button>
          </div>
          <p className="mt-2 text-center text-xs leading-relaxed text-gray-500">
            Accepted: direct image URLs (JPG/PNG/WebP), YouTube/Vimeo video links, and PDFs.
          </p>
        </form>
      )}
    </div>
  );
};

export default MediaForm;
