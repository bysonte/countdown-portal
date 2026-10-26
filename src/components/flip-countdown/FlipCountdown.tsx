import { useEffect, useMemo, useRef, useState } from 'react';
import './FlipCountdown.css';

type CountdownUnit = {
  key: 'days' | 'hours' | 'minutes' | 'seconds';
  label: string;
  value: number;
  minDigits: number;
};

type FlipCountdownProps = {
  targetDate: Date;
  className?: string;
  labels?: Partial<Record<CountdownUnit['key'], string>>;
  daysMinDigits?: number;
  onComplete?: () => void;
};

const SECOND_MS = 1000;
const MINUTE_MS = 60 * SECOND_MS;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

function getRemaining(targetDate: Date) {
  const distance = Math.max(targetDate.getTime() - Date.now(), 0);

  return {
    total: distance,
    days: Math.floor(distance / DAY_MS),
    hours: Math.floor((distance % DAY_MS) / HOUR_MS),
    minutes: Math.floor((distance % HOUR_MS) / MINUTE_MS),
    seconds: Math.floor((distance % MINUTE_MS) / SECOND_MS),
  };
}

function splitDigits(value: number, minDigits: number) {
  return String(value).padStart(minDigits, '0').split('');
}

function FlipDigit({ value }: { value: string }) {
  const [flipState, setFlipState] = useState({
    currentValue: value,
    previousValue: value,
    isFlipping: false,
    sequence: 0,
  });
  const lastValueRef = useRef(value);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (value === lastValueRef.current) {
      return undefined;
    }

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    const previousValue = lastValueRef.current;
    lastValueRef.current = value;

    setFlipState((state) => ({
      currentValue: value,
      previousValue,
      isFlipping: true,
      sequence: state.sequence + 1,
    }));

    timeoutRef.current = window.setTimeout(() => {
      setFlipState((state) => ({
        ...state,
        isFlipping: false,
      }));
      timeoutRef.current = null;
    }, 300);

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [value]);

  const { currentValue, previousValue, isFlipping, sequence } = flipState;

  return (
    <div className={`flip-digit ${isFlipping ? 'is-flipping' : ''}`} aria-hidden="true">
      <div className="flip-digit-card flip-digit-card--current">
        <div className="flip-digit-half flip-digit-half--up">
          <div className="flip-digit-shadow" />
          <div className="flip-digit-inner">{currentValue}</div>
        </div>
        <div className="flip-digit-half flip-digit-half--down">
          <div className="flip-digit-shadow" />
          <div className="flip-digit-inner">{currentValue}</div>
        </div>
      </div>

      {isFlipping && (
        <div className="flip-digit-animation" key={sequence}>
          <div className="flip-digit-half flip-digit-half--previous-up">
            <div className="flip-digit-shadow" />
            <div className="flip-digit-inner">{previousValue}</div>
          </div>

          <div className="flip-digit-half flip-digit-half--previous-down">
            <div className="flip-digit-shadow" />
            <div className="flip-digit-inner">{previousValue}</div>
          </div>

          <div className="flip-digit-half flip-digit-half--next-down">
            <div className="flip-digit-shadow" />
            <div className="flip-digit-inner">{currentValue}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function FlipUnit({ unit }: { unit: CountdownUnit }) {
  const digits = splitDigits(unit.value, unit.minDigits);

  return (
    <div className={`flip-unit flip-unit--${unit.key}`} aria-label={`${unit.value} ${unit.label}`}>
      <div className="flip-unit-digits" aria-hidden="true">
        {digits.map((digit, index) => (
          <FlipDigit key={`${unit.key}-${index}`} value={digit} />
        ))}
      </div>
      <span className="flip-unit-label">{unit.label}</span>
    </div>
  );
}

export function FlipCountdown({
  targetDate,
  className = '',
  labels,
  daysMinDigits = 3,
  onComplete,
}: FlipCountdownProps) {
  const [remaining, setRemaining] = useState(() => getRemaining(targetDate));
  const completedRef = useRef(targetDate.getTime() <= Date.now());
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    completedRef.current = targetDate.getTime() <= Date.now();

    const tick = () => {
      const nextRemaining = getRemaining(targetDate);
      setRemaining(nextRemaining);

      if (nextRemaining.total === 0 && !completedRef.current) {
        completedRef.current = true;
        onCompleteRef.current?.();
      }
    };

    tick();
    const intervalId = window.setInterval(tick, SECOND_MS);

    return () => window.clearInterval(intervalId);
  }, [targetDate]);

  const units = useMemo<CountdownUnit[]>(
    () => [
      {
        key: 'days',
        label: labels?.days ?? 'Días',
        value: remaining.days,
        minDigits: Math.max(daysMinDigits, String(remaining.days).length),
      },
      { key: 'hours', label: labels?.hours ?? 'Horas', value: remaining.hours, minDigits: 2 },
      { key: 'minutes', label: labels?.minutes ?? 'Minutos', value: remaining.minutes, minDigits: 2 },
      { key: 'seconds', label: labels?.seconds ?? 'Segundos', value: remaining.seconds, minDigits: 2 },
    ],
    [daysMinDigits, labels?.days, labels?.hours, labels?.minutes, labels?.seconds, remaining]
  );

  return (
    <div
      className={`flip-countdown ${className}`.trim()}
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`${remaining.days} días, ${remaining.hours} horas, ${remaining.minutes} minutos, ${remaining.seconds} segundos`}
    >
      <div className="flip-countdown-row flip-countdown-row--days">
        <FlipUnit unit={units[0]} />
      </div>

      <div className="flip-countdown-row flip-countdown-row--time">
        {units.slice(1).map((unit) => (
          <FlipUnit key={unit.key} unit={unit} />
        ))}
      </div>
    </div>
  );
}
