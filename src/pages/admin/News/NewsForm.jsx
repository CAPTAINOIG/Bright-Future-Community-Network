import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle2, X, Plus, FileText, Calendar, Image, User, Tag, Bookmark } from 'lucide-react';
import { FormField, toast, Button } from '../../../components/ui';

const NewsForm = ({ article, onClose, onSubmitted }) => {
  const [submitted, setSubmitted] = useState(false);
  const isEditing = Boolean(article);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: article?.title ?? '',
      excerpt: article?.excerpt ?? '',
      content: article?.content ?? '',
      category: article?.category ?? 'Community News',
      author: article?.author ?? '',
      coverImage: article?.coverImage ?? '',
      status: article?.status ?? 'Draft',
      publishedDate: article?.publishedDate ?? new Date().toISOString().slice(0, 10),
    },
  });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (isEditing) {
        toast.success('Article updated successfully!');
      } else {
        toast.success('Article created successfully!');
      }
      setSubmitted(true);
      onSubmitted?.({ article, ...data });
    } catch (error) {
      toast.error(error?.message || 'Something went wrong. Please try again.');
    }
  };

  const handleSubmitAnother = () => {
    setSubmitted(false);
    reset({
      title: '', excerpt: '', content: '', category: 'Community News',
      author: '', coverImage: '', status: 'Draft', publishedDate: new Date().toISOString().slice(0, 10),
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
            {isEditing ? 'Article updated!' : 'Article created successfully!'}
          </h3>
          <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-gray-500">
            {isEditing
              ? `"${article?.title ?? 'This article'}" has been updated.`
              : `Great! Your article has been saved${'Draft' === 'Draft' && article?.status !== 'Published' ? ' as a draft' : ' and published'}.`}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="outline" size="lg" onClick={handleCancel} icon={X}>
              Back to articles
            </Button>
            {!isEditing && (
              <Button variant="primary" size="lg" onClick={handleSubmitAnother} icon={FileText}>
                Write another article
              </Button>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 py-2">
          {isEditing && article && (
            <div className="mb-1 space-y-1.5 rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-50 text-sm font-semibold text-primary-700">
                  {(article?.title ?? '??').split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h4 className="m-0 truncate text-[15px] font-semibold leading-tight text-gray-900">
                    {article.title}
                  </h4>
                  <p className="m-0 mt-0.5 text-xs text-gray-500">Editing article · {article.status ?? 'Draft'}</p>
                </div>
              </div>
            </div>
          )}

          <FormField
            label="Article title"
            required
            {...register('title', {
              required: 'Title is required',
              minLength: { value: 5, message: 'Title must be at least 5 characters' },
            })}
            error={errors.title}
            placeholder="Write a compelling headline"
            icon={FileText}
          />

          <FormField
            label="Excerpt"
            type="textarea"
            required
            {...register('excerpt', {
              required: 'Excerpt is required',
              maxLength: { value: 220, message: 'Keep it under 220 characters' },
            })}
            error={errors.excerpt}
            placeholder="Short summary shown on cards (1-2 sentences)"
            rows={2}
            help="Max 220 characters"
          />

          <FormField
            label="Article content"
            type="textarea"
            required
            {...register('content', {
              required: 'Article content is required',
              minLength: { value: 50, message: 'Content must be at least 50 characters' },
            })}
            error={errors.content}
            placeholder="Write the full article content here..."
            rows={7}
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormField
              label="Category"
              type="select"
              required
              {...register('category', { required: 'Category is required' })}
              error={errors.category}
              icon={Tag}
            >
              <option value="Community News">Community News</option>
              <option value="Announcement">Announcement</option>
              <option value="Event Recap">Event Recap</option>
              <option value="Success Story">Success Story</option>
              <option value="Press Release">Press Release</option>
              <option value="Opinion">Opinion / Editorial</option>
              <option value="Partnership">Partnership</option>
            </FormField>

            <FormField
              label="Status"
              type="select"
              required
              {...register('status', { required: 'Status is required' })}
              error={errors.status}
              icon={Bookmark}
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Archived">Archived</option>
            </FormField>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormField
              label="Author"
              required
              {...register('author', { required: 'Author name is required' })}
              error={errors.author}
              placeholder="Author name"
              icon={User}
            />

            <FormField
              label="Publish date"
              type="date"
              required
              {...register('publishedDate', { required: 'Publish date is required' })}
              error={errors.publishedDate}
              icon={Calendar}
            />
          </div>

          <FormField
            label="Cover image URL"
            {...register('coverImage')}
            error={errors.coverImage}
            placeholder="https://images.unsplash.com/..."
            icon={Image}
          />

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
              icon={FileText}
              fullWidth
            >
              {isEditing ? 'Update article' : 'Create article'}
            </Button>
          </div>
          <p className="mt-2 text-center text-xs leading-relaxed text-gray-500">
            Published articles appear on the News page for the public.
          </p>
        </form>
      )}
    </div>
  );
};

export default NewsForm;
