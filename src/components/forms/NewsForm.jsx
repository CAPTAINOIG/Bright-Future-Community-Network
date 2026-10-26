import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle2, X, FileText, Calendar, Image, User, Tag, Bookmark } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { Button, FormField } from '../ui';
import { useCreateNews, useUpdateNews } from '../../api/news';

const NewsForm = ({ article, onClose, onSubmitted }) => {
  const [submitted, setSubmitted] = useState(false);
  const isEditing = Boolean(article);

  const { mutateAsync: createNews, isPending: isCreating } = useCreateNews();
  const { mutateAsync: updateNews, isPending: isUpdating } = useUpdateNews();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: article?.title ?? '',
      summary: article?.summary ?? '',
      content: article?.content ?? '',
      category: article?.category ?? 'general',
      author: article?.author ?? '',
      imageUrl: article?.imageUrl ?? '',
      status: article?.status ?? 'pending',
      publishedAt: article?.publishedAt ? new Date(article.publishedAt).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
    },
  });

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        await updateNews({
          id: article._id,
          data: {
            status: data.status,
            category: data.category,
            imageUrl: data.imageUrl,
            author: data.author,
            // Backend handles title, summary, content differently for admin
          },
        });
        toast.success('Article updated successfully!');
      } else {
        await createNews({
          title: data.title,
          summary: data.summary,
          content: data.content,
          category: data.category,
          author: data.author,
          imageUrl: data.imageUrl,
          status: data.status,
          publishedAt: new Date(data.publishedAt).toISOString(),
        });
        toast.success('Article created successfully!');
      }
      setSubmitted(true);
      setTimeout(() => {
        onSubmitted?.();
      }, 500);
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(error.response?.data?.message || error?.message || 'Something went wrong. Please try again.');
    }
  };

  const handleSubmitAnother = () => {
    setSubmitted(false);
    reset({
      title: '', summary: '', content: '', category: 'general',
      author: '', imageUrl: '', status: 'pending', publishedAt: new Date().toISOString().slice(0, 10),
    });
  };

  const handleCancel = () => {
    reset();
    onClose?.();
  };

  return (
    <div>
      <Toaster position="top-right" />
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
              : `Great! Your article has been saved${'pending' === 'pending' ? ' and is pending review' : ' and published'}.`}
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
                  <p className="m-0 mt-0.5 text-xs text-gray-500">Editing article · {article.status ?? 'pending'}</p>
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
          />

          <FormField
            label="Summary"
            type="textarea"
            required
            {...register('summary', {
              required: 'Summary is required',
              maxLength: { value: 300, message: 'Keep it under 300 characters' },
            })}
            error={errors.summary}
            placeholder="Short summary shown on cards (1-2 sentences)"
            rows={2}
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
            >
              <option value="general">General</option>
              <option value="politics">Politics</option>
              <option value="education">Education</option>
              <option value="community">Community</option>
              <option value="youth">Youth</option>
              <option value="health">Health</option>
              <option value="sports">Sports</option>
              <option value="technology">Technology</option>
              <option value="business">Business</option>
              <option value="entertainment">Entertainment</option>
              <option value="security">Security</option>
              <option value="environment">Environment</option>
              <option value="agriculture">Agriculture</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="religion">Religion</option>
              <option value="opinion">Opinion</option>
            </FormField>

            <FormField
              label="Status"
              type="select"
              required
              {...register('status', { required: 'Status is required' })}
              error={errors.status}
            >
              <option value="pending">Pending</option>
              <option value="published">Published</option>
              <option value="rejected">Rejected</option>
              <option value="archived">Archived</option>
            </FormField>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormField
              label="Author"
              required
              {...register('author', { required: 'Author name is required' })}
              error={errors.author}
              placeholder="Author name"
            />

            <FormField
              label="Publish date"
              type="date"
              required
              {...register('publishedAt', { required: 'Publish date is required' })}
              error={errors.publishedAt}
            />
          </div>

          <FormField
            label="Cover image URL"
            {...register('imageUrl')}
            error={errors.imageUrl}
            placeholder="https://images.unsplash.com/..."
          />

          <div className="flex flex-col items-stretch gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleCancel}
              icon={X}
              disabled={isCreating || isUpdating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon={FileText}
              loading={isCreating || isUpdating}
              disabled={isCreating || isUpdating}
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
