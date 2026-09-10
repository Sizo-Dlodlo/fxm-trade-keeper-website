import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";

export const metadata: Metadata = {
  title: "Admin Manual",
};

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET
);

async function requireAdmin() {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) redirect("/admin/login");
  try {
    await jwtVerify(cookie, secret);
  } catch {
    redirect("/admin/login");
  }
}

type Section = {
  icon: string;
  title: string;
  blurb: string;
  steps: string[];
};

const SECTIONS: Section[] = [
  {
    icon: "dashboard",
    title: "Overview",
    blurb:
      "The first screen you see after signing in. It gives you a quick snapshot of how the site is doing.",
    steps: [
      "Top cards show your key numbers: total downloads, pending reviews, pending comments, reviews, comments, newsletter subscribers, messages, and the latest release.",
      "Recent download events list the most recent installs so you can see how the site is being used at a glance.",
    ],
  },
  {
    icon: "deployed_code",
    title: "Releases",
    blurb:
      "Manage the download files offered on the website. Each release can hold Windows and macOS versions.",
    steps: [
      "Click “Add Release” or “Edit” on an existing release to open the form.",
      "Enter the version number and release date.",
      "For Windows, paste the Setup (.exe) and Portable (.exe) download URLs, their file sizes, and their SHA-256 checksums.",
      "For macOS, paste the DMG download URL, its file size, and its SHA-256 checksum. (macOS installers are offered for both Intel and Apple Silicon Macs on the download page.)",
      "Save the release. The download page will show whatever you enter here.",
    ],
  },
  {
    icon: "star",
    title: "Reviews",
    blurb:
      "Approve, reject, or delete customer reviews before they appear on the site.",
    steps: [
      "New reviews arrive as “Pending” so you can check them before they go live.",
      "Use the filter buttons (All / Approved / Pending / Rejected) to narrow the list.",
      "Click the check mark to approve a review, the X to reject it, or the trash icon to delete it.",
      "The red number on the Reviews link in the sidebar tells you how many are waiting for your attention.",
    ],
  },
  {
    icon: "comment",
    title: "Comments",
    blurb:
      "Moderate comments left on guides and blog posts before they are shown publicly.",
    steps: [
      "Comments appear as Pending until you approve them.",
      "Each comment shows the author, their email, the page it was left on, and the message.",
      "Use Approve, Reject, or Delete to manage each comment.",
      "The red badge on the Comments link shows how many are pending.",
    ],
  },
  {
    icon: "analytics",
    title: "Analytics",
    blurb:
      "A read-only dashboard that shows how people are downloading and using the app.",
    steps: [
      "The top cards show total downloads, reviews, comments, and newsletter subscribers.",
      "“Downloads Over Time” shows daily downloads over the last 30 days.",
      "“Version Adoption” breaks down totals by app version.",
      "“Downloads by Version” shows a stacked daily view for the most popular versions.",
    ],
  },
  {
    icon: "contact_mail",
    title: "Leads",
    blurb:
      "Your newsletter subscribers. Use this page to manage the people who signed up for updates.",
    steps: [
      "The table lists every subscriber with their email and status (Active or Inactive).",
      "Toggle a subscriber between Active and Inactive if they opt out.",
      "Use the trash icon to permanently delete a subscriber.",
      "The cards at the top summarize how many subscribers you have.",
    ],
  },
  {
    icon: "mail",
    title: "Messages",
    blurb:
      "Messages submitted through the website’s contact form. This is where you read and reply to inquiries.",
    steps: [
      "Message cards show the sender’s name, email, category, subject, and full message.",
      "Use the filter buttons (All / Unread / Read) to focus on what needs attention.",
      "Mark a message as read or replied so you know where you are.",
      "Click Reply to open your email program with the message addressed and ready to send.",
      "Delete removes the message from the list.",
      "The red badge on Messages shows how many are still unread.",
    ],
  },
  {
    icon: "settings",
    title: "Settings",
    blurb:
      "Site-wide configuration. Changes here affect the whole website.",
    steps: [
      "Analytics: your Google Analytics Measurement ID and Google AdSense Publisher ID.",
      "Site URL and Support Email: the address of the site and where support inquiries go.",
      "Enable Advertising: turns AdSense ads on or off on content pages.",
      "Enable Comments: allows or blocks comments on guides and blog posts.",
      "Click “Save Settings” when you’re done. Your changes take effect immediately.",
    ],
  },
];

function SectionBlock({ section }: { section: Section }) {
  return (
    <div className="bg-surface-container border border-surface-stroke rounded-xl p-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="material-symbols-outlined text-primary">
          {section.icon}
        </span>
        <h2 className="font-headline-md text-lg text-on-surface">
          {section.title}
        </h2>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant mb-4">
        {section.blurb}
      </p>
      <ul className="space-y-2">
        {section.steps.map((step, i) => (
          <li key={i} className="flex gap-3 font-body-md text-body-md text-on-surface-variant">
            <span className="text-primary shrink-0 mt-1">
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function AdminManualPage() {
  await requireAdmin();

  return (
    <div className="max-w-container-max mx-auto">
      <div className="mb-8">
        <h1 className="font-headline-md text-headline-md text-on-surface mb-1">
          Admin Manual
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          A simple walkthrough of every area in the FXM Trade Keeper Admin Console
        </p>
      </div>

      <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="material-symbols-outlined text-primary">help</span>
          <h2 className="font-headline-md text-base text-on-surface font-bold">
            Getting Started
          </h2>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant">
          The Admin Console lets you manage everything about the FXM Trade Keeper
          website from one place. Use the links on the left to move between areas.
          Red badges next to “Reviews”, “Comments”, and “Messages” show items that
          are waiting for your attention (they refresh automatically every 15 seconds).
          When you are finished, use “Sign Out” at the bottom of the sidebar.
        </p>
      </div>

      <div className="space-y-6">
        {SECTIONS.map((section) => (
          <SectionBlock key={section.title} section={section} />
        ))}
      </div>
    </div>
  );
}
