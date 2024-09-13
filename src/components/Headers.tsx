import React, { useState, useEffect, useCallback, useId } from "react";

export type HeadersProps = {
  headers?: Record<string, string>;
  onChange?: (headers: Record<string, string>) => void;
};

const httpRequestHeaderNames = [
  "A-IM",
  "Accept",
  "Accept-Charset",
  "Accept-Datetime",
  "Accept-Encoding",
  "Accept-Language",
  "Access-Control-Request-Method",
  "Access-Control-Request-Headers",
  "Authorization",
  "Cache-Control",
  "Connection",
  "Content-Encoding",
  "Content-Length",
  "Content-MD5",
  "Content-Type",
  "Cookie",
  "Date",
  "Expect",
  "Forwarded",
  "From",
  "Host",
  "HTTP2-Settings",
  "If-Match",
  "If-Modified-Since",
  "If-None-Match",
  "If-Range",
  "If-Unmodified-Since",
  "Max-Forwards",
  "Origin",
  "Pragma",
  "Prefer",
  "Proxy-Authorization",
  "Range",
  "Referer",
  "TE",
  "Trailer",
  "Transfer-Encoding",
  "User-Agent",
  "Upgrade",
  "Via",
  "Warning",
  "Upgrade-Insecure-Requests",
  "X-Requested-With",
  "DNT",
  "X-Forwarded-For",
  "X-Forwarded-Host",
  "X-Forwarded-Proto",
  "Front-End-Https",
  "X-Http-Method-Override",
  "X-ATT-DeviceId",
  "X-Wap-Profile",
  "Proxy-Connection",
  "X-UIDH",
  "X-Csrf-Token",
  "X-Request-ID",
  "X-Correlation-ID",
  "Save-Data",
  "Sec-GPC",
].sort();

const Headers = ({ headers = {}, onChange }: HeadersProps) => {
  const datalistId = useId();

  const [localHeaders, setLocalHeaders] = useState(headers);

  useEffect(() => {
    setLocalHeaders(headers);
  }, [headers]);

  const handleHeaderChange = useCallback(
    (key: string, value: string) => {
      const updatedHeaders = { ...localHeaders, [key]: value };
      setLocalHeaders(updatedHeaders);
      onChange?.(updatedHeaders);
    },
    [localHeaders, onChange],
  );

  const handleAddHeader = useCallback(() => {
    const updatedHeaders = { ...localHeaders, "": "" };
    setLocalHeaders(updatedHeaders);
    onChange?.(updatedHeaders);
  }, [localHeaders, onChange]);

  const handleRemoveHeader = useCallback(
    (key: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [key]: _, ...updatedHeaders } = localHeaders;
      setLocalHeaders(updatedHeaders);
      onChange?.(updatedHeaders);
    },
    [localHeaders, onChange],
  );

  const handleKeyChange = useCallback(
    (newKey: string, key: string, value: string) => {
      const updatedHeaders = { ...localHeaders, [newKey]: value };
      delete updatedHeaders[key];
      setLocalHeaders(updatedHeaders);
      onChange?.(updatedHeaders);
    },
    [localHeaders, onChange],
  );

  return (
    <div>
      <datalist id={datalistId}>
        {httpRequestHeaderNames.map((header) => (
          <option key={header} value={header} />
        ))}
      </datalist>
      {Object.entries(localHeaders).map(([key, value], index) => (
        <div key={index}>
          <label>
            Key:
            <input
              type="text"
              value={key}
              list={datalistId}
              onChange={(e) => handleKeyChange(e.target.value, key, value)}
            />
          </label>
          <label>
            Value:
            <input
              type="text"
              value={value}
              onChange={(e) => handleHeaderChange(key, e.target.value)}
            />
          </label>
          <button onClick={() => handleRemoveHeader(key)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddHeader}>Add Header</button>
    </div>
  );
};

export default Headers;
