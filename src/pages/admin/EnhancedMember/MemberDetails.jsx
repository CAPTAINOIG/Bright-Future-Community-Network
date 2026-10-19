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

const InfoCard = ({ icon: Icon, label, value, accent, bg }) => (
  <div className="flex items-start gap-3 rounded-2xl border border-[#eef1ec] bg-white px-4 py-3.5 transition-shadow hover:shadow-[0_10px_30px_-18px_rgba(20,40,28,0.35)]">
    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${bg} ${accent}`}>
      <Icon size={16} />
    </span>
    <div className="min-w-0">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#91a097]">{label}</p>
      <p className="mt-0.5 truncate text-sm font-medium text-[#17231d]" title={value || ''}>
        {value || '—'}
      </p>
    </div>
  </div>
);

const MemberDetails = ({ member, onEdit, onClose }) => {
  if (!member) return null;
  
  const isActive = member.isActive === true;
  const interests = Array.isArray(member.interests) ? member.interests : [];
  const memberId = (member._id ?? '').toString().slice(-6).toUpperCase();
  const joined = member.createdAt ? new Date(member.createdAt).toLocaleDateString(undefined, {
  year: 'numeric', month: 'long', day: 'numeric'}): '—';

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-[24px] bg-[#14251d] px-6 py-6 text-white">
        <div className="absolute -right-10 -top-14 h-40 w-40 rounded-full border-[20px] border-[#e9b949]/15" />
        <div className="absolute -bottom-16 right-16 h-32 w-32 rounded-full border border-white/10" />
        <div className="relative flex items-center gap-4">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[#e9b949] text-xl font-black text-[#14251d] shadow-[0_14px_34px_-14px_rgba(233,185,73,0.85)]">
            {initialsOf(member.fullName)}
          </div>
          <div className="min-w-0">
            <h3 className="truncate font-serif text-2xl font-bold leading-tight">
              {member.fullName || 'Unknown member'}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  isActive ? 'bg-[#d9ece0] text-[#1f5133]' : 'bg-white/12 text-white/70'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-[#2f7d4f]' : 'bg-white/50'}`}
                />
                {isActive ? 'Active member' : 'Inactive'}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/70">
                <Hash size={12} /> {memberId}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <InfoCard icon={Mail} label="Email" value={member.email} accent="text-[#427456]" bg="bg-[#edf3eb]" />
        <InfoCard icon={Phone} label="Phone" value={member.phone} accent="text-[#427456]" bg="bg-[#edf3eb]" />
        <InfoCard icon={MapPin} label="Location" value={member.location} accent="text-[#a27058]" bg="bg-[#f4e3d8]" />
        <InfoCard icon={Users} label="Community" value={member.community} accent="text-[#6487a0]" bg="bg-[#dfeaf0]" />
        <InfoCard icon={Sparkles} label="Skill" value={member.skill} accent="text-[#a27018]" bg="bg-[#f7e8bd]" />
        <InfoCard icon={CalendarDays} label="Joined" value={joined} accent="text-[#427456]" bg="bg-[#edf3eb]" />
      </div>

      <div className="rounded-2xl border border-[#eef1ec] bg-white px-4 py-4">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#91a097]">
          Areas of interest
        </p>
        {interests.length ? (
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full border border-[#d5e6da] bg-[#edf6f0] px-3 py-1 text-xs font-medium text-[#2f6b47]"
              >
                {interest}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#91a097]">—</p>
        )}
      </div>

      <div className="rounded-2xl border border-[#eef1ec] bg-[#fffdf8] px-4 py-4">
        <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#91a097]">
          <Quote size={13} /> Why they joined
        </p>
        <p className="text-sm leading-relaxed text-[#34443a]">{member.reason || '—'}</p>
      </div>

      <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row">
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
