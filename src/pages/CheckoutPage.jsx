import { useState } from 'react';
import Button from '../components/Button';
import TopBar from '../components/TopBar';
import { formatPrice } from '../data/courses';

const supportEmail = 'monsterbaxy@gmail.com';

export default function CheckoutPage({ course, back, pay }) {
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!course) return null;

  const emailRequired = course.price >= 1500;

  const submit = async () => {
    const trimmedEmail = recoveryEmail.trim();
    setEmailError('');
    setSubmitError('');

    if (emailRequired && !trimmedEmail) {
      setEmailError('This course requires an order recovery email for order lookup and after-sales support.');
      return;
    }

    try {
      setIsSubmitting(true);
      await pay(trimmedEmail);
    } catch (error) {
      if (error.message === 'RECOVERY_EMAIL_REQUIRED') {
        setEmailError('This course requires an order recovery email.');
      } else {
        setSubmitError('Payment simulation failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <TopBar title="Confirm Order" canBack onBack={back} />
      <main className="mx-auto min-h-screen max-w-md bg-slate-50 px-4 pb-24 pt-4">
        <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <div className="flex gap-3">
            <img src={course.cover} alt="" className="h-20 w-20 rounded-2xl object-cover" />
            <div className="min-w-0 flex-1">
              <div className="font-black text-slate-950">{course.title}</div>
              <div className="mt-1 text-sm text-slate-500">{course.subtitle}</div>
              <div className="mt-2 text-xl font-black text-rose-500">{formatPrice(course.price)}</div>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-black text-slate-950">Order Recovery Email</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Email is used only for order recovery, after-sales notices, and delivery exception handling.
          </p>
          <input
            value={recoveryEmail}
            onChange={(event) => setRecoveryEmail(event.target.value)}
            className="mt-4 h-12 w-full rounded-2xl bg-slate-50 px-4 text-sm outline-none"
            placeholder={emailRequired ? 'Required for this course' : 'Optional'}
          />
          {emailError && <div className="mt-3 rounded-2xl bg-rose-50 p-3 text-sm text-rose-600">{emailError}</div>}
        </section>

        <section className="mt-4 rounded-3xl bg-white p-4 text-sm leading-6 text-slate-600 shadow-sm ring-1 ring-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Delivery</span>
            <span className="font-bold">Digital delivery after payment</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-slate-500">Support Email</span>
            <span className="font-bold">{supportEmail}</span>
          </div>
          <div className="mt-4 rounded-2xl bg-amber-50 p-3 text-amber-800">
            Registration-free purchase does not mean anonymous trading. The platform keeps order number, payment status,
            delivery record, and necessary risk-control logs for after-sales verification, dispute handling, and payment
            compliance review.
          </div>
        </section>

        {submitError && <div className="mt-4 rounded-2xl bg-rose-50 p-3 text-sm text-rose-600">{submitError}</div>}

        <Button onClick={submit} className="mt-6 w-full text-base" disabled={isSubmitting}>
          {isSubmitting ? 'Processing' : 'Pay Now'}
        </Button>
      </main>
    </>
  );
}
