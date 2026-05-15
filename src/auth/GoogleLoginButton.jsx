import { useEffect, useRef, useState } from "react";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_SCRIPT_SRC = "https://accounts.google.com/gsi/client";

let googleScriptPromise;

function loadGoogleScript() {
  if (window.google?.accounts?.id) {
    return Promise.resolve();
  }

  if (googleScriptPromise) {
    return googleScriptPromise;
  }

  googleScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = GOOGLE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error("Не вдалося завантажити Google Login"));
    document.head.appendChild(script);
  });

  return googleScriptPromise;
}

export function GoogleLoginButton({ disabled = false, onError, onSuccess }) {
  const buttonRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
      return;
    }

    let isMounted = true;

    loadGoogleScript()
      .then(() => {
        if (!isMounted || !buttonRef.current) {
          return;
        }

        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (response) => {
            if (!response.credential) {
              onError?.(new Error("Google не повернув credential"));
              return;
            }

            onSuccess(response.credential);
          }
        });

        buttonRef.current.innerHTML = "";
        window.google.accounts.id.renderButton(buttonRef.current, {
          size: "large",
          text: "signin_with",
          theme: "outline",
          width: buttonRef.current.offsetWidth || 410
        });
        setIsReady(true);
      })
      .catch((error) => {
        if (isMounted) {
          onError?.(error);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [onError, onSuccess]);

  if (!GOOGLE_CLIENT_ID) {
    return (
      <button className="auth-google-fallback" type="button" disabled>
        Google login не налаштований
      </button>
    );
  }

  return (
    <div className="auth-google-button-wrap" aria-disabled={disabled || !isReady}>
      <div ref={buttonRef} className="auth-google-button" />
      {disabled || !isReady ? <div className="auth-google-button__overlay" /> : null}
    </div>
  );
}
