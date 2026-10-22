import {
  CalendarDays,
  Hash,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Quote,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { Button } from '../../../components/ui';
import { initialsOf } from './utilsMember';
import { DetailItem, SectionLabel, pillClass } from '../components/AdminUI';

const MemberDetails = ({ member, onEdit, onClose }) => {
  if (!member) return null;
  
  const isActive = member.isActive === true;
  const interests = Array.isArray(member.interests) ? member.interests : [];
  const memberId = (member._id ?? '').toString().slice(-6).toUpperCase();
  const joined = member.createdAt ? new Date(member.createdAt).toLocaleDateString(undefined, {
  year: 'numeric', month: 'long', day: 'numeric'}): '—';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary-50 text-lg font-semibold text-primary-700">
          {initialsOf(member.fullName)}
        </div>
        <div className="min-w-0">
          <h3 className="m-0 truncate font-serif text-2xl leading-tight text-gray-900">
            {member.fullName || 'Unknown member'}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className={pillClass(isActive ? 'success' : 'neutral')}>
              <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-primary-600' : 'bg-gray-400'}`} />
              {isActive ? 'Active member' : 'Inactive'}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium tabular-nums text-gray-500">
              <Hash size={12} /> {memberId}
            </span>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <SectionLabel>Profile</SectionLabel>
        <dl className="m-0 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <DetailItem icon={Mail} label="Email" value={member.email} />
          <DetailItem icon={Phone} label="Phone" value={member.phone} />
          <DetailItem icon={MapPin} label="Location" value={member.location} />
          <DetailItem icon={Users} label="Community" value={member.community} />
          <DetailItem icon={Sparkles} label="Skill" value={member.skill} />
          <DetailItem icon={CalendarDays} label="Joined" value={joined} />
        </dl>
      </section>

      <section className="space-y-3">
        <SectionLabel>Areas of interest</SectionLabel>
        {interests.length ? (
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <span key={interest} className={pillClass('success')}>
                {interest}
              </span>
            ))}
          </div>
        ) : (
          <p className="m-0 text-sm text-gray-400">—</p>
        )}
      </section>

      <section className="space-y-3">
        <SectionLabel className="flex items-center gap-2"><Quote size={13} /> Why they joined</SectionLabel>
        <p className="m-0 rounded-xl bg-gray-50 px-4 py-3 text-[15px] leading-relaxed text-gray-700">{member.reason || '—'}</p>
      </section>

      <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row">
        <Button type="button" variant="outline" size="lg" onClick={onClose} icon={X} fullWidth>
          Close
        </Button>
        <Button type="button" variant="primary" size="lg" icon={Pencil} onClick={onEdit} fullWidth>
          Edit member
        </Button>
      </div>
    </div>
  );
};

export default MemberDetails;
