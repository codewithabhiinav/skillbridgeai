type CoderCreditVariant = 'footer' | 'inline' | 'fixed' | 'sidebar';

interface CoderCreditProps {
  variant?: CoderCreditVariant;
}

const CREDIT_TEXT = 'Coded by Abhinav';

export default function CoderCredit({ variant = 'inline' }: CoderCreditProps) {
  if (variant === 'fixed') {
    return (
      <div className="coder-watermark-fixed" aria-hidden="true">
        {CREDIT_TEXT}
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <footer className="app-footer">
        <div className="app-footer-inner">
          <span className="app-footer-brand">
            SKILL<span>BRIDGE</span> AI
          </span>
          <span className="app-footer-divider">·</span>
          <span className="app-footer-sih">SIH26044 · Smart India Hackathon 2026</span>
          <span className="app-footer-divider">·</span>
          <span className="app-footer-credit">{CREDIT_TEXT}</span>
        </div>
      </footer>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className="coder-credit-sidebar">
        <span>{CREDIT_TEXT}</span>
      </div>
    );
  }

  return <span className="coder-credit-inline">{CREDIT_TEXT}</span>;
}

export { CREDIT_TEXT };
