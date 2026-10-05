import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '../ui';
import { toast } from 'sonner';

export default function ContactForm({ onClose }) {
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
    `w-full py-3 px-4 border ${
      errors[field] ? 'border-red-500' : 'border-gray-200'
    } rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:border-green-600 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.12)] transition-all placeholder:text-gray-400`;

  return (
    <div>
      <div className="text-center mb-6">
        <Send size={24} className="text-green-600 mx-auto mb-3" />
        <h3 className="text-lg font-semibold mb-2">Send Us a Message</h3>
        <p className="text-sm text-gray-600">Fill out the form and we'll respond as soon as possible.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Full Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              className={inputClass('name')}
            />
            {errors.name && (
              <span className="text-sm text-red-600 mt-1 block">{errors.name}</span>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Email *</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={inputClass('email')}
            />
            {errors.email && (
              <span className="text-sm text-red-600 mt-1 block">{errors.email}</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+234..."
              className={inputClass('phone')}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Subject *</label>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="How can we help?"
              className={inputClass('subject')}
            />
            {errors.subject && (
              <span className="text-sm text-red-600 mt-1 block">{errors.subject}</span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Message *</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us more..."
            rows={5}
            className={`${inputClass('message')} resize-y min-h-[120px]`}
          />
          {errors.message && (
            <span className="text-sm text-red-600 mt-1 block">{errors.message}</span>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
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