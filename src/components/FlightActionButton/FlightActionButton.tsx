import { useEffect, useState } from 'react';
import './FlightActionButton.css';

type FlightActionButtonProps = {
  label: string;
  busyLabel?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick: () => void | Promise<void>;
};

export function FlightActionButton({
  label,
  busyLabel = label,
  loading = false,
  disabled = false,
  className = '',
  onClick,
}: FlightActionButtonProps) {
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    if (!isLaunching) {
      return undefined;
    }

    // Fixed duration lets the launch animation complete regardless of how fast onClick resolves
    const timeoutId = window.setTimeout(() => setIsLaunching(false), 2500);
    return () => window.clearTimeout(timeoutId);
  }, [isLaunching]);

  const handleClick = () => {
    if (disabled || loading || isLaunching) {
      return;
    }

    setIsLaunching(true);
    Promise.resolve(onClick()).catch((err: unknown) => {
      console.error('FlightActionButton onClick failed:', err);
    });
  };

  return (
    <button
      type="button"
      className={`flight-action-btn ${isLaunching ? 'is-launching' : ''} ${className}`.trim()}
      onClick={handleClick}
      disabled={disabled || loading || isLaunching}
      aria-label={loading ? busyLabel : label}
    >
      <svg
        className="flight-action-svg"
        viewBox="0 0 265.5 152.5"
        role="img"
        aria-hidden="true"
        focusable="false"
      >
        <path
          className="flight-action-bg"
          d="M229.227,96.862c0,5.729-3.352,10.37-7.484,10.37H50.037c-4.134,0-7.484-4.642-7.484-10.37V55.379c0-5.727,3.35-10.37,7.484-10.37h171.705c4.133,0,7.484,4.644,7.484,10.37V96.862z"
        />

        <g className="flight-action-runway">
          <polygon points="133.948,8.969 253.047,77.732 133.948,146.495 14.85,77.73" />
          <path d="M82.478,43.135l8.232,4.753l-0.774,0.448l-8.235-4.752L82.478,43.135z M98.943,52.642l8.234,4.755l-0.775,0.447l-8.233-4.754L98.943,52.642z M115.41,62.148l8.233,4.755l-0.776,0.447l-8.232-4.754L115.41,62.148z M131.876,71.656l8.233,4.753l-0.775,0.447l-8.234-4.753L131.876,71.656z M148.343,81.163l8.231,4.753l-0.772,0.448l-8.235-4.753L148.343,81.163z M164.81,90.671l8.231,4.752l-0.774,0.448l-8.233-4.753L164.81,90.671z M181.275,100.178l8.232,4.752l-0.775,0.446l-8.233-4.752L181.275,100.178z" />
        </g>

        <g className="flight-action-plane-wrapper">
          <g className="flight-action-plane-build">
            <path
              className="flight-action-plane-body"
              d="M123.825,68.301l-0.719-0.192l-0.684-0.186l-0.664-0.186l-0.66-0.188l-0.673-0.198l-0.703-0.21l-0.748-0.227l-0.528-0.167l-0.503-0.173l-0.481-0.181l-0.465-0.189l-0.452-0.2l-0.44-0.213l-0.436-0.227l-0.434-0.241l-14.337-8.278l-15.162-8.754l-1.635-1.185l-1.635-1.183l-1.635-1.184l-1.634-1.186l-1.635-1.183l-1.634-1.184l-1.635-1.184l-1.634-1.185L60.714,27.923c-2.217-0.699-1.063-6.155,2.779-4.823l24.511,11.283l16.146,8.488l6.132,3.54l3.945,2.343l8.771,5.205c2.127,1.263,3.101,3.038,3.865,3.88c3.935,4.339,3.635,4.954,3.635,8.416l-0.034,0.272l-0.096,0.264l-0.156,0.257l-0.215,0.243l-0.273,0.23l-0.328,0.215l-0.591,0.341l-0.378,0.192l-0.409,0.16l-0.433,0.125l-0.452,0.089l-0.469,0.055l-0.481,0.015l-0.488-0.021C124.939,68.598,124.589,68.499,123.825,68.301z"
            />
            <path
              className="flight-action-wing flight-action-wing-r"
              d="M111.35,47.804l1.89-3.014l0.007-0.012l2.448-3.903c0.018-0.035,0.039-0.069,0.064-0.103l8.642-13.78c0.297-0.473,0.35-0.956,0.176-1.407c-0.173-0.449-0.578-0.872-1.197-1.229l-4.61-2.662L97.695,39.919L111.35,47.804z"
            />
            <path
              className="flight-action-wing flight-action-wing-l"
              d="M100.935,53.816l-5.218,1.091l-0.021,0.004l-6.761,1.413c-0.061,0.011-0.12,0.022-0.178,0.037l-23.866,4.989c-0.82,0.172-1.656,0.202-2.438,0.102c-0.775-0.1-1.509-0.333-2.128-0.69l-4.609-2.663L87.28,45.932L100.935,53.816z"
            />
            <path
              className="flight-action-tail"
              d="M71.757,28.72L62.398,11.847L58.422,9.55l2.582,13.715L71.757,28.72z M74.138,28l-8.359-3.848l9.368-5.408l1.837,1.061c0.457,0.264,0.775,0.565,0.944,0.886c0.172,0.325,0.201,0.677,0.076,1.041l-2.363,6.96L74.138,28z M69.567,31.529l-11.372,1.694c-0.628,0.071-1.24,0.056-1.801-0.044c-0.558-0.098-1.078-0.281-1.535-0.546l-1.837-1.061l9.367-5.408L69.567,31.529z"
            />
            <g className="flight-action-windows">
              <path d="M110.048,55.174l-0.208-0.119c-0.315-0.183-0.573-0.033-0.573,0.33v0.782c0,0.364,0.258,0.811,0.573,0.992l0.208,0.12c0.314,0.183,0.573,0.033,0.573-0.33v-0.782C110.621,55.803,110.362,55.356,110.048,55.174z" />
              <path d="M106.461,53.104c-0.069-0.04-0.139-0.08-0.208-0.119c-0.315-0.183-0.573-0.033-0.573,0.33v0.782c0,0.363,0.257,0.811,0.573,0.992c0.069,0.04,0.139,0.08,0.208,0.12c0.316,0.183,0.573,0.033,0.573-0.331v-0.781C107.034,53.732,106.777,53.286,106.461,53.104z" />
              <path d="M102.875,51.033c-0.069-0.04-0.139-0.08-0.208-0.12c-0.315-0.182-0.573-0.032-0.573,0.331v0.782c0,0.363,0.258,0.81,0.573,0.992c0.069,0.04,0.139,0.08,0.208,0.12c0.315,0.182,0.573,0.032,0.573-0.331v-0.781C103.448,51.662,103.191,51.215,102.875,51.033z" />
              <path d="M99.289,48.963c-0.069-0.04-0.139-0.08-0.208-0.12c-0.315-0.182-0.573-0.033-0.573,0.331v0.782c0,0.363,0.257,0.81,0.573,0.992c0.069,0.04,0.139,0.08,0.208,0.12c0.315,0.182,0.573,0.032,0.573-0.331v-0.782C99.862,49.591,99.604,49.145,99.289,48.963z" />
              <path d="M95.703,46.893c-0.069-0.04-0.139-0.08-0.208-0.12c-0.314-0.182-0.573-0.033-0.573,0.33v0.783c0,0.363,0.258,0.81,0.573,0.992c0.069,0.04,0.139,0.08,0.208,0.12c0.315,0.182,0.572,0.032,0.572-0.331v-0.782C96.275,47.521,96.018,47.074,95.703,46.893z" />
            </g>
            <path
              className="flight-action-pilot"
              d="M116.303,59.68l1.122,0.085c3.47,0.263,8.046-2.562,7.201-4.441C127.454,59.868,120.994,61.867,116.303,59.68z"
            />
            <circle className="flight-action-engine flight-action-engine-l" cx="89.258" cy="59.18" r="4.5" />
            <circle className="flight-action-engine flight-action-engine-r" cx="117.947" cy="42.488" r="4.5" />
          </g>
        </g>

        <text className="flight-action-label" x="135.5" y="81" textAnchor="middle">
          {loading ? busyLabel : label}
        </text>
      </svg>
    </button>
  );
}
