module.exports = function suggestReply(feedbackText) {
    if (/refund|money/i.test(feedbackText)) return "We're sorry to hear that. Please contact support for a refund.";
    if (/great|awesome|love/i.test(feedbackText)) return "Thanks for your kind words! We're glad you enjoyed it.";
    if (/bug|issue|error/i.test(feedbackText)) return "Thanks for reporting this. We're working on a fix.";
    return "Thank you for your feedback. We value your input!";
  };
  