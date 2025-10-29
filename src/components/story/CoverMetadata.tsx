'use client';

interface CoverMetadataProps {
  creatorDisplayName?: string;
  audienceChildren?: string[];
  formattedDate: string | null;
  totalPages: number;
  onStartReading: () => void;
}

export function CoverMetadata({
  creatorDisplayName,
  audienceChildren,
  formattedDate,
  totalPages,
  onStartReading,
}: CoverMetadataProps) {
  const formatNamesList = (names: string[]) => {
    if (names.length === 0) return '';
    if (names.length === 1) return names[0];
    if (names.length === 2) return `${names[0]} and ${names[1]}`;
    return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
  };

  const getFirstName = (displayName: string) => {
    return displayName.split(' ')[0];
  };

  return (
    <div className="landscape:w-1/2 landscape:flex landscape:flex-col landscape:justify-center text-center space-y-3">
      {(creatorDisplayName || formattedDate) && (
        <div className="space-y-1">
          {creatorDisplayName && (
            <p className="text-lg text-white/80 font-accent">
              Created in the DreamWeaver app by{' '}
              {(() => {
                const names = [getFirstName(creatorDisplayName)];
                if (audienceChildren && audienceChildren.length > 0) {
                  names.push(...audienceChildren);
                }
                return formatNamesList(names);
              })()}
            </p>
          )}
          {formattedDate && (
            <p className="text-base text-white/60 font-accent">
              {formattedDate}
            </p>
          )}
        </div>
      )}

      <p className="text-white/70 font-accent">
        {totalPages} {totalPages === 1 ? 'page' : 'pages'}
      </p>

      <button
        onClick={onStartReading}
        className="w-full max-w-[240px] mx-auto block bg-[#D4AF37] hover:bg-[#fcd34d] text-[#0f1129] font-bold py-4 px-8 rounded-[25px] transition-all duration-200 shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.6)] font-accent"
      >
        Start reading
      </button>
    </div>
  );
}
