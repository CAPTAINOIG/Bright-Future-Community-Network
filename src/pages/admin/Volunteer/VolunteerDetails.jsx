import {
  Briefcase,
  CalendarDays,
  Clock,
  Hash,
  Mail,
  Pencil,
  Phone,
  Quote,
  Users,
  X,
} from 'lucide-react';
import { Button } from '../../../components/ui';
import { initialsOf } from './utilsVolunteer';
import { DetailItem, SectionLabel, pillClass } from '../components/AdminUI';

const VolunteerDetails = ({ volunteer, onEdit, onClose }) => {
  if (!volunteer) return null;
  
  const isActive = volunteer.isActive === true;
  const skills = Array.isArray(volunteer.skills) ? volunteer.skills : [];
  const volunteerId = (volunteer._id ?? '').toString().slice(-6).toUpperCase();
  const joined = volunteer.createdAt ? new Date(volunteer.createdAt).toLocaleDateString(undefined, {
  year: 'numeric', month: 'long', day: 'numeric'}): '—';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary-50 text-lg font-semibold text-primary-700">
          {initialsOf(volunteer.fullName)}
        </div>
        <div className="min-w-0">
          <h3 className="m-0 truncate font-serif text-2xl leading-tight text-gray-900">
            {volunteer.fullName || 'Unknown volunteer'}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className={pillClass(isActive ? 'success' : 'neutral')}>
              <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-primary-600' : 'bg-gray-400'}`} />
              {isActive ? 'Active volunteer' : 'Inactive'}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium tabular-nums text-gray-500">
              <Hash size={12} /> {volunteerId}
            </span>
          </div>
        </div>
      </div>
      <section className="space-y-4">
        <SectionLabel>Profile</SectionLabel>
        <dl className="m-0 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <DetailItem icon={Mail} label="Email" value={volunteer.email} />
          <DetailItem icon={Phone} label="Phone" value={volunteer.phone} />
          <DetailItem icon={Clock} label="Availability" value={volunteer.availability} />
          <DetailItem icon={Users} label="Community" value={volunteer.community} />
          <DetailItem icon={Briefcase} label="Experience" value={volunteer.experience} />
          <DetailItem icon={CalendarDays} label="Joined" value={joined} />
        </dl>
      </section>
      <section className="space-y-3">
        <SectionLabel>Areas of interest</SectionLabel>
        {skills.length ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className={pillClass('success')}>
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="m-0 text-sm text-gray-400">—</p>
        )}
      </section>
      <section className="space-y-3">
        <SectionLabel className="flex items-center gap-2"><Quote size={13} /> Why they volunteer</SectionLabel>
        <p className={`m-0 rounded-xl bg-gray-50 px-4 py-3 text-[15px] leading-relaxed ${volunteer.reason ? 'text-gray-700' : 'text-gray-400'}`}>
          {volunteer.reason || 'Motivation not provided yet.'}
        </p>
      </section>
      <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row">
        <Button type="button" variant="outline" size="lg" onClick={onClose} icon={X} fullWidth>
          Close
        </Button>
        <Button type="button" variant="primary" size="lg" icon={Pencil} onClick={onEdit} fullWidth>
          Edit volunteer
        </Button>
      </div>
    </div>
  );
};

export default VolunteerDetails;
