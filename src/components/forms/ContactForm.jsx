import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '../ui';
import { toast } from 'sonner';
import { X } from 'lucide-react';

const labelClass = 'block text-sm font-semibold text-gray-800 mb-2';
const errorClass = 'text-[13px] text-red-600 mt-1.5 block';
const Req = () => <span className="text-red-600 ml-0.5" aria-hidden="true">*</span>;

const ContactForm = ({ onClose }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll respond within 24-48 hours.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const handleChange = (ev) => {
    setForm({ ...form, [ev.target.name]: ev.target.value });
    if (errors[ev.target.name]) {
      setErrors({ ...errors, [ev.target.name]: '' });
    }
  };

  const inputClass = (field) =>
    `w-full h-12 px-4 rounded-xl border ${
      errors[field] ? 'border-red-400' : 'border-gray-300'
    } bg-white text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary-600 focus:shadow-[0_0_0_4px_rgba(23,96,63,0.12)] transition`;

  const textareaClass = (field) =>
    `w-full min-h-[140px] px-4 py-3 rounded-xl border ${
      errors[field] ? 'border-red-400' : 'border-gray-300'
    } bg-white text-[15px] leading-relaxed text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary-600 focus:shadow-[0_0_0_4px_rgba(23,96,63,0.12)] transition resize-y`;

  return (
    <div>
      <div className="flex items-start gap-4 mb-8">
        <span className="grid place-items-center w-12 h-12 rounded-full bg-primary-50 text-primary-700 shrink-0" aria-hidden="true">
          <Send size={20} strokeWidth={1.75} />
        </span>
        <div>
          <h3 className="font-serif text-xl text-gray-900 mb-1 leading-snug">Send Us a Message</h3>
          <p className="text-sm text-gray-600 m-0">Fill out the form and we'll respond as soon as possible.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="contact-name" className={labelClass}>Full Name <Req /></label>
            <input
              id="contact-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              autoComplete="name"
              aria-invalid={!!errors.name}
              className={inputClass('name')}
            />
            {errors.name && (
              <span className={errorClass} role="alert">{errors.name}</span>
            )}
          </div>

          <div>
            <label htmlFor="contact-email" className={labelClass}>Email <Req /></label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              autoComplete="email"
              aria-invalid={!!errors.email}
              className={inputClass('email')}
            />
            {errors.email && (
              <span className={errorClass} role="alert">{errors.email}</span>
            )}
          </div>

          <div>
            <label htmlFor="contact-phone" className={labelClass}>Phone</label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+234..."
              autoComplete="tel"
              className={inputClass('phone')}
            />
          </div>

          <div>
            <label htmlFor="contact-subject" className={labelClass}>Subject <Req /></label>
            <input
              id="contact-subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="How can we help?"
              aria-invalid={!!errors.subject}
              className={inputClass('subject')}
            />
            {errors.subject && (
              <span className={errorClass} role="alert">{errors.subject}</span>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className={labelClass}>Message <Req /></label>
          <textarea
            id="contact-message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us more..."
            rows={5}
            aria-invalid={!!errors.message}
            className={textareaClass('message')}
          />
          {errors.message && (
            <span className={errorClass} role="alert">{errors.message}</span>
          )}
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 mt-3 border-t border-gray-200">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            icon={X}
            fullWidth
            size='lg'
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            fullWidth
            icon={Send}
            size='lg'
          >
            Send Message
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
