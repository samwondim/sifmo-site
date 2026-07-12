export function ProcessSteps() {
  const steps = ['Submit Specs', 'We Review & Quote', 'Artwork & Proof', 'Production', 'Quality Check', 'Delivery']

  return (
    <div className="mt-14">
      <h3 className="text-xl font-bold text-center mb-8">How It Works</h3>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 sm:justify-between max-w-4xl mx-auto">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-2 sm:flex-col sm:text-center">
            <div className="w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
              {i + 1}
            </div>
            <span className="text-sm font-medium text-ink-light">{step}</span>
            {i < steps.length - 1 && (
              <div className="hidden sm:block w-8 h-px bg-primary/30" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
