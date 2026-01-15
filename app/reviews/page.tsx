import { Suspense } from "react";
import ReviewsClient from "./ReviewsClient";

export default function ReviewsPage() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading reviews…</div>}>
      <ReviewsClient />
    </Suspense>
  );
}

