import React from "react";
import QuoteForm from "../components/quotes/QuoteForm";

function NewQuote() {
  const addQuoteHandler = (quoteData) => {
    console.log(quoteData);
  };

  return (
    <div>
      <QuoteForm onQuote={addQuoteHandler} />
    </div>
  );
}

export default NewQuote;
