import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { supabase } from "../lib/supabase";

export default function AdminDashboard() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [eventStats, setEventStats] = useState<any[]>([]);
  const [spamAlert, setSpamAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      /* ---------- METRICS ---------- */
      const { data: metricData, error: metricError } = await supabase
        .from("admin_subscriber_metrics")
        .select("*")
        .single();

      if (!metricError) {
        setMetrics(metricData);
      } else {
        console.error(metricError);
      }

      /* ---------- SUBSCRIBERS ---------- */
      let query = supabase.from("admin_subscriber_overview").select("*");

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data: subscribersData, error: subsError } = await query.order(
        "created_at",
        { ascending: false }
      );

      if (!subsError) {
        setSubscribers(subscribersData || []);
      } else {
        console.error(subsError);
      }

      /* ---------- EVENT STATS (7 days) ---------- */
      const since = new Date();
      since.setDate(since.getDate() - 7);

      const { data: events, error: eventsError } = await supabase
        .from("email_events")
        .select("event_type, created_at")
        .gte("created_at", since.toISOString());

      if (!eventsError && events) {
        const byDay: Record<string, any> = {};
        let spamCount = 0;

        events.forEach((e) => {
          const day = new Date(e.created_at).toLocaleDateString();
          byDay[day] = byDay[day] || { day, spam: 0, bounce: 0, sent: 0 };

          if (e.event_type === "spam") {
            byDay[day].spam++;
            spamCount++;
          } else if (e.event_type === "hard_bounce") {
            byDay[day].bounce++;
          } else {
            byDay[day].sent++;
          }
        });

        setEventStats(Object.values(byDay));
        setSpamAlert(spamCount >= 3);
      } else if (eventsError) {
        console.error(eventsError);
      }

      setLoading(false);
    };

    load();
  }, [statusFilter]);

  if (loading) return <p className="p-6 text-lg">Loading dashboard…</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* 🚨 ALERT */}
      {spamAlert && (
        <div className="bg-red-100 border border-red-300 text-red-800 rounded-xl p-4">
          ⚠️ Spam activity spike detected. Review recent campaigns immediately.
        </div>
      )}

      {/* KPI CARDS */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            ["Total", metrics.total_count],
            ["Confirmed", metrics.confirmed_count],
            ["Pending", metrics.pending_count],
            ["Unsubscribed", metrics.unsubscribed_count],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl shadow p-4">
              <div className="text-sm text-gray-500">{label}</div>
              <div className="text-2xl font-semibold">{value}</div>
            </div>
          ))}
        </div>
      )}

      {/* 📊 EVENT GRAPH */}
      <div className="rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Email Events (7 days)</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={eventStats}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sent" />
            <Bar dataKey="bounce" />
            <Bar dataKey="spam" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* FILTER */}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border rounded-xl px-3 py-2"
      >
        <option value="all">All</option>
        <option value="confirmed">Confirmed</option>
        <option value="pending_confirmation">
          Pending confirmation
        </option>
        <option value="unsubscribed">Unsubscribed</option>
      </select>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-2xl shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Email</th>
              <th className="p-3">Name</th>
              <th className="p-3">Status</th>
              <th className="p-3">Last Event</th>
              <th className="p-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-3">{s.email}</td>
                <td className="p-3">{s.full_name || "—"}</td>
                <td className="p-3 capitalize">{s.status}</td>
                <td className="p-3">{s.last_event_type || "—"}</td>
                <td className="p-3">
                  {new Date(s.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
