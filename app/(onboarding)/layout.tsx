export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-[20%] -right-[10%] h-[600px] w-[600px] rounded-full bg-brand/5 blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>
      {children}
    </div>
  );
}
