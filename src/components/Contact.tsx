import { useEffect, useRef, useState, FormEvent } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FormData {
  name: string;
  email: string;
  businessName: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    businessName: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
        return undefined;
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const isFormValid = (): boolean => {
    const requiredFields = ['name', 'email', 'message'];
    return requiredFields.every(field => {
      const value = formData[field as keyof FormData];
      return value.trim() !== '' && !validateField(field, value);
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);

    const newErrors: FormErrors = {};
    ['name', 'email', 'message'].forEach(field => {
      const error = validateField(field, formData[field as keyof FormData]);
      if (error) newErrors[field as keyof FormErrors] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const submissionData = {
        name: formData.name,
        email: formData.email,
        company: formData.businessName || null,
        message: formData.message,
      };

      const { error } = await supabase
        .from('contact_submissions')
        .insert([submissionData]);

      if (error) throw error;

      await fetch('https://hook.eu2.make.com/ms39eo4m55kgmvri03nb318w3xtjks24', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      setSubmitStatus('success');
      setFormData({ name: '', email: '', businessName: '', message: '' });
      setTouched({});
      setErrors({});

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 py-16 lg:py-20"
    >
      <div className="max-w-2xl mx-auto w-full">
        <div
          className={`text-center mb-10 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-4">
            Have Questions?
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Send us a message and we'll get back to you soon.
          </p>
        </div>

        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name <span className="text-accent-teal">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/5 border ${
                    touched.name && errors.name
                      ? 'border-red-500'
                      : 'border-white/10'
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-teal focus:ring-1 focus:ring-accent-teal transition-all duration-300`}
                  placeholder="John Doe"
                />
                {touched.name && errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email <span className="text-accent-teal">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/5 border ${
                    touched.email && errors.email
                      ? 'border-red-500'
                      : 'border-white/10'
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-teal focus:ring-1 focus:ring-accent-teal transition-all duration-300`}
                  placeholder="john@example.com"
                />
                {touched.email && errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-300 mb-2">
                  Business Name (Optional)
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-teal focus:ring-1 focus:ring-accent-teal transition-all duration-300"
                  placeholder="Acme Inc."
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message <span className="text-accent-teal">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-3 bg-white/5 border ${
                  touched.message && errors.message
                    ? 'border-red-500'
                    : 'border-white/10'
                } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-teal focus:ring-1 focus:ring-accent-teal transition-all duration-300 resize-none`}
                placeholder="Tell us about your questions or needs..."
              />
              {touched.message && errors.message && (
                <p className="mt-1 text-sm text-red-400">{errors.message}</p>
              )}
            </div>

            <div className="flex flex-col items-center justify-center pt-2 gap-3">
              <button
                type="submit"
                disabled={isSubmitting || !isFormValid()}
                className={`group relative flex items-center gap-3 px-8 py-3 rounded-lg font-medium transition-all duration-300 overflow-hidden ${
                  isSubmitting || !isFormValid()
                    ? 'bg-white/10 text-gray-500 cursor-not-allowed border border-white/20'
                    : 'bg-accent-green text-white hover:scale-105 hover-gradient-btn hover:shadow-lg hover:shadow-accent-green/30'
                }`}
              >
                <span className="relative">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </span>
                {!isSubmitting && (
                  <Send className={`relative w-5 h-5 transition-transform duration-300 ${
                    !isFormValid() ? '' : 'group-hover:translate-x-1'
                  }`} />
                )}
                {isSubmitting && (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
              </button>
            </div>

            {submitStatus === 'success' && (
              <div className="flex items-center justify-center gap-2 p-4 bg-accent-green/10 border border-accent-green/30 rounded-lg animate-fade-in">
                <CheckCircle className="w-5 h-5 text-accent-green" />
                <p className="text-accent-green font-medium">
                  Thank you! We'll be in touch soon.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="flex items-center justify-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-lg animate-fade-in">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-400 font-medium">
                  Something went wrong. Please try again.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
