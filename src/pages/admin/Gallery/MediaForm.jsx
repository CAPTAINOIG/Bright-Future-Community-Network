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
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mb-5">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="font-serif text-2xl font-bold mb-2">
            {isEditing ? 'Media updated!' : 'Media added successfully!'}
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            {isEditing
              ? `"${media?.title ?? 'This item'}" has been updated in the gallery.`
              : `Great! The media item is now live in the BFCN public gallery.`}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="outline" size="lg" onClick={handleCancel} icon={X}>
              Back to Gallery
            </Button>
            {!isEditing && (
              <Button variant="primary" size="lg" onClick={handleSubmitAnother} icon={Upload}>
                Upload Another Item
              </Button>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 py-2">
          {isEditing && media && (
            <div className="p-4 rounded-xl bg-[#f4f6f4] border border-[#e3e7e3] space-y-1.5 mb-1">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[#d9ece0] text-sm font-semibold text-[#427456] shrink-0 overflow-hidden">
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
                  <h4 className="font-serif text-base font-bold text-[#17231d] m-0 leading-tight truncate">
                    {media.title}
                  </h4>
                  <p className="text-xs text-[#708078] m-0">Editing media · {media.type ?? 'Image'}</p>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField
              label="Media Type"
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
              label="Gallery Category"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField
              label="Alt Text (Accessibility)"
              {...register('altText')}
              error={errors.altText}
              placeholder="Describe the image for screen readers"
            />
            <FormField
              label="Photographer / Credits"
              {...register('credits')}
              error={errors.credits}
              placeholder="e.g. Photo by BFCN Media Team"
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
              icon={Upload}
              fullWidth
            >
              {isEditing ? 'Update Media' : 'Upload Media'}
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center leading-relaxed">
            Accepted: direct image URLs (JPG/PNG/WebP), YouTube/Vimeo video links, and PDFs.
          </p>
        </form>
      )}
    </div>
  );
};

export default MediaForm;
