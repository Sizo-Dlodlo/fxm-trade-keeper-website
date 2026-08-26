import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reviews Management",
};

const reviews = [
  { id: "#R001", rating: 5, title: "Game changer for my trading", author: "Sarah K.", status: "Approved", date: "2 days ago" },
  { id: "#R002", rating: 5, title: "Finally a free journal that works", author: "Marcus T.", status: "Approved", date: "1 week ago" },
  { id: "#R003", rating: 4, title: "Great for prop firm traders", author: "Alex M.", status: "Pending", date: "1 week ago" },
  { id: "#R004", rating: 5, title: "Strategy tracking is brilliant", author: "Jordan R.", status: "Approved", date: "2 weeks ago" },
];

export default function AdminReviewsPage() {
  return (
    <div className="max-w-container-max mx-auto">
      <div className="mb-8">
        <h1 className="font-headline-md text-headline-md text-on-surface mb-1">
          Reviews
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Moderate and manage user reviews
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-headline-md text-2xl text-on-surface font-bold mb-1">4.9</div>
          <div className="font-body-md text-body-md text-text-dimmed">Average Rating</div>
        </div>
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-headline-md text-2xl text-on-surface font-bold mb-1">156</div>
          <div className="font-body-md text-body-md text-text-dimmed">Total Reviews</div>
        </div>
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-headline-md text-2xl text-primary font-bold mb-1">3</div>
          <div className="font-body-md text-body-md text-text-dimmed">Pending</div>
        </div>
        <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
          <div className="font-headline-md text-2xl text-data-down font-bold mb-1">1</div>
          <div className="font-body-md text-body-md text-text-dimmed">Flagged</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-container border border-surface-stroke rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-stroke/50">
                <th className="text-left px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">ID</th>
                <th className="text-left px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Review</th>
                <th className="text-left px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Rating</th>
                <th className="text-left px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Status</th>
                <th className="text-left px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Date</th>
                <th className="text-right px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr
                  key={review.id}
                  className="border-b border-surface-stroke/30 hover:bg-surface-container-highest/10 transition-colors group"
                >
                  <td className="px-6 py-4 font-label-mono text-label-mono text-text-dimmed">{review.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-body-md text-body-md text-on-surface font-medium">{review.title}</div>
                    <div className="font-body-md text-body-md text-text-dimmed">by {review.author}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span key={s} className={`material-symbols-outlined text-[16px] ${s <= review.rating ? "text-primary fill" : "text-surface-stroke"}`}>star</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-label-mono text-label-mono px-3 py-1 rounded-full ${
                      review.status === "Approved" ? "bg-primary/10 text-primary" : "bg-surface-stroke/50 text-text-dimmed"
                    }`}>
                      {review.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-label-mono text-label-mono text-text-dimmed">{review.date}</td>
                  <td className="px-6 py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-primary hover:brightness-110 transition-all mr-2">
                      <span className="material-symbols-outlined text-[18px]">check</span>
                    </button>
                    <button className="text-data-down hover:brightness-110 transition-all">
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
