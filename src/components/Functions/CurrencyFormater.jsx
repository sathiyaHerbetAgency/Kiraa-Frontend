import React from "react";

const CurrencyFormatter = ({ amount }) => {
  // Ensure the amount is sanitized and converted to a valid number
  const sanitizedAmount = amount?.toString().replace(/[^0-9.]/g, ""); // Remove invalid characters
  const numericAmount = sanitizedAmount ? parseFloat(sanitizedAmount) : 0; // Convert to number or fallback to 0

  // Format the numeric value
  const formattedAmount = new Intl.NumberFormat("en-US").format(numericAmount);

  return (
    <>
      {formattedAmount}
    </>
  );
};

export default CurrencyFormatter;

// Usage Examples:
// <CurrencyFormatter amount="897897" /> -> $897,897
// <CurrencyFormatter amount={123123} /> -> $123,123
// <Currency
