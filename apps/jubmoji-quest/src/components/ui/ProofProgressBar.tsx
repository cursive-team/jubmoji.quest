export interface ProofProgressBarProps {
  displayText: string;
  progressPercentage: number;
}

export default function ProofProgressBar({
  displayText,
  progressPercentage,
}: ProofProgressBarProps) {
  return (
    <div className="flex justify-center items-center gap-2 self-stretch">
      <span className="font-bold font-hind-siliguri text-shark-600 text-[13px] leading-[120%]">
        {displayText}
      </span>
      <div className="flex items-center self-stretch border border-shark-400 w-full">
        <div
          className={`h-full bg-shark-400`}
          style={{
            width: `${progressPercentage}%`,
          }}
        />
      </div>
    </div>
  );
}
